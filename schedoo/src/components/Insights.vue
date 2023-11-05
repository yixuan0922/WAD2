<template>
  <div>
    <div class="container-fluid col-lg-12 px-5 scrollable-container">
      <div class="col-lg-12" style="margin-top: 20px">
        <!-- Add Faith's Insights -->
        <div class="row">
          <div
            class="line-chart-container col-lg-5 shadow-3"
            style="
              margin-right: 30px;
              margin-bottom: 20px;
              height: 430px;
              background-color: #ffffff;
              border-radius: 15px;
            "
          >
            <div id="line-chart" style="height: 400px; width: 400px"></div>
          </div>
          <div class="col-lg-6 barcharts-container shadow-3" style="background-color: #FFFFFF; border-radius: 15px; height: 430px">
                    <div id="barcharts" style="height: 400px; width: 500px;"></div>
                </div>
          <!-- <div>
                    <button class="calculatorButton" @click="toggleCalculator">Calculator</button>
                    <Calculator v-if="showCalculator"/>
                    </div> -->
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
      spotifyEmbedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator" height="320px" width="100%" box-shadow="0 20px 50px rgba(0, 5, 24, 0.7)" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" margin-left=-50px></iframe>`,
      insightsPage: true,
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

    insertNum(num) {
      const inputField = document.getElementById("input");
      inputField.textContent += num;
    },

    eraseNum() {
      this.inputText = this.inputText.slice(0, -1);
    },

    clearInput() {
      this.inputText = "";
    },

    equalTo() {
      try {
        this.inputText = eval(this.inputText);
      } catch (error) {
        console.error(error);
        // Handle error as needed
      }
    },
    checkPage() {
      this.insightsPage = !this.insightsPage;
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
      { x: "Thursday", y: 20 },
      { x: "Friday", y: 30 },
      { x: "Saturday", y: 20 },
      { x: "Sunday", y: 10 },
    ];

    const lineChart = document.getElementById("line-chart");
    Plotly.newPlot(
      lineChart,
      [
        {
          x: lineData.map((d) => d.x),
          y: lineData.map((d) => d.y),
          type: "line",
          line: {color: '#f6a192'}
        },
      ],
      {
        title: "Study hours the past week",
        xaxis: {
          title: "Days",
        },
        yaxis: {
          title: "Hours",
        },
      }
    );

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

    // margin:{
    //   l:10,
    //   r: 10,
    //   t:10,
    //   b:10
    // }
    // };

    // Plotly.newPlot('pieChart', donutData, donutLayout)

    var goals = {
      x: ["Personal", "Study", "CCA", "Classes", "Work", "Meetings"],
      y: [20, 14, 23, 30, 30, 40],
      name: "Goals",
      type: "bar",
      marker: {
        color: '#F6a192'
      }
    };

    var actual = {
      x: ["Personal", "Study", "CCA", "Classes", "Work", "Meetings"],
      y: [12, 18, 29, 30, 20, 40],
      name: "Actual",
      type: "bar",
      marker :{
        color: '#F6c492'
      }
    };

    var barData = [goals, actual];

    var barLayout = { barmode: "group" , 
                      title: "Goals"
                    };

    Plotly.newPlot("barcharts", barData, barLayout);
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
