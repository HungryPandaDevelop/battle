if ($("#map").length > 0) {
    ymaps.ready(function () {
        var massCoord = [];
        $(".contacts-address-line").each(function (index) {
            var oneCoordX = $(this).data("coord-x");
            var oneCoordY = $(this).data("coord-y");
            var oneCord = [];
            oneCord.push(oneCoordX, oneCoordY, (index + 1))
            massCoord.push(oneCord);
        });

        var masMark = massCoord;
        // console.log("masMark", masMark);
        var myMap = new ymaps.Map('map', {
            center: [masMark[0][0], masMark[0][1]],
            zoom: 9
        });


        var myPlacemarkWithContent = [];
        for (var i = 0; i < masMark.length; i++) {
            var addressEl = $("#address-" + i);
            var addressImg = addressEl.find(".photo-address").attr("src");
            var addressPhone = addressEl.find(".phone-feedback").html();
            var addressText = addressEl.find(".address").html();




            BalloonContentLayout = ymaps.templateLayoutFactory.createClass(
                '<div class="box-map">' +
                '<img scr="' + addressImg + '">' +
                '<div class="box-map-content"><div>' + addressText + '</div>' +
                '<div>' + addressPhone + '</div>' +
                '</div></div>');

            var x = masMark[i][0];
            var y = masMark[i][1];

            // console.log("for", x, y);

            myPlacemarkWithContent[i] = new ymaps.Placemark([x, y], {
                id: i + 1,
                hintContent: 'Собственный значок метки с контентом',
                balloonContent: 'А эта — новогодняя'
            }, {
                balloonContentLayout: BalloonContentLayout,
                // Опции.
                // Необходимо указать данный тип макета.
                hideIconOnBalloonOpen: false,
                iconLayout: 'default#imageWithContent',
                // Своё изображение иконки метки.
                iconImageHref: '../images/map-marker.svg',
                // Размеры метки.
                iconImageSize: [30, 37],
                // Смещение левого верхнего угла иконки относительно
                // её "ножки" (точки привязки).
                iconImageOffset: [-15, -37],
                // Смещение слоя с содержимым относительно слоя с картинкой.
                iconContentOffset: [15, 37] //,
                // Макет содержимого.
                //iconContentLayout: MyIconContentLayout
            });
            myMap.geoObjects
                .add(myPlacemarkWithContent[i]);

            myMap.setBounds(myMap.geoObjects.getBounds(), {
                checkZoomRange: true
            }).then(function () {
                if (myMap.getZoom() > 12) myMap.setZoom(12);
            });

            //});

        }





        $(".contacts-address .link").on("click", function (e) {
            e.preventDefault();
            var itemIndex = $(this).parents(".contacts-address-line").data("index");
            $("html,body").animate({
                scrollTop: $('.map').offset().top
            }, 1000);

            console.log("forCenter", [masMark[itemIndex][0], masMark[itemIndex][1]]);


            myMap.setCenter([masMark[itemIndex][0], masMark[itemIndex][1]]);

            myPlacemarkWithContent[itemIndex].balloon.open();
        });




    });
}