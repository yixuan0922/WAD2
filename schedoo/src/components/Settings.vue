<template>
    <body class="main">
        <div class="ripple-background">
            <!-- bkgrnd animations -->
            <div class="circle xxlarge shade1"></div>
            <div class="circle xlarge shade2"></div>
            <div class="circle large shade3"></div>
            <div class="circle medium shade4"></div>
            <div class="circle small shade5"></div>
        </div>
        <div class="card sliderMain" style="background-color: white">

            <!-- Goal setting for each category -->
            <p class="subtext" style="font-size: small; text-decoration: underline; margin-bottom: 10px
            ;">Time Percentage for Each Category</p>

            <div :key="cat.name" v-for="cat in categories">

                <div class="category-container">
                    <div class="row">
                        <p class="subtext col-lg-6 col-8">
                            Preferred {{ cat.name }} Time:
                        </p>
                        <p id="personalTime" class="subtext col" style="text-align: right; padding-right: 50px;">
                            {{ cat.value }}hr(s)
                        </p>
                    </div>
                    <div class="row">
                        <input type="range" min="0" max="24" v-model="cat.value" class="slider" style="margin-left:5%; margin-right:5%; width: 90%">
                    </div>
                </div>

            </div>

            <div class="row">
                <p class="extra col-4 offset-1">{{ check24hr }}</p>
                <div class="save col-6 offset-1">
                    
                    <!-- Save into database -->
                    <button type="button" @click="set()" class="btn btn-info rounded-pill mr-md-3 mb-2 mt-2 mr-2" v-if="!this.categories">Set</button>
                    <button type="button" @click="reset()" class="btn btn-info rounded-pill mr-md-3 mb-2 mt-2 mr-2" v-if="this.categories">Reset</button>
                    <button type="button" @click="save()" class="btn btn-info rounded-pill mr-md-3 mb-2 mt-2" v-if="this.categories">Save</button>
                </div>
            </div>
        </div>
    </body>
</template>
<script>

import { useStore } from "vuex";


export default {
    setup() {
        const store = useStore();
        return {store};
    },
    name: "Settings",
    data() { 
    return { 
        categories: [
            // Am assuming personal includes sleep
            {'name': "Personal", 'value': 4},
            {'name': "Study", 'value': 4},
            {'name': "CCA", 'value': 4},
            {'name': "Classes", 'value': 4},
            {'name': "Work", 'value': 4},
            {'name': "Meetings", 'value': 4},],
        };
    }, 
    computed: {
        check24hr () {
            var overall = 0;
            for (var cat of this.categories) {
                overall += +cat.value;
            }

            var diff = overall - 24;
            if (diff > 0) {
                return diff + "hours too many!"
            }
            else if (diff < 0) {
                return  -diff + "hours too few!"
            }
            else {
                return "Just right! (24hrs)"
            }
        },
    },
    methods: {
        // update(catName) {
        //     // overall total to make sure adds up to 24

        //     var val = catName.value;
        //     var overall = +val;

        //     // total before cat change
        //     var prev = 0;

        //     for (var cat1 of this.categories) {
        //         if (cat1.name != catName.name) {
        //             prev += +cat1.value;
        //         }
        //     }
            
        //     // total after cat change
        //     var total = 24 - val;

        //     for (var cat2 of this.categories) {
        //         // if not changed cat
        //         if (cat2.name != catName.name) {
        //             // get % of total * new total
        //             if (cat2.value != 0) {
        //                 cat2.value = Math.floor(cat2.value/prev * total);
        //                 overall = overall + cat2.value;
        //             }
        //             else {
        //                 cat2.value = Math.floor(total/5);
        //                 overall = overall + cat2.value;
        //             }

        //         }
        //     }

        //     var valCheck = overall - 24;
        //     if (valCheck != 0) {
        //         // making 24

        //         // not enough hrs
        //         if (valCheck < 0) {
        //             this.categories[0].value = +this.categories[0].value - (overall - 24)
        //         }
        //         // run through, edit next cat w/ enough hrs
        //         else {
        //             for (cat2 of this.categories) {
        //                 if (cat2.value >= valCheck) {
        //                     cat2.value -= valCheck;
        //                     break;
        //                 }
        //             }
        //         }
        //     }
        // },
        save() {
            // Save to firebase
            console.log(this.categories);

            var overall = 0;
            for (var cat of this.categories) {
                overall += +cat.value;
            }

            if (overall == 24) {
                this.store.dispatch('updateProfileGoals', this.categories);
            }
            else {
                alert("Make sure that your goals add up to 24hrs!")
            }
        },
        set() {
            // Save to firebase
            this.categories = [
            // Am assuming personal includes sleep
            {'name': "Personal", 'value': 4},
            {'name': "Study", 'value': 4},
            {'name': "CCA", 'value': 4},
            {'name': "Classes", 'value': 4},
            {'name': "Work", 'value': 4},
            {'name': "Meetings", 'value': 4},]
        },

        reset() {
            // Save to firebase
            this.categories = [
            // Am assuming personal includes sleep
            {'name': "Personal", 'value': 4},
            {'name': "Study", 'value': 4},
            {'name': "CCA", 'value': 4},
            {'name': "Classes", 'value': 4},
            {'name': "Work", 'value': 4},
            {'name': "Meetings", 'value': 4},]
            this.store.dispatch('updateProfileGoals', this.categories);
        },
    }, 
    mounted() {
        // Get the goals from firebase //use to dispatch
       this.store.dispatch('fetchProfileGoals').then(doc => {
            this.categories = doc;
       }); 
    }, 

}
</script>
<style scoped>
/* Fonts */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

body {
    min-height: 100vh;
    background-color: #F1D1B8;
    overflow: hidden;
    display: flex;
}

p {
    font-family: 'Poppins', sans-serif;
}
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    width: 100%; /* Full-width */
    height: 25px; /* Specified height */
    background: #d3d3d3; /* Grey background */
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
    border-radius: 25px;
    transform: translateX(-23px);
    
}

/* Mouse-over effects */
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

.subtext {
    /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
    font-weight: bold;
    font-size: 12px;
    margin-bottom: 0px;
    color: black !important;
}

.sliderMain {
    /* background-color: whitesmoke; */
    border: 1px transparent black;
    border-radius: 25px;
    margin: auto;

    /* original settings style */
    width: 60%;
    padding-bottom: 10px;
    /* margin-top: 30px; */
    transform: translate(0,30px);
    border: 2px solid grey;
    border-radius: 15px;
    padding-top: 5px;
    height: auto;
}

/* breakpts */
@media (max-width:576px) {
    .sliderMain {
        width:80%;
    }
}

@media (min-width:992px) {
    .sliderMain {
        width:40%;
    }
}

.category-container {
    display: block; /* Display as a block element */
    margin-bottom: 30px; /* Add some spacing between category containers */
}

.ripple-background {
    position: relative;
    z-index: 0;
    transform: translate(0,0);
}

.circle{
  position: absolute;
  border-radius: 50%;
  background: white;
  animation: ripple 15s infinite;
  box-shadow: 0px 0px 1px 0px #F1D1B8;
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
  opacity: 0.3;
}

.shade3{
  opacity: 0.4;
}

.shade4{
  opacity: 0.6;
}

.shade5{
  opacity: 0.7;
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

/* Remove the ::before pseudo-element content */
input.slider::before {
    content: none; /* or use content: ""; to remove it */
    background: transparent;
}

.extra {
    display: flex;
    color: black;
    font-size: small;
    align-items: center;
    justify-content: center;
    margin-bottom: 0;
}

button {
    font-family: "poppins", sans-serif;
}
</style>