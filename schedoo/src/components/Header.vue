<script setup>
/* eslint-disable */

import Typed from "typed.js"
import { gsap } from "gsap";
import { getAuth, signOut } from "firebase/auth";
import {RouterLink, RouterView} from 'vue-router';

</script>


<template>
  <main>
    <section id="home">
      <div class="ripple-background">
        <!-- bkgrnd animations -->
        <div class="circle xxlarge shade1"></div>
        <div class="circle xlarge shade2"></div>
        <div class="circle large shade3"></div>
        <div class="circle mediun shade4"></div>
        <div class="circle small shade5"></div>

        <!-- pg1 content -->
        <div id="pg1-content">
          <h1 class="title" 
          style="text-shadow: 4px 4px 2px #edc3a3"
          >SCHEDOO</h1>
          <p class="subtitle">
            Keep 
            <span id="typing"
            style="text-decoration: underline;
            font-family: 'Poppins', sans-serif;"
            ></span></p>
          <div class="buttons">
            <button type="button" class="mainBtn">
              Get Started
            </button>
            <button 
            class="mainBtn" 
            @click="toAbout"
            style="--c: #373B44;--b: 3px;--s: .15em; margin-left: 15px;"
            >
            <!-- <a href="#section-2" style="text-decoration: none;"> -->
              About us
            <!-- </a> -->
            </button>
          </div>
        </div>
      </div>
    </section>
    <section id="about-us"
    style="background-color: #79C1CB;"
    >
      <div id="pg2-content" class="row offset-1 col-md-5 col-sm-10" style="position: relative;">
        <h1 style="font-family: 'Poppins', sans-serif; margin-bottom: 30px; transform: translate(0,-70px); font-size: xx-large">About Us</h1>

        <p class="subtitle" style="font-size: medium; transform: translate(0,-50px);">
          Its time to say goodbye to scheduling headaches and hello to a <b>more organized</b> and <b>connected academic experience</b> with Schedoo.
          <!-- As university students ourselves, we know the troubles of conflicting schedules. This app is just for that. -->
        </p>
        <p class="subtitle mx-auto" style="font-size: medium; transform: translate(0,-50px);">
        Invite peers to study sessions, CCAs and social events. <b>Enhance your own productivity</b>.
        </p>
        <!-- <p class="subtitle" style="font-size: medium;">
        Its time to say goodbye to scheduling headaches and hello to a more organized and connected academic experience with Schedoo.
      </p> -->

      </div>
      <div id="icon-float" class="col-4 offset-1 d-none d-md-block" style="position: relative;">
        <!-- <img class="float floating3" src="../assets/icons/icon7.png" width="30%" 
        style="position: absolute;  transform: translate(-150%, -60%);">
        <img class="float floating3" src="../assets/icons/icon6.png" width="30%" 
        style="position: absolute;  transform: translate(40%, -60%);"> -->
        <img class="float floating1" src="../assets/icons/icon5.png" width="80%" 
        style="position: absolute;  transform: translate(-60%, -50%);">
        <!-- <img class="float floating4" src="../assets/icons/cloudicon.png" width="50%" 
        style="position: absolute; transform: translate(-90%, -175%);">
        <img class="float floating3 " src="../assets/icons/cloudicon.png" width="50%" 
        style="position: absolute; transform: translate(-20%, -175%);">
        <img class="float floating3" src="../assets/icons/icon3Bottom.png" width="80%" 
        style="position: absolute;  transform: translate(-50%, 0%);"> -->
      </div>
    </section>
  </main>
</template>

<script>

export default {
    name: "Header",
    mounted() {

        // Typing animation
        const typed = new Typed("#typing", {
            strings: ["Calm", "Amazing", "Organised", "On Time", "Focused"],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true
        });
    },
    methods: {
      toAbout() {
        const about = document.getElementById("about-us");
        about.scrollIntoView({ behavior: "smooth" });
      }
    },
}
</script>

<style>

/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

/* Background */
#home{
  background: #f1d1b8;
}

.ripple-background {
    position: relative;
    z-index: 0;
}

.circle{
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #508fb9;
}

.small{
  width: 200px;
  height: 200px;
  left: -100px;
  bottom: -100px;
}

.medium{
  width: 400px;
  height: 400px;
  left: -200px;
  bottom: -200px;
}

.large{
  width: 600px;
  height: 600px;
  left: -300px;
  bottom: -300px;
}

.xlarge{
  width: 800px;
  height: 800px;
  left: -400px;
  bottom: -400px;
}

.xxlarge{
  width: 1000px;
  height: 1000px;
  left: -500px;
  bottom: -500px;
}

.shade1{
  opacity: 0.2;
}
.shade2{
  opacity: 0.5;
}

.shade3{
  opacity: 0.7;
}

.shade4{
  opacity: 0.8;
}

.shade5{
  opacity: 0.9;
}

@keyframes ripple{
  0%{
    transform: scale(0.8);
  }
  
  50%{
    transform: scale(1.2);
  }
  
  100%{
    transform: scale(0.8);
  }
}

/* to made sure that its on top on bkgrnd */
#pg1-content {
    position:relative;
    z-index: 100;
    transform: translate(0, 20px);
}

#pg2-content {
  position: relative;
  justify-content: center;
  align-items: center;
  margin-top:auto;
  transform: translate(0, 70px);
}

/* Title  & Subtitles*/
.title {
    font-size: 500%;
    font-weight: bold;
    font-family: 'Poppins', sans-serif;;
}

.subtitle {
    font-size: large;
    font-family: 'Poppins', sans-serif;;

}

/* Scroll aniimation */
* {
    margin: 0;
    line-height: 1.5;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

main {
    height: 100vh;
    width: 100%;
    
    overflow-y: scroll;
    scroll-snap-type: y mandatory;
}

main > section {
    height: 100vh;
    display: flex;
    background: #eee;
    scroll-snap-align: start;
    scroll-snap-stop: always;
}
/* 
main > section:nth-child(odd) {
    background: #ddd;
} */

main > section > div {
    margin: auto;
    text-align: center;
}

/* html,
body {
    overflow: hidden;
} */

/* Button animations */
.mainBtn {
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
.mainBtn:hover,
.mainBtn:focus-visible{
  --_p: 0px;
  outline-color: var(--c);
  outline-offset: .05em;
}
.mainBtn:active {
  background: var(--c);
  color: #fff;
}

.mainBtn {
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  border: none;
  margin: .2em;
}

/* Floating animation */
.floating1 {  
    animation-name: floating;
    animation-duration: 3s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}

.floating2 {  
    animation-name: floating;
    animation-duration: 4s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}

.floating3 {  
    animation-name: floating;
    animation-duration: 5s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}
 
.floating4 {  
    animation-name: floating;
    animation-duration: 6s;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
    margin-left: 30px;
    margin-top: 5px;
}

/* @keyframes floating {
    0% { transform: translate(0,  0px); }
    50%  { transform: translate(0, 15px); }
    100%   { transform: translate(0, -0px); }    
} */

@keyframes floating {
    0% { top: 0px; }
    50% { top: 15px; }
    100% { top: 0px; }
}

/* .float {
  position: absolute;
  left: 0;
  top: 50%;
} */
</style>