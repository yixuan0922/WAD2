<template>
  <div class="surface-ground px-4 py-5 md:px-6 lg:px-8 scrollable-container">
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-12">
        <div
          class="surface-card shadow-2 p-3 border-round"
          style="height: 150px; content-justify: center; align-items: center"
        >
          <div id="current-time" class="datetime">{{ runningTime }}</div>

          <div>
            <div class="weather">
              <h1 class="temp">22°C</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="grid">
      <div class="col-4 md:col-6 lg:col-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="line-chart-container">
            <div id="line-chart" style="width: 400px; height: 400px"></div>
          </div>
        </div>
      </div>
      <div class="col-4 md:col-6 lg:col-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3"></div>
        </div>
      </div>
      <div class="col-4 md:col-6 lg:col-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3"></div>
          <span class="text-green-500 font-medium"> </span>
          <span class="text-500"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plotly from "plotly.js-dist-min";
export default {
  data() {
    return {
      date: new Date(),
      weather: {
        temp: null, // Initialize with null or a default value
      },
    };
  },

  methods: {
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
  },

  mounted() {
    this.checkWeather();

    let time = document.getElementById("current-time");
    setInterval(() => {
      let d = new Date();
      time.innerHTML = d.toLocaleTimeString();
    }, 1000);

    const lineData = [
      { x: 1, y: 10 },
      { x: 2, y: 20 },
      { x: 3, y: 15 },
    ];

    const lineChart = document.getElementById("line-chart");
    Plotly.newPlot(lineChart, [
      {
        x: lineData.map((d) => d.x),
        y: lineData.map((d) => d.y),
        type: "line",
      }
    ], {
        title: "Study hours the past week",
        xaxis: {
          title: "Days",
        },
        yaxis: {
          title: "Hours",
        }
    });
  },
};
</script>

<style lang="scss">
@import "~primeflex/primeflex.css";

body {
  // background: #e1e7ec;
  background: #ffffff;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
}

//others

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
</style>
