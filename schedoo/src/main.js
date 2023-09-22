import { createApp } from "vue";

// import Vue from 'vue';
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import { getAuth, onAuthStateChanged } from "firebase/auth";

let app; 

const auth = getAuth();
onAuthStateChanged(auth, () => {
    if (!app) {
        app = createApp(App);
        app.use(store);
        app.use(router);
        app.mount("#app");
        }
});

import "bootstrap/dist/js/bootstrap.js";


// /* eslint-disable */
// import { createApp } from "vue";
// import App from "./App.vue";
// import "./registerServiceWorker";
// import router from "./router";
// import store from "./store";
// import "bootstrap/dist/css/bootstrap.css";
// // import firebase from "firebase/app";
// import {getAuth, onAuthStateChanged} from "firebase/auth";

// let app; 

// const auth = getAuth();
// onAuthStateChanged(auth, () =>{
//     if (!app) {
//         createApp(App).use(store).use(router).mount("#app");
//     }
// });

// import "bootstrap/dist/js/bootstrap.js";

