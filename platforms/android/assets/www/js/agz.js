$(document).ready(function(){

	loadSection("home.html");

	$("body").on("click", "#menu a", function(){

		loadSection($(this).attr("href"));
		$("#menu a").parent().removeClass("active");
		$(this).parent().addClass("active");

		return false;
	});

	$("body").on("click", ".podcastelement", function(){

		loadSection($(this).attr("data-href"));

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

});

//Funciones
function loadSection(name)
{
	$.ajax({
		url: name,
		dataType: 'html',
		type: 'POST',
		async: true,
		success: function (data) {
				$("#wrap").html(data);
        },
        error: function (data) {
        	alert("La sección no está disponible.");
        }
    });

}