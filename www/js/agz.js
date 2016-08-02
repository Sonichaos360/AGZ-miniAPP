//Variable para almacenar ID de interval del chat
var ChatIntervalId = "";

$(document).ready(function(){

	// if(localStorage.getItem('AGZNombre') == null)
	// {
	// 	localStorage.setItem('AGZNombre', 'Lucho Vergara');
	// }
	// else
	// {
	// 	alert(localStorage.getItem('AGZNombre'));
	// }

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

		var elem = document.getElementById('ctrlaudio');
		var status = $(this).attr("data-status");

		if(status == 0)
		{
			$(elem).trigger('play');
			$(this).attr('data-status', 1);
			$(this).find(".icon").removeClass("icon-play");
			$(this).find(".icon").addClass("icon-pause");
		}
		else
		{
			$(elem).trigger('pause');
			$(this).attr('data-status', 0);
			$(this).find(".icon").removeClass("icon-pause");
			$(this).find(".icon").addClass("icon-play");
		}

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

});

document.addEventListener("backbutton", onBackKeyDown, false);

//Funciones
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
        	alert("La sección no está disponible.");
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

                $.each(data, function( i, item ) {

                    if(i == 0)
                    {
                        $("input[name='LastIdChat']").val(item.id);
                    }

                    $("#chatcontent").prepend('<div class="containerbox"><b>'+item.nombre+':</b> '+item.contenido+'</div>');
                });;

            },
            error: function (data) {
                alert("La sección no está disponible.");
            }
        });

        return false;
    }