<template>
  <div class="calendar-app">
    <div class="calendar-app-main">
      <Fullcalendar class="app-calendar" v-bind:options="calendarOptions" />
      <Modal @close="toggleModal" :modalActive="modalActive">
        <component
          :is="modalContent.component"
          v-bind="modalContent.props"
          @close-modal="toggleModal"
        ></component>
      </Modal>
    </div>
    <div class="calendar-app-sidebar">
      <div class="calendar-app-sidebar-section">
        <!-- Your calendar component here -->
        <button class="newEventButton" @click="newEvent">+ New Event</button>
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
          ></DropZone>
          <div class="file-info m-auto p-2">File: {{ myFile.name }}</div>
          <button class="newEventButton m-auto" @click="upload">Upload</button>
        </div>
        <hr />
        <!-- <button class="newEventButton m-auto" @click="upload">Upload</button> -->

        <div class="container">
          <Fullcalendar
            class="app-calendar-sidebar"
            v-bind:options="calendarSidebarOptions"
          />
          <hr />
          <div class="mb-3 category">
            <h2 class="header">Filter Categories</h2>
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
          </div>
          <hr />
          <div class="invite-container">
            <h2 class="header">Pending Invites</h2>
            <ul>
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
            </ul>
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
// import CommentsModal from '../components/CommentsModal.vue'
// import { Calendar } from '@fullcalendar/core';
import Modal from "@/components/ModalView.vue";
import DropZone from "@/components/DropZone.vue";

const store = useStore();

const modalActive = ref(false);
const modalContent = ref(markRaw({ component: null, props: {} }));

const state = reactive({
  checkedCategories: ["Event", "Exam", "Class"],
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
  console.log(arg);
  toggleModal(EditEventModal, {
    text: "This is from the component",
    // event: arg.event
    event: {
      id: arg.event.id,
      title: arg.event.title,
      start: arg.event.start,
      end: arg.event.end,
      allDay: arg.allDay,
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
  console.log("acceptInvite", event);
  store.dispatch("acceptInvite", event);
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
</script>

<style>
.calendar-app-sidebar {
  width: 350px;
  line-height: 1.5;
  background: #ededed;
  border-right: 1px solid #d3e2e8;
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
  position: sticky;
  top: 30px;
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
}

.calendar-app {
  display: flex;
}

.app-calendar {
  height: 86vh;
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
  padding: 8px 12px;
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
}

.form-check:hover {
  background-color: #d3e2e8;
}
</style>
