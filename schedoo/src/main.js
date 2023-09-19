/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
// import firebase from "firebase/app";
// import "firebase/auth";

createApp(App).use(store).use(router).mount("#app");
import "bootstrap/dist/js/bootstrap.js";

