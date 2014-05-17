/**
 * Image Slider
 *
 * @category    jQuery Plugin
 * @license     http://www.opensource.org/licenses/mit-license.html  MIT License
 * @copyright   2014 Daiki Sato
 * @author      Daiki Sato <sato.dik@gmail.com>
 * @link        http://orememo-v2.tumblr.com/
 * @version     1.0
 * @since       2014.05.16
 */

;(function($, window, document, undefined) {

	var pluginName = 'imageslider',
			defaults = {
				slideItems: '.is-item',
				slideContainer: '.is-container',
				slideDistance: 1,
				slideDuration: 1,
				slideEasing: 'linear'
			};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defaults = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function() {
		var self = this;

		self.$element = $(self.element);
		self.$slideContainer = self.$element.find(self.settings.slideContainer);
		self.$slideItems = self.$element.find(self.settings.slideItems);

		calcContainerSize(self.$slideContainer, self.$slideItems);
		self.$element.css('overflow', 'hidden');

		self.startSlide();

	}
	Plugin.prototype.startSlide = function() {
		var self = this,
				$slideItemFirst = self.$slideContainer.find(self.settings.slideItems).eq(0),
				slideItemFirstW = $slideItemFirst.width();

		/*
		$slideItemFirst.animate({
			marginLeft: parseInt($slideItemFirst.css('margin-left'), 10) - self.settings.slideDistance
		}, self.settings.slideDuration, self.settings.slideEasing, function() {
			var firstItemML = Math.abs(parseInt($slideItemFirst.css('margin-left'), 10));

			if(firstItemML > slideItemFirstW) self.$slideContainer.append($slideItemFirst);
			self.startSlide();
		});
		*/
	}
	Plugin.prototype.stopSlide = function() {
	}

	// 親要素のサイズを設定
	function calcContainerSize($container, $items) {
		var containerW = $container.width(),
				containerH = $container.height(),
				resultW = 0,
				resultH = 0;

		$items.each(function() {
			var $this = $(this),
					thisW = $this.width(),
					thisH = $this.height();

			resultW += thisW;
			if(thisH > resultH) resultH = thisH;
		});

		$container.css({
			width: resultW,
			height: resultH
		});
	} // end of calcContainerSize()

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});

		return this;
	}

})(jQuery, window, document, undefined);