<template>
  <div id="app">
    <div class="outer-container">
      <div class="inner-container">
        <div class="col-6 side-bar">
           
           <div class="card" style="width: 100%;"> 
               <img src="https://api-private.atlassian.com/users/5f116c2970b8a90025c6efa9/avatar?initials=public" class="card-img-top" alt="..."> 
               <div class="card-body"> 
                   <h5 class="card-title">Card title</h5> 
                   <p class="card-text">Some quick example text to make up the bulk of the card's content.</p>  
               </div> 
               <div class="card-body"> 
                   <a href="#" class="card-link">Card link</a> 
                   <a href="#" class="card-link">Another link</a> 
               </div> 
           </div> 
           <!-- BS card: End --> 
          
        </div>

        <div class="col right-side" style="display: block; margin-right: 40px">
          <div class="row" id="map" style="margin-bottom: 5px"></div>
          <div class="row">
            <h2 class="header">Recommended Locations:</h2>
          </div>
          <div class="row">
            <div
              v-for="place in placesList"
              :key="place.name"
              style="padding-left: 2px"
            >
              <div
                class="row loc"
                @click="
                  recenterMap(
                    place.geometry.location,
                    place.name,
                    place.vicinity,
                    map
                  );
                  selectPlace(place);
                "
              >
                <div class="col-3 loc-img" v-if="checkPhoto(place)">
                  <img id="img" :src="imageSource" />
                </div>
                <div class="col loc-details">
                  <p class="loc-name">{{ place.name }}</p>
                  <p class="loc-address">{{ place.vicinity }}</p>
                </div>
              </div>
            </div>
            <button @click="setLocation(selectedPlace)">Set Location</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { Loader } from "@googlemaps/js-api-loader";
import { onMounted, ref } from "vue";

let placesList = ref([]);
let map = ref("");
let selectedPlace = {};
let imageSource = "";

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  libraries: ["places", "marker"],
});

onMounted(async () => {
  var midCoord = { lat: 1.3005, lng: 103.8522 };

  await loader.load();
  const gmap = new google.maps.Map(document.getElementById("map"), {
    center: midCoord,
    zoom: 20,
    mapId: "10ea632fd8840396",
  });

  map = gmap;

  var request = {
    location: midCoord,
    radius: "500",
    type: ["meal_takeaway"],
    rankby: "distance",
  };

  const service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, (results, status) => {
    if (status !== "OK" || !results) return;
    placesList.value = results;
    console.log(placesList.value);
  });

  return setMarker(midCoord, map);
});

function recenterMap(coord, name, address, map) {
  map.setCenter({ lat: coord.lat(), lng: coord.lng() });
  const infoWindow = new google.maps.InfoWindow();
  var marker = new google.maps.Marker({
    position: { lat: coord.lat(), lng: coord.lng() },
    map: map,
    title: name,
    content:
      '<div><h6 style="font-weight:bold">' +
      name +
      "</h6><p>" +
      address +
      "</p>",
  });

  marker.addListener("click", () => {
    map.setCenter(marker.position);
    infoWindow.close();
    infoWindow.setContent(marker.content);
    infoWindow.open(marker.map, marker);
  });

  return marker, selectedPlace;
}

function setMarker(coord, map) {
  const infoWindow = new google.maps.InfoWindow();
  const pinBackground = new google.maps.marker.PinElement({
    background: "#FFA500",
  });

  var marker = new google.maps.marker.AdvancedMarkerElement({
    position: coord,
    map: map,
    title: "Current Position",
    content: pinBackground.element,
  });

  marker.addListener("click", () => {
    map.setCenter(marker.position);
    infoWindow.close();
    infoWindow.setContent(marker.title);
    infoWindow.open(marker.map, marker);
  });

  return marker;
}

function selectPlace(place) {
  selectedPlace = place;
}

// set location in database
function setLocation(place) {
  console.log(place);
}

function checkPhoto(place) {
  if (place.photos == null) {
    imageSource =
      "https://cdn.vectorstock.com/i/preview-1x/48/06/image-preview-icon-picture-placeholder-vector-31284806.jpg";
  } else {
    imageSource = place.photos[0].getUrl({
      maxWidth: 100,
      maxHeight: 100,
    });
  }

  return imageSource;
}
</script>

<style>
body {
  padding-top: 0 !important;
}

#map {
  border: transparent;
  border-radius: 20px;
  background-color: pink;
  width: 100%;
  height: 400px;
  margin: auto;
  object-fit: contain;
  display: flex;
  position: sticky !important;
  top: 40px;
}

#map h3 {
  margin: auto;
}

.header {
  text-align: left;
  font-weight: bold;
  margin-top: 0px;
  padding-top: 400px !important;
  padding-bottom: 10px !important;
  color: rgb(55, 51, 51);
  margin-bottom: 20px;
  position: fixed !important;
  top: 448px !important;
  background-color: white;
  width: 100%;
  padding-bottom: 3px;
}

.side-bar {
  margin-top: 28px !important;
  margin-left: 40px;
}

.inner-container {
  display: flex;
}

.outer-container {
  margin-top: 40px;
  margin-bottom: 40px;
}

.loc-img {
  border: transparent;
  border-radius: 20px;
  background-color: pink !important;
  width: 100px !important;
  height: 100px !important;
  /* margin-bottom: 10px; */
  object-fit: contain;
  overflow: hidden;
  padding-top: 8px !important;
}

#img {
  display: block;
  width: 100%;
  height: 100%;
}

.row.loc {
  margin: 10px !important;
}

.loc-details {
  text-align: left;
  margin-left: 15px !important;
  display: block !important;
  padding: 0px;
}

.loc-name {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 2px;
}

.loc-address {
  margin-bottom: 0px !important;
}
</style>
