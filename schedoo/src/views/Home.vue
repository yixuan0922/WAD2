<template>
  <div>
  <Nav/>
  <div class="dashboard-content">
  <div class="surface-ground px-4 py-5 md:px-6 lg:px-8 scrollable-container">
    <div class="grid">
      <div class="col-12 md:col-6 lg:col-12">
        <div
          class="surface-card shadow-2 p-3 border-round"
          style="height: 150px; content-justify: center; align-items: center"
        >
          <div id="current-time" class="datetime">{{ runningTime }}</div>
          <p>{{ currentDate }}</p>

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
        
          <!-- <div class="piechart-container" style="width: 400px; height: 400px;">
            <div id="pieChart" style="width: 200px;"></div> -->
          <!-- </div> -->
          <div class="calculator">
            <div class="display">
              <input type="text" placeholder="0" id="input" disabled />
            </div>
            <div class="buttons">
              <!-- Full Erase -->
              <input type="button" value="AC" id="clear" />
              <!-- Erase Single Value -->
              <input type="button" value="DEL" id="erase" />
              <input type="button" value="/" class="input-button" />
              <input type="button" value="*" class="input-button" />
              <input type="button" value="7" class="input-button" />
              <input type="button" value="8" class="input-button" />
              <input type="button" value="9" class="input-button" />
              <input type="button" value="-" class="input-button" />
              <input type="button" value="6" class="input-button" />
              <input type="button" value="5" class="input-button" />
              <input type="button" value="4" class="input-button" />
              <input type="button" value="+" class="input-button" />
              <input type="button" value="1" class="input-button" />
              <input type="button" value="2" class="input-button" />
              <input type="button" value="3" class="input-button" />
              <input type="button" value="=" id="equal" />
              <input type="button" value="0" class="input-button" />
              <input type="button" value="." class="input-button" />
            </div>
        </div>
      </div>
      <div class="col-4 md:col-6 lg:col-3">
        <!-- <div class="surface-card shadow-2 p-3 border-round">
            <div class="flex justify-content-between mb-3"></div> -->
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
import Plotly from "plotly.js-dist-min";
export default {
  components:{
    Nav,
  },
  data() {
    return {
      date: new Date(),
      currentDate: new Date().toLocaleDateString(),
      weather: {
        temp: null, // Initialize with null or a default value
      },
      spotifyEmbedHtml: `<iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/0vvXsWCC9xrXsKd4FyS8kM?utm_source=generator" width="120%" height="352" box-shadow="0 20px 50px rgba(0, 5, 24, 0.4)" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" margin-left=-50px></iframe>`,
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

    //   // margin:{
    //   //   l:10,
    //   //   r: 10,
    //   //   t:10,
    //   //   b:10
    //   // }
    // };

    // Plotly.newPlot('pieChart', donutData, donutLayout)

   
    
    let equal_pressed = 0;
//Refer all buttons excluding AC and DEL
let button_input = document.querySelectorAll(".input-button");
//Refer input,equal,clear and erase
let input = document.getElementById("input");
let equal = document.getElementById("equal");
let clear = document.getElementById("clear");
let erase = document.getElementById("erase");

window.onload = () => {
  input.value = "";
};

//Access each class using forEach
button_input.forEach((button_class) => {
  button_class.addEventListener("click", () => {
    if (equal_pressed == 1) {
      input.value = "";
      equal_pressed = 0;
    }
    //display value of each button
    input.value += button_class.value;
  });
});

//Solve the user's input when clicked on equal sign
equal.addEventListener("click", () => {
  equal_pressed = 1;
  let inp_val = input.value;
  try {
    //evaluate user's input
    let solution = eval(inp_val);
    //True for natural numbers
    //false for decimals
    if (Number.isInteger(solution)) {
      input.value = solution;
    } else {
      input.value = solution.toFixed(2);
    }
  } catch (err) {
    //If user has entered invalid input
    alert("Invalid Input");
  }
});

//Clear Whole Input
clear.addEventListener("click", () => {
  input.value = "";
});
//Erase Single Digit
erase.addEventListener("click", () => {
  input.value = input.value.substr(0, input.value.length - 1);
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
.dashboard-content{
  padding-top:40px;
}

</style>
