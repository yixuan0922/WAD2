<template>
    <div class="SettingsView">
      <Nav/>
      <Settings class="settings"/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  // import HelloWorld from "@/components/HelloWorld.vue";
  import Nav from "@/components/Nav.vue"
  import Settings from "@/components/Settings.vue";
  
  export default {
    name: "SettingsView",
    components: {
      // HelloWorld,
      Nav,
      Settings,
    },
  };
  </script>

<style>
.settings {
  margin-top: 0px;
}
</style>