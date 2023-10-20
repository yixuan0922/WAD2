
<template>
  <div class='calendar-app'>

    <div class="calendar-app-main">
        <Fullcalendar class='app-calendar' v-bind:options="calendarOptions" />
        <Modal @close="toggleModal" :modalActive="modalActive">
            <component :is="modalContent.component" v-bind="modalContent.props" @close-modal='toggleModal'></component>
        </Modal>
    </div>
    <div class="calendar-app-sidebar">
        <div class="calendar-app-sidebr-section">
            <button class='newEventButton' @click="newEvent">New Event</button>
            <div class="container">
                <Fullcalendar class='app-calendar-sidebar' v-bind:options="calendarSidebarOptions" />
            </div>
        </div>
    </div>
   
  </div>
</template>

<script setup>
import {ref} from 'vue';
import {markRaw} from 'vue';
import { onMounted, computed} from 'vue';
import { useStore } from 'vuex';
import Fullcalendar from '@fullcalendar/vue3'
import DayGridPlugin from '@fullcalendar/daygrid'
import TimeGridPlugin from '@fullcalendar/timegrid'
import InteractionPlugin from '@fullcalendar/interaction'
import ListPlugin from '@fullcalendar/list'

// import Modal from '../components/ModalView.vue'
import EditEventModal from '../components/EditEventModal.vue'
import NewEventModal from '../components/NewEventModal.vue'
// import CommentsModal from '../components/CommentsModal.vue'
// import { Calendar } from '@fullcalendar/core';
import Modal from "@/components/ModalView.vue";


const store = useStore();

const modalActive = ref(false);
const modalContent = ref(markRaw({component: null, props: {}}));

const toggleModal = (component, props) => {
    modalContent.value = markRaw({component, props});
    modalActive.value = !modalActive.value;
}


const newEvent = () => {
    let timestamp = new Date().getTime();
    let date = new Date(timestamp);
    console.log('newEvent', typeof(newStart));
    toggleModal(NewEventModal, {text: 'This is from the component', 
    event: {
        id: (new Date()).getTime(),
        start: date, 
        end: date,
        allDay: true,
    }})
};

// const renderEvent = (arg) => {
//     console.log(arg.el);
//     let span = document.createElement('span')

//     span.setAttribute('class', 'fa fa-comments')

//     arg.el.appendChild(span)

//     span.addEventListener('click', event => {
//         event.stopPropagation(); 
//         this.$modal.show(CommentsModal, {
//             text: "This is for the comments"
//         });
//     });
// };

const updateEvent = (arg) => {
    store.commit("UPDATE_EVENT", arg.event);
};

const handleSelect = (arg) => {
    console.log('handleSelect', typeof(arg.start));
    toggleModal(NewEventModal, {text: 'This is from the component', 
    event: {
        id: (new Date()).getTime(),
        start: arg.start, 
        end: arg.end,
        allDay: arg.allDay
    }})
    // toggleModal(NewEventModal, {text: 'This is from the component', event: arg.event});
    // store.commit("ADD_EVENT", {
    //     id: (new Date()).getTime(),
    //     title: "New Event",
    //     start: arg.start,
    //     end: arg.end,
    //     allDay: arg.allDay
    // });
};

const handleEventClick = (arg) => {
    console.log(arg); 
    toggleModal(EditEventModal, {text: 'This is from the component', 
    // event: arg.event
    event: {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start, 
      end: arg.event.end,
      allDay: arg.allDay
    }
  });
    // this.$modal.show(EventModal, {
    //     text: "This is from the component",
    //     event: arg.event
    // });
};

let calendarOptions = ref({
    plugins: [
        DayGridPlugin,
        TimeGridPlugin,
        InteractionPlugin,
        ListPlugin
    ],
    headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'List'
    },
    weekends: true,
    selectable: true,
    editable: true,
    events: computed(() => store.getters["EVENTS"]),
    select: handleSelect,
    eventClick: handleEventClick,
    eventResize: updateEvent,
    eventDrop: updateEvent,
    // eventContent: renderEvent
});

let calendarSidebarOptions = ref({
    plugins: [ListPlugin],
    initialView: 'listWeek',
    events: computed(() => store.getters["EVENTS"]),
    headerToolbar: {
        left: '',
        center: 'title',
        right: ''
    },
});

onMounted(() => {
    store.dispatch('fetchEvents');
});

</script>


<style lang="css">

h2 {
    margin: 0;
    font-size: 16px;
  }
  
  ul {
    margin: 0;
    padding: 0 0 0 1.5em;
  }
  
  li {
    margin: 1.5em 0;
    padding: 0;
  }
  
  b { /* used for event dates/times */
    margin-right: 3px;
  }

.calendar-app {
    display: flex;
    min-height: 100%;
    font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
    font-size: 14px;
  }
  
  .calendar-app-sidebar {
    width: 300px;
    line-height: 1.5;
    background: #eaf9ff;
    border-right: 1px solid #d3e2e8;
  }
  
  .calendar-app-sidebar-section {
    padding: 2em;
  }
  
  .calendar-app-main {
    flex-grow: 1;
    padding: 3em;
  }
  
  .fc { /* the calendar root */
    max-width: 1100px;
    margin: 0 auto;
  }

  .newEventButton {
    margin-top: 20px;
    margin-bottom: 10px;
  }


</style>

