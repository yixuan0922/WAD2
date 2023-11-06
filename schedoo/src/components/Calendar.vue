<template>
  <div class="calendar-app">
    <!-- <div class="toggleSidebar round-btn" @click="toggleSidebar">&lt;  &gt;</div> -->
    <div class="calendar-app-main" :class="{ shownMain: isShownMain}">
      <Fullcalendar class="app-calendar" v-bind:options="calendarOptions" />
      <Modal class="newEvent" @close="toggleModal" :modalActive="modalActive">
        <component
          :is="modalContent.component"
          v-bind="modalContent.props"
          @close-modal="toggleModal"
        ></component>
      </Modal> 
    </div>

    <button class="toggleSidebar round-btn" @click="toggleSidebar">&lt;  &gt;</button>
    <!-- Sidebar section -->
    <div class="calendar-app-sidebar"  :class="{ shown: isShown}" >
      <div class="calendar-app-sidebar-section">
        <!-- Your calendar component here -->
        <div class="topBtns" style="white-space: nowrap;">
          <button class="newEventButton" @click="newEvent">+ New Event</button>
          <button class="newEventButton" id="timetableToggle" @click="toggleUploadContents" style="margin-left: 5px;">▼ Upload Timetable</button>
        </div>

        <!-- Upload timetable -->
        <div id="timetableUpload">
          <div id="uploadContents" v-if="isUploadContentsVisible">
            <div class="timetable-header">
              <p class="header">Upload Timetable</p>
              <button class="newEventButton" @click="deleteCol">Delete</button>
            </div>
            <div class="container">
              <DropZone
                class="m-auto"
                @drop.prevent="drop"
                @change="selectedFile"
                :my-file="myFile"
                style="width:auto; height: 150px"
              ></DropZone>
              <div class="file-info m-auto p-2">File: {{ myFile.name }}</div>
              <button class="newEventButton m-auto" @click="upload">Upload</button>
            </div>
          </div>
          <hr />
        </div>
        <!-- <button class="newEventButton m-auto" @click="upload">Upload</button> -->

        <div class="container">
          <Fullcalendar
            class="app-calendar-sidebar"
            
            v-bind:options="calendarSidebarOptions"
          />
          <hr />
          <div class="mb-3 category">
            <h2 class="header" @click="toggleFilters">
              <img src="../assets/rightArrow.png" v-if="!showFilters" style="width: 10px">
              <img src="../assets/downArrow.png" v-if="showFilters" style="width: 10px">
              Filter Categories</h2>
            <div class="filterCats" v-if="showFilters">
              <div class="form-check event">
                <label for="event">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="event"
                    value="Event"
                    v-model="state.checkedCategories"
                  />
                  Event</label
                >
              </div>

              <div class="form-check exam">
                <label for="exam">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="exam"
                    value="Exam"
                    v-model="state.checkedCategories"
                  />
                  Exam</label
                >
              </div>

              <div class="form-check class">
                <label for="class">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="class"
                    value="Class"
                    v-model="state.checkedCategories"
                  />
                  Class</label
                >
              </div>

              <div class="form-check invites">
                <label for="invites">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="invites"
                    value="Invites"
                    v-model="state.checkedCategories"
                  />
                  Invites</label
                >
              </div>
            </div>
          </div>
          <hr />
            <h2 class="header">Pending Invites</h2>
            <div class="invite-container">
              <div class="inviteList" v-for="(event, index) in this.$store.state.pendingEvents"

                :key="index">
                <InviteCard :event="event" @decline="declineInvite(event)" @accept="acceptInvite(event)"></InviteCard>             
                <!-- <div class="card container">
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
                    <button @click="acceptInvite(event)">Accept</button>
                    <button class="decline" @click="declineInvite(event)">Decline</button>
                  </div>
                </div>
              </div> -->
              <!-- <ul>
                <li
                  v-for="(event, index) in this.$store.state.pendingEvents"
                  :key="index"
                >
                  {{ event.title }} <br />
                  {{ event.invitorEmail }} <br />
                  {{ event.start }} <br />
                  {{ event.end }}
                  <button @click="acceptInvite(event)">Accept</button>
                  <button @click="declineInvite(event)">Decline</button>
                </li>
              </ul> -->
            </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { markRaw, reactive, watch } from "vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import Fullcalendar from "@fullcalendar/vue3";
import DayGridPlugin from "@fullcalendar/daygrid";
import TimeGridPlugin from "@fullcalendar/timegrid";
import InteractionPlugin from "@fullcalendar/interaction";
import ListPlugin from "@fullcalendar/list";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import bootstrap5Plugin from "@fullcalendar/bootstrap5";

// import Modal from '../components/ModalView.vue'
import EditEventModal from "../components/EditEventModal.vue";
import NewEventModal from "../components/NewEventModal.vue";
import AcceptInvite from '../components/AcceptInvite.vue';
// import CommentsModal from '../components/CommentsModal.vue'
// import { Calendar } from '@fullcalendar/core';
import Modal from "@/components/ModalView.vue";
import DropZone from "@/components/DropZone.vue";
import InviteCard from "@/components/InviteCard.vue";

const store = useStore();

const modalActive = ref(false);
const modalContent = ref(markRaw({ component: null, props: {} }));


const state = reactive({
  checkedCategories: ["Event", "Exam", "Class", "Invites"],
});

const toggleModal = (component, props) => {
  modalContent.value = markRaw({ component, props });
  modalActive.value = !modalActive.value;
};

const newEvent = () => {
  let timestamp = new Date().getTime();
  let start = new Date(timestamp);
  let end = new Date(timestamp);

  end.setDate(start.getDate() + 1);

  // console.log('newEvent', typeof(newStart));
  toggleModal(NewEventModal, {
    text: "This is from the component",
    event: {
      id: new Date().getTime(),
      start: new Date(start),
      end: new Date(end),
      allDay: true,
    },
  });
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
  // store.commit("UPDATE_EVENT", arg.event);
  store.dispatch("updateEvent", arg.event);
};

const handleSelect = (arg) => {
  console.log("handleSelect", typeof arg.start);
  toggleModal(NewEventModal, {
    text: "This is from the component",
    event: {
      id: new Date().getTime(),
      start: arg.start,
      end: arg.end,
      allDay: arg.allDay,
    },
  });
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
  console.log(arg.event.extendedProps.invitees);
  console.log(arg.event.start);
  toggleModal(EditEventModal, {
    text: "This is from the component",
    // event: arg.event
    event: {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.allDay,
      invitees: arg.event.extendedProps.invitees,
    },
  });
};

let calendarOptions = ref({
  plugins: [
    DayGridPlugin,
    TimeGridPlugin,
    InteractionPlugin,
    ListPlugin,
    bootstrap5Plugin,
  ],
  themeSystem: "bootstrap5",
  headerToolbar: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
  },
  buttonText: {
    today: "Today",
    month: "Month",
    week: "Week",
    day: "Day",
    list: "List",
  },
  weekends: true,
  selectable: true,
  editable: true,
  events: computed(() => store.getters["EVENTS"]),
  select: handleSelect,
  eventClick: handleEventClick,
  eventResize: updateEvent,
  eventDrop: updateEvent,
  aspectRatio: 2,
  // eventContent: renderEvent
});

let calendarSidebarOptions = ref({
  plugins: [ListPlugin, bootstrap5Plugin],
  themeSystem: "bootstrap5",
  initialView: "listWeek",
  events: computed(() => store.getters["EVENTS"]),
  headerToolbar: {
    left: "",
    center: "title",
    right: "",
  },
});

onMounted(() => {
  store.dispatch("fetchEvents", state.checkedCategories);
  store.dispatch("getPendingEvents");
});

const deleteCol = () => {
  store.dispatch("deleteCol");
};

const upload = () => {
  csvConverter()
    .then(async (schClasses) => {
      console.log(schClasses);

      let weeklyClasses = [];
      let examSchedules = [];
      // let classes = result;
      for (var schClass in schClasses) {
        const monthNames = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };

        if (schClasses[schClass]["Status"] == "Enrolled") {
          //lastDayClass Date
          const endDateParts = schClasses[schClass]["End Date"].split("-");
          const endDay = parseInt(endDateParts[0], 10);
          const endMonthAbbreviation = endDateParts[1];
          const endYear = parseInt(endDateParts[2], 10);
          const endMonth = monthNames[endMonthAbbreviation];

          //firstDayClass Date
          const startDateParts = schClasses[schClass]["Start Date"].split("-");
          const startDay = parseInt(startDateParts[0], 10);
          const startMonthAbbreviation = startDateParts[1];
          const startYear = parseInt(startDateParts[2], 10);
          const startMonth = monthNames[startMonthAbbreviation];

          // firstDayClass End Time
          const endTimeParts = schClasses[schClass]["End Time"].split(":");
          const endHours = parseInt(endTimeParts[0], 10);
          const endMinutes = parseInt(endTimeParts[1], 10);

          // firstDayClass Start Time
          const startTimeParts = schClasses[schClass]["Start Time"].split(":");
          const startHours = parseInt(startTimeParts[0], 10);
          const startMinutes = parseInt(startTimeParts[1], 10);

          // firstDayClass: Date, Start Time
          const startFormattedDate = new Date(
            startYear,
            startMonth,
            startDay,
            startHours,
            startMinutes,
            0,
            0
          );
          // firstDayClass: Date, End Time
          const endFormattedDate = new Date(
            startYear,
            startMonth,
            startDay,
            endHours,
            endMinutes,
            0,
            0
          );
          // lastDayClass: Date
          const endClassDate = new Date(endYear, endMonth, endDay, 0, 0, 0, 0);

          if (schClasses[schClass]["Meeting Type"] === "EXAM") {
            let examSession = {
              title: schClasses[schClass]["Description"],
              start: new Date(startFormattedDate),
              end: new Date(endFormattedDate),
              allDay: false,
            };
            examSchedules.push(examSession);
          } else {
            // console.log('startFormattedDate',schClasses[schClass]['Start Date'],schClasses[schClass]['Start Time'],startFormattedDate);
            // console.log('endFormattedDate',schClasses[schClass]['Start Date'], schClasses[schClass]['End Time'], endFormattedDate);
            // console.log('endClassDate',schClasses[schClass]['End Date'], endClassDate);

            let classStartDate = new Date(startFormattedDate);
            let classEndDate = new Date(endFormattedDate);
            const finalClassDate = new Date(endClassDate);

            const daysOfWeek = [
              "Sun",
              "Mon",
              "Tue",
              "Wed",
              "Thu",
              "Fri",
              "Sat",
            ];
            const classDay = daysOfWeek.indexOf(schClasses[schClass]["Day(s)"]);
            if (classStartDate.getDay() !== classDay) {
              // Add the number of days until the next class day
              classStartDate.setDate(
                classStartDate.getDate() +
                  ((classDay + 7 - classStartDate.getDay()) % 7)
              );
              classEndDate.setDate(
                classEndDate.getDate() +
                  ((classDay + 7 - classEndDate.getDay()) % 7)
              );
            }

            while (classStartDate <= finalClassDate) {
              let classSession = {
                title: schClasses[schClass]["Description"],
                start: new Date(classStartDate),
                end: new Date(classEndDate),
                allDay: false,
              };
              // console.log(classSession);
              weeklyClasses.push(classSession);
              classStartDate.setDate(classStartDate.getDate() + 7);
              classEndDate.setDate(classEndDate.getDate() + 7);
            }
          }
        }
      }
      console.log("Weekly Classes", weeklyClasses);
      console.log("Exam Schedules", examSchedules);
      await processClasses(weeklyClasses);
      await processExams(examSchedules);
    })
    .catch((err) => {
      console.error(err);
    });
};

const acceptInvite = (event) => {
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
};

const declineInvite = (event) => {
  console.log("declineInvite", event);
  store.dispatch("declineInvite", event);
};

async function processExams(examSchedules) {
  for (let eachExam of examSchedules) {
    // console.log('eachClass', eachClass);
    let start = new Date(eachExam.start);
    let end = new Date(eachExam.end);

    let exam = {
      id: new Date().getTime(),
      title: eachExam.title,
      start: start,
      end: end,
      allDay: false,
    };
    store.dispatch("addExam", exam);

    // Wait for 1 millisecond before next iteration
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}

async function processClasses(weeklyClasses) {
  for (let eachClass of weeklyClasses) {
    // console.log('eachClass', eachClass);
    let start = new Date(eachClass.start);
    let end = new Date(eachClass.end);

    let event = {
      id: new Date().getTime(),
      title: eachClass.title,
      start: start,
      end: end,
      allDay: eachClass.allDay,
    };
    store.dispatch("addClass", event);

    // Wait for 1 millisecond before next iteration
    await new Promise((resolve) => setTimeout(resolve, 1));
  }
}

const csvConverter = () => {
  return new Promise((resolve, reject) => {
    // let csvFile = document.getElementById("myFile").files[0];
    let csvFile = myFile.value;

    console.log(csvFile)
    let reader = new FileReader();

    reader.onload = (event) => {
      let csvText = event.target.result;
      // console.log(csvText);

      var lines = csvText.split("\n");
      var result = [];

      var headers = lines[0].split(",");
      // remove the double quotation marks on headers
      headers = headers.map((header) => {
        return header.replace(/"/g, "");
      });

      for (var i = 1; i < lines.length - 1; i++) {
        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length - 1; j++) {
          obj[headers[j]] = currentline[j].replace(/"/g, "");
        }

        result.push(obj);
      }

      console.log("result", result);
      console.log("result", typeof result[0]["Start Time"]);
      resolve(result); // Resolve the promise with the result
    };

    reader.onerror = (error) => reject(error); // Reject the promise if there's an error

    reader.readAsText(csvFile);
  });
};

watch(
  state,
  () => {
    store.dispatch("fetchEvents", state.checkedCategories);
  },
  { immediate: true }
);

// dropzone code
var myFile = ref("");

const drop = (e) => {
  myFile.value = e.dataTransfer.files[0];
  console.log(myFile.value);
};

const selectedFile = () => {
  myFile.value = document.querySelector(".myFile").files[0];
};

// function deleteFile() {
//   myFile = ref('')
// }

// const deleteBtn = () => {
//   deleteCol;
//   deleteFile();
// }



let isUploadContentsVisible = ref(false);

const toggleUploadContents = () => {
  isUploadContentsVisible.value = !isUploadContentsVisible.value;
};

const isShown = ref(false);
const isShownMain = ref(false);

const toggleSidebar = () => {
  isShown.value = !isShown.value;
  isShownMain.value = !isShownMain.value;
};

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value;
}

// const eventStart = ref(this.event.start.split(" GMT")[0]);
// const eventEnd = ref(this.event.start.split(" GMT")[0]);
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');


.calendar-app-sidebar {
  width: 360px;
  line-height: 1.5;
  background: #ededed;
  border-right: 1px solid #d3e2e8;
  height: 100vh;
  transition: width 0.3s;
}

.calendar-app-sidebar-section {
  padding: 1.1em;
}

.calendar-app-main {
  flex-grow: 1;
  padding-left: 2em;
  padding-right: 2em;
  padding-bottom: 1.5em;
  padding-top: 1.3em;
  position: relative;
  width: 100%;
  /* top: 30px; */
}

.fc {
  /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

.fc-header-toolbar {
  height: 30px;
}

.newEventButton {
  margin-top: 3px;
  margin-bottom: 10px;
  border-radius: 10px;
  padding: 6px 10px;
  font-size: small;
  transform: translateX(-5px);
}

.calendar-app {
  display: flex;
  position: relative;
  overflow-x: hidden;
  width: 100%;
  font-family: "poppins", sans-serif;
}

.app-calendar {
  height: 86vh;
  top: 0;
}

.fc .fc-daygrid-day.fc-day-today {
  background-color: rgb(234 249 255);
}

/* .file-box {
  height: 200px;
  width: 200px;
  background-color: whitesmoke;
  border-radius: 10px;
  display: flex;
  margin: auto;
}

.file-content {
  margin: auto;
}

.input {
  display: none;
} */

hr {
  margin-top: 15px;
  margin-bottom: 10px;
}

.header,
#fc-dom-86 {
  font-size: 23px;
  text-align: left;
  margin-bottom: 5px;
  font-weight: bold;
}

.timetable-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* .timetable-box {
  display: flex;
} */

.container {
  padding: 0;
}

.fc .fc-list-table td {
  padding: 8px 8px;
}

.fc .fc-list-day-cushion {
  padding: 8px 18px 8px 8px;
}

.container .fc .fc-toolbar.fc-header-toolbar {
  margin-top: 5px;
  margin-bottom: 5px;
  justify-content: left;
  font-size: 23px;
  font-weight: bold;
}
.form-check-input {
  margin-right: 15px !important;
}

.form-check label {
  text-align: left;
  padding-left: 8px;
  width: 100%;
  font-size: small;
}

.form-check:hover {
  background-color: #d3e2e8;
}

.fc .fc-toolbar-title {
    font-size: large !important;
}

.header {
  font-size: large;
  /* font-weight: normal; */
}

/* Initially hide the uploadContents */
.uploadContents {
  display: none;
}

/* Style for the dropdown button */
.timetableToggle {
  cursor: pointer;
}

/* Style for the active dropdown button */
.timetableToggle.active {
  background-color: #007bff; /* Change to the color you prefer */
  color: #fff; /* Change to the color you prefer */
}

/* Style for the dropdown contents */
.uploadContents {
  position: absolute;
  z-index: 1;
  background-color: #f9f9f9; /* Change to the color you prefer */
  border: 1px solid #ddd;
  padding: 10px;
  right: 0;
  top: 100%;
  width: 200px; /* Adjust the width as needed */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.fc-list-day-text, .fc-list-day-side-text, .fc-list-event-time, .fc-list-event-title {
  font-size: small;
}

.round-btn {
  position: absolute;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: grey; /* Dark background color */
  color: #333; /* Text color */
  border: none; /* Remove default button border */
  justify-content: center;
  align-items: left;
  /* cursor: pointer; */
  right:0;
  top: 50px;
  transform: translateX(25px);
  white-space: nowrap;
  font-size: large;
  display: flex;
  visibility: hidden;
}

/* Add media query for screens below 1000px */
@media (max-width: 1000px) {
  .calendar-app-sidebar {
    width: 0;
    /* transition: width 0.3s; */
  }
  .shown {
    position: absolute;
    z-index: 1;
    visibility: visible;
    width: 275px;
    right:0;
    /* transition: width 0.3s; */
  }
  .calendar-app-main {
    width: calc(100% - 50px); /* 50px is the width of the toggle button */
    position: relative;
    z-index: 0;
  }
  .round-btn {
    visibility: visible;
    z-index: 2;
  }
  .app-calendar {
    width: 100%;
  }
  .shownMain {
    padding-right: 0 !important;
  }
  div.fc-view-harness.fc-view-harness-active {
    height: 175px !important;
  }
  InviteCard {
    width: 250px;
  }
}


.fc-view-harness {
  background: #fff !important;
}

.fc-theme-bootstrap5 .fc-scrollgrid {
  border-radius: 10px;
}

.fc-theme-bootstrap5-shaded {
    background-color: #ebc6b5;
}

.invite-container {
  width: 320px;
  height: 490px;
  overflow-y: scroll;
}

.fc-listWeek-view .fc-view .fc-list .fc-list-sticky {
  height: 500px;
}

.fc-view-harness .fc-view-harness-active {
  height: 500px !important;
}


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

