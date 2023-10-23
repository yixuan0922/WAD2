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
                <div>
                    <h1>SCHEDOO</h1>
                    <p id="subtitle">Keep 
                        <span id="typing">

                        </span>
                    </p>
                    <div class="buttons">
                        <button type="button" class="mainBtn">
                            Get Started
                        </button>
                        <button 
                        class="mainBtn" 
                        href
                        style="--c: #373B44;--b: 3px;--s: .15em; margin-left: 15px;"
                        >
                        <!-- <a href="#section-2" style="text-decoration: none;"> -->
                            Read more
                        <!-- </a> -->
                        </button>
                    </div>
                </div>
            </div>
        </section>
        <section id="about-us">
            <div>
                <h2>Section 2</h2>
                <p>Lorem ipsum howdy</p>
            </div>
        </section>
    </main>
</template>

<script>

export default {
    name: "headerTester",
    mounted() {

        // Typing animation
        const typed = new Typed("#typing", {
            strings: ["Calm", "Amazing", "Organised", "On Time", "Focused"],
            typeSpeed: 100,
            backSpeed: 100,
            loop: true
        });
    }
}
</script>

<style>

/* Background */
#home{
  background: #f1d1b8;
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


/* Scroll aniimation */
* {
    margin: 0;
    line-height: 1.5;
    box-sizing: border-box;
    font-family: sans-serif;
}

main {
    height: 100vh;
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

main > section:nth-child(odd) {
    background: #ddd;
}

main > section > div {
    margin: auto;
    text-align: center;
}

html,
body {
    overflow: hidden;
}

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
  font-family: system-ui, sans-serif;
  font-weight: bold;
  font-size: large;
  cursor: pointer;
  border: none;
  margin: .2em;
}
</style>