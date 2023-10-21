<template>
  <div id="app">
    <!-- <input type="text" v-model="text" />
    <button @click="updateCoord">add!</button>
    <p>{{ status }}</p>
    <button @click="getMidCoord(coordList)">click!</button>
    <p>{{ midCoord }}</p> -->

    <Modal
      :modalMessage="message"
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
                displayMap(loc.coord, loc.name);
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

        <div class="col map">
          <h3>{{ text }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";

export default {
  name: "app",
  components: {
    Modal,
  },
  data() {
    return {
      LocObjList: [
        {
          img: "https://eatbook.sg/wp-content/uploads/2022/06/pasta-express-three-dishes.jpg",
          name: "Pasta Express",
          coord: { lat: 1, long: 2 },
          dist: "800m",
        },
        {
          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVL3loDf1AJuuqkf199J4TYrtQS5m2dDoMPA&usqp=CAU",
          name: "Lazada",
          coord: { lat: 3, long: 4 },
          dist: "800m",
        },
        {
          img: "https://eatbook.sg/wp-content/uploads/2023/08/kuro-kare-don-3.jpg",
          name: "Kurokare",
          coord: { lat: 5, long: 6 },
          dist: "800m",
        },
      ],
      // midCoord: "",
      text: "Click a location to display the map",
      // status: "",
      isModalOpen: false,
      message: "",
    };
  },
  methods: {
    // getMidCoord(coordList) {
    //   var latCount = 0;
    //   var longCount = 0;
    //   for (var coord of coordList) {
    //     latCount += coord[0];
    //     longCount += coord[1];
    //   }

    //   var midLat = latCount / coordList.length;
    //   var midLong = longCount / coordList.length;

    //   this.midCoord = [midLat, midLong];
    // },
    // updateCoord() {
    //   var newCoord = this.text.split(",");
    //   this.coordList.push(newCoord);
    //   this.status = "updated!";
    // },
    displayMap(coord, name) {
      this.text = name + `${coord.lat}`;
    },

    openModal(message) {
      this.message = message;
      this.isModalOpen = true;
    },
    closeModal() {
      this.isModalOpen = false;
    },

    setLocation() {
      // updates common location to backend
      this.openModal("Location has been set!");
    },
  },
};
</script>

<style>
.map {
  border: transparent;
  border-radius: 20px;
  background-color: lightgray;
  width: 500px;
  height: 500px;
  margin: 0px 40px;
  object-fit: contain;
  display: flex;
}

.map h3 {
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
