
$(function() {

    //if we want any forms to not be submittable twice, add the 'js-disable-on-click' class to any buttons in the form
    //(untested)
    /*
    $('form').submit(function(){
        $(this).find('.js-disable-on-click').attr('disabled','disabled');
    });
    */

    //put here any generic functions for body clicks e.g. dropdowns should disappear
    $('html').click(function(){
        $('.btn-group').removeClass('open'); //button dropdowns
    });

    //button dropdowns
    //note that this should be removed for oscar projects as it will be in the js already
    $('.dropdown-toggle').click(function(e){
        e.stopPropagation();
        e.preventDefault();
        $('.btn-group').removeClass('open');
        $(this).closest('.btn-group').toggleClass('open');
    });

    //initialise tabs
    if($('.js-tabbable').length > 0){
        $('.js-tabbable').find('.nav a').click(function(e){
            var tab = $(this).attr('href');
            if($(tab).length > 0){
                e.preventDefault();
                var parentel = $(this).closest('.nav');
                parentel.find('li').removeClass('active');
                $(this).parent().addClass('active');
                $(tab).closest('.tabwrapper').children('.tabpane').removeClass('active');
                $(tab).addClass('active');
            }
        });
    }

    //alert messages
    $('body').on('click','.alert .close',function(e){
        e.preventDefault();
        $(this).parent().fadeOut();
    });

    //popups
    $('body').on('click','.js-openpopup',function(e){
        e.preventDefault();
        $('.popupwrapper').find('.mask').fadeIn();
        var popup = $(this).attr('data-target'),
            $target = $('.popup[data-id=' + popup + ']'),
            option = 0, //used to detect positioning options
        //if fixed position
            position = $(this).attr('data-position');

        if(position){
            $target.addClass(position);
            option = 1;
        }

        if(!option) {
            var scrolltop = $(window).scrollTop();
            $target.css('top',scrolltop + 50);
        }
        $target.fadeIn().addClass('js-enabledpopup');
    });
    $('body').on('keyup', function(e) {
        if(e.keyCode === 27) {
            popupClose();
        }
    });
    $('.mask').on('click', function(e) {
        popupClose();
    });
    $('.popup').click(function(event){
      event.stopPropagation();
    });
    $('.popup .js-closepopup').click(function(e){
        e.preventDefault();
        popupClose(e);
    });

    function popupClose(e) {
        if(e === undefined) {
            $('.popupwrapper .mask').fadeOut();
            $('.popup.js-enabledpopup').fadeOut();
        } else {
            var $this = $(e.target);
            $('.popupwrapper .mask').fadeOut();
            $this.closest('.popup').fadeOut();
        }
    }

    /* Menu overlay */

    $( '.nav-toggle' ).click(function() {
      $('.menu').toggleClass('closed');
      $('.nav-toggle').toggleClass('closed');
      $('.content').toggleClass('closed');
      $('#wrapper').toggleClass('closed');
    });

    /* Team circles */
    if($('.circle').length) {
        $('.circle').each(function(index) {
            var items = $(this).children();
            for(var i = 0, l = items.length; i < l; i++) {
                items[i].style.left = (50 - 30*Math.cos(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + '%';
                items[i].style.top = (50 + 30*Math.sin(-0.5 * Math.PI - 2*(1/l)*i*Math.PI)).toFixed(4) + '%';
            }
        });

        $('.menu-button').on('click', function(e) {
            e.preventDefault();
            $('.circle').not(this).removeClass('open');
            $(this).prev('.circle').toggleClass('open');
        });
    }

    $('a').on('click touchend', function(e) {
        var el = $(this);
        var link = el.attr('href');
        if(link) {window.location = link;}
    });


});

