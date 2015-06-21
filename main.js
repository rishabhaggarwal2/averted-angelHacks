$(document).ready(function(){
	//AKshay
	var country;
	var list = {};
	var missing = 0;
	var found = 0;
	resetNums();
	$("#search").keydown(function(e){
		console.log(e.which);
		if(e.which){
			$(".people").html("");
			if($("#search").val().length > 0){
				var comp = $("#search").val();
				$.each(list, function(index, arr){
					if((arr['name']).toLowerCase().search(comp) > -1){
						img = "uploads/" + arr['image_name'];
						if(img == "uploads/" + "")
							img = "1.jpg";
						$(".people").html($(".people").html() + '<div class="people-card '+arr['status']+'" id="'+(arr['id']-1)+'"><img src="'+img+'"><div class="text-wrapper"><p><b>'+arr['name']+'</b></p><p>Status : '+arr['status']+'</p></div></div>');
					}
				});
			}else{
				$.each(list, function(index, arr){
					// if((arr['name']).toLowerCase().search(comp) > -1){
						img = "uploads/" + arr['image_name'];
						if(img == "uploads/" + "")
							img = "1.jpg";
						$(".people").html($(".people").html() + '<div class="people-card '+arr['status']+'" id="'+(arr['id']-1)+'"><img src="'+img+'"><div class="text-wrapper"><p><b>'+arr['name']+'</b></p><p>Status : '+arr['status']+'</p></div></div>');
					// }
				});
			}
		}
	});
	//$("#sss").ajaxForm(function(){alert(":D")});
	$("#cake").on('submit',function(e){
		e.preventDefault();
		str = $("#fil2").val();
		var pieces = str.split(/[\s,]+/);
		alert(pieces[pieces.length-1]);
	});
	$("#sss").on('submit',(function(e) {
	missing++;
	resetNums();
	e.preventDefault();
	// $("#message").empty();
	// $('#loading').show();
	console.log("asd");
	formd = new FormData(this);
	formd.append("loc", country);
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
		formd.append("key", '3374fa58c672fcaad8dab979f7687397');
		formd.append("action", 'upload');
		$.ajax({
	url: "http://ultraimg.com/api/1/post/", // Url to which the request is send
	type: "POST",             // Type of request to be send, called as method
	data: formd, // Data sent to server, a set of key/value pairs (i.e. form fields and values)
	contentType: false,       // The content type used when sending data to the server.
	cache: false,             // To unable request pages to be cached
	processData:false,        // To send DOMDocument or non processed data file it is set to false
	success: function(data)   // A function to be called if request succeeds
	{
		console.log(data);
	},
	
	});
		console.log(data);
		var client = new FCClientJS("af0351596bba4065b1b00785a4f3ecf4", "879cb3ac7e324d3a8ca15d68ed586f54");
		var options = new Object();
		options.detect_all_feature_points = true;
		options.namespace = "thukral";
		var person = $.parseJSON(data);
		/*client.facesDetect(, null, options, function(data){
			console.log("detected");
			var tid = data.photos[0].tags[0].tid;
			client.tagsSave(tid, person[1]+"@thukral", options, function(){
				console.log("tagSaved");
				client.facesTrain(person[1]+"@thukral", options, function(){
					console.log("done");
				});
			});
		});*/
		$('.tab-rm').animate({top:"-100%"},500);
		$('.black-back').animate({opacity:"0"},500);
		setTimeout(function(){
			$('.black-back').css("display","none");
		},500);
		$(".people").html("");
		$.post("persons.php",{input: "getpersons", loc: country}, function(data){
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
					resetNums();
		});
		$("input").val("");
		$("#rm-in").val("setpersons");
	// $('#loading').hide();
	// $("#message").html(data);
	}
	});
	}));
	$.post("location.php",{input: "getmapdata"}, function(data, status){
		var ar = $.parseJSON(data);
		// console.log(ar);
    	$("#country").html(ar[0]['name']);
    	$("#date").html(ar[0]['date']);
    	country = ar[0]['name'];	
    	// alert(country);
    	$.post("persons.php",{input: "getpersons", loc: country}, function(data){
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
				if(status == "safe" || status == "injured" || status == "deceased")
					found++;
				else
					missing++;
				resetNums();
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
	$('#adv').click(function(){
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
		console.log($(this));
		$('#tab-name').html(list[id]['name']);
		$('#safe').attr('peep', id);
		$('#injured').attr('peep', id);
		$('#deceased').attr('peep', id);
		$('#tab-phone').html("Phone: "+list[id]['phone']);
		$('#tab-status').html("Status: "+list[id]['status']);
				img = "uploads/" + list[id]['image_name'];
				if(img == "uploads/" + "")
					img = "1.jpg";
				$("#tab-img").attr("src", img);
	} );

    $(document).on('click', '#safe', function(){
    	r = confirm("Are you sure?");
    	if(r == true){
    		// alert("updated : "+$(this).attr('peep'));
    		found++;
    		missing--;
    		resetNums();
    		idd = $(this).attr('peep');
    		idd = parseInt(idd) + 1;
    		// alert(idd);
    		$.post("persons.php",{input:'update', id: idd, status: 'safe'}, function(data){
    			// alert(data);
    			$('.tab-person').animate({top:"-100%"},500);
				$('.black-back').animate({opacity:"0"},500);
				setTimeout(function(){
					$('.black-back').css("display","none");
				},500);
				$(".people").html("");
				$.post("persons.php",{input: "getpersons", loc: country}, function(data){
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
					resetNums();
				});
    		});
    	}
    });
	$(document).on('click', '#injured', function(){
    	r = confirm("Are you sure?");
    	if(r == true){
    		// alert("updated : "+$(this).attr('peep'));
    		found++;
    		missing--;
    		resetNums();
    		idd = $(this).attr('peep');
    		idd = parseInt(idd) + 1;
    		// alert(idd);
    		$.post("persons.php",{input:'update', id: idd, status: 'injured'}, function(data){
    			// alert(data);
    			$('.tab-person').animate({top:"-100%"},500);
				$('.black-back').animate({opacity:"0"},500);
				setTimeout(function(){
					$('.black-back').css("display","none");
				},500);
				$(".people").html("");
				$.post("persons.php",{input: "getpersons", loc: country}, function(data){
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
					resetNums();
				});
    		});
    	}
    });
	$(document).on('click', '#deceased', function(){
    	r = confirm("Are you sure?");
    	if(r == true){
    		// alert("updated : "+$(this).attr('peep'));
    		found++;
    		missing--;
    		idd = $(this).attr('peep');
    		idd = parseInt(idd) + 1;
    		// alert(idd);
    		$.post("persons.php",{input:'update', id: idd, status: 'deceased'}, function(data){
    			// alert(data);
    			$('.tab-person').animate({top:"-100%"},500);
				$('.black-back').animate({opacity:"0"},500);
				setTimeout(function(){
					$('.black-back').css("display","none");
				},500);
				$(".people").html("");
				$.post("persons.php",{input: "getpersons", loc: country}, function(data){
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
					resetNums();
				});
    		});
    	}
    });
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

	function resetNums(){
		var mis = $("#missing").html(missing);
		var fou = $("#found").html(found);
	}
	// $('.tab-person-header img').click(function(){
	// 	$('.tab-person').animate({top:"-100%"},500);
	// 	$('.black-back').animate({opacity:"0"},500);
	// 	setTimeout(function(){
	// 		$('.black-back').css("display","none");
	// 	},500);
	// });
});