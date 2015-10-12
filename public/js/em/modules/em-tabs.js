/************************************************************

* ========================================================== */
;(function ( $, window, document, undefined )
{
	'use strict';
	var pluginName = 'em-tabs',
		trigger = '.em-tabs',
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
            type: 'nav' //nav , dots , arrows
        };

    function emTabs (element){
        console.log('tabs ready');
		element.find('li').each(function(){
            var self = $(this);
            self.click(function(e){
                e.preventDefault();
                var active = $(this).find('active');
                var data = $(this).data();
                $('.tab-' + data.tab).show().siblings().hide();
                element.find('a').removeClass('active');
                $(this).find('a').addClass('active');
            });
    	});
    }

    $(document).ready(function(){    	
        emTabs($(trigger));
    });

})( jQuery, window, document );