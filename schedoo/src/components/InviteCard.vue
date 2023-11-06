<template>
  <div class="card container">
    <div class="card-body row">
      <div class="img container col-2">
        <img
          src="https://api-private.atlassian.com/users/5f116c2970b8a90025c6efa9/avatar?initials=public"
        />
      </div>
      <div class="text col">
        <h6 class="row title">
          {{ event.title }}
        </h6>
        <h1 class="row email">
          {{ event.invitorEmail }}
        </h1>
        <p class="card-text row">
          {{ eventStart }} to {{ eventEnd }}
        </p>
      </div>
    </div>
    <hr class="cardDivider" />
    <div class="card-body action">
      <button @click="acceptInvite">Accept</button>
      <button class="decline" @click="declineInvite">Decline</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";

import { markRaw } from "vue";
import { useStore } from "vuex";
import AcceptInvite from '../components/AcceptInvite.vue';



const store = useStore();

const modalActive = ref(false);
const modalContent = ref(markRaw({ component: null, props: {} }));


const toggleModal = (component, props) => {
  modalContent.value = markRaw({ component, props });
  modalActive.value = !modalActive.value;
};

export default {
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    eventStart() {
      // Use JavaScript to extract the desired part of the string
      return this.event.start.split(" GMT")[0];
    },
    eventEnd() {
      // Use JavaScript to extract the desired part of the string
      return this.event.start.split(" GMT")[0];
    }
  },
  // methods: {
  //   acceptInvite() {
  //     this.$emit("accept-invite", this.event); // Emit an event to notify the parent component
  //   },
  //   declineInvite() {
  //     this.$emit("decline-invite", this.event); // Emit an event to notify the parent component
  //   },
  // },
  methods: {
    acceptInvite() {
      var event = this.event;
      console.log("acceptInvite", event.start);
      toggleModal(AcceptInvite, {
        text: "This is from the component",
        event: {
          id: event.id,
          title: event.title,
          start: new Date(event.start),
          end: new Date(event.end),
          allDay: event.allDay,
          invitees: event.invitees,
          invitorId: event.invitorId, 
          invitorEmail: event.invitorEmail,
        },
      });
    },
    declineInvite() {
      var event = this.event;
      console.log("declineInvite", event);
      store.dispatch("declineInvite", event);
    },
  },
};

// // eslint-disable-next-line
// const acceptInvite = () => {
//   var event = this.event
//   console.log("acceptInvite", event.start);
//   toggleModal(AcceptInvite, {
//     text: "This is from the component",
//     // event: arg.event
//     event: {
//       id: event.id,
//       title: event.title,
//       start: new Date(event.start),
//       end: new Date(event.end),
//       allDay: event.allDay,
//       invitees: event.invitees,

//       invitorId: event.invitorId, 
//       invitorEmail: event.invitorEmail,
//     },
//   });

//   // store.dispatch("acceptInvite", event);
// };

// // eslint-disable-next-line
// const declineInvite = () => {
//   var event = this.event;
//   console.log("declineInvite", event);
//   store.dispatch("declineInvite", event);
// };

</script>

<style scoped>
.card {
  width: 300px;
  margin: auto;
  padding-bottom: 15px;
  margin-bottom: 8px;
  padding: 0 !important;
}

.img img {
  width: 30px;
  height: 30px;
  justify-content: center !important;
}

.img.container.col-2 {
  display: flex;
  padding-right: 5px;
}
.card-body {
  width: 100%;
  padding: 15px !important;
  margin: auto;
}

.text {
  margin-left: 10px;
  text-align: left;
}

.title, .email {
  position: absolute;
  font-size: 18px;
  margin-bottom: 2px;
  font-weight: bold !important;
  color: black;
}

.title {
  transform: translateY(-20px);

}

.email {
  font-size: 12px;
}

.card-text {
  font-size: 14px;
  color: gray;
  transform: translateY(30px);
}

.cardDivider {
  margin-top: 0;
  margin-bottom: 3px;
}

.action {
  display: flex;
  justify-content: space-around;
  padding: 10px 30px !important;
}

.action button {
  margin: 0;
  border-radius: 20px;
  padding: 3px 18px;
  justify-content: space-around;
}

.decline {
  background-color: whitesmoke;
  border: 2px solid #2c3e50;
  color: #2c3e50;
}

@media (max-width:1000px) {
  .card {
    width: 250px;
    transform: translateX(-25px);
  }
}
</style>
