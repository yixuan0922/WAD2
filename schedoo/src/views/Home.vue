<template>
  <div class="surface-ground px-4 py-5 md:px-6 lg:px-8 scrollable-container">
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-12">
        <div
          class="surface-card shadow-2 p-3 border-round"
          style="height: 150px; content-justify: center; align-items: center"
        >
          <div id="current-time" class="datetime">{{ runningTime }}</div>
          <p>{{currentDate}}</p>

          <div>
            <!-- <div class="weather">
              <h1 class="temp">22°C</h1>
            </div> -->
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
        <div class="surface-card shadow-2 p-3 border-round" style="display:flex; flex-direction: column; align-items: center;">
          <!-- <div class="piechart-container" style="width: 400px; height: 400px;">
            <div id="pieChart" style="width: 200px;"></div> -->
          <!-- </div> -->
        </div>
      </div>
      <div class="col-4 md:col-6 lg:col-4">
        <div class="surface-card shadow-2 p-3 border-round">
          <div class="flex justify-content-between mb-3"></div>
          <link rel="alternate" type="application/json+oembed" href="https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F5eXZwvvxt3K2dxha3BSaAe" />
          <div v-html="spotifyEmbedHtml"></div>
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
      currentDate: new Date().toLocaleDateString(),
      weather: {
        temp: null, // Initialize with null or a default value
      },
       spotifyEmbedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`,
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
      { x: "Monday", y: 10 },
      { x: "Tuesday", y: 20 },
      { x: "Wednesday", y: 15 },
      {x: "Thursday", y: 20},
      {x: "Friday", y: 30},
      {x: "Saturday", y: 20}, 
      {x: "Sunday",y: 10},
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

    // var donutData = [{
    //   values: [16, 15, 12, 6, 5, 4, 42],
    //   labels: ['Personal', 'Study', 'CCA', 'Classes', 'Work', 'Meetings', 'Others' ],
    //   domain: {column: 0},
    //   name: "Time", 
    //   hoverinfo:"label+percent+name",
    //   hole: .4,
    //   type: "pie"
    // }];

    // var donutLayout = {
    //   title: "Target number of hours to spend for each activity",
    //   annotations:[
    //     {
    //       font:{
    //         size: 18
    //       },
    //       showarrow: false, 
    //       text: 'Hours',
    //       x: 0.17,
    //       y: 0.5,
    //       xref: 'paper',
    //       yref: 'paper',
    //     },
    //   ],
    //   height: 400,
    //   width: 550,
    //   showlegend: false,
    //   grid:{rows:1, columns: 2},

    //   // margin:{
    //   //   l:10,
    //   //   r: 10,
    //   //   t:10,
    //   //   b:10
    //   // }
    // };

    // Plotly.newPlot('pieChart', donutData, donutLayout)
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
