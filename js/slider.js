$(document).ready(function () {
  var objWrap = $(".slider-js");
  var objEl = $(".slider-js .item");

  var stopFlag = 1;

  var slider = {
    objWrap: $(".slider-js"),
    objEl: objWrap.find(".item"),
    count: -1,
    maxSize: objEl.length - 1,
    timeAnimation: 750,
    movementFlag: 1,
    increaseCount: function () {
      if (this.maxSize > this.count) {
        this.count++;
      } else {
        this.count = 0;
      }
    },
    decreaseCount: function () {
      if (this.count > 0) {
        this.count--;
      } else {
        this.count = this.maxSize;
      }
    },
    movementNext: function () {
      console.log('next');

      if (stopFlag == 1) {

        this.movementFlag = 1;
        this.increaseCount();
        this.changeSlider();

        objWrap.removeClass("move-right");

        setTimeout(function () {
          stopFlag = 1;
        }, 750);
      }
    },
    movementPrev: function () {
      console.log('prev');

      if (stopFlag == 1) {

        this.movementFlag = 0;
        this.decreaseCount();
        this.changeSlider();

        objWrap.addClass("move-right");

        setTimeout(function () {
          stopFlag = 1;
        }, 750);
      }

    },
    changeSlider: function () {

      stopFlag = 0;
      var pagCount = this.count;
      $(".main-item.active").addClass("active-prev");

      $(".slider-js .pagination span").removeClass("active");
      $(".slider-js .pagination span").eq(pagCount).addClass("active");

      objEl.removeClass("active").eq(this.count).addClass("active");
      console.log("bgnum", this.count);

      $(".products-bg").removeClass("active");
      $(".circle-group").removeClass("active");
      $(".products-bg-" + this.count).addClass("active");

      $(".layer-group").removeClass("active");
      $(".layer-group-" + this.count).addClass("active");
      $(".circle-group-" + this.count).addClass("active");

      if (this.count > 1) {
        $(".chef-layer.group-1").removeClass("active");
        $(".chef-layer.group-2").addClass("active");
      } else {
        $(".chef-layer.group-2").removeClass("active");
        $(".chef-layer.group-1").addClass("active");
      }

      clearTimeout(removeActive);

      var removeActive = setTimeout(function () {

        objEl.removeClass("active-prev");

        //console.log(stopFlag)
      }, this.timeAnimation);
    }
  }

  $(".slider-js .item").each(function () {
    $(".slider-js .pagination").append("<span></span>");
  });



  slider.movementNext();


  $(".arr-next").on("click", function () {
    slider.movementNext();
  });
  $(".arr-prev").on("click", function () {
    slider.movementPrev();
  });

  $(".pagination span").on('click', function () {
    slider.count = $(this).index() - 1;
    slider.movementNext();
  });
});