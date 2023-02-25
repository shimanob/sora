function initialize() {
  var latlng = new google.maps.LatLng(33.592659, 130.411246);/*表示したい場所の経度、緯度*/
  var myOptions = {
    zoom: 15, /*拡大比率*/
    center: latlng, /*表示枠内の中心点*/
	  scrollwheel: false,/*スクロール無効*/
    mapTypeControlOptions: { mapTypeIds: ['noText', google.maps.MapTypeId.ROADMAP] }/*表示タイプの指定*/
  };
  var map = new google.maps.Map(document.getElementById('gMap'), myOptions);/*マップのID取得*/

  /*スタイルのカスタマイズ*/
  var styleOptions =
[
	{
		"featureType": "landscape",
		"stylers": [{
			"saturation": -100
		}, {
			"lightness": 65
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "poi",
		"stylers": [{
			"saturation": -100
		}, {
			"lightness": 51
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "road.highway",
		"stylers": [{
			"saturation": -100
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "road.arterial",
		"stylers": [{
			"saturation": -100
		}, {
			"lightness": 30
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "road.local",
		"stylers": [{
			"saturation": -100
		}, {
			"lightness": 40
		}, {
			"visibility": "on"
		}]
	}, {
		"featureType": "transit",
		"stylers": [{
			"saturation": -100
		}, {
			"visibility": "simplified"
		}]
	}, {
		"featureType": "administrative.province",
		"stylers": [{
			"visibility": "off"
		}]
	}, {
		"featureType": "water",
		"elementType": "labels",
		"stylers": [{
			"visibility": "on"
		}, {
			"lightness": -25
		}, {
			"saturation": -100
		}]
	}, {
		"featureType": "water",
		"elementType": "geometry",
		"stylers": [{
			"hue": "#ffff00"
		}, {
			"lightness": -25
		}, {
			"saturation": -97
		}]
	}
];
 var styledMapOptions = { name: '株式会社LEG' }
  var sampleType = new google.maps.StyledMapType(styleOptions, styledMapOptions);
  map.mapTypes.set('sample', sampleType);
  map.setMapTypeId('sample');

/*アイコンの取得*/
var icon = new google.maps.MarkerImage('img/sample_icon.png',/*アイコンの場所*/
  new google.maps.Size(20,34),/*アイコンのサイズ*/
  new google.maps.Point(0,0)/*アイコンの位置*/
);

/*マーカーの設置*/
var markerOptions = {
  position: latlng,/*表示場所と同じ位置に設置*/
  map: map,
  icon: icon,
  title: '株式会社LEG'/*マーカーのtitle*/
};
var marker = new google.maps.Marker(markerOptions);

}