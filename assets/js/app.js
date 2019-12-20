
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
	new ScrollMagic.Scene({triggerElement: "#slide01"})
	.setTween(".plax", {y: "-35%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".about-bg", {y: "-35%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".tagline", {y: "-100%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".head .logo", {y: "-100%", ease: Linear.easeNone})
	.addTo(controller);

	new ScrollMagic.Scene({triggerElement: "#slide02"})
	.setTween(".aim h3", {y: "-100%", ease: Linear.easeNone})
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

	new ScrollMagic.Scene({triggerElement: "#slide04"})
	.setTween(".plax-x", {x: "-3%", ease: Linear.easeNone})
	.addTo(controller);				

	new ScrollMagic.Scene({triggerElement: "#slide04"})
	.setTween(".plax-x2", {x: "-15%", ease: Linear.easeNone})
	.addTo(controller);			
	new ScrollMagic.Scene({triggerElement: "#slide04"})
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
						$(".tagline").css({
							//transform: 'translate3d(0%, -'+(scroll/200)+'%, 0) scale('+(100 + scroll/4)/100+')',
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
							$(".navbar").addClass('scrolled');
							$(".city").fadeOut();
							$(".tagline").fadeOut();
						} else {
							$(".city").fadeIn();
							$(".navbar").removeClass('scrolled');
							$(".tagline").fadeIn();
						}
					});
				});


(function ($) {




var html = document.documentElement;
var body = document.body;

var scroller = {
  target: document.querySelector("#scroll-container"),
  ease: 0.05, // <= scroll speed
  endY: 0,
  y: 0,
  resizeRequest: 1,
  scrollRequest: 0,
};

var requestId = null;

TweenLite.set(scroller.target, {
  rotation: 0.01,
  force3D: true
});

window.addEventListener("load", onLoad);

function onLoad() {    
  updateScroller();  
  window.focus();
  window.addEventListener("resize", onResize);
  document.addEventListener("scroll", onScroll); 
}

function updateScroller() {
  
  var resized = scroller.resizeRequest > 0;
    
  if (resized) {    
    var height = scroller.target.clientHeight;
    body.style.height = height + "px";
    scroller.resizeRequest = 0;
  }
      
  var scrollY = window.pageYOffset || html.scrollTop || body.scrollTop || 0;

  scroller.endY = scrollY;
  scroller.y += (scrollY - scroller.y) * scroller.ease;

  if (Math.abs(scrollY - scroller.y) < 0.05 || resized) {
    scroller.y = scrollY;
    scroller.scrollRequest = 0;
  }
  
  TweenLite.set(scroller.target, { 
    y: -scroller.y 
  });
  
  requestId = scroller.scrollRequest > 0 ? requestAnimationFrame(updateScroller) : null;
}

function onScroll() {
  scroller.scrollRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}

function onResize() {
  scroller.resizeRequest++;
  if (!requestId) {
    requestId = requestAnimationFrame(updateScroller);
  }
}


}(jQuery));