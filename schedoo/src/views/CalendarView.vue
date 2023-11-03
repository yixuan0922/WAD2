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
  mounted() {
    this.applyStyles();
  },
  methods: {
    applyStyles() {
      // Get the <html> element
      const htmlElement = document.querySelector('html');

      // Apply the styles
      htmlElement.style.overflowY = 'hidden';
    }
  }
};
</script>
<style>
.calendar {
  margin-top: 50px;
}

</style>