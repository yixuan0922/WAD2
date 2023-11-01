<template>
    <div>
      <fieldset>
        <legend>Event details</legend>
        <b>Title:</b>  {{ event.title }} <br/>
        <b>Start:</b>  {{ event.start }} <br/>
        <b>End:</b>  {{ event.end }} <br/>
        <b>ID:</b>  {{ event.id }} <br/>
        <b>Invitees</b> 
        <ul>
          <li v-for="(invitee, index) in event.invitees" :key="index">{{invitee.email + "(" + invitee.status + ")" + invitee.location}}</li>
        </ul><br/>
      </fieldset>
      <fieldset>
          <legend>Edit event</legend>
          <div class="container">
            <div class='row'> 
              Event Title: <input type="text" v-model="title">
            </div>
            <div class="row">
              <label>All Day:</label><input type="checkbox" v-model="allDay">
            </div>
            <div class="row">
              <div class='col col-6'>Start: 
                <input type="date" v-model="start">
                <input type="time" v-model="startTime" v-show="!allDay">
              </div>
              <div class='col col-6'>End: 
                  <input type="date" v-model="end">
                  <input type="time" v-model="endTime" v-show="!allDay">
              </div>
            </div>
          </div>
          <button class='buttonSave' @click="deleteEvent">Delete</button>
          <button class='buttonSave' @click="updateEvent">Save</button>
      </fieldset>
    </div>
  </template>
  
  <script>
  
  export default {
      data: () => ({
          title: "",
          start: {},
          end: {}, 
          startTime: "",
          endTime: "", 
          allDay: false,
          invitees: [],
          category: '',
      }),
      methods: {
          updateEvent () {
              let start = new Date(this.start);
              let end = new Date(this.end);

              if (!this.allDay) {
                  let [startHours, startMinutes] = this.startTime.split(':');
                  let [endHours, endMinutes] = this.endTime.split(':');

                  start.setHours(startHours, startMinutes);
                  end.setHours(endHours, endMinutes);
              }
              else {
                if (start === end) {
                  end.setDate(end.getDate() + 1);
                }
              }

              let event = {
                  id: this.event.id,
                  title: this.title,
                  start: start,
                  end: end,
                  allDay: this.allDay,
                  invitees: this.invitees,
                  category: this.category,
              };
              // this.$store.commit("UPDATE_EVENT", event);
              this.$store.dispatch('updateEvent', event);

              // this.$store.commit("UPDATE_EVENT", {
              //     id: this.event.id,
              //     title: this.title,
              //     start: this.start,
              //     end: this.end,
              // })
              this.$emit('close-modal');
          },
          deleteEvent() {
            console.log(this.event.id);
            console.log(this.invitees);
            let event = {
              id : this.event.id, 
              invitees: this.invitees,
              category: this.event.category,
            }
            this.$store.dispatch('deleteEvent', event);
            // this.$store.commit("DELETE_EVENT", this.event.id)
            this.$emit('close-modal');
          }
      },
    props: {
      text: String,
      event: Object
    },mounted() {
        this.id = this.event.id;
        this.start = formatDate(this.event.start);
        this.end = formatDate(this.event.end);
        this.startTime = formatTime(this.event.start);
        this.endTime = formatTime(this.event.end);
        this.allDay = Boolean(this.event.allDay);
        this.invitees = this.event.invitees;
        this.category = this.event.category;
        console.log(this.category);
    }
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
  </style>