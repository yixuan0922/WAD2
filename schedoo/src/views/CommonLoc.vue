<template>
  <div id="app">
    <PageLoader v-if="!isLoaded"></PageLoader>
    <Nav></Nav>
    <div class="outer-container">
      <div class="inner-container">
        <div class="col-5 left-side">
          <div
            class="container row map-outer"
            style="margin-bottom: 15px; z-index: 10"
          >
            <div id="map" style="margin-bottom: 20px; z-index: 10"></div>
          </div>

          <div class="container row" style="height: 300px; overflow-y: auto">
            <div
              v-for="eventObj in allEvents"
              :key="eventObj.title"
              class="col-md-12 col-lg-6"
              style="margin-bottom: 20px"
            >
              <EventCard
                :title="eventObj.title"
                :startTime="eventObj.start.toLocaleTimeString()"
                :startDate="eventObj.start.toLocaleDateString()"
                :endTime="eventObj.end.toLocaleTimeString()"
                :endDate="eventObj.end.toLocaleDateString()"
                :invitees="eventObj.invitees"
                :userCoord="userCoord"
                @midcoord="setMidCoord"
              ></EventCard>
            </div>
          </div>
        </div>
        <div class="col-1"></div>
        <div class="inner-container" style="display: block">
          <div
            class="col right-side"
            style="overflow-y: auto !important; overflow-x: hidden"
          >
            <div class="row" style="margin: auto">
              <div
                v-for="place in placesList"
                :key="place.name"
                style="padding-left: 2px"
                class="place"
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
              <button
                @click="setLocation(selectedPlace)"
                style="width: 80%; margin: auto"
              >
                Set Location
              </button>
            </div>
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
import Nav from "@/components/Nav.vue";
import EventCard from "@/components/EventCard.vue";
import PageLoader from "@/components/PageLoader.vue";
import { useStore } from "vuex";

let placesList = ref([]);
let map = ref("");
let selectedPlace = {};
let imageSource = "";
let allEvents = [];
let userCoord = {};
let midCoord = {};
let isLoaded = false;

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  libraries: ["places", "marker"],
});

const store = useStore();

onMounted(async () => {
  if (navigator.geolocation) {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      userCoord = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    } catch (error) {
      console.error(error.message);
    }
  } else {
    console.log("Your browser does not support geolocation API");
  }

  // fetchEvents();

  // await store.dispatch('fetchEventsForComLoc');\
  await store.dispatch("fetchEventsForComLoc");
  allEvents = store.state.eventsComLoc;
  console.log(allEvents[1]);
  // console.log(allEvents[0].start.toLocaleTimeString());
  // console.log(allEvents[0].end.toLocaleDateString());

  // allEvents.value = store.state.eventsComLoc;
  // console.log("test", allEvents.value);

  // const allEvents = store.state.eventsComLoc;
  // const plainArray = Array.from(allEvents.value);
  // console.log("test", allEvents, allEvents.value, plainArray);

  // let midCoord = { lat: 1.304833, lng: 103.831833 }; // for testing purposes

  await loader.load();
  const gmap = new google.maps.Map(document.getElementById("map"), {
    center: userCoord,
    zoom: 20,
    mapId: "10ea632fd8840396",
  });

  map = gmap;

  var request = {
    location: userCoord,
    radius: "500",
    type: ["meal_takeaway"],
    rankby: "distance",
  };

  const service = new google.maps.places.PlacesService(map);

  service.nearbySearch(request, (results, status) => {
    if (status !== "OK" || !results) return;
    placesList.value = results;
    console.log(placesList.value);
    isLoaded = true;
  });

  return setMarker(userCoord, map);
});

async function centerMap() {
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
    isLoaded = true;
  });

  return setMarker(midCoord, map);
};

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

//retrieves event data and calc mid coord
function setMidCoord(coord) {
  midCoord = coord
  console.log(midCoord);
  centerMap(midCoord);
}

// function displayEventDetails(eventObj) {
//   console.log(eventObj);
// }
</script>

<style>
body {
  padding-top: 0 !important;
}
.right-side {
  margin-top: 25px !important;
  margin-right: 80px !important;
  height: 100%;
}

.map-outer {
  position: sticky !important;
  top: 0px;
  padding-top: 20px;
  background-color: white;
}

#map {
  border: transparent;
  border-radius: 20px;
  background-color: transparent;
  width: 100%;
  height: 400px;
  margin: auto;
  object-fit: contain;
  display: flex;
}

#map h3 {
  margin: auto;
}

.locHeader {
  text-align: left;
  font-weight: bold;
  margin-top: 0px;
  /* padding-top: 400px !important; */
  padding-bottom: 10px !important;
  color: rgb(55, 51, 51);
  margin-bottom: 20px;
  position: fixed !important;
  top: 448px !important;
  background-color: white;
  width: 100%;
  padding-bottom: 3px;
}

.left-side {
  margin-top: 28px !important;
  margin-left: 80px !important;
}

.inner-container {
  display: flex;
  height: 100vh;
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
  padding: 0px !important;
}

#img {
  display: block;
  width: 100%;
  height: 100%;
}

.row .loc {
  margin: 10px !important;
}

.row .loc:hover {
  background-color: rgba(255, 255, 255, 0.7) !important;
}

.place:hover {
  background-color: rgba(255, 255, 255, 0.7) !important;
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
