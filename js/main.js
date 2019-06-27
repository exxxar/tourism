function autoactiveShopTab(){
    if ($(".tab").length==0)
        return;

    $(".section-6 .content").css({"display": "none"});
    var hash = window.location.hash;
    if (hash!="") {
        $(".tab").removeClass("active");
        $(hash).addClass("active");
        $(".tab a[href='"+hash+"']").parent().addClass("active");
        $(hash).css({"display": "flex"});
        $([document.documentElement, document.body]).animate({
            scrollTop: $(hash).offset().top
        }, 1000);
        return;
    }
    $(".section-6 .content#part1").css({"display":"flex"});

}

function moveSlide(forward){
    var hash = window.location.hash;

    console.log($("#part1"));
    if (hash==""&&$("#part1").length!=0)
        hash = "#part1";

    var imgCount = parseInt($(`${hash} .gallery img`).length);

    if ($(`${hash} .gallery`).attr("data-current")==undefined )
        $(`${hash} .gallery`).attr({"data-current":"1"});

    var current = parseInt($(`${hash} .gallery`).attr("data-current"));

    $(".section-modal-picture .center").empty();

    if (forward)
        current = current+1<=imgCount?++current:1;
    else
        current = current-1>=1?--current:imgCount;

    console.log(current);


    var url =$(`${hash} .gallery img`)[current-1].src;

    console.log(url);

    $(`${hash} .gallery`).attr({"data-current":current});
    $(".section-modal-picture .center").append(`<img src='${url}'>`);
}

function sliderTravelInit(){
    var slideCount = $(".section-slider .slider li").length;
    $(".section-slider .slider").attr({"data-active":"1"});
    $(".section-slider .slider li").css({"display":"none"});
    $(".section-slider .slider li.active").css({"display":"flex"});
    $(".slider + .controlls ul").empty();
    for(var i=0;i<slideCount;i++){
        $(".slider + .controlls ul").append(`<li data-index='${i+1}'></li>`);
    }

    $(".slider + .controlls ul li:nth-child(1)").addClass("active");
}

function moveSlideGid(forward){
    var slidesCount = $(".slider-container ul li").length;
    if ( $(".slider-container ul").attr("data-active")==undefined||
        $(".slider-container ul").attr("data-active")=="") {
        $(".slider-container ul").attr({"data-active": "1"});
    }

    var current = parseInt($(".slider-container ul").attr("data-active"));
    var margin = 0;

    console.log(current);

    if (forward) {
        current = current + 1 <= slidesCount ? ++current : 1;

    }
    else {
        current = current - 1 >= 1 ? --current : slidesCount;

    }

    switch(current){
        case 1: margin=-1800; break;
        case 2: margin=0; break;
        case 3: margin=1800; break;
    }

    $(".slider-container ul").attr({"data-active": current});
    $(".slider-container ul").css({"margin-left":margin+"px"});

    $("#for-title").html($(".slider-container ul li:nth-child("+current+") .info h3").html());
    $("#for-description").html($(".slider-container ul li:nth-child("+current+") .info p").html());
}

function changeSlideTravel(el){
    console.log(el.attr("data-index"));
    var index = parseInt(el.attr("data-index"));

    $(".section-slider .slider").attr({"data-active":index});
    $(".section-slider .slider li").css({"display":"none"});
    $(".section-slider .slider li").removeClass("active");
    $(".section-slider .slider li:nth-child("+index+")").css({"display":"flex"});
    $(".section-slider .slider li:nth-child("+index+")").addClass("active");

    $(".slider + .controlls ul li").removeClass("active");
    $(".slider + .controlls ul li:nth-child("+index+")").addClass("active");
}

function moveSlideTravel(forward) {
    var slidesCount = $(".section-slider .slider li").length;

    console.log(slidesCount);
    var current = parseInt($(".section-slider .slider").attr("data-active"));

    if (forward)
        current = current+1<=slidesCount?++current:1;
    else
        current = current-1>=1?--current:slidesCount;

    $(".section-slider .slider").attr({"data-active":current});
    $(".section-slider .slider li").css({"display":"none"});
    $(".section-slider .slider li").removeClass("active");
    $(".section-slider .slider li:nth-child("+current+")").css({"display":"flex"});
    $(".section-slider .slider li:nth-child("+current+")").addClass("active");

    $(".slider + .controlls ul li").removeClass("active");
    $(".slider + .controlls ul li:nth-child("+current+")").addClass("active");
}

$(document).ready(function () {
    autoactiveShopTab();
    sliderTravelInit();

    $(".open-tab").click(function(){
        var tab = $(this).attr("href");

        $(".open-tab").removeClass("btn-black").addClass("btn-white");
        $(this).removeClass("btn-white").addClass("btn-black");

        $(".open-tab").each(function (a,b) {
            var href = $(b).attr("href");
            $(href).css({"display":"none"});
        });

        $(tab).css({"display":"flex"});
    });

    $(".section-gid img").click(function(){
        console.log("test");
    });
    $(".part-left").click(function(){
        moveSlideGid(1);
    });

    $(".part-right").click(function(){

        moveSlideGid(0);


    });

    $(".section-slider .arrow-left").click(function () {
        moveSlideTravel(0);
    });

    $(".section-slider .arrow-right").click(function () {
        moveSlideTravel(1);
    });

    $(document).on("click",".slider + .controlls ul li",function(){
        changeSlideTravel($(this));
    });

    $(".tab").click(function () {
        $(".tab").removeClass("active");
        $(this).addClass("active");
        var content = $(this).find("a").attr("href");
        $(".section-6 .content").css({"display":"none"});
        $(content).css({"display":"flex"});
        $([document.documentElement, document.body]).animate({
            scrollTop: $(content).offset().top
        }, 1000);
    });

    $('[name="phone"]').mask('(000) 000-00-00');
    $('[name="vk"]').mask('https://vk.com/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', {'translation': {
        A: {pattern: /[A-Za-z0-9]+/}
    }
    });

    $(".gallery img").click(function(){
       $(".section-modal-picture").css({"display":"block"});
        var url =$(this).attr("src");
        $(".section-modal-picture .center").empty();
        $(".section-modal-picture .center").append(`<img src='${url}'>`);
    });


    $(".section-modal-picture .close-modal").click(function () {
        $(".section-modal-picture").css({"display":"none"});
    });

    $(document).on("click",".section-modal-picture img",function () {
            $(".section-modal-picture .close-modal").click();

    });

    $(".arrow-right span").click(function(){
        moveSlide(1);
    });

    $(".arrow-left span").click(function(){
        moveSlide(0);
    });

    $(".section-modal form input[type='submit']").click(function (e) {
        e.preventDefault();
        var formData = $(".section-modal form").serialize();
        console.log(formData);
        $.post("/mail.php",{
            data:formData
        }).then(function (a,b) {
            $(".close-modal").click();
        });
    });

    $(".humburger").click(function () {
        if ($(this).hasClass("open")) {
            $(".main-menu").removeClass("mobile-menu");
            $(".humburger").removeClass("open");
            document.body.style.overflowY = 'scroll';

        } else {
            $(".main-menu").addClass("mobile-menu");
            $(".humburger").addClass("open");
            document.body.style.overflowY = 'hidden';

        }
    });

    $(".open-modal").click(function(){
        document.body.style.overflow = 'hidden';
        var id = $(this).attr("href");
        $(id).addClass("open");
        $(".request").css({"display":"flex"});
        $(".license").css({"display":"none"});

    });

    $(".open-modal.policy").click(function(){
        $(".request").css({"display":"none"});
        $(".license").css({"display":"flex"});
    });

    $(".section-modal .close-modal").click(function(){
        document.body.style.overflow = 'scroll';
        $(".section-modal").removeClass("open");
    });

    $(".open-license").click(function(){
        $(".request").css({"display":"none"});
        $(".license").css({"display":"flex"});
    })

    $(".license").click(function () {
        $(".request").css({"display":"flex"});
        $(".license").css({"display":"none"});
    });

    $(document).scroll(function () {
        if ($(".humburger").hasClass("open")) {
            $(".main-menu").removeClass("mobile-menu");
            $(".humburger").removeClass("open");
        }
    });

    $(".arrow").click(function() {
        $([document.documentElement, document.body]).animate({
            scrollTop: $(".section-2,.section-6").offset().top
        }, 2000);
    });
});