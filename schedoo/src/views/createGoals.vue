<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class="header">Goal Setting</h2>
                    
                    <div class="sliders col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
                        <div class="container-fluid settings sliderMain">

                            <div :key="cat.name" v-for="cat in categories">

                                <div class="row">
                                    <p class="subtext col-lg-1 col-8">
                                        Preferred {{ cat.name }} Time:
                                    </p>
                                    <p id="personalTime" class="subtext col" style="text-align: right; padding-right: 50px;">
                                        {{ cat.value }}hr(s)
                                    </p>
                                </div>
                                <input type="range" min="1" max="24" v-model="cat.value" class="slider" @click="update(cat)">

                            </div>

                                <div v-show="error" class="error">{{ this.errorMsg }}</div>

                            <!-- Save into database -->
                            <button type="button" onclick="save()" @click.prevent="start">Start</button>
                        </div>
                    </div>
    
                   

                </form>
            </div>
        </div>
    </section>
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
* {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: url('https://images.unsplash.com/photo-1695748216442-5eaad91860f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2744&q=80');

}

.form-box {
    position: relative;
    width: 800px;
    height: 700px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    border: 2px solid rgba(255, 255, 255, 0.5);
    border-radius: 20px;
    backdrop-filter: blur(15px);
}

h2 {
    text-align: center;
}

.header {
    color: white;
    font-size: 2em;
    font-weight: bold;
}

.inputbox {
    position: relative;
    margin: 30px 0;
    width: 310px;
    border-bottom: 2px solid white;

}

.inputbox label {
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    color: white;
    font-size: 1em;
    pointer-events: none;
    transition: .5s;

}
input:focus ~ label,
input:valid ~ label{
top: -5px;
}

.inputbox input {
    width: 100%;
    height: 50px;
    background: transparent;
    border: none;
    outline: none;
    font-size: 1em;
    padding: 0 35px 0 5px;
    color: white;
}

.inputbox ion-icon{
    position: absolute;
    right: 8px;
    color: white;
    font-size: 1.2em;
    top: 20px;

}

.forget {
    margin: -15px 0 15px;
    font: .9em;
    color: white;
    display: flex;
    justify-content: center;

}

.forget label input{
    margin-right: 3px;
}

.forget-password{
    color: white;
    text-decoration: none;
}

.forget-password:hover{
    text-decoration: underline;
}

button {
    width: 100%;
    height: 40px;
    border-radius: 40px !important; 
    background-color: white;
    border: none;
    outline: none;
    cursor: pointer !important;
    font-size: 1em !important;
    font-weight: 600;
    color: #303030 !important;
    padding: 0 !important;
}

.register{
    font-size: .9em;
    color: white;
    text-align: center;
    margin: 25px 0 10px;
}

.register-account {
    text-decoration: none;
    color: white;
    font-weight: 600;
}

.register-account:hover{
    text-decoration: underline;
}

.slider {
        -webkit-appearance: none;  /* Override default CSS styles */
        appearance: none;
        width: 100%; /* Full-width */
        height: 20px; /* Specified height */
        background: #d3d3d3; /* Grey background */
        outline: none; /* Remove outline */
        opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
        -webkit-transition: .2s; /* 0.2 seconds transition on hover */
        transition: opacity .2s;
        border-radius:25px;
    
    }
    
    /* Mouse-over effects */
    .slider:hover {
        opacity: 1; /* Fully shown on mouse-over */
    }
    
    .subtext {
        /* font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif; */
        font-weight: bold;
        font-size: small;
        color:white;
        /* margin: auto; */
    }
    
    .settings {
        /* padding-right: 5%;  */
        width: 200%;
        padding:60px;
        bottom: 20px;
        margin-left: -50%;
        margin-right: auto;
        margin-top: 30px;
        border-radius: 15px;
        padding-top: 5px;
    }
</style>