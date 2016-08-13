(function($) {

    $.fn.knappar = function(options) {

        var settings = $.extend({
            test: 'sup'
        }, options);

        console.log(settings);

        $(this).click(function(e) {
            console.log(e);
            var animateSize;

            var pageX = e.pageX;
            var pageY = e.pageY;

            var elementOffsetX = $(this).offset().left;
            var elementOffsetY = $(this).offset().top;

            var elementWidth = $(this).outerWidth();
            var elementHeight = $(this).outerHeight();

            var elementLeft = "left: " + (pageX - elementOffsetX) + "px;";
            var elementTop = "top: " + (pageY - elementOffsetY) + "px;";

            var elementInject = $('<span />', {
                class: 'knappar-animate',
                style: elementLeft + ' ' + elementTop
            }).appendTo($(this));

            if (elementWidth > elementHeight) {
                animateSize = elementWidth;
            } else {
                animateSize = elementHeight;
            }

            $(this).find('.knappar-animate').each(function(index, element) {
                console.log(index);
                console.log(element);

                $(element).animate({
                    width: animateSize * 3,
                    height: animateSize * 3,
                    left: (pageX - elementOffsetX) - (animateSize * 1.5),
                    top: (pageY - elementOffsetY) - (animateSize * 1.5),
                    opacity: 1
                }, 1000, function() {
                    setTimeout(function(){
                        $(element).fadeOut(1000, function(){
                            $(this).remove();
                        });
                    }, 2000);
                });
            });
        });

        return this;

    };



})(jQuery);
