<script>

    import Plotly from 'plotly.js-dist-min';

    export default{
    
    data(){
    return {
            tasks: [
                { name: 'Task 1', completed: false, subtitle: 'Subtitle 1' },
                { name: 'Task 2', completed: false, subtitle: 'Subtitle 2' },
                { name: 'Task 3', completed: false, subtitle: 'Subtitle 3' },
            ],
            newTaskName: '',
        };
    },

   methods: {
        removeTask(index) {
            if (this.tasks[index].completed) {
                this.tasks.splice(index, 1); // Remove the task from the array
            }
        },

        addTask() {
        if (this.newTaskName) {
            // Add a new task with the entered name
            this.tasks.push({ name: this.newTaskName, completed: false });

            // Clear the input field after adding the task
            this.newTaskName = '';
        }
    },
    },


        mounted() {
    var trace1 = {
        x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        y: [20, 14, 23, 30, 40, 20, 30],
        name: 'Time achieved',
        type: 'bar'
    };
    var trace2 = {
        x: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        y: [12, 18, 29, 20, 30, 40, 10],
        name: 'Goal',
        type: 'bar'
    };
    var stackData = [trace1, trace2];
    var stackLayout = { 
            title: 'Amount of time on studies',
            barmode: 'stack' };
    const stackBar = document.getElementById('stackBar');
    var config = {responsive: true};
    Plotly.newPlot(stackBar, stackData, stackLayout, config);


    const donutData = [
      {
        labels: ['CCA', 'Study', 'Personal', 'Classes', 'Work', 'Meetings' ],
        values: [30, 40, 30, 30, 30, 20 ],
        type: 'pie',
        hole: 0.4, // Adjust this value for the size of the hole in the donut chart
      },
    ];

    const donutLayout = {
      title: 'Target for the day',
      showlegend: true,
    };

    Plotly.newPlot('donutChart-container', donutData, donutLayout, { responsive: true });

},
};

    const items = document.querySelectorAll(".item");

    items.forEach(item => {
        item.addEventListener("dragstart", () => {
        //adding dragging class to item after a delay
        setTimeout(() => item.classList.add("dragging"), 0);
    });

    // remove dragging class from item on dragend event
    item.addEventListener("dragend", () => item.classList.remove("dragging"));
    });


// donut chart


</script>

<template>
    <section>
        <div class='container-fluid'>
            <div class='row mt-3'>
                <div class='col'>
                </div> <!-- col -->
                <div class='col header align-items-center'>
                    Welcome Back
                </div> <!-- col -->
                <div class='col'>
                </div> <!-- col -->
            </div> <!-- row -->
        </div> <!-- container -->

    <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div class='container-fluid' style='margin-left:-250px; margin-right:-300px'>
            <div class='row'>To-Do List</div>
            <div class='row'>
                <div class='col'></div>
                <div class='col-3 mt-4' style="align-items:center; display:flex; justify-content:center; height: 400px;">
                    <div id="stackBar-container" style="display:flex; justify-content:center"></div>
                    <div id="stackBar" style="width: 350px; height: 350px;"></div>
                </div>
                <div style='width:50px'></div>
                <div class='col-3 mt-4' style="align-items: center;display:flex;justify-content:center; height: 400px">
                    <div id="donutChart-container" style="width: 350px; height: 350px;"></div>  
                </div>
                <div style='width: 50px;'></div>
                <div class="col-2 mt-4">
                    <div class="scrollable-task-list">
                        <ul class="sortable-list">
                            <li class="item" draggable="true" v-for="(task, index) in tasks" :key="index">
                                <div class="details">
                                    <input type = "checkbox" v-model="task.completed" @change="removeTask(index)"/>
                                    <span class='task-name'>
                                        {{task.name}}<br>
                                        {{ task.subtitle }}
                                    </span> 
                                </div>
                                <i class="uil uil-draggabledots"></i>
                            </li>
                        </ul>
                    </div>
                <div class="add-task">
                    <input type="text" v-model="newTaskName" @keyup.enter="addTask" placeholder="Add a new task" />
                    <button @click="addTask">Add</button>
                </div>
            </div>

                
            </div>

            </div>


            <div class='col-1'>
            </div>



        <!-- None  <576px, sm  ≥576px, md  ≥768px, lg  ≥992px, xl  ≥1200px, xxl  ≥1400px -->
        <div class='container-fluid' style='margin-left:-250px; margin-right:-300px'>
            <div class='row'>
                <div class='col'></div>
                <div class='col-2 mt-4' style="align-items:center; display:flex; justify-content:center; height: 400px;">
                    
                </div>
                <div style='width:50px'></div>
                <div class='col-3 mt-4' style="align-items: center;display:flex;justify-content:center; height: 400px">
                      
                </div>
                <div style='width: 50px;'></div>
                <div class='col-3 mt-4' style="align-items: center;display:flex;justify-content:center; height: 400px"></div>

                

            </div>

            </div>


            <div class='col-1'>
            </div>




</section>
</template>



<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;&display=swap');
@import url('https://unicons.iconscout.com/release/v4.0.0/css/line.css');



    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
    }

    body {
        /* background-color: #f2f2f2; */
    }

    .header {
        color: black;
        
        text-align: center;
        display: flex;
        justify-content: center;
        border-radius: 5px;
        height: 50px;
        vertical-align: center;
        font-size: x-large;
        font-family: 'poppin';
    }

    .box {
        border-radius: 10px;
        background-color: white;
        /* display: flex; */
        justify-content: space-around;
        height: 280px;
        opacity: 100%;
    }

    .wrapper {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(2, 100px);
        margin-right: 20px;
    }

    .sideCol {
        border-radius: 10px;
        background-color: white;
        display: flex;
        justify-content: space-around;
        height: max-content
    }

    .middleBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .loadingBar {
        top: 50px;
    }

    .ldBar {
        position: relative;
        padding-top: 10px;
    }

    .ldBar.label-center>.ldBar-label {
        position: absolute;
        top: 70%;
        left: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        text-shadow: 0 0 3px #fff;
    }

    .ldBar-label:after {
        content: "%";
        display: inline;
    }

    .ldBar.no-percent .ldBar-label:after {
        content: "";
    }

    .stretch-card>.card {
        width: 100%;
        min-width: 100%
    }

    body {
        background-color: #f9f9fa
    }

    .flex {
        -webkit-box-flex: 1;
        -ms-flex: 1 1 auto;
        flex: 1 1 auto
    }

    @media (max-width:991.98px) {
        .padding {
            padding: 1.5rem
        }
    }

    @media (max-width:767.98px) {
        .padding {
            padding: 1rem
        }
    }

    .padding {
        padding: 3rem !important
    }

    .card {
        border-radius: 5px;
        -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
        box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
        border: none;
        margin-bottom: 30px
    }

    .card .card-header {
        background-color: transparent;
        border-bottom: none;
        padding: 25px 20px
    }

    .card .card-header+.card-block,
    .card .card-header+.card-block-big {
        padding-top: 0
    }

    .card-block {
        padding: 1.25rem;
        background-color: #fff
    }

    .m-b-20 {
        margin-bottom: 20px
    }

    .card-sub {
        cursor: move;
        border: none;
        -webkit-box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05), 0 -2px 1px -2px rgba(0, 0, 0, 0.04), 0 0 0 -1px rgba(0, 0, 0, 0.05);
        box-shadow: 0 0 1px 2px rgba(0, 0, 0, 0.05), 0 -2px 1px -2px rgba(0, 0, 0, 0.04), 0 0 0 -1px rgba(0, 0, 0, 0.05)
    }

    .card-block {
        padding: 1.25rem;
        background-color: #fff
    }

    .pic {
        width: 50%;
        height: 50%;
        display: flex;
        align-items: left;
        justify-content: center;
        min-height: 100vh;
    }

    .sortable-list {
        background: #fff;
        /* width: 445px; */
        border-radius: 6px;
        padding: 30px 25px 20px;
    }

    .sortable-list .item {
        list-style: none;
        display: flex;
        border-radius: 5px;
        margin-bottom: 11px;
        border: 1px solid #ccc;
        margin-bottom: 11px;
        padding: 10px, 13px;
        align-items: center;
        justify-content: space-between
    }

    .item .details {
        display: flex;
        align-items: center;
    }

    .item .details span {
        font-size: 1.13rem;
    }

    .item i {
        color: #474747;
        font-size: 1.13rem;
    }

    .item.dragging :where(.details, i) {
        opacity: 0;
    }

    .task-name{
        margin-right: 30px;
    }

    .scrollable-task-list {
        max-height: 300px; /* Adjust the maximum height as needed */
        overflow-y: auto;
    }

    .task-subtitle{
        font-size:9px;
        margin-left:-50px;
    }

</style>
