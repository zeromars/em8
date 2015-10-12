/************************************************************
em-filter-nav
em-filter-content
* ========================================================== */
;(function ( $, window, document, undefined )
{
	'use strict';
	var pluginName = 'em-filters',
		trigger = '.em-filters',
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

    function emFilters (element){
        console.log('filters ready');
		element.find('.em-filter-nav a').each(function(){
            var self = $(this);
            var data = self.data();

            self.click(function(e){
                e.preventDefault();
                element.find('.em-filter-nav a').removeClass('active');
                self.addClass('active');
                
                var str = data.group;
                var regex = new RegExp(data.group, 'gi');
                var patt = str.match(regex);
                $(".em-filter-content a[data-group^='"+data.group+"']").show();

                $(".em-filter-content a").each(function(){
                    if($(this).data('group').match(regex)){                        
                        $(this).show();
                    }else{
                        $(this).hide();
                    }
                });

            });
    	});
    }

    $(document).ready(function(){    	
        emFilters($(trigger));
    });

})( jQuery, window, document );