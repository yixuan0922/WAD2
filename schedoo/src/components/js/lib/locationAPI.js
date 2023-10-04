// Credits: https://github.com/softauthor/Get-User-Location-with-Javascript

(function () {
    var locatorSection = document.getElementById("locator-input-section");
    var input = document.getElementById("location");

    function init() {
        var locatorButton = document.getElementById("locator-button");
        locatorButton.addEventListener("click", locatorButtonPressed);
    }

    // When location icon is clicked
    function locatorButtonPressed() {
        locatorSection.classList.add("loading")

        navigator.geolocation.getCurrentPosition(function (position) {
                getUserAddressBy(position.coords.latitude, position.coords.longitude);
            },
            function (error) {
                locatorSection.classList.remove("loading");
                alert("The Locator was denied :( Please add your address manually");
            })
    }
    function getUserAddressBy(lat, long) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var address = JSON.parse(this.responseText)
                setAddressToInputField(address.results[0].formatted_address)
            }
        };
        xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8", true);
        xhttp.send();
    }

    function setAddressToInputField(address) {

        input.value = address
        locatorSection.classList.remove("loading")
    }

    // // Tutorial: https://www.sheshbabu.com/posts/exploring-singapore-onemap-api/
    // function getUserAddressBy(lat, long) {
    //     token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaW50ZXJuYWwtYWxiLW9tLXByZGV6aXQtaXQtMTIyMzY5ODk5Mi5hcC1zb3V0aGVhc3QtMS5lbGIuYW1hem9uYXdzLmNvbS9hcGkvdjIvdXNlci9wYXNzd29yZCIsImlhdCI6MTY5NDc5MDY2MiwiZXhwIjoxNjk1MDQ5ODYyLCJuYmYiOjE2OTQ3OTA2NjIsImp0aSI6ImpZMXBlYmNiY2N6akZkZ1UiLCJzdWIiOiI0ZmU4OGI5OGQ4ZmM2ZDM3MWI0NDY3NjcwYmM2MmFkZiIsInVzZXJfaWQiOjgyNCwiZm9yZXZlciI6ZmFsc2V9.RomphptlPzGZeWVPtP-wRYX3UU1nmx6DvNmRJncAKks";
    //     const data = JSON.stringify(false);
      
    //     const xhr = new XMLHttpRequest();
            
    //     xhr.addEventListener("readystatechange", function () {
    //         if (this.readyState === this.DONE) {
    //             locatorSection.classList.remove("loading");
    //         }
    //     });
    //     xhr.open("GET", "https://www.onemap.gov.sg/api/public/revgeocodexy?location=24291.97788882387%2C31373.0117224489&buffer=40&addressType=All&otherFeatures=N");
    //     //xhr.open("GET", "https://www.onemap.gov.sg/api/public/revgeocode?location=" + lat + "," + long + "&token=" + token); 
    //     xhr.setRequestHeader("Authorization", token);
    //     xhr.send(data);
    //     console.log(data);
    // }

    var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(45.4215296, -75.6971931),
    );

    var options = {
        bounds: defaultBounds,
        componentRestrictions: { country: "sg" }
    };
    var autocomplete = new google.maps.places.Autocomplete(input, options);


    init()

})();