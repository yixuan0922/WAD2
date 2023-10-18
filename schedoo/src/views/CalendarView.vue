<template>
    <v-app>
        <v-main>
            <Calendar/>
        </v-main>
    </v-app>
  </template>
  
  <script>
  // @ is an alias to /src
  // import HelloWorld from "@/components/HelloWorld.vue";
  import Calendar from "@/components/Calendar.vue";
  
  export default {
    name: "CalendarView",
    components: {
      Calendar,
    },
  };
  </script>
  