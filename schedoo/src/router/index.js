import { createRouter, createWebHistory } from "vue-router";
import LandingView from '../views/LandingView.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ForgetPassword from '../views/ForgetPassword.vue';
import Settings from '../views/SettingsView.vue';
// import CreateEvent from '/src/components/CreateEvent.vue';
import CalendarView from '../views/CalendarView.vue';
import CrEvent from '../components/CrEvent.vue';
import Home from '../views/Home.vue';
import Focus from '../components/FocusTracker.vue';
import Insights from '../components/Insights.vue';
// import Calendar from '../components/Calendar.vue';
// import store from '@/store/index.js';

const routes = [
  // {
  //   path: "/",
  //   name: "home",
  //   component: HomeView
  // },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/landing",
    name: "Landing",
    component: LandingView,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forget-password",
    name: "ForgetPassword",
    component: ForgetPassword,
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: CalendarView,
  },
  {
    path: "/create-event",
    name: "CrEvent",
    component: CrEvent,
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
  }, 
  {
    path: "/home",
    name: "Home",
    component: Home,
    children: [
      {
        name: "Insights",
        path: 'insights',
        component: Insights
      },
      {
        name: "Focus",
        path: 'focus',
        component: Focus
      }]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
