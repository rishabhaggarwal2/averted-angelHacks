$(document).ready(function(){
	//AKshay
	var country;
	var list = {};
// 	$('#btn').on('click', function() {
//     var file_data = $('#images').prop('files')[0];   
//     var form_data = new FormData();                  
//     form_data.append('file', file_data);
//     console.log(form_data);                             
//     $.ajax({
//                 url: 'persons.php', // point to server-side PHP script 
//                 dataType: 'text',  // what to expect back from the PHP script, if anything
//                 cache: false,
//                 contentType: false,
//                 processData: false,
//                 data: form_data,                         
//                 type: 'post',
//                 success: function(php_script_response){
//                     alert(php_script_response); // display response from the PHP script, if any
//                 }
//      });
// });
// $("#sss").submit(function() {

//     var formData = new FormData($(this)[0]);

//     $.post($(this).attr("action"), formData, function(data) {
//         alert(data);
//     });

//     return false;
// });
	//$("#sss").ajaxForm(function(){alert(":D")});
	$("#sss").on('submit',(function(e) {
	e.preventDefault();
	// $("#message").empty();
	// $('#loading').show();
	console.log("asd");
	formd = new FormData(this);
	console.log(formd);
	$.ajax({
	url: "persons.php", // Url to which the request is send
	type: "POST",             // Type of request to be send, called as method
	data: formd, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
	contentType: false,       // The content type used when sending data to the server.
	cache: false,             // To unable request pages to be cached
	processData:false,        // To send DOMDocument or non processed data file it is set to false
	success: function(data)   // A function to be called if request succeeds
	{
		console.log(data);
		$('.tab-rm').animate({top:"-100%"},500);
		$('.black-back').animate({opacity:"0"},500);
		setTimeout(function(){
			$('.black-back').css("display","none");
		},500);
		$(".people").html("");
		$.post("http://localhost/averted-angelhacks/persons.php",{input: "getpersons", loc: country}, function(data){
    		console.log(data);
			var ar = $.parseJSON(data);
			$.each(ar, function(sid, arr){
				console.log(arr);
				list[arr['id']-1] = ar[sid];
			});
			// list = ar;
			$.each(ar, function(sid, arr){
				status = arr['status'];
				name = arr['name'];
				img = "uploads/" + arr['image_name'];
				if(img == "uploads/" + "")
					img = "1.jpg";

				$(".people").html($(".people").html() + '<div class="people-card '+status+'" id="'+(arr['id']-1)+'"><img src="'+img+'"><div class="text-wrapper"><p><b>'+name+'</b></p><p>Status : '+status+'</p></div></div>');
			});
		});
		$("input").val("");
		$("#rm-in").val("setpersons");
	// $('#loading').hide();
	// $("#message").html(data);
	}
	});
	}));
	$.post("http://localhost/averted-angelhacks/location.php",{input: "getmapdata"}, function(data, status){
		var ar = $.parseJSON(data);
		// console.log(ar);
    	$("#country").html(ar[0]['name']);
    	$("#date").html(ar[0]['date']);
    	country = ar[0]['name'];	
    	// alert(country);
    	$.post("http://localhost/averted-angelhacks/persons.php",{input: "getpersons", loc: country}, function(data){
    		console.log(data);
			var ar = $.parseJSON(data);
			$.each(ar, function(sid, arr){
				console.log(arr);
				list[arr['id']-1] = ar[sid];
			});
			// list = ar;
			$.each(ar, function(sid, arr){
				status = arr['status'];
				name = arr['name'];
				img = "uploads/" + arr['image_name'];
				if(img == "uploads/" + "")
					img = "1.jpg";

				$(".people").html($(".people").html() + '<div class="people-card '+status+'" id="'+(arr['id']-1)+'"><img src="'+img+'"><div class="text-wrapper"><p><b>'+name+'</b></p><p>Status : '+status+'</p></div></div>');
			});
		});
    });

	//Abhinav
	var x = $(window).height();
	console.log(x);
	$('.left-panel').css("height",x);
	$('.right-panel').css("height",x);

	$('.left-panel input[type="text"]').click(function(){

		$('.stats').fadeOut(300);
		$('.menu-option').fadeOut(300);

		$('.right-panel .title h4').css("text-align","center");
		$('.right-panel .title p').css("text-align","center");

		$('.left-panel').animate({width: '80%'},300);
		$('.right-panel').animate({width: '20%'},300);

		$('.back-button').fadeIn(300);
	});

	$('.back-button').click(function(){

		$('.stats').fadeIn(300);
		$('.menu-option').fadeIn(300);

		$('.right-panel .title h4').css("text-align","left");
		$('.right-panel .title p').css("text-align","left");

		$('.left-panel').animate({width: '25%'},300);
		$('.right-panel').animate({width: '75%'},300);

		$('.back-button').fadeOut(300);
	});

	/*tab down*/
	$('.button-wrapper .rm').click(function(){
		$('.black-back').css("display","block");
		$('.black-back').animate({opacity:".8"},500);
		$('.tab-rm').animate({top:"10%"},500);
	});

	/*Close Button*/
	$('.tab-rm-header img').click(function(){
		$('.tab-rm').animate({top:"-100%"},500);
		$('.black-back').animate({opacity:"0"},500);
		setTimeout(function(){
			$('.black-back').css("display","none");
		},500);
	});

	/*tab down*/
	$('.button-wrapper .rf').click(function(){
		$('.black-back').css("display","block");
		$('.black-back').animate({opacity:".8"},500);
		$('.tab-rf').animate({top:"10%"},500);
	});

	/*Close Button*/
	$('.tab-rf-header img').click(function(){
		$('.tab-rf').animate({top:"-100%"},500);
		$('.black-back').animate({opacity:"0"},500);
		setTimeout(function(){
			$('.black-back').css("display","none");
		},500);
	});

	/*tab down*/
	$(document).on( 'click', '.people-card', function(){
		$('.black-back').css("display","block");
		$('.black-back').animate({opacity:".8"},500);
		$('.tab-person').animate({top:"10%"},500);
		var id = $(this).attr('id');
		console.log($(this) );
		$('#tab-name').html(list[id]['name']);
		$('#tab-phone').html("Phone: "+list[id]['phone']);
		$('#tab-status').html("Status: "+list[id]['status']);
				img = "uploads/" + list[id]['image_name'];
				if(img == "uploads/" + "")
					img = "1.jpg";
				$("#tab-img").attr("src", img);
	} );
	// $('.people-card').click(function(){
	// 	console.log(":)");
	// 	$('.black-back').css("display","block");
	// 	$('.black-back').animate({opacity:".8"},500);
	// 	$('.tab-person').animate({top:"10%"},500);
	// });

	/*Close Button*/
	$(document).on( 'click', '.tab-person-header img', function(){
		$('.tab-person').animate({top:"-100%"},500);
		$('.black-back').animate({opacity:"0"},500);
		setTimeout(function(){
			$('.black-back').css("display","none");
		},500);
	} );
	// $('.tab-person-header img').click(function(){
	// 	$('.tab-person').animate({top:"-100%"},500);
	// 	$('.black-back').animate({opacity:"0"},500);
	// 	setTimeout(function(){
	// 		$('.black-back').css("display","none");
	// 	},500);
	// });
});