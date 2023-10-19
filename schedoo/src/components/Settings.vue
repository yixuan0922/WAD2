<template lang="">
    <div class="sliders col-xl-8 offset-xl-2 col-lg-10 offset-lg-1">
        <div class="container-fluid settings sliderMain">

            <!-- Goal setting for each category -->
            <p class="subtext">Time Percentage for Each Category</p>

            <div :key="cat.name" v-for="cat in categories">

                <div class="row">
                    <p class="subtext col-lg-7 col-8">
                        Preferred {{ cat.name }} % Time:
                    </p>
                    <p id="personalTime" class="subtext col" style="text-align: right; padding-right: 50px;">
                        {{ cat.value }}hr(s)
                    </p>
                </div>
                <input type="range" min="1" max="24" v-model="cat.value" class="slider" @click="update(cat)">

            </div>

            <!-- Save into database -->
            <button type="button" onclick="save()" class="btn btn-info rounded-pill mr-md-3 mb-md-2 mt-5">Save</button>

            <!-- Sign out -->
            &nbsp;
            <button type="button" onclick="signout()" class="btn btn-dark rounded-pill mr-md-3 mb-md-2 mt-5">Sign Out</button>
        </div>
    </div>
</template>
<script>
export default {
    name: "Settings",
    data() { 
    return { 
        categories: [
            {'name': "Personal", 'value': 8},
            {'name': "Study", 'value': 8},
            {'name': "CCA", 'value': 8}],
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
                this.categories[this.categories.length-1].value = +this.categories[this.categories.length-1].value - (overall - 24)
            }
        }
    }
}
</script>
<style lang="">

</style>