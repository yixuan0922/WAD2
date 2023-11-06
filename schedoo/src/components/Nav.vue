<script setup>
/* eslint-disable */

import { auth } from '@/firebase/firebaseInit';
import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #f7dfc2"
>
    <div class="container">
        <!-- <a class="navbar-brand" id="navBarLogo" href="#"></a> -->
          <router-link class="nav-link" :to="{name: 'Landing'}"><img src="@/assets/navschedoo.png" height="40"></router-link>



        <button class="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation"
        style="position: absolute; top: 10px; right: 100px;">
        <span class="navbar-toggler-icon"></span>
        </button>

        <span  class="navbar-text" >
        <div v-if="(this.$store.state.user)" class="profile pButton" ref="profile" @click="toggle" style="position: absolute; top: 7px; right: 30px;">
        {{this.$store.state.profileInitials}}
        <div class="profile-menu" id="profileMenu" hidden>
              <div class="info">
                  <p class="initials">{{this.$store.state.profileInitials}}</p>
                  <div class="right">
                      <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                      <p>{{this.$store.state.profileUsername}} </p>
                      <p>{{this.$store.state.profileEmail}} </p>
                  </div>
              </div>
              <div class="options">
                  <div class="option">
                      <router-link class-="option" :to="{name: 'Settings'}"
                      style="color: black; text-decoration: none;"
                      >
                          <userIcon class="icon"/>
                          <p
                          style="padding-top: 10px"
                          >Profile</p>
                      </router-link>
                  </div>
                  <div @click="signOut" class="option">
                      <router-link class="option" to="#"
                      style="color: black; text-decoration: none"
                      >
                          <!-- <userIcon class="icon"/> -->
                          <p
                          >Sign Out</p>
                      </router-link>
                  </div>
              </div>
          </div>

      </div>
      </span>


        <div v-if="(this.$store.state.user)" class="collapse navbar-collapse" id="navbarSupportedContent" style="height: 40px">
          <ul class="navbar-nav mx-auto">
              <li class="nav-item">
              <!-- <a class="nav-link active">My Calendar</a> -->
              <router-link class="nav-link" :to="{name: 'Calendar'}"
              style="color: black; text-decoration: none;"
              >My Calendar</router-link>
              </li>
              <li class="nav-item">
              <!-- <a class="nav-link active" href="#">Insights</a> -->
              <router-link class="nav-link" :to="{ name: 'Insights' }"
              style="color: black; text-decoration: none;"
              >Insights</router-link>
              </li>
              <li class="nav-item">
              <!-- <a class="nav-link active" href="#">Focus</a> -->
              <router-link class="nav-link" :to="{ name: 'Focus' }"
              style="color: black; text-decoration: none;"
              >Focus</router-link>
              </li>
          </ul>
          <!-- <span class="navbar-text" style="right: 5%">
              <router-link @click='signOut' class="nav-link" to="#"
              style="color: black; text-decoration: none;"
              >Sign Out</router-link>
          </span> -->
        </div>



        <div v-if="(!this.$store.state.user)" class="collapse navbar-collapse" id="navbarSupportedContent"
        style="height: 40px">
          <ul class="navbar-nav mx-auto">
              <li class="nav-item">
              <a class="nav-link active" @click="toAbout">About Us</a>
              </li>
          </ul>
          <span  class="navbar-text" style="right: 5%">
              <router-link class="nav-link" :to="{name: 'Login'}"
              style="color: black; text-decoration: none;"
              >Login</router-link>
          </span>
        </div>
    </div>
</nav>

</template>

<script>
export default {
  name: "header",
  data() {
    return {
      hidden: true,
      loggedin: false,
    }
  },
  // ready: function () {
  //   checkAuth();
  //   this.profileBtn();
  // },
  // computed: {
  //   profileBtn() {
  //     document.getElementById("wholeProfile").hidden = !this.loggedin;
  //   }
  // },
  methods: {
    toggle() {
      this.hidden = !this.hidden;
      document.getElementById("profileMenu").hidden = this.hidden;
    },

    signOut() {
      auth.signOut();
      // window.location.reload();
      window.location.href = "/login";
    },


    toAbout() {
      console.log("Button clicked"); // Check if this message is logged
      const about = document.getElementById("about-us");
      about.scrollIntoView({ behavior: "smooth" });
    },

    // signOut() {
    //   const auth = getAuth();

    //   signOut(auth).then(() => {
    //     alert ("Successful Signout");
    //     this.loggedin = false;
    //   }).catch((error) => {
    //     alert ("Failed Signout");
    //   });
    // },
    // checkAuth() {
    //   var user = firebase.auth().currentUser;

    //   if (user) {
    //     this.loggedin = true;
    //   } else {
    //     this.loggedin = false;
    //   }
    // }
  }, 
  computed: {
    user() {
      return this.$store.state.user;
    }
  }

};

</script>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
    min-height: 50px;
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
}
.nav-link {
    font-weight: bold;
    font-size: medium;
    font-family: system-ui;
    letter-spacing: 0.05em;
    transform: translateY(-3px);
}

li {
  margin: 0 !important;
  margin-top: 5px !important;
}

.circular-button {
      width: 40px; /* Set the width and height to the same value to make it circular */
      height: 40px;
      border-radius: 50%; /* Makes the button circular */
      font-size: small;
    }

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  /* right: 2%;
  top: 10px; */
  margin: auto;
  margin-left: 20px;
  z-index: 1;
  font-size: small;
  border-radius: 50%;
  color: #ffff;
  background-color: #303030;

  .profile-menu {
    position: absolute;
    top: 60px;
    right: 0px;
    width:260px;
    background-color: #e9b58d;
    color: black !important;
    font-weight: bold;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 5%;

    .info {
      display: flex;
      align-items: center;
      padding-left: 15px;
      padding-right: 15px;
      padding-top: 15px;
      border-bottom: 1px solid #fff;

      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: normal;
      }

      .right {
        flex: 1;
        margin-left: 24px;
        text-decoration: none;

        p:nth-child(1) {
          font-size: 14px;
        }

        p:nth-child(2), 
        p:nth-child(3) {
          font-size: 12px;
        }
      }

    }
  }
}
</style>