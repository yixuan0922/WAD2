<template>
    <div>
      <Nav/>
      <div class="calendar-content">  
        <Calendar/>
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
  </style>
  