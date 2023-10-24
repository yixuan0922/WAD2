<template>
  <div id="app">
    <div class="outer-container">
      <div class="inner-container">
        <div class="col-4 side-bar">
          <h2 class="header">Recommended Locations:</h2>
          <div v-for="place in placesList" :key="place.name">
            <div class="row loc">
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

        <div class="col" id="hello">
          <h3>{{ text }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const text = "hello";
const placesList = [
  {
    name: 1,
  },
  {
    name: 2,
  },
  {
    name: 3,
  },
  {
    name: 3,
  },
  {
    name: 3,
  },
  {
    name: 3,
  },
  {
    name: 3,
  },
];
</script>

<style>
#hello {
  border: transparent;
  border-radius: 20px;
  background-color: lightgray;
  width: 500px;
  height: 90vh;
  margin: 0px 40px;
  object-fit: contain;
  display: flex;
  position: sticky;
  top: 40px;
}

#hello h3 {
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
}

.side-bar {
  margin-top: 25px;
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
