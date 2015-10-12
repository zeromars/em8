var em8 = (function(exports){
    var exports = {
        version: 1
    };
    exports.panes = {
    };
    exports.urls = {
    };
    exports.regex = {
    };
    exports.start = function(){
        var doc = $(document);
        console.log('em8 stating');
        $('.page-link').each(function(index){
            var self = $(this);
            var data = self.data();
            $(this).click(function(){
                $('.page').hide();
                $('.' + data.page + '-page').show();
            });
        });
    };
    return exports;
}(em8 || {}));

$(document).ready(function(){
    em8.start();
});
