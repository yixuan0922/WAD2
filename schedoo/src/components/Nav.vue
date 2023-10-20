<script setup>
/* eslint-disable */

import {RouterLink, RouterView} from 'vue-router';
</script>

<template lang="">
<nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e8da8b;">
    <div class="container">
        <a class="navbar-brand" href="#"><img src="@/assets/navschedoo.png" width="125"></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" href="#">My Calendar</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Schedule
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">CCAs</a></li>
                    <li><a class="dropdown-item" href="#">Meetings</a></li>
                    <li><a class="dropdown-item" href="#">Classes</a></li>
                    <li><a class="dropdown-item" href="#">Outings</a></li>
                </ul>
            </li>
        </ul>
        </div>
    <!-- </div>
</nav> -->



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
        <!-- </div> -->
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
</template>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
}
.nav-link {
  font-weight: bold;
  font-size: large;
  font-family: system-ui;
  letter-spacing: 0.05em;
}
</style>