<template>
  <div>
    <fieldset class="container modal-container" :class="{ 'no-scroll': !isScrollable }">
      <legend class="row" style="margin-bottom: 20px; width: 100%">
        <h1 style="text-align: left">Add Event</h1>
      </legend>
      <!-- <b>ID:</b>{{ event.id }} <br/> -->
      <!-- <b>Start:</b> {{ event.start }} <br />
      <b>End:</b> {{ event.end }} <br /> -->
      <!-- </fieldset>
    <fieldset> -->
      <!-- <legend>Add event</legend> -->
      <div class="row" style="text-align: start">
        <div class="col-lg-6">
          <div class="row mb-3">
            <div class="col-sm-5">
              <select
                id="category"
                v-model="category"
                placeholder="Select a category"
              >
                <option value="event">Event</option>
                <option value="study">Study</option>
                <option value="cca">CCA</option>
                <option value="personal">Personal</option>
              </select>
            </div>
            <div class="col-sm-7 mt-1">
              <input
                id="taskName"
                type="text"
                class="form-control"
                placeholder="Enter an evemt name"
                v-model="title"
              />
            </div>
          </div>

          <div class="mb-3">
            <label for="agenda" class="form-label">Agenda</label><br />
            <textarea
              id="agenda"
              name="agenda"
              class="form-control"
              placeholder="Enter agenda of task"
              style="height: 108px; width: 100%"
            ></textarea>
          </div>

          <div class="mb-3">
            <label for="locationAPI" class="form-label"
              >Location or Video Call</label
            ><br />
            <div
              class="ui icon big input"
              id="locator-input-section"
              style="width: 100%"
            >
              <input
                id="locationAPI"
                type="text"
                class="form-control"
                placeholder="Enter Location or Video Call link"
                v-on:keyup="autoComplete()"
              />
              <i
                aria-hidden="true"
                class="dot circle outline link icon"
                id="locator-button"
                @click="locateMe()"
              ></i>
            </div>
          </div>
        </div>

        <!-- right column -->
        <div class="col-lg-6">
          <div class="mb-3"  style="margin-right:0;">
            <!-- All day toggle -->
            <p type="text" class="form-control" style="padding-top: 8.5px">
              All Day:
              <label
                class="switch"
                style="float: right; margin-right: 16px; padding-bottom: 4px"
              >
                <input id="toggleAllDay" type="checkbox" v-model="allDay" />
                <span class="slider round"></span>
              </label>
            </p>

            <!-- Start Date -->
            <div type="text" class="form-control">
              <div class="row">
                <p class="col-sm-7" style="padding-top: 4px">Start Date</p>
                <input
                  class="col-sm-5"
                  type="date"
                  id="startDate"
                  style="
                    float: right;
                    text-align: end;
                    margin-right: 0px;
                    padding-bottom: 4px;
                  "
                  v-model="start"
                />
              </div>
            </div>

            <div type="text" class="form-control" v-show="!allDay">
              <div class="row">
                <p class="col-sm-7" style="padding-top: 4px">Start Time</p>
                <input
                  class="col-sm-5"
                  type="time"
                  id="startTime"
                  style="
                    float: right;
                    text-align: end;
                    margin-right: 0px;
                    padding-bottom: 4px;
                  "
                  v-model="startTime"
                />
              </div>
            </div>
            <br />

            <!-- End Date -->
            <div type="text" class="form-control">
              <div class="row">
                <p class="col-sm-7" style="padding-top: 4px">End Date</p>
                <input
                  class="col-sm-5"
                  type="date"
                  id="endDate"
                  style="
                    float: right;
                    text-align: end;
                    margin-right: 0px;
                    padding-bottom: 4px;
                  "
                  v-model="end"
                />
                <!-- <input type="time" v-model="endTime" v-show="!allDay" /> -->
              </div>
            </div>

            <div type="text" class="form-control" v-show="!allDay">
              <div class="row">
                <p class="col-sm-7" style="padding-top: 4px">End Time</p>
                <input
                  class="col-sm-5"
                  type="time"
                  id="endTime"
                  style="
                    float: right;
                    text-align: end;
                    margin-right: 0px;
                    padding-bottom: 4px;
                  "
                  v-model="endTime"
                />
              </div>
            </div>
          </div>

          <!-- Add Invitees -->
          <div class="mb-3">
            <label for="invitees" class="form-label">Add Invitees</label>
            <br />
            <div class="row mx-auto" style="width: 100%; display: flex">
              <input
                  class="col"
                  style="border-radius: 5px"
                  id="emails-input"
                  placeholder="Enter email(s) here"
                  type="text"
                  v-model="newInvitee"
                  @keyup.enter="addInvitee"
                /><button
                  class="col-2 btn btn-primary"
                  style="
                    height: 40px;
                    padding: 6px !important;
                    justify-content: center;
                  "
                  @click="addInvitee"
                >
                  +
                </button>
            </div>
            <br />
            <div class="inviteesEmail">
              <div
                v-for="invitee in inviteeList"
                :key="invitee.index"
              >
              <button v-on:click="removeInvitee(invitee)" style="margin-bottom: 3px; background-color: white; color: gray; border: solid gray 1px; border-radius: 20px; height: 34px; width: auto; padding: 2px; padding-left: 7px; padding-right: 7px;">{{ invitee }} <i class="fa-solid fa-xmark" style="color: gray;"></i></button>
              </div>
              <p>{{ addInviteeErr }}</p>
              
            </div>
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="row" v-if="this.inviteeList.length > 0" style="justify-content: flex-end; margin-top: 10px; padding: 0px;">
        <button 
          @click="recommendTimeSlots"
          :disabled="!this.$store.state.invitees.length"
          style="width: 80%; margin: auto;"
          v-if="category === 'event'"
        >
          Find Timeslot
        </button>
        <div class="mb-3">
          <label for="recommendations" class="form-label"
            >Recommendations</label
          >
          <div id="recommendations" v-if="category === 'event'"></div>
        </div>
      </div>
      <div class="row" style="justify-content: flex-end; margin-top: 10px; padding: 0px;">
        <button
          class="col-2 btn btn-light"
          style="width: 66px; margin-right: 10px"
          @click="this.$emit('close-modal')"
        >
          Cancel
        </button>
        <button
          class="col-2 btn btn-primary buttonSave"
          style="width: 66px; margin-right: 12px"
          @click="addEvent"
        >
          Add
        </button>
      </div>
    </fieldset>
  </div>
  <div class="createEventValidation"> 
      <button type="button" class="btn-close" @click="closeDialog()" style="float: right; margin-right: 0px;" aria-label="Close"></button><br> 
      <div style="text-align: start; top: 0px; color: black;">
        <h2>Just a second!</h2> 
        <span v-if="this.requiredEventValidation != ''">{{ this.requiredEventValidation }}</span> <br v-if="this.requiredEventValidation != ''">
        <span v-if="this.dateValidation != ''"> {{ this.dateValidation }}</span>
      </div>
      <button class="btn btn-primary" style="float: right; margin-right: 0px; margin-top:3px;" @click="closeDialog()">Ok</button> 
  </div>
  <div id="custom-dialog" class="dialog" style="display: none;">
      <button type="button" class="btn-close" @click="closeLocationDialog()" style="float: right; margin-right: 0px;" aria-label="Close"></button><br>
      <p>This file wants to know your location</p>
      <button class="btn btn-primary" style="margin-right: 4px;" @click="allow()">Allow</button>
      <button class="btn btn-primary" style="margin-left: 4px;" @click="block()">Block</button>
  </div>
</template>

<script>
// import { Store } from 'vuex';
/* eslint-disable */
import { Loader } from "@googlemaps/js-api-loader";

export default {
  data: () => ({
    title: "",
    start: {},
    end: {},
    startTime: "",
    endTime: "",
    allDay: false,
    newInvitee: "",
    addInviteeErr: "",
    category: "event",
    selectedCoord: {},
    isScrollable: false, // Add a flag to determine scrollability,
    dateValidation: '', //add
    requiredEventValidation: '', //add
    inviteeList: [], //add
  }),
  methods: {
    async addInvitee() {
      if (this.newInvitee != '') {
        this.addInviteeErr = "";

        // check if invitee already added
        if (this.inviteeList.includes(this.newInvitee) == true){
          this.addInviteeErr = 'Invitee already added';
        }

        // if invitee not added
        else{
          // check if email inputted
          var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
          if (this.newInvitee.match(validRegex)) {
            // add to firebase
            this.$store.dispatch("checkInvitee", this.newInvitee);
            this.inviteeList.push(this.newInvitee);
          } else{
            this.addInviteeErr = "Incorrect email format. Try again.";
          }
        }
        this.newInvitee = "";
      }
    },
    // add
    removeInvitee(invitee){
      var idx = this.inviteeList.indexOf(invitee);
      this.inviteeList.splice(idx,1);
    },
    // add
    closeDialog() {
        var dialog = document.getElementsByClassName('createEventValidation')[0];
        dialog.style.display = 'none';
    },
    addEvent() {
      let start = new Date(this.start);
      let end = new Date(this.end);
      if (!this.allDay) {
        let [startHours, startMinutes] = this.startTime.split(":");
        let [endHours, endMinutes] = this.endTime.split(":");
        start.setHours(startHours, startMinutes);
        end.setHours(endHours, endMinutes);
      }
      
      // add
      // validation: start date < end date
      if (start >= end){
        this.dateValidation = 'End date must be after start date';
      } else{
        this.dateValidation = '';
      } 
      
      // replace
      // validation: check mantory fields
      if (this.title == ''){
        this.requiredEventValidation = 'Enter an evemt name';
      } else {
        this.requiredEventValidation = '';
      }
      if (this.dateValidation == '' && this.requiredEventValidation == ''){
        let event = {
            id: (new Date()).getTime(),
            title: this.title,
            start: start,
            end: end,
            allDay: this.allDay,
            invitees: [],
            category: this.category
        };

        for (let invitee of this.$store.state.invitees) {
          let inviteeData = {
            id: invitee.id,
            email: invitee.email,
            status: "pending",
          };
          event.invitees.push(inviteeData);
        }
        console.log("invitees", event.invitees);
        console.log("event", event);

        // this.$store.commit("ADD_EVENT", event);
        this.$store.dispatch("addEvent", event);
        this.$emit("close-modal");
      } else{
        // if have errors
        document.getElementsByClassName('createEventValidation')[0].style.display = 'block';
      }
      
    },
    getCoord(placeObj) {
      const obj = placeObj.geometry.location;
      this.selectedCoord = { lat: obj.lat(), lng: obj.lng() };
      console.log(this.selectedCoord);
    },
    loadStylesheets(links) {
      links.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        document.head.appendChild(link);
      });
    },

    formatDate(date) {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },

    formatTime(date) {
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      return `${hours}:${minutes}`;
    },

    //to retrieve the array of unavailable dates of invitees and in the specific string format
    formatInviteeEventTimes() {
      const formattedTimes = [];

      for (const invitee of this.$store.state.invitees) {
        for (const event of invitee.events) {
          const startTime = new Date(event.start);
          const endTime = new Date(event.end);

          const startDateString = formatDate(startTime);
          const startTimeString = formatTime(startTime);
          const endTimeString = formatTime(endTime);

          const formattedTime = `${startDateString}: ${startTimeString}-${endTimeString}`;
          formattedTimes.push(formattedTime);
        }
      }
      // console.log(formattedTimes.join(", "));

      return formattedTimes.join(", ");
    },

    //fnd available dates and timings
    findAvailableDateTimeOptions() {
      const unavailableSlotsInput = formatInviteeEventTimes(); //from created function to retrieve an array of unavailable dates and timings (in string)
      const startDate = formatDate(new Date()); //start date of finding available dates and timings (current date and timing)
      const endDate = formatDate(
        new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)
      ); //end date of finding available dates and timings
      const startTime = "10:00"; //start time of finding available timings
      const endTime = "20:00"; //end time of finding available timings
      const unavailableSlots = unavailableSlotsInput
        .split(", ")
        .map((slot) => slot.trim());

      const availableDateTimeOptions = findAvailableDateTimeOptionsInRange(
        unavailableSlots,
        startDate,
        endDate,
        startTime,
        endTime
      ); //array

      const availableDateTimeOptionsContainer = availableDateTimeOptions;
      availableDateTimeOptionsContainer.innerHTML = ""; // Clear previous content
      // console.log(availableDateTimeOptions.length);
      if (availableDateTimeOptions.length > 0) {
        availableDateTimeOptions.forEach((option) => {
          const p = document.createElement("p");
          p.textContent = option;
          availableDateTimeOptionsContainer.appendChild(p);
        });
      } else {
        availableDateTimeOptionsContainer.textContent =
          "No available date and time options found in the specified range.";
      }
    },

    findAvailableDateTimeOptionsInRange(
      unavailableSlots,
      startDate,
      endDate,
      startTime,
      endTime
    ) {
      const availableDateTimeOptions = [];
      const currentDate = new Date(startDate);
      const endDateTime = new Date(endDate);
      const endHour = parseInt(endTime.split(":")[0]);

      while (currentDate <= endDateTime) {
        for (
          let hour = parseInt(startTime.split(":")[0]);
          hour < endHour;
          hour++
        ) {
          const currentDateString = currentDate.toISOString().split("T")[0];
          const startRangeString = hour.toString().padStart(2, "0") + ":00";
          const endRangeString = (hour + 1).toString().padStart(2, "0") + ":00";

          let slotUnavailable = false;

          const slotUnavailableArray = unavailableSlots
            .split(",")
            .map((range) => range.trim());

          for (const slot of slotUnavailableArray) {
            if (
              slot.includes(currentDateString) &&
              (slot.includes(startRangeString) || slot.includes(endRangeString))
            ) {
              slotUnavailable = true;
              break;
            }
          }

          if (!slotUnavailable) {
            availableDateTimeOptions.push(
              currentDateString + ": " + startRangeString + "-" + endRangeString
            );
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
      return availableDateTimeOptions;
    },

    //display timeslot
    recommendTimeSlots() {
      const selectedDate = new Date(document.getElementById("startDate").value);
      // console.log(selectedDate);
      const unavailableSlots = this.formatInviteeEventTimes();
      const availableSlotsInput = this.findAvailableDateTimeOptionsInRange(
        unavailableSlots, //create function to create array of unavailable slots
        document.getElementById("startDate").value,
        document.getElementById("endDate").value,
        "10:00", // start of finding available dates and timings
        "20:00" // end of finding available dates and timings
      );
      const meetingDuration =
        ((parseInt(document.getElementById("endTime").value, 10) -
        parseInt(document.getElementById("startTime").value, 10))) * 60; //math to find the meeting duration
      const minGap = 15; //fixed
      const startTime = "10:00"; // start of finding available dates and timings
      const endTime = "20:00"; // end of finding available dates and timings

      // Extract the date part from the selected date
      const datePart = selectedDate.toISOString().split("T")[0];

      const recommendations = [];

      // Search for available time slots that match the selected date
      const pattern = new RegExp(`${datePart}:\\s(\\d+:\\d+-\\d+:\\d+)`, "g");
      // console.log(availableSlotsInput);
      const availableSlotsString = availableSlotsInput.join(", ");
      const matches = [...availableSlotsString.matchAll(pattern)];
      // console.log(matches)
      for (const match of matches) {
        const slot = match[1];
        const [start, end] = slot.split("-");
        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);
        // console.log(slot)

        let currentTime = new Date(0);
        currentTime.setHours(startHour, startMinute);
        // console.log(true);
        while (
          currentTime.getHours() < endHour ||
          (currentTime.getHours() === endHour &&
            currentTime.getMinutes() < endMinute)
        ) {
          const nextTime = new Date(
            currentTime.getTime() + meetingDuration * 60000
          );
          const currentTimeStr = `${datePart}: ${currentTime.getHours()}:${String(
            currentTime.getMinutes()
          ).padStart(2, "0")}`;

          if (
            nextTime.getHours() < endHour ||
            (nextTime.getHours() === endHour &&
              nextTime.getMinutes() <= endMinute)
          ) {
            // Check if the current time is within the preferred time range
            console.log(currentTime + startTime + endTime);
            if (isWithinTimeRange(currentTime, startTime, endTime)) {
              console.log(recommendations);
              recommendations.push(
                `${currentTimeStr} - ${nextTime.getHours()}:${String(
                  nextTime.getMinutes()
                ).padStart(2, "0")}`
              );
            }
          }
          currentTime = new Date(currentTime.getTime() + 60000 * minGap);
        }
      }

      // Randomize the recommendations
      recommendations.sort(() => 0.5 - Math.random());

      // Get the first three recommendations
      const randomRecommendations = recommendations.slice(0, 3);

      const recommendationsContainer =
        document.getElementById("recommendations");
      recommendationsContainer.innerHTML = ""; // Clear previous content

      if (randomRecommendations.length > 0) {
        // Display recommendations in Bootstrap cards
        
        randomRecommendations.forEach((recommendation) => {
          console.log(recommendation)
          const col = document.createElement("div");
          // col.className = "col-md-4"; // Use the grid system for columns (Bootstrap 4)
          col.className = "col"; // Use the grid system for columns (Bootstrap 4)
          col.innerHTML = `
                        <div class="card" style="transform: translateY(-100px);">
                            <div class="card-body" >
                                <h5 class="card-title" style="color: black;">Recommended Time Slot</h5>
                                <p class="card-text" style="color: black;">${recommendation}</p>
                                <button class="btn btn-primary" onclick="selectTimeSlot('${recommendation}')">Select</button>
                            </div>
                        </div>
                    `;

          recommendationsContainer.appendChild(col);
          
        });
      } else {
        recommendationsContainer.textContent =
          "No available time slots found within the preferred time range";
      }
    },

    toggleScrollability() {
      const modal = document.querySelector('.modal-container');
      if (modal.scrollHeight > window.innerHeight) {
        this.isScrollable = true;
        modal.classList.remove('no-scroll');
      } else {
        this.isScrollable = false;
        modal.classList.add('no-scroll');
      }
    },

    closeLocationDialog(){
      var dialog = document.getElementById('custom-dialog');
      dialog.style.display = 'none';
      var locatorSection = document.getElementById("locator-input-section");
      locatorSection.classList.remove("loading");
    },
    autoComplete(){
        var input = document.getElementById("locationAPI");
        var options = {
            componentRestrictions: { country: "sg" }
        };
        new google.maps.places.Autocomplete(input, options);
    },
    locateMe() {
        var locatorSection = document.getElementById("locator-input-section");
        locatorSection.classList.add("loading")
        var dialog = document.getElementById('custom-dialog');
        dialog.style.display = 'block';
        
    },

    allow() {
        navigator.geolocation.getCurrentPosition(function (position) {
            var dialog = document.getElementById('custom-dialog');
            var lat = position.coords.latitude;
            var long = position.coords.longitude;
            dialog.style.display = 'none';
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var address = JSON.parse(this.responseText)
                    var input = document.getElementById("locationAPI");
                    input.value = address.results[0].formatted_address
                }
            };
            xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8", true);
            xhttp.send();
            var locatorSection = document.getElementById("locator-input-section");
            locatorSection.classList.remove("loading");
        })
    },

    block() {
        var locatorSection = document.getElementById("locator-input-section");
        locatorSection.classList.remove("loading");
        alert("The Locator was denied :( Please add your address manually");
        var dialog = document.getElementById('custom-dialog');
        dialog.style.display = 'none';
    },
    loadScripts(sources) {
      sources.forEach((src) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = true;
          document.head.appendChild(script);
      });
    },
  },

  props: {
    text: String,
    event: Object,
  },
  mounted() {
    this.id = this.event.id;
    this.start = formatDate(this.event.start);
    this.end = formatDate(this.event.end);
    this.startTime = formatTime(this.event.start);
    this.endTime = formatTime(this.event.end);
    this.allDay = Boolean(this.event.allDay);
    this.$store.state.invitees = [];
    this.toggleScrollability();

    //Load your external scripts dynamically when the component is mounted
    this.loadScripts([
      "https://www.googletagmanager.com/gtag/js?id=UA-23581568-13",
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8&libraries=places&callback=Function.prototype",
    ]);

    // Load your stylesheets dynamically
    this.loadStylesheets([
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css",
    ]);
  },
};

function isWithinTimeRange(time, startTime, endTime) {
        //     const timeStr = time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        //     return timeStr >= startTime && timeStr <= endTime;
        // }
  const timeStr = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return timeStr >= startTime && timeStr <= endTime;
}

function formatDate(date) {
  // YYYY-MM-DD
  var options = { year: "numeric", month: "2-digit", day: "2-digit" };
  let string = date.toLocaleDateString("ko-KR", options).replace(/\. /g, "-");

  return string.substr(0, string.length - 1);
}

function formatTime(date) {
  // HH:MM
  let hours = date.getHours();
  let minutes = date.getMinutes();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  let time = `${hours}:${minutes}`;

  return time;
}
</script>

<style>
.createEventValidation { 
    display: none; 
    position: fixed; 
    top: 50%; 
    left: 50%; 
    border-radius: 10px; 
    transform: translate(-50%, -50%); 
    padding: 20px; 
    width: 450px; 
    background: #fff; 
    border: 1px solid #ccc; 
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}
.buttonSave {
  margin-left: 10px;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  color: darkcyan;
  border: 1px solid #ccc;
  resize: vertical;
}

.form-control,
#category,
input[type="text"] {
  height: 40px;
  border-color: DEDEDF;
  padding: auto;
  color: #808080;
}

#category {
  background-color: DodgerBlue;
  border-radius: 6px;
  max-height: 100%;
  margin-top: 3px;
  color: white;
}

/* For "All-day" and "Repeat" toggle button */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 34px;
}

#toggleAllDay {
  position: relative;
  opacity: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

/* Circle icon */
.slider:before {
  position: absolute;
  content: "";
  height: 17px;
  width: 17px;
  left: 4px;
  bottom: 3px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

#toggleAllDay:checked + .slider {
  background-color: #2196f3;
}

#toggleAllDay:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

#toggleAllDay:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(16px);
}

#toggleRepeat:checked + .slider {
  background-color: #2196f3;
}

#toggleRepeat:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

#toggleRepeat:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(16px);
}

/* Blue rounded-border rectangle */
.slider.round {
  border-radius: 34px;
  height: 22px;
  width: 40px;
}

.slider.round:before {
  border-radius: 50%;
}

/* For Date Time Picker */
#startDate,
#endDate,
#startTime,
#endTime {
  border: none;
  height: 30px;
}

#startDate,
#endDate,
#startTime,
#endTime:focus {
  border: none;
}

/* add invitees */
/* .emails.emails-input {
  max-height: inherit;
  border-radius: 0.25rem;
  background: #fff;
  border: 1px solid #c3c2cf;
  box-sizing: border-box;
  line-height: 1.5rem;
  cursor: text;
  overflow: auto;
} */

.emails.emails-input input {
  border: 0;
  line-height: inherit;
}

.emails.emails-input input::placeholder,
.emails.emails-input input::-ms-input-placeholder,
.emails.emails-input input:-ms-input-placeholder {
  color: #c3c2cf;
  opacity: 1;
}

.emails.emails-input input:focus {
  outline: none;
}

.modal-container{
  max-width: 100%;
  max-height: 80vh;
  overflow-x:hidden;
  overflow-y: auto;
  margin: 0 auto;
}

.modal-container.no-scroll{
  overflow-y:auto;
}
</style>
