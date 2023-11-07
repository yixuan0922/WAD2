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
    this.applyStyles();

    const store = useStore();
    store.dispatch('getPendingEvents').then(result => {
      console.log('getPendingEvents', result);
    })
  },
  methods: {
    applyStyles() {
      // Get the <html> element
      const htmlElement = document.querySelector('html');

      // Apply the styles
      htmlElement.style.overflowX = 'hidden';
    }
  }
};
</script>
