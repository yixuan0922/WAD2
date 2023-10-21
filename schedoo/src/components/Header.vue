
<script setup>
/* eslint-disable */

import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <div class="page-header opacity-75 min-vh-100" loading="lazy">
    <span class="mask bg-gradient-dark opacity-5"></span>
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 col-md-7 d-flex justify-content-center flex-column"
        >
          <h1 id="header" class="text-dark mb-4 bold" >SCHEDOO</h1>
          <p id="subtitle" class="text-dark text-muted lead">
            Fail to Plan, Plan to Fail
          </p>
          <div class="buttons">
            <button type="button" class="test">
              Get Started
            </button>
            <button 
            class="test" 
            style="--c: #373B44;--b: 3px;--s: .15em;;"
            >Read more</button>
          </div>
        </div>
      </div>
    </div>

    <div class="navbar-nav me-auto align-bottom">
      <!-- <li class="nav-item"> -->
      <!-- <RouterLink class="nav-link text-white" to="#"> Home </RouterLink> -->
      <!-- <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
      </li> -->
      <div class="profile pButton" ref="profile">
      <span @click="toggle">{{this.$store.state.profileInitials}}</span>
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
              <router-link class-="option" to="#">
              <userIcon class="icon"/>
              <p>Profile</p>
              </router-link>
            </div>
            <div class="option">
              <router-link class-="option" to="#">
              <!-- <userIcon class="icon"/> -->
              <p>Sign Out</p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      hidden: true,
    }
  },
  methods: {
    toggle() {
      this.hidden = !this.hidden;
      document.getElementById("profileMenu").hidden = this.hidden;
    }
  }
};

</script>

<style scoped>
.page-header {
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: 50%;
  background-color: 'transparent';
  @media (min-width: 0) {
    background-image: url("@/assets/bgimg2.png");
  }
  @media (min-width: 768px) {
    background-image: url("@/assets/bgimg.png");
  }
}
.page-header .container {
  z-index: 1;
}
h3 {
    margin: 40px 0 0;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a{
    color: #42b983;
}
.green-icon {
    color: 'black';
}
#header {
  font-family: system-ui, sans-serif;
  font-size:  5em;
}
#subtitle {
  font-family: system-ui;
  font-weight: bold;
  font-size: large;
}

.test {
  --b: 3px;   /* border thickness */
  --s: .15em; /* size of the corner */
  --c: #E6735C;
  
  padding: calc(.2em + var(--s)) calc(.6em + var(--s));
  color: var(--c);
  --_p: var(--s);
  background:
    conic-gradient(from 90deg at var(--b) var(--b),#0000 90deg,var(--c) 0)
    var(--_p) var(--_p)/calc(100% - var(--b) - 2*var(--_p)) calc(100% - var(--b) - 2*var(--_p));
  transition: .3s linear, color 0s, background-color 0s;
  outline: var(--b) solid #0000;
  outline-offset: .2em;

}
.test:hover,
.test:focus-visible{
  --_p: 0px;
  outline-color: var(--c);
  outline-offset: .05em;
}
.test:active {
  background: var(--c);
  color: #fff;
}

body {
  height: 50vh;
  margin: 0;
  display: grid;
  grid-template-columns: auto auto;
  gap: 20px;
  place-content: center;
  background: #DAEDFB;
}
.test {
  font-family: system-ui, sans-serif;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  border: none;
  margin: .2em;
}

.pButton {
  position: absolute;
  bottom: 0;
}
.profile {
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  right: 25px;
  bottom: 25px;
  z-index: 1;
  font-size: large;
  border-radius: 50%;
  color: #ffff;
  background-color: #303030;

  .profile-menu {
    position: absolute;
    bottom: 60px;
    right: 0;
    width:260px;
    background-color: #e3cf62;
    color: black !important;
    font-weight: bold;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 5%;

    .info {
      display: flex;
      align-items: center;
      padding: 15px;
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
