<template lang="">
    <div class="sliders col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
        <div class="container-fluid settings sliderMain">

            <!-- Goal setting for each category -->
            <p class="subtext">Time Percentage for Each Category</p>

            <div :key="cat.name" v-for="cat in categories">

                <div class="row">
                    <p class="subtext col-lg-7 col-8">
                        Preferred {{ cat.name }} Time:
                    </p>
                    <p id="personalTime" class="subtext col" style="text-align: right; padding-right: 50px;">
                        {{ cat.value }}hr(s)
                    </p>
                </div>
                <input type="range" min="1" max="24" v-model="cat.value" class="slider" @click="update(cat)">

            </div>

            <!-- Save into database -->
            <button type="button" onclick="save()" class="btn btn-info rounded-pill mr-md-3 mb-md-2 mt-5">Save</button>
        </div>
    </div>
</template>
<script>
export default {
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
    methods: {
        update(catName) {
            // overall total to make sure adds up to 100

            var val = catName.value;
            var overall = +val;

            // total before cat change
            var prev = 0;

            for (var cat1 of this.categories) {
                if (cat1.name != catName.name) {
                    prev += +cat1.value;
                }
            }
            
            // total after cat change
            var total = 24 - val;

            for (var cat2 of this.categories) {
                // if not changed cat
                if (cat2.name != catName.name) {
                    // get % of total * new total
                    cat2.value = Math.floor(cat2.value/prev * total);
                    overall = overall + cat2.value;

                }
            }

            if (overall - 24 != 0) {
                // making 100
                this.categories[0].value = +this.categories[this.categories.length-1].value - (overall - 24)
            }
        },
        save() {
            // Save to firebase
            // able to store same format as categories?
        },
    }
}
</script>
<style scoped>
/* #main {
background-color: #f1d1d8;
}; */

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

}

/* Mouse-over effects */
.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}

.subtext {
    /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
    font-weight: bold;
    font-size: small;
    /* margin: auto; */
}

.settings {
    /* padding-right: 5%;  */
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;
    border: 2px solid grey;
    border-radius: 15px;
    padding-top: 5px;
}


.sliderMain {
    background-color: whitesmoke;
    border: 1px transparent black;
    border-radius: 25px;
    margin: auto;
    margin-top: 30px;
}


</style>