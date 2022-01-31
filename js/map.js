;(function(window, $, undefined) {
	var _once = false;

	function _initializeMap() {
		$('owd-map:not(.map-initialized)').each(function() {
			var $map = $(this);
			$map.addClass('map-initialized');
			var $markers = $map.find('owd-map-marker');

			var lat = $map.attr('center-lat');
			var lng = $map.attr('center-lng');
			var Latlng = new google.maps.LatLng(lat, lng);
			var zoom = $map.attr('zoom');

			var myOptions = {
				zoom: zoom !== undefined ? parseInt(zoom) : 13,
				panControl: false,
				zoomControl: false,
				draggable: true,
				// scrollwheel: false,
				mapTypeControl: false,
				scaleControl: false,
				navigationControl: false,
				streetViewControl: false,
				center: Latlng,
				mapTypeId: google.maps.MapTypeId.ROADMAP
			};

			var map = new google.maps.Map($map[0], myOptions);
			map.setOptions({
				styles: [
					{
				        "featureType": "all",
				        "elementType": "all",
				        "stylers": [
				            {
				                "saturation": "-100"
				            },
				            {
				                "hue": "#ff0000"
				            }
				        ]
				    }
				]
			});

			$markers.each(function() {
				var $marker = $(this);
				var lat = $marker.attr('lat');
				var lng = $marker.attr('lng');
				var width = parseInt($marker.attr('width'));
				var height = parseInt($marker.attr('height'));
				var markerLatlng = new google.maps.LatLng(lat, lng);
				var image = $marker.attr('src');
				var href = $marker.attr('href');

				var anchor;

				if ($marker.attr('anchor') == 'bottom') {
					anchor = new google.maps.Point(width/2, height);
				} else if ($marker.attr('anchor') == 'bottom-left') {
					anchor = new google.maps.Point(0, height);
				} else if ($marker.attr('anchor') == 'bottom-right') {
					anchor = new google.maps.Point(width, height);
				} else if ($marker.attr('anchor') == 'top-left') {
					anchor = new google.maps.Point(0, 0);
				} else if ($marker.attr('anchor') == 'top-right') {
					anchor = new google.maps.Point(width, 0);
				} else if ($marker.attr('anchor') == 'top') {
					anchor = new google.maps.Point(width/2, 0);
				} else if ($marker.attr('anchor') == 'left') {
					anchor = new google.maps.Point(0, height/2);
				} else if ($marker.attr('anchor') == 'right') {
					anchor = new google.maps.Point(width, height/2);
				} else {
					anchor = new google.maps.Point(width/2, height/2);
				}

				var marker = new google.maps.Marker({
					position : markerLatlng,
					icon     : image,
					anchor   : anchor,
					size     : new google.maps.Size(width, height),
					animation: google.maps.Animation.DROP
				});

				google.maps.event.addListener(marker, 'click', function() {
					window.open(href);
				});

				$('body').on('destroy', function _destroy(e) {
					if ($(e.target).find($map).length) {
						$('body').off('destroy', _destroy);
						google.maps.event.clearListeners(marker, 'click');
						marker.setMap(null);
						delete marker;
					}
				});

				marker.setMap(map);
			});

			$('body').on('destroy', function _destroy(e) {
				if ($(e.target).find($map).length) {
					$('body').off('destroy', _destroy);
					delete map;
					delete myOptions;
					delete latlng;
				}
			});
		});
	}

	var _prepareMapsApi = function() {
		if ($('owd-map').length) {
			if (!_once) {
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = '//maps.googleapis.com/maps/api/js?v=3.exp&' +
				'callback=prepareMapsReady&key=' + gmaps_key;
				document.body.appendChild(script);
				_once = true;
			} else {
				prepareMapsReady();
			}
		}
	};

	window.prepareMapsReady = _initializeMap;
	$(window).on('load ajaxload', _prepareMapsApi);

})(window, window.jQuery);