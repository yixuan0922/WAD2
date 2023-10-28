<template>
    <div class="SettingsView">
      <Settings/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  // import HelloWorld from "@/components/HelloWorld.vue";
  import Settings from "@/components/Settings.vue";
  
  export default {
    name: "SettingsView",
    components: {
      // HelloWorld,
      Settings,
    },
  };
  </script>