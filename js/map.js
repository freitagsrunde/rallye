//copied from https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map#the_basic_html_page
function googleError() {
	alert("could not load google maps!")
}
//function initMap() {
//    var mapDiv = document.getElementById('map');
//    var map = new google.maps.Map(mapDiv, {
//        center: {lat: 52.53, lng: 13.38},
//        zoom: 12
//    });
//
//
//}

//var map; //<-- This is now available to both event listeners and the initialize() function
//function initMap() {
//	var mapOptions = {
//		center: new google.maps.LatLng(52.512814, 13.325160),
//		zoom: 15,
//		mapTypeId: google.maps.MapTypeId.ROADMAP
//	};
//	map = new google.maps.Map(document.getElementById("map"),
//		mapOptions);
//	google.maps.event.addDomListener(window, 'load', initMap);
//	google.maps.event.addDomListener(window, "resize", function() {
//		var center = map.getCenter();
//		google.maps.event.trigger(map, "resize");
//		map.setCenter(center); 
//	});}

function initMap() {
var uluru = {lat: 52.512814, lng: 13.325160};
var map = new google.maps.Map(document.getElementById('map'), {
  zoom: 10,
  center: berlin
});
}
