<template>
  <div>
    <fieldset class="container">
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
            <div class="col-sm-6">
              <select
                id="category"
                v-model="category"
                placeholder="Select a category"
              >
                <option value="event">Event</option>
                <option value="class">Class</option>
                <option value="exams">Exams</option>
                <option value="invites">Invites</option>
              </select>
            </div>
            <div class="col-sm-6">
              <input
                id="taskName"
                type="text"
                class="form-control"
                placeholder="Enter a task name"
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
            <label for="autocomplete" class="form-label"
              >Location or Video Call</label
            ><br />
            <div
              class="ui icon big input"
              id="locator-input-section"
              style="width: 100%"
            >
              <input
                id="autocomplete"
                type="text"
                class="form-control"
                placeholder="Enter Location or Video Call link"
                ref="location"
              />
              <i
                aria-hidden="true"
                class="dot circle outline link icon"
                id="locator-button"
                @click="locatorButtonPressed()"
              ></i>
            </div>
          </div>
        </div>

        <!-- right column -->
        <div class="col-lg-6">
          <div class="mb-3">
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

          <!-- Repeat toggle -->
          <!-- <p type="text" class="form-control" style="padding-top: 8.5px">
            Repeat
            <label
              class="switch"
              style="float: right; margin-right: 16px; padding-bottom: 4px"
            >
              <input id="toggleRepeat" type="checkbox" checked />
              <span class="slider round"></span>
            </label>
          </p> -->

          <!-- Add Invitees -->
          <div class="mb-3" v-if="category === 'event'">
            <label for="invitees" class="form-label">Add Invitees</label>
            <br />
            <div class="row mx-auto" style="width: 100%; display: flex">
              <!-- <div style="height: 100%; display: flex; padding: 0"> -->
              <input
                class="col"
                style="border-radius: 5px"
                id="emails-input"
                placeholder="Enter email(s) here"
                type="text"
                v-model="newInvitee"
                @input="clearError"
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
              <!-- </div> -->
            </div>
            <br />
            <div class="inviteesEmail">
              <div
                v-for="(invitee, index) in this.$store.state.invitees"
                :key="index"
              >
                {{ invitee.email }}
              </div>
              <p>{{ addInviteeErr }}</p>
              <button
                @click="recommendTimeSlots"
                :disabled="!this.$store.state.invitees.length"
              >
                Find Timeslot
              </button>
              <div class="mb-3">
                <label for="recommendations" class="form-label"
                  >Recommendations</label
                >
                <div id="recommendations"></div>
              </div>
            </div>
            <!-- <div class='col col-6'>Start: <input type="date" v-model="start"><input type="time" v-model="startTime"></div>
            <div class='col col-6'>End: <input type="date" v-model="end"><input type="time" v-model="endTime"></div> -->
          </div>
        </div>
      </div>

      <!-- Buttons -->
      <div class="row" style="justify-content: flex-end; margin-top: 10px">
        <button
          class="col-2 btn btn-light"
          style="width: 66px; margin-right: 10px"
          @click="this.$emit('close-modal')"
        >
          Cancel
        </button>
        <button
          class="col-2 btn btn-primary buttonSave"
          style="width: 66px"
          @click="addEvent"
        >
          Add
        </button>
      </div>
    </fieldset>
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
  }),
  methods: {
    clearError() {
      this.addInviteeErr = "";
    },
    async addInvitee() {
      if (this.newInvitee) {
        // console.log(this.newInvitee);
        // this.invitees.push(this.newInvitee);

        console.log(this.$store.state.invitees);
        if (this.$store.state.invitees.includes(this.newInvitee)) {
          console.log(this.$store.state.invitee_exist);
          this.addInviteeErr = "Invitee already added";
        } else {
          await this.$store.dispatch("checkInvitee", this.newInvitee);
          if (this.$store.state.invitee_exist == false) {
            this.addInviteeErr = "Invitee does not exist";
          }
        }
      }
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

      let event = {
        id: new Date().getTime(),
        title: this.title,
        start: start,
        end: end,
        allDay: this.allDay,
        invitees: [],
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
      return `${day}-${month}-${year}`;
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
      const unavailableSlotsInput = formatInviteeEventTimes(); //from created function to retrieve an array of unavailable dates and timings
      const startDate = formatDate(new Date()); //start date of finding available dates and timings (current date and timing)
      const endDate =formatDate( new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000)); //end date of finding available dates and timings
      const startTime = "08:00"; //start time of finding available timings
      const endTime = "22:00"; //end time of finding available timings
      const unavailableSlots = unavailableSlotsInput
        .split(", ")
        .map((slot) => slot.trim());

      const availableDateTimeOptions = findAvailableDateTimeOptionsInRange(
        unavailableSlots,
        startDate,
        endDate,
        startTime,
        endTime
      );

      const availableDateTimeOptionsContainer = availableDateTimeOptions;
      availableDateTimeOptionsContainer.innerHTML = ""; // Clear previous content

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
      // console.log(currentDate); 
      const endDateTime = new Date(endDate);
      const endHour = parseInt(endTime.split(":")[0]);
      let endMinute = parseInt(endTime.split(":")[1]); // Declare endMinute here

      while (currentDate <= endDateTime) {

        for (
          let hour = parseInt(startTime.split(":")[0]);
          hour <= endHour;
          hour++
        ) {
          const startMinute =
            hour === parseInt(startTime.split(":")[0])
              ? parseInt(startTime.split(":")[1])
              : 0;
          endMinute = hour === endHour ? endMinute : 59;
          
          for (let minute = startMinute; minute <= endMinute; minute++) {
            // console.log(a);
            const currentDateString = currentDate.toLocaleDateString();
            const currentTimeString =
              hour.toString().padStart(2, "0") +
              ":" +
              minute.toString().padStart(2, "0");

            let slotUnavailable = false;
            for (const slot of unavailableSlots) {
              console.log(slot);
              if (
                slot.includes(currentDateString) &&
                slot.includes(currentTimeString)
              ) {
                slotUnavailable = true;
                break;
              }
            }
            
            // console.log(slotUnavailable);
            if (!slotUnavailable) {
              availableDateTimeOptions.push(
                currentDateString + ": " + currentTimeString
              );
            }
          }
        }

        currentDate.setDate(currentDate.getDate() + 1);
      }
      // console.log(availableDateTimeOptions);
      return availableDateTimeOptions;
    },

    //display timeslot
    recommendTimeSlots() {
      const selectedDate = document.getElementById("startDate").value;
      const unavailableSlots = this.formatInviteeEventTimes();
      const availableSlotsInput = this.findAvailableDateTimeOptionsInRange(
        unavailableSlots, //create function to create array of unavailable slots
        document.getElementById("startDate").value,
        document.getElementById("endDate").value,
        "08:00", // start of finding available dates and timings
        "22:00" // end of finding available dates and timings
      );
      const meetingDuration =
        parseInt(document.getElementById("startTime").value, 10) -
        parseInt(document.getElementById("endTime").value, 10); //math to find the meeting duration
      const minGap = 10; //fixed
      const startTime = "08:00"; // start of finding available dates and timings
      const endTime = "22:00"; // end of finding available dates and timings

      // Extract the date part from the selected date
      const datePart = selectedDate;
      const day = new Date(selectedDate).toLocaleString("en-US", {
        weekday: "short",
      }); // Get the day name

      const recommendations = [];

      // Search for available time slots that match the selected date
      const pattern = new RegExp(`${datePart}:\\s(\\d+:\\d+-\\d+:\\d+)`, "g");
      let matches;
      while ((matches = pattern.exec(availableSlotsInput)) !== null) {
        const slot = matches[1];
        const [start, end] = slot.split("-");
        const [startHour, startMinute] = start.split(":").map(Number);
        const [endHour, endMinute] = end.split(":").map(Number);

        let currentTime = new Date(0);
        currentTime.setHours(startHour, startMinute);

        while (
          currentTime.getHours() < endHour ||
          (currentTime.getHours() === endHour &&
            currentTime.getMinutes() < endMinute)
        ) {
          const nextTime = new Date(
            currentTime.getTime() + meetingDuration * 60000
          );
          const currentTimeStr = `${datePart}: ${day}: ${currentTime.getHours()}:${String(
            currentTime.getMinutes()
          ).padStart(2, "0")}`;
          if (
            nextTime.getHours() < endHour ||
            (nextTime.getHours() === endHour &&
              nextTime.getMinutes() <= endMinute)
          ) {
            // Check if the current time is within the preferred time range
            if (isWithinTimeRange(currentTime, startTime, endTime)) {
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
          const col = document.createElement("div");
          col.className = "col-md-4"; // Use the grid system for columns (Bootstrap 4)
          col.innerHTML = `
                        <div class="card mb-3">
                            <div class="card-body">
                                <h5 class="card-title">Recommended Time Slot</h5>
                                <p class="card-text">${recommendation}</p>
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

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          loader.load().then(async () => {
            const { Map } = await google.maps.importLibrary("maps");

            const autocomplete = new google.maps.places.Autocomplete(
              document.getElementById("autocomplete"),
              {
                bounds: new google.maps.LatLngBounds(
                  // current coords
                  new google.maps.LatLng(
                    position.coords.latitude,
                    position.coords.longitude
                  )
                ),
              }
            );

            autocomplete.addListener("place_changed", () => {
              // cyx store in firebase pls thanks :)
              console.log(autocomplete.getPlace());
              this.getCoord(autocomplete.getPlace());
            });
          });
        },
        (error) => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Your browser does not support Geolocation");
    }

    const loader = new Loader({
      apiKey: "AIzaSyDRsyQe3YsYSKVP_AQakrP7nSiZ4wAE7ik",
      libraries: ["places"],
    });

    // Load your external scripts dynamically when the component is mounted
    // this.loadScripts([
    //   "https://www.googletagmanager.com/gtag/js?id=UA-23581568-13",
    //   "https://maps.googleapis.com/maps/api/js?key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8&libraries=places&callback=Function.prototype",
    // ]);

    // Load your stylesheets dynamically
    this.loadStylesheets([
      "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css",
      "https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css",
    ]);
  },
};

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
</style>
