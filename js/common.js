$(document).ready(function () {
	// old
	// $("#fullpage").fullpage({
	// 	anchors: ['firstPage', 'secondPage', '3rdPage']
	// });


	var st = 0;

	$(window).scroll(function (event) {
		st = $(this).scrollTop();

		if (st > 0) {
			$(".top-banner").removeClass("visible");
			$(".circle-front.top").addClass("visible");

		} else {
			$(".top-banner").addClass("visible");
			$(".circle-front.top").removeClass("visible");
		}

	});
	$(".top-banner .close").on('click', function () {
		$(".top-banner").removeClass("visible");
		$(".circle-front.top").addClass("visible");

	});


	var owl = $('.owl');

	owl.owlCarousel({
		items: 1,
		nav: false,
		dots: true
	});

	var intervalPan
	var masPanTopic = ["Варим", "Жарим", "Парим"];

	function moveIntervalPan() {
		var imgCount = 0;
		intervalPan = setInterval(function () {
			imgCount++;
			if (imgCount == 3) {
				imgCount = 0;
			}
			$(".img-pan").addClass("hidden");
			$(".pan-topic").addClass("hidden");
			setTimeout(function () {
				$(".img-pan").attr("src", "../images/img-pan-" + imgCount + ".svg");
				$(".pan-topic").text(masPanTopic[imgCount]);
			}, 250);
			setTimeout(function () {
				$(".img-pan").removeClass("hidden");
				$(".pan-topic").removeClass("hidden");
			}, 500);
		}, 3000);
	}

	var flagFour = 0;
	var flagFourCount = 0;
	$(".normal-section").on("mousewheel DOMMouseScroll", function (event) {
		var delta = event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0 ? 1 : -1;
		console.log('change', flagFour, flagFourCount);
		if (delta < 0) {

			console.log("up");
			flagFour = 0;
		} else {
			console.log("down");
			if (flagFour == 1) {
				fullpage_api.setAllowScrolling(true);
			}
		}
	});

	new fullpage('#fullpage', {
		//options here
		autoScrolling: true,
		scrollHorizontally: true,
		onLeave: function (origin, destination, direction) {
			console.log('move', destination.index);
			if (destination.index == 3) {
				moveIntervalPan();
			} else {
				setTimeout(function () {
					$(".img-pan").attr("src", "../images/img-pan-0.svg").removeClass("hidden");
					$(".pan-topic").text(masPanTopic[0]);
				}, 400);
				clearInterval(intervalPan);
			}
			if (destination.index == 4) {
				flagFour = 1;
				fullpage_api.setAllowScrolling(false, 'up');

				$(".logo img").attr("src", "../images/logo-black.png");
				$(".ico-mail").addClass("color");
				//return false;
				var lastScrollTop = 0;
				var st = 0;
				var scrollDir;
				$(".normal-section").on("mousewell scroll", function () {

					st = $(this).scrollTop();
					if (st > lastScrollTop) {
						scrollDir = 'down';
					} else {
						scrollDir = 'up';
						if (st == 0) {
							fullpage_api.setAllowScrolling(true);
							$(".logo img").attr("src", "../images/logo.png");
							$(".ico-mail").removeClass("color");
						}
					}
					lastScrollTop = st;
					//console.log('scroll', scrollDir, st);
				});

			} else {
				flagFour = 0;
			}
		}
	});


	var indexEl = 1;
	$(".hover-element").hover(function () {
		indexEl = $(this).data("index");

		$(".chef-" + indexEl).addClass("active");
		$(".chef-description-" + indexEl).addClass("active");
		$(".chef").not(".chef-" + indexEl).addClass("hidden");
		$(".slider").addClass("hidden");
	}, function () {
		$(".chef-" + indexEl).removeClass("active");
		$(".chef-description-" + indexEl).removeClass("active");
		$(".chef").not(".chef-" + indexEl).removeClass("hidden");

		$(".slider").removeClass("hidden");
		console.log('remove-slider');

	});



	$(".circle-front, .circle-content, .products-slider-hidden").on('mouseenter', function () {
		$(".circle-front, .circle-content, .products-slider-hidden").addClass("active");
		$(".products-slider, .slider, .chef-name").addClass("hidden");

	});
	$(".circle-front, .circle-content, .products-slider-hidden").on('mouseleave', function () {
		$(".circle-front, .circle-content, .products-slider-hidden").removeClass("active");
		$(".products-slider, .slider, .chef-name").removeClass("hidden");

	});




	var popupHeight = $(".popup-product-inner").height() - $(window).height() + 250;
	$(".circle-btn").on('click', function () {
		if ($("#fullpage").length > 0) {
			fullpage_api.setAllowScrolling(false);
			var moveCount = 0;
			$(".chef-popup").on("mousewheel DOMMouseScroll", function (event) {

				var delta = event.originalEvent.detail < 0 || event.originalEvent.wheelDelta > 0 ? 1 : -1;
				if (delta < 0) {
					if (moveCount < popupHeight) {
						moveCount = moveCount + 100;
					}

					console.log('2');
				} else {

					if (moveCount > 0) {
						moveCount = moveCount - 100;

					}
				}
				console.log(moveCount);

				$(".chef-popup").stop().animate({
					scrollTop: moveCount
				}, 100)
			});
		}
		//fullpage_api.setLockAnchors(false);
		$(".chef-" + indexEl).addClass("left-centring");
		$(".chef").not(".chef-" + indexEl).addClass("hide-full");
		$(".popup-wrap, .chef-popup-" + indexEl).addClass("show");
		setTimeout(function () {
			$(".slider").addClass("hidden");
		}, 250);
	});
	$(".close-ico").on('click', function () {
		$(".chef").removeClass("left-centring hide-full");
		$(".popup-wrap, .chef-popup").removeClass("show");
		$(".slider").removeClass("hidden");
		if ($("#fullpage").length > 0) {
			fullpage_api.setAllowScrolling(true);
		}
	});

});