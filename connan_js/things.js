soundManager.url = '../connan_swfs/';
soundManager.debugMode = false;
soundManager.flashVersion = 9;
soundManager.useFlashBlock = false;
soundManager.useHighPerformance = true;
soundManager.wmode = 'transparent';

$(function(){
	
	mobile = (/iPad|iphone|mobile|pre\//i).test(navigator.userAgent);
	
	if (mobile == false) { 
		$('.button').hide();
	} else {
		$('h1').html("Foo Fighters. <em>Rope.</em>");
	}
	
	// Create Loop
	
	soundManager.onready(function() {
		
		var consumer_key = "J8aFr3h5xyOSkYxsJMYXQ";
		
		/*if (mobile == false) { 
			auto_play = true;
		} else {
			auto_play = false;
		}*/
		 	
		soundManager.createSound({

			autoPlay: !mobile,
			autoLoad: true,
			id: "rope",
			multiShot: false,				
			url: 'http://api.soundcloud.com/tracks/10985476/stream?consumer_key=' + consumer_key,
			volume: 50,
			
			onplay: function() {
				
				if (!mobile) {
				
					$('h1').html("Foo Fighters. <em>Rope.</em>");
				
					$('.button').fadeIn('slow');
				
					$('.play, .pause').toggle();
					
				}
				
			},
			
			onload: function() { },
			
			onfinish: function() {
				
				$('#rope').flip({

					direction: 'rl',
					content: $('.share'),
					color: 'black',
					
					onEnd: function(){
						clip.glue('d_clip_button', 'd_clip_container');
					}

				});
				
			},
			
			whileplaying: function() {
				
				percent = Math.round( this.position / 259232 * 100 );
		
				$('.progress').css('width', percent + '%');
				
			},
			
			whileloading: function() {
				
				percent = Math.round( this.bytesLoaded / this.bytesTotal * 100 );
				
				$('.buffer').css('width', percent + '%');
				
			}

		});
		
	});
	
	$('.button').live('click', function() {
		
		soundManager.togglePause("rope");
		
		$('.play, .pause').toggle();
		
	});
	
	$('.reload').live('click', function() {
		
		soundManager.togglePause("rope");
		
		$("#rope").revertFlip();
		
	});
	
	
	
});