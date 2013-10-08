(function (factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {

    'use strict';

    var pluginName = 'shuffleString',

        defaults   = {
            'animationSpeed': 50,
            'sliderDuration': 4000,
            'loop': true
        };

    /**
     * @constructor
     *
     * @param {Object} element The element
     * @param {Object} options The options
     */
    function Plugin (element, options) {
        this.element = element;

        this.settings = $.extend({}, defaults, options);
        this._defaults = defaults;
        this._name = pluginName;

        this._interval = null; // the interval to random string
        this.isRunning = false; // the state of the shuffle

        this.init();
    }

    Plugin.prototype = {

        /**
         * Initialize the plugin.
         */
        init: function () {
            this._initShuffle();
        },

        /**
         * Shuffles a string.
         *
         * @param  {Object} element The current element
         * @private
         */
        shuffleString: function(element) {

            var originalString = element.attr('data-shuffle-data').split(''),
                tempArray = [],
                start = 0;

            this.interval = setInterval($.proxy(function () {
                var finalString = '';

                this.isRunning = true;

                tempArray.push(originalString[start]);
                finalString += tempArray.join('') + this.cycleChars(originalString.join(''), start, originalString.length);

                if (start >= originalString.length) {
                    this.isRunning = false;

                    element.html(originalString.join(''));
                    clearInterval(this.interval);
                }

                start++;
                element.html(finalString);

            }, this), this.settings.animationSpeed);
        },

        /**
         * Cycles a given string.
         *
         * @param  {String}  string The string to be randomized
         * @param  {Integer} begin  The offset of the string to be randomized
         * @param  {Integer} end    The limit of the string to be randomized
         * @return {String}         A randomized string
         * @private
         */
        cycleChars: function (string, begin, end) {

            var chars = 'abcdefghijklmnopqrstuvwxyz0123456789 ';

            return chars.split('').sort(function() {
                    return 0.2 - Math.random();
                }).join('').slice(begin, end);
        },

        /**
         * Init all the stuff for the correspective type.
         *
         * @private
         */
        _initShuffle: function () {

            var $el = $(this.element).find('[data-shuffle-type]'),
                i = 0, len;

            for (i, len = $el.length; i < len; i += 1) {

                var element = $($el[i]);

                if(element.attr('data-shuffle-data')) {

                    if (element.attr('data-shuffle-type') === 'hover') {
                        element.on('mouseenter',  $.proxy(this._stringHoverHandler, this));
                        element.on('mouseout',  $.proxy(this._stringOutHandler,this));
                    } else if (element.attr('data-shuffle-type') === 'slide') {

                        var current = element, // to get the correct element

                            interval = setInterval($.proxy(function () {

                                if (this.settings.loop) {
                                    if(current.attr('data-temp')) {
                                        current.attr('data-shuffle-data', current.attr('data-temp'));
                                    }
                                } else {
                                    clearInterval(interval);

                                }

                                // prevent to loop an infinte cycle
                                if (!this.isRunning) {
                                    current.attr('data-temp',current.html());
                                    this.shuffleString(current); // shuffles the string
                                }


                        }, this), this.settings.sliderDuration);

                    }
                }
            }
        },

        /**
         * Shuffles the string when the mouse over's the element.
         * Creates an temp attribute to save the original string if doesnt exists.
         *
         * @param  {Object} e The event object
         * @private
         */
        _stringHoverHandler: function (e) {
            var $el = $(e.target);

            // Check if the data temp exists, if not create one
            if ($el.attr('data-temp') === undefined) {
                $el.attr('data-temp', $el.html());
            } else {
                $el.html($el.attr('data-temp'));
            }

            $el.html($el.attr('data-shuffle-data'));

            this.shuffleString($el); // shuffles the string
        },

        /**
         * Shuffles the string when the mouse out's the element.
         * Cleans the temp attribute.
         *
         * @param  {Object} e The event object
         * @private
         */
        _stringOutHandler: function(e) {
            var $el = $(e.target);
            $el.html($el.attr('data-temp'));

            clearInterval(this.interval); // reset the interval
        },
    };

    /**
     * A really lightweight plugin wrapper around the constructor,
     * preventing against multiple instantiations.
     *
     * @param  {Object} options An object of options.
     */
    $.fn[pluginName] = function (options) {
        return this.each(function() {
            if (!$.data(this, 'plugin_' + pluginName)) {
                    $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
            }
        });
    };
}));