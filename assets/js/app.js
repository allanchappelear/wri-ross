
$("document").ready(function () {

	var n = $("nav.navbar");
	var pos = n.position();					   
	var body = $("body");
	$(window).scroll(function() {
		var windowpos = $(window).scrollTop();
		if (windowpos >= pos.top ) {
			n.addClass("fixed-top");
			body.addClass('navbar-pad');
		} else {
			n.removeClass("fixed-top");	
			body.removeClass('navbar-pad');
		}
	});


	// Init ScrollMagic

	var controller = new ScrollMagic.Controller({
		globalSceneOptions: {triggerHook: "onEnter", duration: "200%"}});

	// build scenes
	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".plax", {y: "-35%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".about-bg", {y: "-35%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".tagline", {y: "-200%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".head .logo", {y: "-100%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".plax2", {y: "5%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".plax3", {y: "-65%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".plax4", {y: "-80%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#quotes"})
	.setTween(".plax-x", {x: "-3%", ease: Linear.easeNone})
	.addTo(controller);				

	new ScrollMagic.Scene({triggerElement: "#quotes"})
	.setTween(".plax-x2", {x: "-15%", ease: Linear.easeNone})
	.addTo(controller);			
	new ScrollMagic.Scene({triggerElement: "#quotes"})
	.setTween(".plax-x3", {x: "-25%", ease: Linear.easeNone})
	.addTo(controller);				
					//.addIndicators()


					tl1 = new TimelineMax({});

									
					$(window).scroll(function() {
					  var scroll = $(window).scrollTop();
						$(".city").css({
							transform: 'translate3d(0%, -'+(scroll/200)+'%, 0) scale('+(100 + scroll/4)/100+')',
							//Blur suggestion from @janwagner: https://codepen.io/janwagner/ in comments
							//"-webkit-filter": "blur(" + (scroll/200) + "px)",
							filter: "blur(" + (scroll/200) + "px)"
						});
						if(scroll > 500) {
							$(".zoom").css({
							transform: 'translate3d(0%, -'+(scroll/200)+'%, 0) scale('+(100 + scroll/80)/100+')',
							//Blur suggestion from @janwagner: https://codepen.io/janwagner/ in comments
							//"-webkit-filter": "blur(" + (scroll/200) + "px)",
							//filter: "blur(" + (scroll/200) + "px)"
						});
							$(".city").fadeOut();
						} else {
							$(".city").fadeIn();
						}
					});
				});


(function ($) {





}(jQuery));