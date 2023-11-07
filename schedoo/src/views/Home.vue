<template>
  <div>
    <Nav />
    <div
      class="container-fluid col-lg-12 px-5 scrollable-container"
      style="padding-top: 70px"
    >
      <div class="row">
        <div class="col-lg-9">
          <!-- Header -->
          <div class="row" v-if="insightsPage">
            <div>
              <h4
                style="
                  position: relative;
                  font-weight: bold;
                  text-align: start;
                  margin-top: 20px;
                "
              >
                Welcome to your dashboard.
              </h4>
              <p
                style="
                  position: relative;
                  text-align: start;
                  margin-bottom: 5px;
                "
              >
                Manage your study-life balance all in this page.
              </p>
            </div>
            <!-- Add navigation links -->
            <div class="row">
              <!-- <input type="button" class="col-6" id="insights" placeholder="My Insights"> -->
              <router-link
                to=""
                class="col-6"
                id="insightsPage"
                :class="{
                  boxClicked: insightsPage,
                  boxNotClicked: !insightsPage,
                  active: insightsPage
                }"
                @click="switchToInsights"
                >Insights</router-link
              >
              <router-link
                to="/home/focus"
                class="col-6"
                id="focusPage"
                :class="{
                  boxClicked: !insightsPage,
                  boxNotClicked: insightsPage,
                  active: !insightsPage
                }"
                @click="switchToFocus"
                >Focus Mode</router-link
              >
            </div>
          </div>
          <div class="row" v-if="!insightsPage">
            <div>
              <h4
                style="
                  position: relative;
                  font-weight: bold;
                  text-align: start;
                  margin-top: 20px;
                "
              >
                Welcome to your deep focus tracker.
              </h4>
              <p
                style="
                  position: relative;
                  text-align: start;
                  margin-bottom: 5px;
                "
              >
                There is no better time to start than now. You got this!
              </p>
            </div>
            <div class="row">
              <!-- <input type="button" class="col-6" id="insights" placeholder="My Insights"> -->
              <router-link
                to="/home/insights"
                class="col-6"
                id="insightsPage"
                :class="{
                  boxClicked: insightsPage,
                  boxNotClicked: !insightsPage,
                  active: insightsPage
                }"
                @click="switchToInsights"
                >Insights</router-link
              >
              <router-link
                to="/home/focus"
                class="col-6"
                id="focusPage"
                :class="{
                  boxClicked: !insightsPage,
                  boxNotClicked: insightsPage,
                  active: !insightsPage
                }"
                @click="switchToFocus"
                >Focus Mode</router-link
              >
            </div>
          </div>
          <router-view v-if="pageLoad" />
        </div>
        <!-- Fixed right side of dashboard -->
        <div class="col-lg-3">
          <!-- Time, Calculator -->
          <div
            class="shadow-5 p-3"
            style="
              height: 100px;
              content-justify: center !important;
              align-items: center !important;
              background-color: #ededed;
              border-radius: 15px;
            "
          >
            <div id="current-time" class="datetime" style="font-size: 30px">
              {{ runningTime }}
            </div>
            <p>{{ currentDayOfWeek }}, {{ currentDate }}</p>

            <div>
              <!-- <div class="weather">
                  <h1 class="temp">22°C</h1>
                </div> -->
            </div>
          </div>
          <!-- Event list -->
          <div class="container">
            <FullCalendarComponent
              class="app-calendar-sidebar"
              v-bind:options="calendarSidebarOptions"
            />
          </div>

          <!-- Spotify -->
          <div class="row" style="margin-top: 20px">
            <link
              rel="alternate"
              type="application/json+oembed"
              href="https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F5eXZwvvxt3K2dxha3BSaAe"
            />
            <div v-html="spotifyEmbedHtml"></div>
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
// import Insights from '../components/Insights.vue';
import FullCalendarComponent from "@fullcalendar/vue3";
import { useStore } from "vuex";
import { ref, computed } from "vue";
// import ListPlugin from "@fullcalendar/list";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";
import dayGridPlugin from "@fullcalendar/daygrid";

// Calendar
// import ListPlugin from "@fullcalendar/list";
// import bootstrap5Plugin from "@fullcalendar/bootstrap5";
// import { onMounted, computed } from "vue";
// import { ref } from "vue";
// import { useStore } from "vuex";
// const store = useStore();

// onMounted(() => {
//   store.dispatch("fetchEvents");
//   store.dispatch("getPendingEvents");
// });

// const calendarSidebarOptions = ref({
//   plugins: [ListPlugin, bootstrap5Plugin],
//   themeSystem: "bootstrap5",
//   initialView: "listWeek",
//   events: computed(() => this.store.getters["ALLEVENTS"]),
//   headerToolbar: {
//     left: "",
//     center: "title",
//     right: "",
//   },
// });

export default {
  setup() {
    const store = useStore();
    const calendarSidebarOptions = ref({
      plugins: [dayGridPlugin, bootstrap5Plugin],
      themeSystem: "bootstrap5",
      initialView: "dayGridDay",
      events: computed(() => store.getters["ALLEVENTS"]),
      headerToolbar: {
        left: "",
        center: "",
        right: "",
      },
    });
    return { store, calendarSidebarOptions };
  },
  components: {
    Nav,
    // Insights,
    FullCalendarComponent,
  },
  data() {
    return {
      date: new Date(),
      currentDate: new Date().toLocaleDateString(),
      currentDayOfWeek: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ][new Date().getDay()],
      weather: {
        temp: null, // Initialize with null or a default value
      },
      spotifyEmbedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DWSoyxGghlqv5?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
      showCalculator: false,
      insightsPage: true,
      pageLoad: true,
    };
  },

  beforeRouteEnter(to, from, next) {
    // This guard is called just before the "Focus" component is created
    // You can modify variables here
    next(vm => {
      // Access the Vue component instance (vm) and modify its variables
      vm.someVariable = 'New Value'; // Modify your variable here
    });
  },

  methods: {
    switchToInsights() {
      this.insightsPage = true;
    },
    switchToFocus() {
      this.insightsPage = false;
    },
    async checkWeather() {
      const apiKey = "0448f72af4824d5ad3d358a845efaa01";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=Singapore";

      try {
        const response = await fetch(apiUrl + `&appid=${apiKey}`);
        const data = await response.json();

        this.weather.temp = data.main.temp;
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    },

    toggleCalculator() {
      this.showCalculator = !this.showCalculator;
    },
    checkPage() {
      this.pageLoad = false;
      if (this.insightsPage == false) {
        var insights = document.getElementById("insightsPage");
        insights.style.color = "black";
        insights.style.borderBottom = "solid #000000 2px";

        var focus = document.getElementById("focusPage");
        focus.style.color = "gray";
        focus.style.borderBottom = "solid gray 1px";
      } else {
        focus = document.getElementById("focusPage");
        focus.style.color = "black";
        focus.style.borderBottom = "solid #000000 2px";

        insights = document.getElementById("insightsPage");
        insights.style.color = "gray";
        insights.style.borderBottom = "solid gray 1px";
      }
      this.insightsPage = !this.insightsPage;
    },
  },

  mounted() {
    this.checkWeather();
    this.store.dispatch("fetchAllEvents");
    let time = document.getElementById("current-time");
    setInterval(() => {
      let d = new Date();
      time.innerHTML = d.toLocaleTimeString();
    }, 1000);
  },
};
</script>

<style lang="scss">
@import "~primeflex/primeflex.css";

body {
  // background: #e1e7ec;
  background: #f8f9fd;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
}

//others
.boxClicked {
  background-color: transparent;
  text-decoration: none !important;
  color: black;
  border-bottom: solid #000000 2px;
}

.boxNotClicked {
  background-color: transparent;
  text-decoration: none !important;
  color: gray;
  border-bottom: solid gray 1px;
}
#insights {
  background-color: transparent;
  border: none;
  border-bottom: 1px #000000;
  color: black;
}

.datetime {
  font-family: "Poppins", sans-serif;
  font-size: xxx-large;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
}

.card {
  width: 90%;
  max-width: 470px;
  color: #fff;
  margin: 100px auto 0;
  border-radius: 20px;
  padding: 40px 35px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 20px 50px rgba(0, 5, 24, 0.4);
}
.scrollable-container {
  height: 100vh;
  overflow-y: auto;
}
.weather {
  height: auto;
  top: 50%;
}
.weather h1 {
  font-size: 60px;
  font-weight: 500;
  text-align: right;
  margin: auto;
}
.weather h2 {
  font-size: 35px;
  font-weight: 400;
  margin: auto;
  text-align: right;
}
.col {
  display: flex;
  align-items: center;
  text-align: left;
}
.calculator {
  width: 350px;
  background-color: #15173c;
  padding: 40px 20px;
  position: relative;
  border-radius: 8px;
}
.display {
  width: 100%;
}
.display input {
  width: 100%;
  padding: 10px 5px;
  text-align: right;
  border: none;
  background-color: transparent;
  color: #ffffff;
  font-size: 25px;
}
.display input::placeholder {
  color: #9490ac;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 20px;
  margin-top: 40px;
}
.buttons input[type="button"] {
  font-size: 18px;
  padding: 10px 12px;
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  border-radius: 5px;
}
.col{
    // display:flex;
    align-items:center;
    text-align:left;
}
.buttons input[type="button"]:hover {
  box-shadow: 0 8px 25px #000d2e;
}
input[type="button"]#equal {
  grid-row: span 2;
  font-size: 20px;
  padding: 17px 20px;
  background-color: #f9544c;
}
input[type="button"][value="0"] {
  grid-column: span 2;
}
.dashboard-content {
  padding-top: 40px;
}
</style>
