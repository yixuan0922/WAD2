
<script setup>
/* eslint-disable */

import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-transparent navbar-absolute shadow-none"
  >
    <div class="container">
      <a class="navbar-brand" id='navBarLogo' href="#">Schedoo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-target="#navbar-header-2" aria-controls="navbar-header-2" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-header">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <!-- <RouterLink class="nav-link text-white" to="#"> Home </RouterLink> -->
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <!-- <RouterLink class="nav-link text-white" :to="{name: 'dashboard'}">
                My Calendar
              </RouterLink> -->
            <a class="nav-link" href="#">My Calendar</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Schedule</a
            >
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#"> CCAs</a></li>
              <li><a class="dropdown-item" href="#"> Meetings</a></li>
              <li><a class="dropdown-item" href="#"> Classes</a></li>
              <li><a class="dropdown-item" href="#"> Outings</a></li>
            </ul>
          </li>
        </ul>


        <!-- <ul class="nav navbar-nav">
          <li class="nav-item">
            <a
              class="nav-link text-dark"
              href="https://twitter.com"
            >
              <i class="fab fa-twitter"></i>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link text-dark mx-2"
              href="https://www.facebook.com"
            >
              <i class="fab fa-facebook"></i>
            </a>
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              href="https://www.instagram.com"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </li>
        </ul> -->
      </div>
      <ul class="navbar-nav me-auto">
        <li class="nav-item">
          <!-- <RouterLink class="nav-link text-white" to="#"> Home </RouterLink> -->
          <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
        </li>
        <div class="profile" ref="profile">
          <span>{{this.$store.state.profileInitials}}</span>
          <div class="profile-menu">
            <div class="info">
              <p class="initials">{{this.$store.state.profileInitials}}</p>
              <div class="right">
                <p>{{this.$store.state.profileLastName}} {{this.$store.state.profileLastName}}</p>
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
      </ul>
    </div>
  </nav>
  <div class="page-header opacity-75 min-vh-100" loading="lazy">
    <span class="mask bg-gradient-dark opacity-5"></span>
    <div class="container">
      <div class="row">
        <div
          class="col-lg-6 col-md-7 d-flex justify-content-center flex-column"
        >
          <h1 class="text-white mb-4">SCHEDOO</h1>
          <p class="text-white opacity-8 lead pe-5 me-5">
            Fail to Plan, Plan to Fail
          </p>
          <div class="buttons">
            <button type="button" class="btn btn-light mt-4">
              Get Started
            </button>
            <button class="btn btn-dark bg-transparent mt-4">Read more</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
}
.page-header {
  padding: 0;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-size: cover;
  background-position: 50%;
  background-color: 'transparent';
  background-image: url("https://images.unsplash.com/photo-1520769945061-0a448c463865?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
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

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #ffff;
  background-color: #303030;

  .profile-menu {
    position: absolute;
    top:60px;
    right: 0;
    width:250px;
    background-color: #303030;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

    .info {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #fff;

      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #fff;
        color: #303030;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .right {
        flex: 1;
        margin-left: 24px;

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
