/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	'use strict';
	var pluginName = 'em-slider',
		trigger = '.em-slider',
		defaults = {
            speed: 5000,
            delay: 1000,
            start: false,
            direction: 'horizontal',
            effect: 'tween',
            selector: '.slider',
            anchor: 'slide_nav_anchor',
            controls: true,
            resume: true,
            stop: true,
            loop: 0,
            type: 'nav', //nav , dots , arrows
            width: 960,
            height: 360
        },
        build = {            
            shell: function (slider, options) {
                $("<div/>", {
                    'class': "slide_holder"
                }).prependTo(slider);
            },
            nav: function (slider, options) {
                $(slider).animate({
                    top: '+=' + options.height
                }, options.delay);
            }
        },
        actions ={
            up: function (slider, options) {
                $(slider).animate({
                    top: '+=' + options.height
                }, options.delay);
            },
            down: function (slider, options) {
                $(slider).animate({
                    top: '-=' + options.height
                }, options.delay);
            },
            forward: function (slider, options) {
                $(slider).animate({
                    left: '-=' + options.width
                }, options.delay);
            },
            back: function (slider, options) {
                $(slider).animate({
                    left: '+=' + options.width
                }, options.delay);
            },
            move: function (slider, holder, nav, config) {
                var slide_number = nav.find('.' + config.anchor).data('slide');
                var animate_left = -((slide_number * config.width) - config.width),
                    animate_top = -((slide_number * config.height) - config.height);

                var myWidth = (($('body').width() - config.width) / 2);

                if(config.effect == "fade"){
                    holder.find('.slide').fadeOut();
                    holder.find('.slide').eq((slide_number-1)).fadeIn();
                }else{
                    if (config.direction === 'horizontal') {
                        holder.animate({
                            left: animate_left + myWidth
                        }, config.delay, function () {
                            slider.find('.slide_caption').animate({
                                top: 0
                            }, 500, function () {
                                
                            });
                        });
                    } else {
                        holder.animate({
                            top: animate_top + myWidth
                        }, config.delay, function () {
                            slider.find('.slide_caption').animate({
                                top: 0
                            }, 500, function () {
                                
                            });
                        });
                    }
                    $('.slide').removeClass('active').eq((slide_number-1)).addClass('active');
                }
            },
            anchor: function (elem, nav, config) {
                $(elem).parents(config.selector).find("a").removeClass(config.anchor);
                $(elem).addClass(config.anchor);
            },
        };

    function emSlider (element){
        console.log('slider ready');
		element.each(function(){
            var slider = $(this);
            var options =  $.extend(defaults, element.data());
            var slide_count = slider.find('.slide').length;

            build.shell(slider, options);
            var holder = slider.find('.slide_holder');
            if(options.direction === "horizontal"){
                holder.width(slide_count * slider.width());
            }
            $("<div/>", {
                'class': "slide_caption",
                html: $('.slide.active').find('img').attr('alt')
            }).appendTo(slider);
            slider.find('.slide').appendTo(holder);

            var nav_class = '';
            switch(options.type)
            {
            case 'dots':
                nav_class = 'dots';
              break;
            case 'arrows':
                $("<a/>", {
                    href: 'javascript:void(0);',
                    'class': "slide_left",
                    html: '&#8592;'
                }).appendTo(slider);
                $("<a/>", {
                    href: 'javascript:void(0);',
                    'class': "slide_right",
                    html: '&#8594;'
                }).appendTo(slider);
              break;
            default:
                nav_class = 'nav';
                //nav default
            }
            if(options.type !== 'arrows'){
                $("<div/>", {
                    'class': "slide_nav " + nav_class
                }).appendTo(slider);
                var nav = slider.find('.slide_nav');
                for(var i=0;i<slide_count;i++){
                    $("<a/>", {
                        href: 'javascript:void(0);',
                        'class': "slide_nav_item",
                        text: (options.type==="dots") ? '' : (i + 1),
                        'data-slide': (i + 1)
                    }).appendTo(nav);
                }
                $(nav).find('.slide_nav_item').eq($('.slide.active').index()).addClass('slide_nav_anchor');
                slider.find('.slide_nav_item').on('click', function(){   
                    actions.anchor($(this), nav, options);                 
                    actions.move(slider, holder, nav, options);                    
                    slider.find('.slide_caption').animate({
                        top: '-' + slider.find('.slide_caption').height() + 'px'
                    }, 500, function () {
                        slider.find('.slide_caption').html($('.slide.active').find('img').attr('alt'));
                    });
                });
            }else{
                var lazyLeft = parseInt(slider.find(".slide_holder").css('left'));
                var lazy_width = slider.width();
                if (slider.length) {
                    $('.slide_left').on('click', function () {
                        holder.animate({
                            left: '+=' + lazy_width + 'px'
                        }, 500, function () {
                            // Animation complete.
                            var pos = parseInt(slider.find(".slide_holder").css('left'));
                            if (pos === 0) {
                                $('.slide_right').show();
                                $('.slide_left').hide();
                            }else {
                                $('.slide_left').show();
                                $('.slide_right').show();
                            }
                        });
                    });
                    $('.slide_right').on('click', function () {
                        holder.animate({
                            left: '-=' + lazy_width + 'px'
                        }, 500, function () {
                            // Animation complete.
                            var pos = parseInt(slider.find(".slide_holder").css('left'));
                            var rightEdge = -Number((slide_count * slider.width()) - slider.width());
                            if (pos === 0) {
                                $('.slide_right').show();
                                $('.slide_left').hide();
                            } else if(rightEdge >= pos) {
                                $('.slide_right').hide();
                                $('.slide_left').show();
                            }else {
                                $('.slide_left').show();
                                $('.slide_right').show();
                            }
                        });
                    });
                }                    
            }    		
    	});
    }

    $(document).ready(function(){
    	emSlider($(trigger));
    });

})( jQuery, window, document );