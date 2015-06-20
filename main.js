$(document).ready(function(){
	var x = $(window).height();
	$('.left-panel').css("height",x);
	$('.right-panel').css("height",x);

	$('input[type="text"]').click(function(){

		$('.stats').fadeOut(400);
		$('.menu-option').fadeOut(400);

		$('.right-panel h4').css("text-align","center");
		$('.right-panel p').css("text-align","center");

		$('.left-panel').animate({width: '80%'},400);
		$('.right-panel').animate({width: '20%'},400);

		$('.back-button').fadeIn(400);
	});

	$('.back-button').click(function(){

		$('.stats').fadeIn(400);
		$('.menu-option').fadeIn(400);

		$('.right-panel h4').css("text-align","left");
		$('.right-panel p').css("text-align","left");

		$('.left-panel').animate({width: '25%'},400);
		$('.right-panel').animate({width: '75%'},400);

		$('.back-button').fadeOut(400);
	});

});