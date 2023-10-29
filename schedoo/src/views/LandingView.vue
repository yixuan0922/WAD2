<template>
  <div class="LandingView">
    <Nav />
    <Header/>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Header from "@/components/Header.vue";
import Nav from "@/components/Nav.vue";
import { useStore } from "vuex";

export default {
  name: "LandingView",
  components: {
    // HelloWorld,
    Nav,
    Header,
  },
  mounted () {
    const store = useStore();
    store.dispatch('getPendingEvents').then(result => {
      console.log('getPendingEvents', result);
    })
  },
};
</script>
