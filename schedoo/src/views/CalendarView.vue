<template>
  <div>
    <Nav />
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
.calendar {
  margin-top: 70px;
}
</style>
