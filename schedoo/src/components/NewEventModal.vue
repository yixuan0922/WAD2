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
          <div class="row">
            Category: 
            <select v-model="category">
              <!-- #87bba2 light green -->
              <option value="event">Event</option> 
              <!-- #009688 darkgreen lolipop -->
              <option value="study">Study</option> 
              <!-- #70c1b3 Cyan -->
              <option value="cca">CCA</option>
              <!-- #8D6298 Purple -->
              <option value="personal">Personal</option>
              <!-- #a6a2a2 brown grey -->
              <!-- <option value="class">Classes</option> -->
              <!-- #dec3c3 pink -->
              <!-- <option value="exam">Exam</option>-->
              <!-- #4d648d blueberry blue -->
              <!-- <option value="invite">Invite</option> -->
            </select>
          </div>
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
            <div v-if="category === 'event'">
              Invitees: <input type="text" v-model="newInvitee" @input="clearError"><button @click="addInvitee">+</button>
              <ul>
                <li v-for="(invitee, index) in this.$store.state.invitees" :key="index">{{invitee.email}}</li>
              </ul>
              <p>{{addInviteeErr}}</p>
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
// import { Store } from 'vuex';

export default {
    data: () => ({
        title: "",
        start: {},
        end: {}, 
        startTime: "", 
        endTime: "",
        allDay: false,
        newInvitee: '',
        addInviteeErr: '',
        category: 'event',
    }),
    methods: {
      clearError() {
        this.addInviteeErr = '';
      },
      async addInvitee () {
        if (this.newInvitee) {
        // console.log(this.newInvitee);
        // this.invitees.push(this.newInvitee);
          console.log(this.$store.state.invitees);
          if (this.$store.state.invitees.includes(this.newInvitee)) 
          {
            console.log(this.$store.state.invitee_exist);
            this.addInviteeErr = "Invitee already added";
          }
          else 
          {
            await this.$store.dispatch('checkInvitee', this.newInvitee);
            if (this.$store.state.invitee_exist == false) 
            {
              this.addInviteeErr = "Invitee does not exist";
            }
          }
      }},
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
                allDay: this.allDay,
                invitees: [],
                // color: color,
                category: this.category,
            };

            for (let invitee of this.$store.state.invitees) {
              let inviteeData = {
                id: invitee.id, 
                email: invitee.email,
                status: 'pending',
              }
              event.invitees.push(inviteeData);
            }
            console.log('invitees', event.invitees);
            console.log('event', event);

            // this.$store.commit("ADD_EVENT", event);
            this.$store.dispatch('addEvent', event);
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
      this.start = formatDate(this.event.start);
      this.end = formatDate(this.event.end);
      this.startTime = formatTime(this.event.start);
      this.endTime = formatTime(this.event.end);
      this.allDay = Boolean(this.event.allDay);
      this.$store.state.invitees = [];
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