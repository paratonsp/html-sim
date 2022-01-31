;(function($, undefined) {

	var app = {
		vars: {
			animationSpeed: {
				in: 1000,
				out: 500
			}
		},

		dom: {},

		utils: {
			rem: function(val) {
				var mul = parseInt(app.dom.$html.css('font-size')) / 10;

				return val * mul;
			},

			msieversion: function() {
		        var ua = window.navigator.userAgent;
		        var msie = ua.indexOf("MSIE ");
		        if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) return true;
		        else return false;
		    },

			t: function(key) {
				if (window._translations !== undefined && window._translations[key] !== undefined) {
					return window._translations[key];
				} else {
					return key;
				}
			},

			getScrollBarWidth: function() {
				var inner = document.createElement('p');
				inner.style.width = "100%";
				inner.style.height = "200px";

				var outer = document.createElement('div');
				outer.style.position = "absolute";
				outer.style.top = "0px";
				outer.style.left = "0px";
				outer.style.visibility = "hidden";
				outer.style.width = "200px";
				outer.style.height = "150px";
				outer.style.overflow = "hidden";
				outer.appendChild (inner);

				document.body.appendChild (outer);
				var w1 = inner.offsetWidth;
				outer.style.overflow = 'scroll';
				var w2 = inner.offsetWidth;
				if (w1 == w2) w2 = outer.clientWidth;

				document.body.removeChild (outer);

				return (w1 - w2);
			}
		},

		init: function() {
			app.dom.$window = $(window);
			app.dom.$document = $(document);
			app.dom.$html = $('html');
			app.dom.$body = $('body');
			app.baseUrl = app.dom.$body.attr('data-base-href');
		},

		run : function() {
			app.init();

			for (var i in app) {
				if (typeof(app[i]) == 'object' && app[i].init !== undefined) {
					app[i].init();
				}
			}
		}
	};

	$(document).ready(function() {
		app.run();
	});

})(window.jQuery);