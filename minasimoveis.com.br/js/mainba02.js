/*================================================
[  Table of contents  ]
================================================
	1. jQuery MeanMenu
	2. wow js active
	3. scrollUp jquery active
    4. Nivo Slider 
    5. Price Slider
	6. slick carousel 
    6. tooltip
    7. Service Carousel
    8. Agents Carousel
    9. Testimonial Carousel
    10. Blog Carousel
    11. Brand Carousel
    12. Blog Carousel
    13. counter
    14. Background Toutube Video 
    15. STICKY sticky-header
 
======================================
[ End table content ]
======================================*/


(function ($) {
    "use strict";

    /*-------------------------------------------
        1. jQuery MeanMenu
    --------------------------------------------- */
    jQuery('nav#dropdown').meanmenu();

    /*-------------------------------------------
        2. wow js active
    --------------------------------------------- */
    new WOW().init();

    /*-------------------------------------------
        3. scrollUp jquery active
    --------------------------------------------- */
    //$.scrollUp({
    //    scrollText: '<i class="fas fa-angle-up"></i>',
    //    easingType: 'linear',
    //    scrollSpeed: 900,
    //    animation: 'fade'
    //});


    /* ********************************************
        4. Background Toutube Video 
    ******************************************** */
    if (window.location.href.indexOf('localhost') == -1) {
        var URL = $('#LinkVideoHome').val();

        if (isNullEmptyUndefined(URL))
            URL = "4hIkJELJb-8";

        $(".youtube-bg").YTPlayer({
            //videoURL:"Sz_1tkcU0Co",
            videoURL: URL,
            containment: '.youtube-bg',
            mute: true,
            loop: true,
        });
    }


    /*-------------------------------------------
        4. Nivo Slider
    --------------------------------------------- */
    $('#ensign-nivoslider-3').nivoSlider({
        // effect: 'fade',
        effect: 'random',
        slices: 15,
        boxCols: 8,
        boxRows: 4,
        animSpeed: 500,
        pauseTime: 5000,
        prevText: 'p<br/>r<br/>e<br/>v',
        nextText: 'n<br/>e<br/>x<br/>t',
        startSlide: 0,
        directionNav: true,
        controlNav: true,
        controlNavThumbs: false,
        pauseOnHover: true,
        manualAdvance: false
    });

    /* ********************************************
        5. Price Slider
    ******************************************** */
    //var PrecoDe = $("#Parametros_PrecoDe").val() == "" ? 300000 : parseInt($("#Parametros_PrecoDe").val());
    //var PrecoAte = $("#Parametros_PrecoAte").val() == "" ? 3000000 : parseInt($("#Parametros_PrecoAte").val());
    //$("#Parametros_PrecoDe").val(PrecoDe);
    //$("#Parametros_PrecoAte").val(PrecoAte);

    //$("#slider-range").slider({
    //    range: true,
    //    min: 0,
    //    max: 9000000,
    //    values: [PrecoDe, PrecoAte],
    //    slide: function (event, ui) {
    //        $("#Parametros_PrecoDe").val(ui.values[0]);
    //        $("#Parametros_PrecoAte").val(ui.values[1]);

    //        $("#amount").val("R$" + AddPontos(ui.values[0]) + " ate R$" + AddPontos(ui.values[1]) + " ");
    //        //$("#amount").val("R$" + ui.values[0] + " ate R$" + ui.values[1] + " ");
    //    }
    //});

    //var PrecoDeAluguel = $("#Parametros_PrecoDe").val() == "" ? 1000 : parseInt($("#Parametros_PrecoDe").val());
    //var PrecoAteAluguel = $("#Parametros_PrecoAte").val() == "" ? 5000 : parseInt($("#Parametros_PrecoAte").val());

    //$("#slider-range-aluguel").slider({
    //    range: true,
    //    min: 1000,
    //    max: 5000,
    //    values: [PrecoDeAluguel, PrecoAteAluguel],
    //    slide: function (event, ui) {
    //        $("#Parametros_PrecoDe").val(ui.values[0]);
    //        $("#Parametros_PrecoAte").val(ui.values[1]);

    //        $("#amount").val("R$" + AddPontos(ui.values[0]) + " ate R$" + AddPontos(ui.values[1]) + " ");
    //        //$("#amount").val("R$" + ui.values[0] + " ate R$" + ui.values[1] + " ");
    //    }
    //});

    //$("#amount").val("R$" + $("#slider-range").slider("values", 0) + " ate R$" + $("#slider-range").slider("values", 1) + " ");

    /*************************
        6. tooltip
    *************************/
    $('[data-toggle="tooltip"]').tooltip();

    /*************************
        7. Service Carousel
    *************************/
    $('.service-carousel').slick({
        arrows: false,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 2 } }, // Tablet
            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Large Mobile
            { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } }  // Small Mobile
        ]
    });
    /*************************
        8. Agents Carousel
    *************************/
    $('.agents-carousel').slick({
        arrows: false,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 2 } }, // Tablet
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // Large Mobile
            { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } }  // Small Mobile
        ]
    });

    /*************************
        9. Testimonial Carousel
    *************************/
    $('.testimonial-carousel').slick({
        arrows: false,
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1
    });

    /*************************
        10. Blog Carousel
    *************************/
    $('.blog-carousel').slick({
        arrows: false,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 2,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Tablet
            { breakpoint: 767, settings: { slidesToShow: 1, slidesToScroll: 1 } }, // Large Mobile
            { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } }  // Small Mobile
        ]
    });

    /*************************
        11. Brand Carousel
    *************************/
    $('.brand-carousel').slick({
        arrows: false,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 5,
        slidesToScroll: 4,
        responsive: [
            { breakpoint: 1169, settings: { slidesToShow: 4, slidesToScroll: 3 } }, // Medium Device
            { breakpoint: 991, settings: { slidesToShow: 3, slidesToScroll: 2 } }, // Tablet
            { breakpoint: 767, settings: { slidesToShow: 2, slidesToScroll: 1 } }, // Large Mobile
            { breakpoint: 479, settings: { slidesToShow: 1, slidesToScroll: 1 } }  // Small Mobile
        ]
    });

    /*************************
        12. Blog Carousel
    *************************/
    $('.pro-details-carousel').slick({
        arrows: false,
        dots: false,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 3,
        responsive: [
            { breakpoint: 991, settings: { slidesToShow: 4, slidesToScroll: 3 } }, // Tablet
            { breakpoint: 767, settings: { slidesToShow: 3, slidesToScroll: 2 } }, // Large Mobile
            { breakpoint: 479, settings: { slidesToShow: 2, slidesToScroll: 2 } }  // Small Mobile
        ]
    });

    /*************************
        13. counter
    *************************/
    $('.counter').counterUp({
        delay: 10,
        time: 1000
    });

})(jQuery);

/* ********************************************
    15. STICKY sticky-header
******************************************** */
var hth = $('.header-top-bar').height();
$(window).on('scroll', function () {
    if ($(this).scrollTop() > hth) {
        $('#sticky-header').addClass("sticky");
        $('.headerinfo').show();
        $('#pesquisaCodigo').parent().hide();
    }
    else {
        $('#sticky-header').removeClass("sticky");
        $('.headerinfo').hide();
        $('#pesquisaCodigo').parent().show();
    }
});
/* ********************************************************* */