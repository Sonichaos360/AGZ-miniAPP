$(document).ready(function(){

	loadSection("home.html");

	$("body").on("click", "#menu a", function(){

		loadSection($(this).attr("href"));
		$("#menu a").parent().removeClass("active");
		$(this).parent().addClass("active");

		return false;
	});

	$("#PlayButton").on("click", function(){

		var status = $(this).attr("data-status");

		if(status == 1)
		{
			$("#Audio").trigger('pause');
			$(this).attr("data-status", 0);
			$(this).html('<a href="#" id="PlayButton" data-status="0"><i class="fa fa-play"></i></a>');
		}
		else
		{
			$("#Audio").trigger('play');
			$(this).attr("data-status", 1);
			$(this).html('<a href="#" id="PlayButton" data-status="0"><i class="fa fa-pause"></i></a>');
		}

		return true;
	});

	$("#wrap").on("click", "#PodcastItem", function(){

		//El boton back volverá a
		$("input[name='BackPage']").val("home.html");

		//Datos de la sección destino
		$("input[name='SaveId']").val($(this).attr("data-id"))
		loadSection("single.html");

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