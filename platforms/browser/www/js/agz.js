//Variable para almacenar ID de interval del chat
var ChatIntervalId = "";

$(document).ready(function(){

	//Evaluamos auto play
	var aut = localStorage.getItem('AGZAutoPlay');

    if(parseInt(aut) == 1)
    {
		doplay();
    }

	loadSection("home.html");

	$(document).ready(function(){

		doResize();

		$( window ).resize(function() {
			doResize();
		});

		return false;
	});

	$("body").on("click", "#menu a", function(){

		loadSection($(this).attr("href"));
		$("#menu a").parent().removeClass("active");
		$(this).parent().addClass("active");

		return false;
	});

	$("#wrap").on("click", "#PodcastItem", function(){

		//El boton back volverá a
		$("input[name='BackPage']").val("home.html");

		//Datos de la sección destino
		$("input[name='SaveId']").val($(this).attr("data-id"))
		loadSection("single.html");

		return false;
	});	

	$("body").on("click", "#HomeLink", function(){

		loadSection("home.html");

		return false;
	});

	$("body").on("click", "#Programas", function(){

		//El boton back volverá a
		$("input[name='BackPage']").val("home.html");

		loadSection("programas.html");

		return false;
	});

	$("body").on("click", "#MiPerfil", function(){

		loadSection("perfil.html");
		return false;
	});

	$("body").on("click", "#Configuracion", function(){

		loadSection("configuracion.html");
		return false;
	});

	$("body").on("click", "#AcercaDe", function(){

		loadSection("acerca.html");
		return false;
	});

	$("body").on("click", "#HomeLink", function(){

		loadSection("home.html");
		return false;
	});

	$("body").on("click", "#ChatButton", function(){

		Name = localStorage.getItem('AGZNombre');

		if(Name != null && Name.length > 1)
		{
			loadSection("chat.html");
		}
		else
		{
			alert("Debes indicar tu Nombre para participar en el Chat.");
			loadSection("perfil.html");
		}
		
		return false;
	});

	$("body").on("click", "#PlayButton", function(){

		doplay();
		return false;
	});

	$("#MenuButton").on("click", function(){

		if($("#drawer").attr("data-status") == 0)
		{
			$("#fullcontent").css("width", "10%");
			$("#drawer").show("fast");
			$("#drawer").attr("data-status", 1)
		}
		else
		{
			$("#drawer").hide("fast");
			$("#fullcontent").css("width", "100%");
			$("#drawer").attr("data-status", 0)
		}

		return false;
	});

	$("#drawer ul li a").on("click", function(){
		$("header #MenuButton").trigger("click");	
	});

	$("body").on("click", "#SavePersonalData", function(){

		localStorage.setItem('AGZNombre', $("input[name='Nombre']").val());
		localStorage.setItem('AGZEmail', $("input[name='Email']").val());
		localStorage.setItem('AGZEdad', $("input[name='Edad']").val());
		localStorage.setItem('AGZSexo', $("select[name='Sexo']").find(":selected").text());

		alert("Los datos se guardaron correctamente.");

		return false;
	});

	$('body').on("click", "#EnviarMensaje", function(){

		enviarmensaje();

		return false;
	});


	$('body').on("keypress", "input[name='Contenido']", function(e) {

		if (e.keyCode == 13) 
		{
			enviarmensaje();
			return false;
		}

	});

	$("body").on("click", ".podelement", function(){

		var name = $(this).attr("data-name");
		var id = $(this).attr("data-id");

		//El boton back volverá a
		$("input[name='BackPage']").val("programas.html");

		loadSection("showpodcasts.html");

        $.ajax({
            url: 'http://agzradio.com/ws/index.php?Action=getLastPodcastsId&Id='+id,
            dataType: 'json',
            type: 'GET',
            async: true,
            success: function (data) {
                $.each(data, function( i, item ) 
                {
                    $("#TableViewPodcasts").append('<li class="table-view-cell media" id="PodcastItem" data-id="'+item.id_topic+'"><img class="media-object pull-left imgformatter" src="'+item.podimg+'"><div class="media-body"><span class="podtitle">'+capitalize(item.titulo).substring(0, 250)+'</span><p class="poddesc">Publicado '+item.time+'</p></div></a></li>');
                });
            },
            error: function (data) {
                alert("La sección no está disponible.");
            }
        });

		return false;
	});

});


document.addEventListener("backbutton", onBackKeyDown, false);
document.addEventListener("offline", function(){ alert("No tienes conección a Internet. Activa el WI-FI o 3G/4G para continuar.") }, false);

//Funciones
function doplay()
{
	var elem = document.getElementById('ctrlaudio');
	var status = $("#PlayButton").attr("data-status");

	if(status == 0)
	{
		$(elem).trigger('play');
		$("#PlayButton").attr('data-status', 1);
		$("#PlayButton").find(".icon").removeClass("icon-play");
		$("#PlayButton").find(".icon").addClass("icon-pause");
	}
	else
	{
		$(elem).trigger('pause');
		$("#PlayButton").attr('data-status', 0);
		$("#PlayButton").find(".icon").removeClass("icon-pause");
		$("#PlayButton").find(".icon").addClass("icon-play");
	}
}

function loadSection(name)
{
	$.ajax({
		url: name,
		dataType: 'html',
		type: 'GET',
		async: true,
		success: function (data) {

			//Stop intertval del chat
			if(ChatIntervalId != "")
			{
				clearInterval(ChatIntervalId);
			}
			
			//Mostramos si tenemos un footer personalizado
			if(!$(".navorigen").is(":visible"))
			{
				$(".navsample").html("");
				$(".navorigen").show();
			}

			$("#wrap").html(data);
        },
        error: function (data) {
        	alert("No tienes conección a Internet. Activa el WI-FI o 3G/4G para continuar.");
        }
    });
}

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function onBackKeyDown(e) {
	
	var a = $("input[name='BackPage']").val();

	if(a == "")
	{
		navigator.app.exitApp();
	}
	else
	{
		$("input[name='BackPage']").val("")
		loadSection(a);
	}

	return false;
}

function doResize()
{
	$( "#drawer" ).css("height", ($(window).height()+10)+"px");
}

    function enviarmensaje()
    {
        var contenido = $("input[name='Contenido']").val();

        if(contenido.length > 0)
        {
            $.ajax({
                url: 'http://agzradio.com/ws/index.php?Action=setMensaje&Nombre='+$("input[name='Nombre']").val()+'&Contenido='+contenido,
                dataType: 'json',
                type: 'GET',
                async: true,
                success: function (data) {

                    if(data == true)
                    {
                        $("#chatcontent").prepend('<div class="containerbox"><b>'+$("input[name='Nombre']").val()+':</b> '+$("input[name='Contenido']").val()+'</div>');
                        $("input[name='Contenido']").val("");
                    }

                },
                error: function (data) {
                    alert("La sección no está disponible.");
                }
            });
        }

        return false;
    }

    function updateChatContent()
    {
        $.ajax({
            url: 'http://agzradio.com/ws/index.php?Action=getMensajes&Nombre='+$("input[name='Nombre']").val()+'&LastId='+$("input[name='LastIdChat']").val(),
            dataType: 'json',
            type: 'GET',
            async: true,
            success: function (data) {

            	var lastid = 0;

                $.each(data, function( i, item ) {

                	if($("input[name='LastIdChat']").val() == "0")
                	{

                		$("#chatcontent").append('<div class="containerbox"><b>'+item.nombre+':</b> '+item.contenido+'</div>');
                	}
                	else
                	{

                		$("#chatcontent").prepend('<div class="containerbox"><b>'+item.nombre+':</b> '+item.contenido+'</div>');
                	}

                	if(i == 0)
                	{
                		lastid = item.id;
                	}
     
                });;

                 $("input[name='LastIdChat']").val(lastid);

            },
            error: function (data) {
                alert("La sección no está disponible.");
            }
        });

        return false;
    }