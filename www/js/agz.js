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

	$("body").on("click", "#HomeLink", function(){

		loadSection("home.html");
		return false;
	});

	$("body").on("click", "#ChatButton", function(){

		loadSection("chat.html");
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

	$("#logo").on("click", function(){

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