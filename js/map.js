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

    initList(map);

}

function initList(map) {    // source http://codepen.io/JohnMav/pen/OVEzWM


// multiple marker support : http://stackoverflow.com/a/3059129

    //in places the list elements are saved which are basically markers on the map
    var places = [];

    //this acts as a seed for all places that should show up on the map
    var locations = [
        ['Humboldthain Club', 52.54460258, 13.3787781, "humboldthain-berlin"],
        ['Technische Universität Berlin', 52.51276694, 13.32697392, "tu-berlin-berlin-2"],
        ['Mauerpark', 52.542478, 13.403009, "mauerpark-berlin-3"],
        ['Bahnhof Gesundbrunnen', 52.548769, 13.4027195, "bahnhof-gesundbrunnen-berlin-2"],
        ['Bahnhof Wedding', 52.543399, 13.368327, "s-u-bhf-wedding-berlin"]
    ];

    var infowindow = new google.maps.InfoWindow();

    var marker, i;


    //create all markers and give them a listener which spawns info boxes above them
    for (i = 0; i < locations.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            animation: google.maps.Animation.DROP,
            map: map,
            title: locations[i][0],
            yelp: "loading...",
            businessId: locations[i][3],
            // redirects a click on the list to a click on the map.
            click: function () {
                google.maps.event.trigger(this, 'click');
            }
        });

        // spawns an infoWindow above the respective marker and centers the map an the marker (implicitly)
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(marker.yelp);
                infowindow.open(map, marker);
                toggleBounce(marker);

                // if no info has yet been loaded - load info
                if (marker.yelp == "loading...") {

                    var message = {
                        'action': "https://api.yelp.com/v2/business/" + marker.businessId,
                        'method': 'GET',
                        'parameters': parameters
                    };
                    OAuth.setTimestampAndNonce(message);
                    OAuth.SignatureMethod.sign(message, accessor);
                    var parameterMap = OAuth.getParameterMap(message.parameters);
                    parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature);

                    // ajax request source: http://stackoverflow.com/a/19444339
                    // and https://github.com/levbrie/mighty_marks/blob/master/yelp-business-sample.html
                    $.ajax({


                        'url': message.action,
                        'data': parameterMap,
                        'cache': true,
                        'dataType': 'jsonp',
                        'jsonpCallback': 'cb',

                        success: function (data, textStats, XMLHttpRequest) {
                            marker.yelp = beautifyYelpData(data);
                            infowindow.setContent(marker.yelp);

                        },
                        error: function () {
                            marker.yelp = "could not receive more data about " + marker.title;
                            infowindow.setContent(marker.yelp);
                        }
                    });
                }
            };
        })(marker, i));


        //makes a marker bounce twice
        function toggleBounce(marker) {

            marker.setAnimation(google.maps.Animation.BOUNCE);
            setTimeout(function () {
                marker.setAnimation(null);
            }, 1450);
        }

        // adds the marker to the list of markers to be displayed
        places.push(marker);
    }

    // This takes a json from yelp and creates the content of an infoWindow of it
    function beautifyYelpData(data) {
        var infoView = "";
        infoView += "<div>yelp:</div><br>";
        infoView += "<h2>" + data.name + "</h2>";
        if (data.image_url)
            infoView += "<img src=" + data.image_url + ">";
        return infoView;
    }

    var viewModel = function () {
        var self = this;

        self.points = ko.observableArray(places);

        self.query = ko.observable('');


        //determines if a point can be displayed according to the search box
        self.search = ko.computed(function () {
            return ko.utils.arrayFilter(self.points(), function (point) {
                var printable = point.title.toLowerCase().indexOf(self.query().toLowerCase()) >= 0;
                point.setVisible(printable);
                return printable;
            });
        });


    };

    ko.applyBindings(new viewModel());

}
