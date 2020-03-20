$(document).ready(function () {

    var files;
    var filesMas = [];
    var tempFile = $("<div class='file-decorate'><span></span><i></i></div>");
    var fieldFile = $("<input class='input-file' type='file'/>");

    $(".input-file").after(tempFile.clone());

    $("body").on("click", ".file-decorate", function () {
        $(this).prev().trigger("click");
    });

    $("body").on("change", ".input-file", function () {
        console.log("change", tempFile);

        var nameFile = $(this).val().replace(/C:\\fakepath\\/i, '');

        tempFile.find("span").text(nameFile);

        if (!$(this).hasClass("full")) {
            $(this).addClass("full").after(tempFile.clone().addClass("full")).next().after(fieldFile.clone());
        } else {
            $(this).next().find("span").text(nameFile);
        }
    });
    $("body").on("click", ".file-decorate i", function () {

        $(this).parent().prev().remove().end().remove();

    });

    $(".style-select").each(function () {
        var firstElOption = $(this).prev().text();
        $(this).prev().hide();
        var styleSelectBoxElement = $("<div class='custom-select'><span>" + firstElOption + "</span><ul></ul><i></i></div>");

        $(this).before(styleSelectBoxElement).hide();

        $(this).find("option").each(function () {
            var optionText = $(this).text();

            $(this).parent().prev().find("ul").append("<li>" + optionText + "</li>");
        });
    });



    $(".custom-select").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(".custom-select").removeClass("active");
            $(this).addClass("active");
        }
    });

    $("body").on("click", function (evt) {
        if (!$(evt.target).is('.custom-select, .custom-select > *')) {
            $(".custom-select").removeClass("active");
        }
    });
    $(".custom-select").on("click", "li", function () {
        var liIndex = $(this).index();
        $(this).parents(".custom-select").next().find("option").eq(liIndex).prop("selected", true);
        $(this).parents(".custom-select").find("span").text($(this).text());
    });





    $(".close").on("click", function () {
        $(this).parents(".element-show").removeClass("show");

    });

    $(".element-btn").on("click", function (e) {
        e.preventDefault();
        var activeIndex = $(this).attr("data-showEl");
        console.log("obj", activeIndex);
        $("[data-showEl='" + activeIndex + "'].element-show").toggleClass("show");
    });


    var testenVal = 17;
    $(".phone-mask").on("keyup", function () {
        if ($(this).val().length < testenVal) {
            testenVal = 17;
            $(".phone-mask").mask("+7(999)999-99-999", {
                placeholder: " + 7(   )   -  -  "
            });
        } else {
            testenVal = 11;
            $(this).unmask();
            $(".phone-mask").mask("999999999999999999");
        }
    });
});