<template>
    <div style="background-color: #F8F9FD;"> 
    <!-- style="background-image: url('https://media.tenor.com/1VEnfKkMGikAAAAd/lofi-girl-music.gif')" -->
        
         <div class="container">
            <div class="row">
                <div class="col-lg-6" style="position: relative;">
                    <div>
                        <h4 style="position: relative; font-weight: bold; text-align: start; margin-top: 60px">Welcome to your deep focus tracker.</h4>
                        <p style="position: relative; text-align: start; margin-bottom: 5px;">There is no better time to start than now. You got this!</p>
                        <img style="position: absolute; right: -13px; top: 25px; max-width: 34%; height: auto;" src="@/assets/focusTrackerHeader.png">
                    </div>
                    <div id="focusTrackerHeader" class="row" style="position: absolute; z-index: 1; position: relative">
                        <div class="row d-flex justify-content-start align-items-center" style="margin-bottom: 10px;">
                            Select a category to focus on: 
                            <select id="category" name="category" v-on:change="categoryClick()" v-model="category">
                                <option selected>Select a category</option>
                                <option value="study">Study</option>
                                <option value="cca">CCA</option>
                                <option value="personal">Personal</option>
                                <option value="classes">Classes</option>
                                <option value="work">Work</option>
                                <option value="meeting">Meetings</option>
                            </select>
                        </div>
                        <div class="row d-flex align-items-center justify-content-start" style="margin-bottom: 10px;">
                            Task: <input id="taskName" type="text" placeholder="What would you like to focus on?" v-model="taskName">
                        </div>
                        <div class="row d-flex align-items-center justify-content-start" style="margin-bottom: 19px;">
                            Duration: 
                            <select style="margin-left: 6px" id="hoursSet" v-model.number="hoursSet">
                                <option v-for="hour in 25" :key="hour"> {{ hour - 1 }}</option>
                            </select>  hr
                            <select id="minsSet" v-model.number="minsSet">
                                <option v-for="min in 60" :key="min"> {{ min - 1 }}</option>
                            </select>  min
                        </div>
                        <button class="btn btn-primary" id="readyBtn" v-on:click="clickReadyBtn()">I'm ready to begin!</button>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="row" id="timerDiv" style="margin-top: 50px;">
                        <h5 id="completedFocus" style="display: none">Great job! You've hit your goals set for studying :D</h5>
                        
                        <div id="formattedTimer">
                              <span id="hour">{{ formattedTime.split(':')[0] }}</span>:<span id="minute">{{ formattedTime.split(':')[1] }}</span>:<span id="second"> {{ formattedTime.split(':')[2] }}</span>
                              
                        </div>
                        <div id="focusBtns" style="display: none; justify-content: center; align-items: center; margin-top: 14px;">
                            <button class="btn btn-primary" style="margin-inline: 4px;" @click="startTimer" v-if="!isRunning">Start</button>
                            <button class="btn btn-warning" style="margin-inline: 4px;"  @click="pauseTimer" v-if="isRunning">Off for a break. BRB</button>
                            <button class="btn btn-danger" style="margin-inline: 4px;" @click="resetTimer">Reset</button>
                        </div>
                    </div>
                    <div id="coffee" style="margin: auto; margin-top: 14px;">
                        <div class="coffee-header">
                        <div class="coffee-header__buttons coffee-header__button-one"></div>
                        <div class="coffee-header__buttons coffee-header__button-two"></div>
                        <div class="coffee-header__display"></div>
                        <div class="coffee-header__details"></div>
                        </div>
                        <div class="coffee-medium">
                        <div class="coffe-medium__exit"></div>
                        <div class="coffee-medium__arm"></div>
                        <!-- start brewing-->
                        <div class="coffee-medium__liquid" style="display: none;"></div>
                        <div class="coffee-medium__smoke coffee-medium__smoke-one" style="display: none;"></div>
                        <div class="coffee-medium__smoke coffee-medium__smoke-two" style="display: none;"></div>
                        <div class="coffee-medium__smoke coffee-medium__smoke-three" style="display: none;"></div>
                        <div class="coffee-medium__smoke coffee-medium__smoke-for" style="display: none;"></div>
                        <!-- end brewing -->
                        <div class="coffee-medium__cup"></div>
                        </div>
                        <div class="coffee-footer"></div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Check if all fields are filled-->
        <div class="focusTrackerValidation">
            <button type="button" class="btn-close" @click="closeDialog()" style="float: right; margin-right: 0px;" aria-label="Close"></button><br>
            <h4 style="text-align: start;">Just a second!</h4>
            <p style="text-align: start;">Please ensure all fields are filled</p>
            <button class="btn btn-primary" style="float: right; margin-right: 0px;" @click="closeDialog()">Ok</button>
        </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        taskName: "",
        category: "Select a category",
        hoursSet: 0,
        minsSet: 0,
        startTime: null,
        currentTime: 0,
        timerInterval: null,
        isRunning: false,
      };
    },
    computed: {
        formattedTime() {
            const seconds = Math.floor(this.currentTime / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const secondsGoals = (this.hoursSet * 60 * 60) + (this.minsSet * 60);
            if (this.isRunning == true){
                if (Math.floor(this.currentTime / 1000) >= secondsGoals) {
                    document.getElementById('completedFocus').style.display = 'block';
                    document.getElementById('focusBtns').style.display = 'none';
                    this.resetTimer();
                    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
                }
            }
            return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
        }
    },
    methods: {
        categoryClick(){
            // For Category Dropdown
            var categories = document.getElementById('category');
            if (categories.getElementsByTagName('option')[0].innerText == 'Select a category'){
                categories.removeChild(categories.getElementsByTagName('option')[0]);
            }
        },
        clickReadyBtn(){
            if (this.taskName == "" || this.category == "Select a category" || (this.minsSet == 0 && this.hoursSet == 0)){
              document.getElementsByClassName('focusTrackerValidation')[0].style.display = 'block';
              // make these fields disabled
              document.getElementById('category').setAttribute('disabled', '');
              document.getElementById('taskName').setAttribute('disabled', '');
              document.getElementById('minsSet').setAttribute('disabled', '');
              document.getElementById('hoursSet').setAttribute('disabled', '');
              document.getElementById('readyBtn').setAttribute('disabled', '');
            } else{
              this.startTimer();
            }
        },
        startTimer() {
            document.getElementById('focusTrackerHeader').style.backgroundColor = '#E8F0FE';
            document.getElementById('focusTrackerHeader').style.height = '240px';
            document.getElementById('readyBtn').style.display = 'none';
            document.getElementById('focusBtns').style.display = 'flex';

            
            // make these fields disabled
            document.getElementById('category').setAttribute('disabled', '');
            document.getElementById('taskName').setAttribute('disabled', '');
            document.getElementById('minsSet').setAttribute('disabled', '');
            document.getElementById('hoursSet').setAttribute('disabled', '');
            if (!this.isRunning) {
                // start coffee brewing
                document.getElementsByClassName("coffee-medium__liquid")[0].style.display = "block";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-one")[0].style.display = "block";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-two")[0].style.display = "block";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-three")[0].style.display = "block";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-for")[0].style.display = "block";
                this.startTime = Date.now() - this.currentTime;
                this.timerInterval = setInterval(this.updateTime, 1000);
                this.isRunning = true;
            }
           
        },
        pauseTimer() {
            if (this.isRunning) {
                clearInterval(this.timerInterval);
                this.isRunning = false;
                // stop brewing coffee
                document.getElementsByClassName("coffee-medium__liquid")[0].style.display = "none";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-one")[0].style.display = "none";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-two")[0].style.display = "none";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-three")[0].style.display = "none";
                document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-for")[0].style.display = "none";
            }
        },
        resetTimer() {
            this.currentTime = 0;
            this.isRunning = false;
            clearInterval(this.timerInterval);
            // stop brewing coffee
            document.getElementsByClassName("coffee-medium__liquid")[0].style.display = "none";
            document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-one")[0].style.display = "none";
            document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-two")[0].style.display = "none";
            document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-three")[0].style.display = "none";
            document.getElementsByClassName("coffee-medium__smoke  coffee-medium__smoke-for")[0].style.display = "none";
        },
        updateTime() {
            this.currentTime = Date.now() - this.startTime;
        },
        
        closeDialog() {
            var dialog = document.getElementsByClassName('focusTrackerValidation')[0];
            dialog.style.display = 'none';
            // make these fields abled
            document.getElementById('category').removeAttribute('disabled');
            document.getElementById('taskName').removeAttribute('disabled');
            document.getElementById('minsSet').removeAttribute('disabled');
            document.getElementById('hoursSet').removeAttribute('disabled');
            document.getElementById('readyBtn').removeAttribute('disabled');
        }
    },
    beforeUnmount() {
      clearInterval(this.timerInterval);
    },
  };
    window.addEventListener('beforeunload', function (e) {
        e.preventDefault();
        e.returnValue = '';
    });
  </script>
  <style>
    .focusTrackerValidation {
        display: none;
        position: fixed;
        top: 50%;
        left: 50%;
        border-radius: 10px;
        transform: translate(-50%, -50%);
        padding: 20px;
        width: 450px;
        background: #fff;
        border: 1px solid #ccc;
        box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2);
        z-index: 999;
    }

    #hour, #minute, #second, #millisecond{
        width: 100px;
        height: 70px;
        background-color: #FEECE1;
        font-size: 80px;
        padding: 6px;
        border-radius: 10px;
        margin-left: 15px;
        margin-right: 15px;
        box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    }

  #formattedTimer{
    font-size: 60px;
  }
  #focusTrackerHeader{
      background-color: #ffffff;
      color: black;
      height: 270px;
      text-align: start;
      padding-top: 30px;
      padding-bottom: 30px;
      padding-left: 20px;
      padding-right: 20px;
      border-radius: 14px;
      margin-top: 70px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  }

  #category{
      width: 180px;
      border: none;
      border-bottom: 1.5px #C7C7C7 solid;
      margin-left: 10px;
      padding: 7px;
      background-color: transparent;
  }

  #category:focus, #category:active {
      outline: none !important;
      box-shadow: none;
      background-color: transparent;
  }
  
  #category:disabled {
      color: grey;
  }

  #taskName:focus, #taskName:active {
      outline: none !important;
      box-shadow: none;
      background-color: transparent;
  }
  
  #taskName{
      border: none;
      border-bottom: 1.5px #C7C7C7 solid;
      margin-left: 10px;
      padding: 7px;
      width: 260px;
      background-color: transparent;
      color: grey;
  }

  #taskName:disabled{
      background-color: transparent;
      color: grey;
  }
  
  #minsSet{
      margin-left:2px;
  }
  #hoursSet, #minsSet {
      width: 65px;
      border: none;
      border-bottom: 1.5px #C7C7C7 solid;
      margin-left: 10px;
      padding: 7px;
      width: 60px;
      background-color: transparent;
  }
  #hoursSet:focus, #hoursSet:active, #minsSet:focus, #minsSet:active {
      outline: none !important;
      box-shadow: none;
      background-color: transparent;
  }
  
  #hoursSet:disabled, #minsSet:disabled {
      color: grey;
  }

  #readyBtn{
    width: 100%;
    margin: auto;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
  }

  #coffee{
    width: 300px;
    height: 280px;
    position: relative;
    top: 10px;
  }

  .coffee-header {
  width: 100%;
  height: 80px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ddcfcc;
  border-radius: 10px;
}
.coffee-header__buttons {
  width: 25px;
  height: 25px;
  position: absolute;
  top: 25px;
  background-color: #282323;
  border-radius: 50%;
}
.coffee-header__buttons::after {
  content: "";
  width: 8px;
  height: 8px;
  position: absolute;
  bottom: -8px;
  left: calc(50% - 4px);
  background-color: #615e5e;
}
.coffee-header__button-one {
  left: 15px;
}
.coffee-header__button-two {
  left: 50px;
}
.coffee-header__display {
  width: 50px;
  height: 50px;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  border-radius: 50%;
  background-color: #9acfc5;
  border: 5px solid #43beae;
  box-sizing: border-box;
}
.coffee-header__details {
  width: 8px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #9b9091;
  box-shadow: -12px 0 0 #9b9091, -24px 0 0 #9b9091;
}
.coffee-medium {
  width: 90%;
  height: 160px;
  position: absolute;
  top: 80px;
  left: calc(50% - 45%);
  background-color: #bcb0af;
}
.coffee-medium:before {
  content: "";
  width: 90%;
  height: 100px;
  background-color: #776f6e;
  position: absolute;
  bottom: 0;
  left: calc(50% - 45%);
  border-radius: 20px 20px 0 0;
}
.coffe-medium__exit {
  width: 60px;
  height: 20px;
  position: absolute;
  top: 0;
  left: calc(50% - 30px);
  background-color: #231f20;
}
.coffe-medium__exit::before {
  content: "";
  width: 50px;
  height: 20px;
  border-radius: 0 0 50% 50%;
  position: absolute;
  bottom: -20px;
  left: calc(50% - 25px);
  background-color: #231f20;
}
.coffe-medium__exit::after {
  content: "";
  width: 10px;
  height: 10px;
  position: absolute;
  bottom: -30px;
  left: calc(50% - 5px);
  background-color: #231f20;
}
.coffee-medium__arm {
  width: 70px;
  height: 20px;
  position: absolute;
  top: 15px;
  right: 25px;
  background-color: #231f20;
}
.coffee-medium__arm::before {
  content: "";
  width: 15px;
  height: 5px;
  position: absolute;
  top: 7px;
  left: -15px;
  background-color: #9e9495;
}
.coffee-medium__cup {
  width: 80px;
  height: 47px;
  position: absolute;
  bottom: 0;
  left: calc(50% - 40px);
  background-color: #FFF;
  border-radius: 0 0 70px 70px / 0 0 110px 110px;
}
.coffee-medium__cup::after {
  content: "";
  width: 20px;
  height: 20px;
  position: absolute;
  top: 6px;
  right: -13px;
  border: 5px solid #FFF;
  border-radius: 50%;
}
@keyframes liquid {
  0% {
    height: 0px;  
    opacity: 1;
  }
  5% {
    height: 0px;  
    opacity: 1;
  }
  20% {
    height: 62px;  
    opacity: 1;
  }
  95% {
    height: 62px;
    opacity: 1;
  }
  100% {
    height: 62px;
    opacity: 0;
  }
}
.coffee-medium__liquid {
  width: 6px;
  height: 63px;
  opacity: 0;
  position: absolute;
  top: 50px;
  left: calc(50% - 3px);
  background-color: #74372b;
  animation: liquid 4s 4s linear infinite;
}
.coffee-medium__smoke {
  width: 8px;
  height: 20px;
  position: absolute;  
  border-radius: 5px;
  background-color: #b3aeae;
}
@keyframes smokeOne {
  0% {
    bottom: 20px;
    opacity: 0;
  }
  40% {
    bottom: 50px;
    opacity: .5;
  }
  80% {
    bottom: 80px;
    opacity: .3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}
@keyframes smokeTwo {
  0% {
    bottom: 40px;
    opacity: 0;
  }
  40% {
    bottom: 70px;
    opacity: .5;
  }
  80% {
    bottom: 80px;
    opacity: .3;
  }
  100% {
    bottom: 80px;
    opacity: 0;
  }
}
.coffee-medium__smoke-one {
  opacity: 0;
  bottom: 50px;
  left: 102px;
  animation: smokeOne 3s 4s linear infinite;
}
.coffee-medium__smoke-two {
  opacity: 0;
  bottom: 70px;
  left: 118px;
  animation: smokeTwo 3s 5s linear infinite;
}
.coffee-medium__smoke-three {
  opacity: 0;
  bottom: 65px;
  right: 118px;
  animation: smokeTwo 3s 6s linear infinite;
}
.coffee-medium__smoke-for {
  opacity: 0;
  bottom: 50px;
  right: 102px;
  animation: smokeOne 3s 5s linear infinite;
}
.coffee-footer {
  width: 95%;
  height: 15px;
  position: absolute;
  bottom: 25px;
  left: calc(50% - 47.5%);
  background-color: #41bdad;
  border-radius: 10px;
}
.coffee-footer::after {
  content: "";
  width: 106%;
  height: 26px;
  position: absolute;
  bottom: -25px;
  left: -8px;
  background-color: #000;
}
</style>