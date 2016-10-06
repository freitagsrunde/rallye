//copied from https://developers.google.com/maps/tutorials/fundamentals/adding-a-google-map#the_basic_html_page
function googleError() {
    alert("could not load google maps!")
}
function initMap() {
    var mapDiv = document.getElementById('map');
    var map = new google.maps.Map(mapDiv, {
        center: {lat: 52.53, lng: 13.38},
        zoom: 12
    });


}

