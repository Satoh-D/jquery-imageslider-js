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
				slideEasing: 'linear',
				resizable: false
			};

	function Plugin(element, options) {
		var self = this;

		self.element = element;
		self.settings = $.extend({}, defaults, options);
		self._defaults = defaults;
		self._name = pluginName;

		$(window).on('load', function() { self.init(); });
		// this.init();
	}

	Plugin.prototype.init = function() {
		var self = this;

		self.$element = $(self.element);
		self.$slideContainer = self.$element.find(self.settings.slideContainer);
		self.$slideItems = self.$element.find(self.settings.slideItems);
		self.elementW = self.$element.width();
		self.slideContainerW = calcContainerSize(self.$slideContainer, self.$slideItems);

		self.$slideContainer.width(self.slideContainerW);
		self.$element.css('overflow', 'hidden');

		if(self.settings.resizable) {
			$(window).on('resize', function(){ self.resizeContainer(); });
		}

		self.resizeContainer();
		self.startSlide();

	}
	Plugin.prototype.startSlide = function() {
		var self = this,
				$slideItemFirst = self.$slideContainer.find(self.settings.slideItems).eq(0),
				slideItemFirstW = $slideItemFirst.width();

		// スライドする要素の中で、一番最初の要素のmargin-leftを減らしていく
		// 画面の外に出たら一番後ろに持っていく
		// 以下、繰り返し
		$slideItemFirst.animate({
			marginLeft: parseInt($slideItemFirst.css('margin-left'), 10) - self.settings.slideDistance
		}, self.settings.slideDuration, self.settings.slideEasing, function() {
			if(Math.abs(parseInt($slideItemFirst.css('margin-left'), 10)) > slideItemFirstW) {
				$slideItemFirst.appendTo(self.$slideContainer).css('margin-left', 0);
			}
			self.startSlide();
		});
	}
	Plugin.prototype.stopSlide = function() {
		var self = this;

		self.$slideItems.stop();
	}
	Plugin.prototype.resizeContainer = function() {
		var self = this,
				elementW = self.$element.width(),
				itemsW = self.slideContainerW;

		// self.$slideContainerの横幅がself.$elementの横幅より小さい時、スライドする要素をコピー
		// if(elementW < self.slideContainerW) return false;

		// スライドを一旦ストップ
		self.stopSlide();

		// self.$elementの横幅を超えるまでスライドする要素をコピーする
		adjustItemsLength(self.$slideContainer, self.$slideItems, elementW, itemsW);

		// 各種要素更新
		self.$slideItems = self.$element.find(self.settings.slideItems);
		self.slideContainerW = calcContainerSize(self.$slideContainer, self.$slideItems);
		self.elementW = elementW;
		self.$slideContainer.width(self.slideContainerW);

		// スライドを再スタートする
		self.startSlide();
	}

	function adjustItemsLength($container, $items, elementW, itemsW) {
		$items.each(function() {
			if(itemsW > elementW * 2) return false;

			var $clone = $(this).clone().css('margin-left', 0);

			$clone.appendTo($container);
			itemsW += $clone.width();
		});
	} // end of adjustItemsLength

	// 親要素のサイズを設定
	function calcContainerSize($container, $items) {
		var containerW = $container.width(),
				resultW = 0;

		$items.each(function() {
			resultW += $(this).width();
		});

		return resultW;
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