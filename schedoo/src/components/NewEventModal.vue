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
                style="border-radius: 5px;"
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
            <br>
            <div class="inviteesEmail">
                <div
                  v-for="(invitee, index) in this.$store.state.invitees"
                  :key="index"
                >
                  {{ invitee.email }}
              </div>
              <p>{{ addInviteeErr }}</p>
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
