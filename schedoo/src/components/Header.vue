
<script setup>
/* eslint-disable */

import { gsap } from "gsap";
import { getAuth, signOut } from "firebase/auth";
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

        <p id="header" class="text"> 
          <span class="text__first">
            <span class="text__word">SCHEDOO</span>
            <span class="text__first-bg"></span>
          </span>
        </p>

          <!-- <h1 id="header" class="text-dark mb-4 bold" >SCHEDOO</h1> -->
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


  </div>
</template>

<script>
export default {
  name: "header",
  mounted() {
    var tl = new gsap.timeline({delay: 1}),
    firstBg = document.querySelectorAll('.text__first-bg'),
    secBg = document.querySelectorAll('.text__second-bg'),
    word  = document.querySelectorAll('.text__word');
  
  tl
    .to(firstBg, 0.2, {scaleX:1})
    .to(secBg, 0.2, {scaleX:1})
    .to(word, 0.1, {opacity:1}, "-=0.1")  
    .to(firstBg, 0.2, {scaleX:0})
    .to(secBg, 0.2, {scaleX:0});
  }
}
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
/* #header {
  font-family: system-ui, sans-serif;
  font-size:  5em;
} */
#subtitle {
  font-family: system-ui;
  font-weight: bold;
  font-size: large;
  font-style: italic;
  color: #5A5A5A;
  margin-bottom: 50px;

  opacity: 0;
  animation: fadeIn 3s;
  animation-delay: 1.5s;
  animation-fill-mode: both;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

.text{
  display: inline-block;
  font-size:  5em;
  line-height: 1.205;
  color: black;
  font-family:cursive;
}

.text__first{
  position: relative;
}

.text__word{
  opacity: 0;
}

.text__first-bg{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  transform-origin: left;
  transform: scaleX(0);
}

.text__first-bg{
  background-color: #9ac86e;
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


</style>
