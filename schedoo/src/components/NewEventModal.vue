<template>
    <div>
      <fieldset>
        <legend>Event details</legend>
        <b>ID:</b>{{ event.id }} <br/>
        <b>Start:</b>  {{ event.start }} <br/>
        <b>End:</b>  {{ event.end }} <br/>
      </fieldset>
      <fieldset>
          <legend>Add event</legend>
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
              <!-- <div class='col col-6'>Start: <input type="date" v-model="start"><input type="time" v-model="startTime"></div>
              <div class='col col-6'>End: <input type="date" v-model="end"><input type="time" v-model="endTime"></div> -->
            </div>

          </div>
          <button class='button' @click="this.$emit('close-modal')">Cancel</button>
          <button class='buttonSave' @click="addEvent">Add</button>
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
      }),
      methods: {
        addEvent() {
              let start = new Date(this.start);
              let end = new Date(this.end);

              if (!this.allDay) {
                  let [startHours, startMinutes] = this.startTime.split(':');
                  let [endHours, endMinutes] = this.endTime.split(':');

                  start.setHours(startHours, startMinutes);
                  end.setHours(endHours, endMinutes);
              }

              let event = {
                  id: (new Date()).getTime(),
                  title: this.title,
                  start: start,
                  end: end,
                  allDay: this.allDay
              };

              this.$store.commit("ADD_EVENT", event);
              this.$emit('close-modal');
          }

        
          // addEvent() {
          //     this.$store.commit("ADD_EVENT", {
          //     id: (new Date()).getTime(),
          //     title: this.title,
          //     start: this.start,
          //     end: this.end,
          //     startTime: this.startTime, 
          //     endTime: this.endTime,
          //     allDay: this.allDay
          // });
          //     // this.$store.commit("UPDATE_EVENT", {
          //     //     id: this.event.id,
          //     //     title: this.title,
          //     //     start: this.start,
          //     //     end: this.end,
          //     // })
          // }
      },
    props: {
      text: String,
      event: Object
    },mounted() {
        this.id = this.event.id;
        // console.log(this.id);
        this.start = formatDate(this.event.start);
        // console.log(this.start);
        this.end = formatDate(this.event.end);
        // console.log(this.end);
        this.startTime = formatTime(this.event.start);
        // console.log(this.startTime);
        this.endTime = formatTime(this.event.end);
        // console.log(this.endTime);
        this.allDay = this.event.allDay;
        // console.log(this.allDay);
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