<template>
    <div class="main">
      <fieldset>
        <legend>{{ event.title }}</legend>
        <!-- <b>Title:</b>  {{ event.title }} <br/> -->
        <b>Invited By:</b> {{ event.invitorEmail }} <br/>
        <b>Start:</b>  {{ event.start }} <br/>
        <b>End:</b>  {{ event.end }} <br/>
        <b>ID:</b>  {{ event.id }} <br/>
        <div class="invitees">
          <b>Invitees</b>
          <ul>
            <li v-for="(invitee, index) in event.invitees" :key="index">{{invitee.email + "(" + invitee.status + ")" + invitee.location}}</li>
          </ul><br/>
        </div>
      </fieldset>
      <fieldset>
          <!-- <legend>Provide your location</legend> -->
          <div class="container">
            <div class='row location'> 
              Provide your Location: <input id="autocomplete" type="text" />
            </div>
            <div class="row location">
              Provide your coords: 
              <input id="coords lat" type="text" v-model="selectedCoord.lat" />
              <input id="coords lng" type="text" v-model="selectedCoord.lng" />
            </div>
          </div>
          <div class="btns mt-5 mb-5">
            <button class='buttonSave btn btn-success' @click="load">Load</button>
            <button class='buttonSave btn btn-danger' @click="this.$emit('close-modal')">Close</button>
            <!-- <button class='buttonSave' @click="updateEvent">Confirm</button> -->
          </div>
      </fieldset>
    </div>
  </template>
  
  <script>
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
          invitees: [],
          invitorId: '', 
          invitorEmail: '', 
          location:'',
          category: '',
          selectedCoord: {},
      }),
      computed: {
        startEvent() {
          return this.startTime.split(" GMT")[0];
        },
        endEvent() {
          return this.endTime.split(" GMT")[0];
        },
      },
      methods: {
          // updateEvent () {
          //     let start = new Date(this.start);
          //     let end = new Date(this.end);

          //     if (!this.allDay) {
          //         let [startHours, startMinutes] = this.startTime.split(':');
          //         let [endHours, endMinutes] = this.endTime.split(':');

          //         start.setHours(startHours, startMinutes);
          //         end.setHours(endHours, endMinutes);
          //     }



          //     let event = {
          //         id: this.event.id,
          //         title: this.title,
          //         start: start,
          //         end: end,
          //         allDay: this.allDay,
          //         invitees: this.invitees,
          //         invitorId: this.invitorId,
          //         invitorEmail: this.invitorEmail,
          //         category: this.category,
          //     };

          //     console.log(event);

          //     // this.$store.commit("UPDATE_EVENT", {
          //     //     id: this.event.id,
          //     //     title: this.title,
          //     //     start: this.start,
          //     //     end: this.end,
          //     // })
          //     this.$emit('close-modal');
          // },

          formatDateWithTimeZone(date) {
            const options = {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
              weekday: 'short',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: false,
              timeZoneName: 'short',
              timeZone: 'Asia/Singapore', // Set the time zone to Singapore
            };
            return date.toLocaleString('en-US', options);
          },
          getCoord(placeObj) {
            const obj = placeObj.geometry.location;
            this.selectedCoord = { lat: obj.lat(), lng: obj.lng() };
            this.location = placeObj.name;
            console.log(this.selectedCoord, this.location);
          },
          load () {
            // console.log(this.location);
            const currUserId = this.$store.state.profileId;
            for (let invitee in this.invitees){
              if (this.invitees[invitee].id == currUserId ){
                this.invitees[invitee].location = this.location;
                this.invitees[invitee].coords = this.selectedCoord;
              };
            }

            let start = new Date(this.start);
              let end = new Date(this.end);

              if (!this.allDay) {
                  let [startHours, startMinutes] = this.startTime.split(':');
                  let [endHours, endMinutes] = this.endTime.split(':');

                  start.setHours(startHours, startMinutes);
                  end.setHours(endHours, endMinutes);
              }

              let event = {
                  id: this.event.id,
                  title: this.title,
                  start: start,
                  end: end,
                  allDay: this.allDay,
                  invitees: this.invitees,
                  invitorId: this.invitorId,
                  invitorEmail: this.invitorEmail,
                  category: this.category,
              };

              console.log(event);


              
            this.$store.dispatch("acceptInvite", event);
            this.$emit('close-modal');
          },
      },
      props: {
    text: String,
    event: Object
  },
  mounted() {
    this.id = this.event.id;
    this.title = this.event.title;
    this.start = formatDate(this.event.start);
    this.end = formatDate(this.event.end);
    this.startTime = formatTime(this.event.start);
    this.endTime = formatTime(this.event.end);
    this.allDay = Boolean(this.event.allDay);
    this.invitees = this.event.invitees;

    this.invitorId = this.event.invitorId;
    this.invitorEmail = this.event.invitorEmail;

    this.category = this.event.category;
    console.log(this.category);

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
  },
};

function formatDate(date) {
  // YYYY-MM-DD 
      var options = {year: "numeric", month: '2-digit', day: "2-digit"};
      let string = date.toLocaleDateString("ko-KR", options).replace(/\. /g, "-")
  
      return string.substr(0, string.length - 1)
}

function formatTime(date) {
  // HH:MM
    let hours = date.getHours();
    let minutes = date.getMinutes();

  hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

  let time = `${hours}:${minutes}`;

    return time
}
  </script>
  
  <style>
  .buttonSave {
    margin-left: 10px
  }
  .modal .modal-inner[data-v-4935b9f2] {
    border-radius: 5%;
    padding-bottom: 20px !important;
    padding-top: 30px !important;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.5);
    background-color: beige;
  }
  .location {
    width: 80%;
    transform: translateX(15%);
  }
  .invitees {
    margin-top: 20px;
  }

  /* Add this CSS to your component or a global stylesheet */
.pac-container {
  z-index: 10000; /* Adjust this value to ensure it's higher than your modal's z-index */
}
  </style>