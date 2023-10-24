<template>
  <div id="app">
    <!-- <input type="text" v-model="text" />
    <button @click="updateCoord">add!</button>
    <p>{{ status }}</p>
    <button @click="getMidCoord(coordList)">click!</button>
    <p>{{ midCoord }}</p> -->

    <Modal
      :modalMessage="modalMessage"
      v-if="isModalOpen"
      @close-modal="closeModal"
    ></Modal>

    <div class="container">
      <div class="row">
        <div class="col-4 side-bar">
          <h2 class="header">Recommended Locations For You:</h2>
          <div v-for="loc in LocObjList" :key="loc.name">
            <div
              class="row loc"
              @click="
                openModal(loc.name);
                displayMap(loc.coord);
              "
            >
              <div class="col-3 loc-img">
                <img :src="loc.img" />
              </div>
              <div class="col loc-details">
                <p class="loc-name">{{ loc.name }}</p>
                <p class="loc-dist">{{ loc.dist }}</p>
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

let text = "Click a location to display the map";
let isModalOpen = false;
let modalMessage = "";

const LocObjList = [
  {
    img: "https://eatbook.sg/wp-content/uploads/2022/06/pasta-express-three-dishes.jpg",
    name: "Pasta Express",
    coord: { lat: 1.29558392481369, lng: 103.849331227478 },
    dist: "800m",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVL3loDf1AJuuqkf199J4TYrtQS5m2dDoMPA&usqp=CAU",
    name: "Lazada",
    coord: { lat: 1.2979, lng: 103.8502 },
    dist: "800m",
  },
  {
    img: "https://eatbook.sg/wp-content/uploads/2023/08/kuro-kare-don-3.jpg",
    name: "Kurokare",
    coord: { lat: 1.2973, lng: 103.8496 },
    dist: "800m",
  },
];

const loader = new Loader({
  apiKey: process.env.VUE_APP_GOOGLE_API_KEY,
  libraries: ["places"],
});

const displayMap = async (coord) => {
  await loader.load();
  var map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: coord.lat, lng: coord.lng },
    zoom: 20,
  });

  var marker = new google.maps.Marker({
    position: { lat: coord.lat, lng: coord.lng },
    map: map,
  });
  return marker, map;
};

const openModal = (message) => {
  modalMessage = message;
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
#map {
  border: transparent;
  border-radius: 20px;
  background-color: lightgray;
  width: 500px;
  height: 500px;
  margin: 0px 40px;
  object-fit: contain;
  display: flex;
}

#map h3 {
  margin: auto;
}

.header {
  text-align: left;
  font-weight: bold;
  margin-top: 5px;
  color: rgb(55, 51, 51);
  margin-bottom: 20px;
}

.side-bar {
  background-color: white;
}

.container {
  margin-top: 40px;
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
