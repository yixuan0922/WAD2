<template>
  <div>
    <div class="nav-container">
      <Nav />
    </div>
    <div class="calendar-content">
      <Calendar class="calendar" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Calendar from "@/components/Calendar.vue";
import Nav from "@/components/Nav.vue";

export default {
  name: "CalendarView",
  components: {
    Nav,
    Calendar,
  },
};
</script>
<style>
.nav-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1; /* To ensure the navigation is on top */
}

.calendar-container {
  margin-top: 50px; /* Adjust the margin to create space for the fixed navigation */
  overflow-y: scroll;
  padding-top: 50px; /* Match the margin-top of the calendar to keep the content below the fixed navigation */
}

</style>