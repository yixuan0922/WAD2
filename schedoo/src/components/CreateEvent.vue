<template>
    <head></head>
    <body id="createTaskBody">
        <!-- Add code here -->
        <div class="container col-8 shadow-md"> 
            <div class="row" id="createTask">
                <div class="row" style="top:0px; margin-bottom: 20px;">
                    <h3 style="text-align: center;">Create New Task 
                        <button type="button" class="btn-close" style="float: right; margin-right: 0px;" aria-label="Close"></button>
                    </h3>
                </div><br>
                <form class="row" style="text-align: start;">
                    <!-- Left column -->
                    <div class="col-lg-6">
                        <div class="row mb-3">
                            <div class="col-sm-6">
                                <select id="category" name="category" v-on:change="categoryClick()">
                                    <option value="category">Select a category</option>
                                    <option value="study">Study</option>
                                    <option value="cca">CCA</option>
                                    <option value="personal">Personal</option>
                                    <option value="classes">Classes</option>
                                    <option value="work">Work</option>
                                    <option value="meeting">Meetings</option>
                                </select>
                            </div>
                            <!-- <div class="dropdown col-sm-6 custom-select">
                                <button class="btn dropdown-toggle custom-select" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Select a category
                                </button>

                                <ul class="dropdown-menu">
                                    <li><a class="dropdown-item">Personal</a></li>
                                    <li><a class="dropdown-item">Study</a></li>
                                    <li><a class="dropdown-item">CCA</a></li>
                                    <li><a class="dropdown-item">Classes</a></li>
                                    <li><a class="dropdown-item">Work</a></li>
                                    <li><a class="dropdown-item">Meetings</a></li>
                                </ul>
                            </div> -->
                            <div class="col-sm-6">
                                <input id="taskName" type="text" class="form-control" placeholder="Enter a task name">
                            </div>
                        </div>

                        <div class="mb-3">
                            <label for="agenda" class="form-label">Agenda</label><br>
                            <textarea id="agenda" name="agenda" class="form-control" placeholder="Enter agenda of task" style="height:108px; width: 100%;"></textarea>
                        </div>
                        <div class="mb-3">
                            <label for="location" class="form-label">Location or Video Call</label><br>
                            <div class="ui icon big input" id="locator-input-section" style="width: 100%;">
                                <input id="location" type="text" class="form-control" v-on:keyup="autoComplete()" placeholder="Enter Location or Video Call link">
                                <i aria-hidden="true" class="dot circle outline link icon" v-on:click="locateMe()" id="locator-button"></i>
                            </div>
                        </div>
                    </div>
                    <!-- Right column -->
                    <div class="col-lg-6">
                        <div class="mb-3">

                            <!-- All day toggle -->
                            <p type="text" class="form-control" style="padding-top: 8.5px">All-day
                                <label class="switch" style="float: right; margin-right: 16px; padding-bottom: 4px;">
                                    <input id="toggleAllDay" type="checkbox" checked>
                                    <span class="slider round"></span>
                                </label>
                            </p>

                            <!-- Start Date -->
                            <div type="text" class="form-control">
                                <div class="row">
                                    <p class="col-sm-7" style="padding-top: 4px">Start Date</p>
                                    <input class="col-sm-5" type="datetime-local" id="startDate" name="endDate" style="float: right; text-align: end; margin-right: 0px; padding-bottom: 4px;">
                                </div>
                            </div>

                            <!-- End Date -->
                            <div type="text" class="form-control">
                                <div class="row">
                                    <p class="col-sm-7" style="padding-top: 4px">End Date</p>
                                    <input class="col-sm-5" type="datetime-local" id="endDate" name="endDate" style="float: right; text-align: end; margin-right: 0px; padding-bottom: 4px;">
                                </div>
                            </div>
                        </div>

                        <!-- Repeat toggle -->
                        <p type="text" class="form-control" style="padding-top: 8.5px">Repeat
                            <label class="switch" style="float: right; margin-right: 16px; padding-bottom: 4px;">
                                <input id="toggleRepeat" type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </p>
                        
                        <!-- Add Invitees -->
                        <div class="mb-3">
                            <div class="row">
                                <div class="col">
                                    <label for="invitees" class="form-label">Add Invitees</label>
                                </div>
                                <div class="col-8 d-flex justify-content-end">
                                    <a><i class="fa-solid fa-user-plus mx-2"></i>Create Group</a>
                                </div>
                            </div>
                            <div class="emails emails-input">
                                <input id="emails-input" v-on:keup.enter="checkEmail()" type="text" role="emails-input" placeholder="Enter email(s) here ...">
                            </div>

                            <!-- User suggestion -->
                            <div id="userSuggestion" class="row" style="display:none; position: absolute; z-index: 99; margin-left: 0px; width: 305px; max-height: 160px; overflow-y: scroll; overflow-x: hidden; background-color: white; border-radius: 5px; box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2); padding: 3px;">
                                <p style="margin: 2px; margin-top: 7px; margin-bottom: 4px;">Suggested Contacts</p>
                                <!-- Group -->
                                <div class="row my-2">
                                    <div class="col-2">
                                        <div style="width: 35px; height: 35px; margin-top:3px; border-radius: 50%; color: gray; border: 2px solid #7DB8D7; background-color: #AFD4E7; display: flex; align-items: center; justify-content: center;">
                                            WA
                                        </div>
                                    </div>
                                    <div class="col-10">
                                        <p id="name" style="margin-bottom:0px; font-weight: bold;">WAD2 Project</p>
                                        <p id="email" style="color: blue">faithkoh.2022@scis.smu.edu.sg, ivyn.2022@scis.smu.edu.sg ...</p>
                                    </div>
                                </div>
                                <!-- Individual -->
                                <div class="row my-2">
                                    <div class="col-2">
                                        <div style="width: 35px; height: 35px; margin-top:3px; border-radius: 50%; color: gray; border: 2px solid #6EC8BD; background-color: #FEECE1; display: flex; align-items: center; justify-content: center;">
                                            SF
                                        </div>
                                    </div>
                                    <div class="col-10">
                                        <p id="name" style="margin-bottom:0px; font-weight: bold;">Samantha Foo</p>
                                        <p id="email" style="color: blue">samanthafoo.2022@scis.smu.edu.sg</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Buttons -->
                    <div class="row" style="justify-content:flex-end; margin-top: 10px;">
                        <button class="col-2 btn btn-light" style="width: 66px; margin-right: 10px;">Cancel</button>
                        <button type="Create" class="col-2 btn btn-primary" style="width: 66px;">Create</button>
                    </div>
                </form>
            </div>
        </div>
        <div id="custom-dialog" class="dialog">
            <button type="button" class="btn-close" @click="closeDialog()" style="float: right; margin-right: 0px;" aria-label="Close"></button><br>
            <p>This file wants to know your location</p>
            <button class="btn btn-primary" style="margin-right: 4px;" @click="allow()">Allow</button>
            <button class="btn btn-primary" style="margin-left: 4px;" @click="block()">Block</button>
        </div>
    </body>
</template>

<script>
    export default {
    name: "CreateEvent",
    async mounted() {
        // Load your external scripts dynamically when the component is mounted
        this.loadScripts([
        'https://www.googletagmanager.com/gtag/js?id=UA-23581568-13',
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8&libraries=places&callback=Function.prototype'
        ]);

        // Load your stylesheets dynamically
        this.loadStylesheets([
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css',
        'https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.0/semantic.min.css',
        ]);
    },
    methods: {
        loadScripts(sources) {
        sources.forEach((src) => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.head.appendChild(script);
        });
        },
        loadStylesheets(links) {
        links.forEach((href) => {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = href;
            document.head.appendChild(link);
        });
        },

        locateMe() {
            var locatorSection = document.getElementById("locator-input-section");
            locatorSection.classList.add("loading")
            var dialog = document.getElementById('custom-dialog');
            dialog.style.display = 'block';
            
        },

        allow() {
            navigator.geolocation.getCurrentPosition(function (position) {
                var dialog = document.getElementById('custom-dialog');
                var lat = position.coords.latitude;
                var long = position.coords.longitude;
                dialog.style.display = 'none';
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var address = JSON.parse(this.responseText)
                        var input = document.getElementById("location");
                        input.value = address.results[0].formatted_address
                    }
                };
                xhttp.open("GET", "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + long + "&key=AIzaSyAKTrhndkmbAdokRZDs9leVXed6e3lhrf8", true);
                xhttp.send();
                var locatorSection = document.getElementById("locator-input-section");
                locatorSection.classList.remove("loading");
            })
        },

        block() {
            var locatorSection = document.getElementById("locator-input-section");
            locatorSection.classList.remove("loading");
            alert("The Locator was denied :( Please add your address manually");
            var dialog = document.getElementById('custom-dialog');
            dialog.style.display = 'none';
        },

        closeDialog() {
            var dialog = document.getElementById('custom-dialog');
            dialog.style.display = 'none';
            var locatorSection = document.getElementById("locator-input-section");
            locatorSection.classList.remove("loading");
        },

        autoComplete(){
            var input = document.getElementById("location");
            var options = {
                componentRestrictions: { country: "sg" }
            };
            new window.google.maps.places.Autocomplete(input, options);
        },

        categoryClick(){
            // For Category Dropdown
            var categories = document.getElementById('category');
            if (categories.getElementsByTagName('option')[0].value == 'category'){
                categories.removeChild(categories.getElementsByTagName('option')[0]);
            }
        }
    },
    };
        
    // Recommendation 
    document.addEventListener("click", (event) => {
        var emailInput = document.getElementById('emails-input');
        var userSuggestion = document.getElementById('userSuggestion');
        let targetEl = event.target; // clicked element      
        do {
            if(targetEl == emailInput) {
                // user clicks input
                userSuggestion.style.display = 'flex';
                return;
            }
            // Go up the DOM
            targetEl = targetEl.parentNode;
        } while (targetEl);
            // This is a click outside.      
            if (userSuggestion != null){
                userSuggestion.style.display = 'none';
            }
    });
</script>

<style>
    #createTaskBody {
        display: grid;
        place-items: center;
        font-family: "Lato", Arial, sans-serif;
        height: 100vh;
        margin: 0;
    }

    #createTask{
        background-image: linear-gradient(140deg, #FEECE1, #e1e5fe);
        padding: 50px;
        border-radius: 15px;
    }

    .dialog {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        padding: 20px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.5);
        z-index: 999;
    }

    input[type=text], select, textarea {
        width: 100%;
        padding: 12px;
        color: darkcyan;
        border: 1px solid #ccc;
        resize: vertical;
    }

    .form-control, #category, input[type=text]{
        height: 40px;
        border-color: DEDEDF;
        padding: auto;
        color: #808080;
    }

    #category {
        background-color: DodgerBlue;
        border-radius: 6px;
        max-height: 100%;
        margin-top: 3px;
        color: white;
    }

    /* For "All-day" and "Repeat" toggle button */
    .switch {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 34px;
    }

    #toggleAllDay, #toggleRepeat{ 
        position: relative;
        opacity: 0;
    }

    .slider {
        position: absolute;
        cursor: pointer;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
    }

    /* Circle icon */
    .slider:before {
        position: absolute;
        content: "";
        height: 17px;
        width: 17px;
        left: 4px;
        bottom: 3px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
    }

    #toggleAllDay:checked + .slider {
    background-color: #2196F3;
    }

    #toggleAllDay:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    #toggleAllDay:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(16px);
    }

    #toggleRepeat:checked + .slider {
    background-color: #2196F3;
    }

    #toggleRepeat:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
    }

    #toggleRepeat:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(16px);
    }

    /* Blue rounded-border rectangle */
    .slider.round {
        border-radius: 34px;
        height: 22px;
        width: 40px;
    }

    .slider.round:before {
        border-radius: 50%;
    }

    /* For Date Time Picker */
    #startDate, #endDate{
        border: none;
        height: 30px;
    }

    #startDate, #endDate:focus{
        border: none;
    }

    /* add invitees */
    .emails.emails-input {
        max-height: inherit;
        border-radius: 0.25rem;
        background: #fff;
        border: 1px solid #c3c2cf;
        box-sizing: border-box;
        line-height: 1.5rem;
        cursor: text;
        overflow: auto;
    }
    /* for the rounded rectangle when email is added */
    .emails.emails-input .email-chip {
    box-sizing: border-box;
    position: relative;
    display: inline-block;
    background: rgba(102, 153, 255, 0.2);
    vertical-align: top;
    border-radius: 6.25rem;
    padding-left: 0.625rem;
    padding-right: 1.5rem;
    margin-left: 10px;
    margin-top: 10px;
    max-width: 100%;
    overflow: hidden;
    }

    .emails.emails-input .email-chip .content {
    display: inline-block;
    vertical-align: top;
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    }

    .emails.emails-input .email-chip .remove {
    text-decoration: none;
    color: inherit;
    text-align: center;
    position: absolute;
    cursor: pointer;
    width: 1rem;
    user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -o-user-select: none;
    }

    .emails.emails-input .email-chip.invalid {
    background: #fff;
    border-bottom: 1px dashed #d92929;
    border-radius: 0;
    padding-left: 0;
    padding-right: 1rem;
    }

    .emails.emails-input input {
    border: 0;
    line-height: inherit;
    }

    .emails.emails-input input::placeholder,
    .emails.emails-input input::-ms-input-placeholder,
    .emails.emails-input input:-ms-input-placeholder {
    color: #c3c2cf;
    opacity: 1;
    }

    .emails.emails-input input:focus {
    outline: none;
    }

</style>