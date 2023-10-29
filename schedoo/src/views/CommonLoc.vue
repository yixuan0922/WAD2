<template>
  <div id="app">
    <Modal
      :modalMessage="message"
      v-if="isModalOpen"
      @close-modal="closeModal"
      v-model="message"
    ></Modal>

    <div class="outer-container">
      <div class="inner-container">
        <div class="col-4 side-bar">
          <h2 class="header">Recommended Locations:</h2>
          <div v-for="place in placesList" :key="place.name">
            <div
              class="row loc"
              @click="
                openModal(place.name);
                recenterMap(place.geometry.location, map);
              "
            >
              <div class="col-3 loc-img">
                <img
                  src="https://eatbook.sg/wp-content/uploads/2022/06/pasta-express-three-dishes.jpg"
                />
              </div>
              <div class="col loc-details">
                <p class="loc-name">{{ place.name }}</p>
                <p class="loc-dist">{{ text }}</p>
              </div>
            </div>
          </div>
          <button @click="setLocation()">Set Location</button>
        </div>

        <div class="col" id="map">
          <h3>{{ text }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
import { Loader } from "@googlemaps/js-api-loader";
import Modal from "@/components/Modal.vue";
import { onMounted, ref } from "vue";

let text = "Click a location to display the map";
let isModalOpen = false;
let message = "";
let placesList = ref([]);
let map = ref("");

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  libraries: ["places"],
});

onMounted(async () => {
  var midCoord = { lat: 1.2952, lng: 103.8496 };

  await loader.load();
  const gmap = new google.maps.Map(document.getElementById("map"), {
    center: midCoord,
    zoom: 20,
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

    // addPlaces(results, map);
    // moreButton.disabled = !pagination || !pagination.hasNextPage;
    // if (pagination && pagination.hasNextPage) {
    //   getNextPage = () => {
    //     // Note: nextPage will call the same handler function as the initial call
    //     pagination.nextPage();
    //   };
    // }
  });
});

function recenterMap(coord, map) {
  map.setCenter({ lat: coord.lat(), lng: coord.lng() });

  var marker = new google.maps.Marker({
    position: { lat: coord.lat(), lng: coord.lng() },
    map: map,
  });
  return marker;
}

const openModal = (msg) => {
  message = msg;
  isModalOpen = true;
};

const closeModal = () => {
  isModalOpen = false;
};

const setLocation = () => {
  openModal("Location has been set!");
};
</script>

<style>
body {
  padding-top: 0 !important;
}

#map {
  border: transparent;
  border-radius: 20px;
  background-color: lightgray;
  width: 500px;
  height: 90vh;
  margin: 0px 40px;
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
  padding-top: 25px !important;
  color: rgb(55, 51, 51);
  margin-bottom: 20px;
  position: fixed;
  top: 0px;
  background-color: white;
  width: 100%;
  padding-bottom: 3px;
}

.side-bar {
  margin-top: 28px;
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
  background-color: pink;
  width: 200px;
  height: 100px;
  margin-bottom: 10px;
  object-fit: contain;
  overflow: hidden;
  padding: 0 !important;
}

img {
  display: block;
  width: 100%;
  height: 100%;
}

.row.loc {
  margin: 5px;
}

.loc-details {
  text-align: left;
  margin-left: 3px;
}

.loc-name {
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 2px;
}
</style>
