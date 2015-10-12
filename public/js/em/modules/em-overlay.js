/************************************************************
;(function ( $, window, document, undefined )
{
	var pluginName = "em-overlay",
		version = "1.0",
		trigger = ".em-overlay";

    function emSlider (element){
        console.log('overlay ready');
		element.each(function(){    
            var self = $(this);
            var data = self.data();
            self.click(function(){
                
            });
    	});
    }
    $(document).ready(function(){
    	emOverlay($(trigger));
    });
})( jQuery, window, document );
* ========================================================== */
/************************************************************
Start Framework Script
************************************************************/
/* ==========================================================
* Lynda Overlay Plugin
* ==========================================================
* Copyright 1995�2012 lynda.com, Inc. All rights reserved.
*
* ---------Options:-----------------------------------------
*
*  href: Used for the Ajax and External calls.
*  css_class: Class on the elements that you are wanting to call.
*  title: HTML title attribute if passed the title will appear in a h1 tag inside the overlay.
*  type: Currently supports Image, JSON, File, External, Default
*  element: Name of the hidden element on page you which to show.
*  data_class: Class that is applied to the opened overlay.
*  call: Name of the JSON object on page you which to page to overlay. (currently just supports title, and content)
*  width: Width of overlay
*  height: Height of overlay
*  rounded: Amount to round the corners of the overlay (CSS3)
*  start: auto initialize the overlay?
*  show: Used by show overlay function when javascript is calling the overlay
*  close: Used by close overlay function when javascript is closing the overlay
*
* ---------Usage: (with options)---------------------------
$(document).ready(function () {
$('body').overlay({start: true});
});
* ========================================================== */
function show_overlay(ov, options, callback)
{
	$(ov).show_ov(ov, options, callback);
}
function close_overlay(ov)
{
	$(ov).close_ov(ov);
}
(function ($)
{
	$.fn.extend({
		show_ov: function(ov, options, callback){
    		$(ov).overlay(options, callback);
		},
		close_ov: function (ov, callback)
		{
			$(ov).overlay({ close: true }, callback);
		},
		overlay: function (options, callback)
		{
			var defaults = {
				href: '',
				css_class: 'overlay',
				title: '',
				type: 'regular',
				element: 'overlay',
				data_class: 'my_overlay',
				call: '',
				width: 'user',
				height: 'user',
				max_height: 'user',
				rounded: '7px',
				start: true,
				show: false,
				close: false,
				sticky: false,
				params: '',
				httpMethod: 'GET',
				callback: '',
				hideX : false,
                pass_data: false,
                overlay_data: '',
				bg_close: true
			};
			var is_mobile = function ()
			{
				return (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') ? true : false;
			};
			this.reposition = function ()
			{
				return this.each(function ()
				{
					if ($('.overlay_holder').length)
					{
						$('.overlay_holder').each(function ()
						{
							$('#modal_bg').css({ 'width': $(window).width(), 'height': $(window).height() });
							if (is_mobile())
							{
								$('#modal_bg').css("top", $(window).scrollTop());
							}
							var overlay_top = (((Number($(window).height()) - Number($('#overlay').height())) / 2));
							var overlay_left = (((Number($('body').width()) - Number($('#overlay').width())) / 2));
							overlay_top = (overlay_top < 0) ? 50 : overlay_top;
                            $('#overlay').css({ 'left': overlay_left, 'top': overlay_top + $(window).scrollTop() });
						});
					}
				});
			};
			this.reposition_bg = function ()
			{
				if ($('.overlay_holder').length)
				{
					$('#modal_bg').css({ "top": ($(window).scrollTop()), 'left': $(window).scrollLeft(), "height": ($(window).height() + 30), "width": ($(window).width()) });
				}
			};
			options = $.extend(defaults, options);
			return this.each(function ()
			{
				var o = options,
				outerOverlay = {
					paddingHeight: parseInt($('.overlay_content').css('padding-top')) + parseInt($('.overlay_content').css('padding-bottom')),
					paddingWidth: parseInt($('.overlay_content').css('padding-left')) + parseInt($('.overlay_content').css('padding-right'))
				}

				if (o.start)
				{
					var fob = this;

					if ($('#overlay_frame').length)
					{
						$('#overlay_frame').remove();
					}
					$('<div/>', {
						id: "overlay_frame",
						'class': "overlay_frame"
					}).appendTo('body');
					var i = 1;
					if ($('.overlay').find("img").length)
					{
						$('.overlay').each(function ()
						{
							$(this).find("img").attr('id', 'od_' + i).clone().appendTo("#overlay_frame").attr('id', 'image_od_' + i).attr('class', '');
							i++;
						});
					}

					/*Start Public*/
					fob.init = function (e)
					{
						var ov = $(e);
						var config = {
							href: ov.attr('href'),
							css_class: (ov.attr('data-css-class') !== undefined) ? ov.attr('data-css-class') : o.css_class,
							title: (ov.attr('title') !== undefined) ? ov.attr('title') : o.title,
							type: ov.attr('data-type'),
							element: (ov.attr('data-element') !== undefined) ? ov.attr('data-element') : o.element,
							data_class: (ov.attr('data-class') !== undefined) ? ov.attr('data-class') : o.data_class,
							call: ov.attr('data-call'),
							width: (ov.attr('data-width') !== undefined) ? ov.attr('data-width') : o.width,
							height: (ov.attr('data-height') !== undefined) ? ov.attr('data-height') : o.height,
							max_height: (ov.attr('data-max-height') !== undefined) ? ov.attr('data-max-height') : o.max_height,
							rounded: (ov.attr('data-rounded') !== undefined) ? ov.attr('data-rounded') : o.rounded,
							params: (ov.attr('data-params') !== undefined) ? ov.attr('data-params') : o.params,
							httpMethod: (ov.attr('data-httpMethod') !== undefined) ? ov.attr('data-httpMethod') : o.httpMethod,
							callback: (ov.attr('data-callback') !== undefined) ? ov.attr('data-callback') : o.callback,
                            hideX: (ov.attr('data-hidex') !== undefined) ? ov.attr('data-hidex') : o.hideX,
                            pass_data: (ov.attr('data-pass_data') !== undefined) ? ov.attr('data-pass_data') : o.pass_data,
                            overlay_data: (ov.attr('data-overlay_data') !== undefined) ? ov.attr('data-overlay_data') : o.overlay_data,
                            bg_close: (ov.attr('data-bg_close') !== undefined) ? ov.attr('data-bg_close') : o.bg_close
						};
                        add_bg(config, ov);
						add_content(e, config, ov);
					};
					fob.reposition = function ()
					{
						if ($('.overlay_holder').length)
						{
							$('.overlay_holder').each(function ()
							{
								$('#modal_bg').css({ 'width': '100%', 'height': document.body.clientHeight });
								var overlay_top = (((Number($(window).height()) - Number($('#overlay').height())) / 2));
								var overlay_left = (((Number($('body').width()) - Number($('#overlay').width())) / 2));
								overlay_top = (overlay_top < 0) ? 50 : overlay_top;
								$('#overlay').css({ 'left': overlay_left, 'top': overlay_top + $(window).scrollTop() });
							});
						}
					};
					fob.reposition_bg = function ()
					{
						if ($('.overlay_holder').length)
						{
							$('#modal_bg').css({ "top": ($(window).scrollTop()), 'left': $(window).scrollLeft(), "height": ($(window).height() + 30), "width": ($(window).width()) });
						}
					};
					/*End Public*/
					/*Start Private*/
					var is_mobile = function ()
					{
						return (navigator.platform == 'iPad' || navigator.platform == 'iPhone' || navigator.platform == 'iPod') ? true : false;
					};
					var add_content = function (e, config, ov)
					{
						if ($('#overlay').length)
						{
							$('#overlay').remove();
						}
						if ($('#overlay_bar').length)
						{
							$('#overlay_bar').remove();
						}

						var overlay_padding = $('#' + config.element).css('padding'),
                            overlay_height = (($('#' + config.element).height() === 0) ? 'auto' : $('#' + config.element).height()),
                            overlay_width = (($('#' + config.element).width() === 0) ? 'auto' : $('#' + config.element).width()),
                            content_html = '';
						$('<div/>', {
							id: "overlay",
							'class': "overlay_holder new_overlay " + config.data_class
						}).prependTo('body');
						var total_width = ((config.width == 'user') ? overlay_width : config.width),
                            total_height = ((config.height == 'user') ? overlay_height : config.height),
                            overlay_top = (((Number($(window).height()) - Number(total_height)) / 2)),
                            overlay_left = (((Number($('body').width()) - Number(total_width)) / 2));
						    total_height = ((config.max_height != 'user' && total_height > config.max_height) ? config.max_height : total_height);
						if (total_width >= ($(document).width() - 50))
						{
							total_width = (Number($('body').width()) - 100);
							total_height = 'auto';
							overlay_top = 50;
						} else if (total_height >= ($(window).height() - 50))
						{
							overlay_top = 50;
						}
						$('<div/>', {
							id: "overlay_bar",
							'class': "overlay_bar",
							html: !config.hideX ? '<a class="overlay_close"></a>' : ''
						}).prependTo("#overlay");
						switch (config.type)
						{
							case 'image':
								$('#overlay').css({ 'width': 'auto', 'height': 'auto' });
								var src = $(e).find('img').attr('src'),
                                    image_id = $(e).find('img').attr('id'),
                                    width = $('#image_' + image_id).width(),
                                    height = $('#image_' + image_id).height();
								    total_width = width;
								    total_height = height;
								    overlay_top = (((Number($(window).height()) - Number(height)) / 2));
								    overlay_left = (((Number($('body').width()) - Number(width)) / 2));

								if (width >= ($(document).width() - 100))
								{
									total_width = (Number($('body').width()) - 100);
									total_height = 'auto';
									overlay_top = 50;
								} else if (height >= ($(window).height() - 100))
								{
									overlay_top = 50;
									total_width = 'auto';
								}
								$('<div id="overlay_image_content" class="overlay_content"><img src="' + src + '" width="' + total_width + '" height="' + total_height + '" alt="' + config.title + '" style="height: ' + total_height + '' + ((total_height == "auto") ? '' : 'px') + ';width: ' + total_width + '' + ((total_width == "auto") ? '' : 'px') + ';" alt="" /></div>').insertAfter('#overlay_bar');
								if (config.title !== "")
								{
									$('<div class="overlay_caption"><h1>' + config.title + '</h1></div>').appendTo('.overlay_content');
									$('.overlay_caption').fadeTo("slow", 0.60);
								}
								$('#overlay').hide().fadeTo("slow", 1).show().css({ 'left': overlay_left }).width((Number(total_width) + overlay_padding));
								$('#overlay').css('top', overlay_top + $(window).scrollTop());
								break;
							case 'json':
								$('#overlay').append('<div class="overlay_content">' + ((window[config.call].title !== "") ? '<h1>' + window[config.call].title + '</h1>' : '') + '' + window[config.call].content + '</div>');
								show_overlay(ov, overlay_top, overlay_left, total_width, total_height, config);
								break;
							case 'file':
								$.ajax({
									dataType: "text",
									url: config.href,
									success: function (data)
									{
										$('#overlay').html('<div class="overlay_content">' + data + '</div>');
										show_overlay(ov, overlay_top, overlay_left, total_width, total_height, config);
									}
								});
								break;
							case 'external':
								var newObj = {},
                                    branch = config.params.split(',');
								for (var i = 0; i < branch.length; i++)
								{
									var item = branch[i].split(':');
									newObj[item[0]] = item[1];
								}
								$.ajax({
									type: config.httpMethod,
									url: config.href,
									data: newObj,
									success: function (data)
									{
                                        if(config.pass_data){
                                            config.overlay_data = data;
                                        }
										if ($('#overlay').find(".overlay_content").length)
										{
											$('#overlay').find(".overlay_content").remove();
										}
										$('#overlay').append('<div class="overlay_content">' + data + '</div>');
										show_overlay(ov, overlay_top, overlay_left, total_width, total_height, config);
									}
								});
								break;
							default:
								$('#overlay').append('<div class="overlay_content">' + ((config.title !== "") ? '<h1>' + config.title + '</h1>' : '') + '' + '</div>');
                                //$('#' + config.element).detach().appendTo('.overlay_content');
                                $('.overlay_content').html($('#' + config.element).html());
                                $('.overlay_content').find('.overlay_holder').show().css('position', 'relative').css('margin','0');
								if (total_height < config.max_height)
								{
									total_height = 'auto';
								}
								show_overlay(ov, overlay_top, overlay_left, total_width, total_height, config);
						}
						add_rounded(config.rounded);
						add_shadow('5px 5px 5px', '#666666');

						$('.overlay_close').on('click', function () {
							close();
						});
					};
					var add_rounded = function (amount)
					{
						$('#overlay').css({ '-moz-border-radius': amount, '-webkit-border-radius': amount, 'border-radius': amount, '-khtml-border-radius': amount });
					};
					var add_shadow = function (shadow_size, shadow_color)
					{
						$('#overlay').css({ '-moz-box-shadow': '' + shadow_size + ' ' + shadow_color + '', '-webkit-box-shadow': '' + shadow_size + ' ' + shadow_color + '', 'box-shadow': '' + shadow_size + ' ' + shadow_color + '' });
					};
					var add_bg = function (config, ov)
					{
						if ($('#modal_bg').length > 0)
						{
							$('#modal_bg').remove();
						}
						if (is_mobile())
						{
							$('#modal_bg').css("top", $(window).scrollTop());
						}
						$('<div/>', {
							id: "modal_bg",
							'class': "modal_bg spinner",
							css: {
								'width': '100%',
								'height': document.body.clientHeight
							}
						}).appendTo("body");
						$('#modal_bg').fadeTo('fast', '0.50');
						
						if (config.bg_close) 
						{
							$('#modal_bg').on('click', function ()
							{
								close();
							});
						}
					};
					var show_overlay = function (ov, overlay_top, overlay_left, total_width, total_height, config)
					{
						var finalHeight = parseInt(total_height) + parseInt(outerOverlay.paddingHeight);
						var finalWidth = parseInt(total_width) + parseInt(outerOverlay.paddingWidth);
						$('#overlay').hide().fadeTo("slow", 1).show().css({ 'left': overlay_left, 'width': finalWidth, 'min-height': finalHeight });
						$('#overlay').css('top', overlay_top + $(window).scrollTop());
						$('.modal_bg').removeClass('spinner');
						$("body").trigger("show_overlay");
						if (typeof (callback) === 'function')
						{
							callback(config.overlay_data, ov);
						} else if (config.callback)
						{
							window[config.callback](config.overlay_data, ov);
						}

						fob.reposition();
					};
					var close = function ()
					{
						$('#overlay').fadeOut();
						$('#modal_bg').hide();
						$("body").trigger("close_overlay");
						$('body').overlay({ start: true });
					};
					if(o.css_class){
						$(document).ready(function ()
						{
							$(document).off('click.init').on('click.init', '.' + o.css_class, function ()
							{
								fob.init($(this));
								return false;
							});
						});
                    }
					if (o.sticky)
					{
						$(window).resize(function ()
						{
							fob.reposition();
						});
						$(window).scroll(function ()
						{
							fob.reposition();
						});
					} else
					{
						fob.reposition_bg();
					}
					if (o.show)
					{
						fob.init($(this));
					} else if (o.close)
					{
						close();
					}
					/*End Private*/
				}
			});
		}
	});
	$(document).ready(function ()
	{
		console.log('overlay ready');
		$('body').overlay({ start: true });
	});
})(jQuery);
