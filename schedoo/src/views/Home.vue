<template>
    

<div class="surface-ground px-4 py-5 md:px-6 lg:px-8 scrollable-container">
    <div class="grid">
        <div class="col-12 md:col-6 lg:col-12">
            <div class="surface-card shadow-2 p-3 border-round" style="height:150px; content-justify: center; align-items:center;">
                <div class="flex justify-content-between mb-3">
                    <div>
                        <span class="block text-500 font-medium mb-3"></span>
                        <div class="text-900 font-medium text-xl"></div>
                    </div>
                    <div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-shopping-cart text-blue-500 text-xl"></i>
                    </div>
                </div>
                <div id="datetime" class="datetime">{{updateDateTime}}</div>

                    

            </div>
        </div>
    </div>
    <div class="grid">
        <div class="col-4 md:col-6 lg:col-4">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                            <div class="weather">
                                <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.flaticon.com%2Ffree-icon%2Fheavy-rain_3937493&psig=AOvVaw3A5bh3xNt6VxnPI11WYlCM&ust=1698761041803000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMCW8ZX4nYIDFQAAAAAdAAAAABAE" class="weather-icon">
                                <h1 class="temp">22°C</h1>
                                <h2 class="city">Singapore</h2>
                                <div class="details">
                                    <div class="col">
                                        <img src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F300028%2Fhumidity&psig=AOvVaw1fP3taLW4SFpjLgeV8iwpE&ust=1698761839434000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJCKlZL7nYIDFQAAAAAdAAAAABAE">
                                        <div>
                                            <p class="humidity">50%</p>
                                            <p>Humidity</p>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <img src = "https://www.google.com/url?sa=i&url=https%3A%2F%2Ficonduck.com%2Ficons%2F300028%2Fhumidity&psig=AOvVaw1fP3taLW4SFpjLgeV8iwpE&ust=1698761839434000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCJCKlZL7nYIDFQAAAAAdAAAAABAE">
                                        <div>                                       
                                            <p class="wind">15 km/h</p>
                                            <p>Wind Speed</p>
                                        </div>
                                    </div>

                                </div>
                                
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
        <div class="col-4 md:col-6 lg:col-4">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    
                </div>
                <span class="text-green-500 font-medium"></span>
                <span class="text-500"></span>
            </div>
        </div>
        <div class="col-4 md:col-6 lg:col-4">
            <div class="surface-card shadow-2 p-3 border-round">
                <div class="flex justify-content-between mb-3">
                    <div>
                        
                    </div>
                    <div class="flex align-items-center justify-content-center bg-cyan-100 border-round" style="width:2.5rem;height:2.5rem">
                        <i class="pi pi-inbox text-cyan-500 text-xl"></i>
                    </div>
                </div>
                <span class="text-green-500 font-medium">  </span>
                <span class="text-500"></span>
            </div>
        </div>
    </div>
    
</div>
</template>

<script>

export default{
    data(){
        return{
            date : new Date(),
        }
    },

    computed: {
        updateDateTime() {
            let options = {
                day: "numeric",
                month: "long", 
                year: "numeric", 
                hour: "numeric", 
                minute: "numeric",
                weekday: "long",
            };

            let locale = navigator.language;
            console.log(locale);

            let formattedUS = Intl.DateTimeFormat(locale, options).format(this.date);
            return formattedUS;

            
        },
    },
}; 






</script>



<style lang="scss">
    @import "~primeflex/primeflex.css";

    body {
  // background: #e1e7ec;
  background: #ffffff;
  font-family: "Bitter", serif;
}

* {
  box-sizing: border-box;
}

.icon {
  display: inline-block;
  width: 1em;
  height: 1em;
  stroke-width: 0;
  stroke: currentColor;
  fill: currentColor;
}

.wrapper {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  // background: url(../img/bg.png) no-repeat center;
  background-size: cover;
  @media screen and (max-width: 700px), (max-height: 500px) {
    flex-wrap: wrap;
    flex-direction: column;
  }
}

.player {
  background: #eef3f7;
  width: 410px;
  min-height: 480px;
  // box-shadow: 0px 55px 75px -10px rgba(76, 70, 124, 0.5);
  // box-shadow: 0px 55px 105px 10px rgba(76, 70, 124, 0.35);
  box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
  border-radius: 15px;
  padding: 30px;
  @media screen and (max-width: 576px), (max-height: 500px) {
    width: 95%;
    padding: 20px;
    margin-top: 75px;
    min-height: initial;
    padding-bottom: 30px;
    max-width: 400px;
  }
  &__top {
    display: flex;
    align-items: flex-start;
    position: relative;
    z-index: 4;
    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-wrap: wrap;
    }
  }

  &-cover {
    width: 300px;
    height: 300px;
    margin-left: -70px;
    flex-shrink: 0;
    position: relative;
    z-index: 2;
    border-radius: 15px;
    // transform: perspective(512px) translate3d(0, 0, 0);
    // transition: all .4s cubic-bezier(.125, .625, .125, .875);
    z-index: 1;

    @media screen and (max-width: 576px), (max-height: 500px) {
      margin-top: -70px;
      margin-bottom: 25px;
      width: 290px;
      height: 230px;
      margin-left: auto;
      margin-right: auto;
    }

    &__item {
      background-repeat: no-repeat;
      background-position: center;
      background-size: cover;
      width: 100%;
      height: 100%;
      border-radius: 15px;
      position: absolute;
      left: 0;
      top: 0;

      &:before {
        content: "";
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 1;
        position: absolute;
        top: 30px;
        transform: scale(0.9);
        filter: blur(10px);
        opacity: 0.9;
        border-radius: 15px;
      }

      &:after {
        content: "";
        background: inherit;
        width: 100%;
        height: 100%;
        box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
        display: block;
        z-index: 2;
        position: absolute;
        border-radius: 15px;
      }
    }

    &__img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 15px;
      box-shadow: 0px 10px 40px 0px rgba(76, 70, 124, 0.5);
      user-select: none;
      pointer-events: none;
    }
  }

  &-controls {
    flex: 1;
    padding-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media screen and (max-width: 576px), (max-height: 500px) {
      flex-direction: row;
      padding-left: 0;
      width: 100%;
      flex: unset;
    }

    &__item {
      display: inline-flex;
      font-size: 30px;
      padding: 5px;
      margin-bottom: 10px;
      color: #acb8cc;
      cursor: pointer;
      width: 50px;
      height: 50px;
      align-items: center;
      justify-content: center;
      position: relative;
      transition: all 0.3s ease-in-out;

      @media screen and (max-width: 576px), (max-height: 500px) {
        font-size: 26px;
        padding: 5px;
        margin-right: 10px;
        color: #acb8cc;
        cursor: pointer;
        width: 40px;
        height: 40px;
        margin-bottom: 0;
      }

      &::before {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: #fff;
        transform: scale(0.5);
        opacity: 0;
        box-shadow: 0px 5px 10px 0px rgba(76, 70, 124, 0.2);
        transition: all 0.3s ease-in-out;
        transition: all 0.4s cubic-bezier(0.35, 0.57, 0.13, 0.88);
      }

      @media screen and (min-width: 500px) {
        &:hover {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      @media screen and (max-width: 576px), (max-height: 500px) {
        &:active {
          color: #532ab9;

          &::before {
            opacity: 1;
            transform: scale(1.3);
          }
        }
      }

      .icon {
        position: relative;
        z-index: 2;
      }

      &.-xl {
        margin-bottom: 0;
        font-size: 95px;
        // filter: drop-shadow(0 2px 8px rgba(172, 184, 204, 0.3));
        // filter: drop-shadow(0 9px 6px rgba(172, 184, 204, 0.35));
        filter: drop-shadow(0 11px 6px rgba(172, 184, 204, 0.45));
        color: #fff;
        width: auto;
        height: auto;
        display: inline-flex;
        @media screen and (max-width: 576px), (max-height: 500px) {
          margin-left: auto;
          font-size: 75px;
          margin-right: 0;
        }
        &:before {
          display: none;
        }
      }

      &.-favorite {
        &.active {
          color: red;
        }
      }
    }
  }
}
[v-cloak] {
  display: none;
}
[v-cloak] > * {
  display: none;
}
.progress {
  width: 100%;
  margin-top: -15px;
  user-select: none;
  &__top {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  &__duration {
    color: #71829e;
    font-weight: 700;
    font-size: 20px;
    opacity: 0.5;
  }
  &__time {
    margin-top: 2px;
    color: #71829e;
    font-weight: 700;
    font-size: 16px;
    opacity: 0.7;
  }
}
.progress__bar {
  height: 6px;
  width: 100%;
  cursor: pointer;
  background-color: #d0d8e6;
  display: inline-block;
  border-radius: 10px;
}
.progress__current {
  height: inherit;
  width: 0%;
  background-color: #a3b3ce;
  border-radius: 10px;
}

.album-info {
  color: #71829e;
  flex: 1;
  padding-right: 60px;
  user-select: none;

  @media screen and (max-width: 576px), (max-height: 500px)  {
    padding-right: 30px;
  }

  &__name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 12px;
    line-height: 1.3em;
    @media screen and (max-width: 576px), (max-height: 500px) {
      font-size: 18px;
      margin-bottom: 9px;
    }
  }
  &__track {
    font-weight: 400;
    font-size: 20px;
    opacity: 0.7;
    line-height: 1.3em;
    min-height: 52px;
    @media screen and (max-width: 576px), (max-height: 500px)  {
      font-size: 18px;
      min-height: 50px;
    }
  }
}

.github-btn {
  position: absolute;
  right: 40px;
  bottom: 50px;
  text-decoration: none;
  padding: 15px 25px;
  border-radius: 4px;
  box-shadow: 0px 4px 30px -6px rgba(36, 52, 70, 0.65);
  background: #24292e;
  color: #fff;
  font-weight: bold;
  letter-spacing: 1px;
  font-size: 16px;
  transition: all .3s ease-in-out;

  @media screen and (min-width: 500px) {
    &:hover {
      transform: scale(1.1);
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
    }
  }

  @media screen and (max-width: 700px) {
    position: relative;
    bottom: auto;
    right: auto;
    margin-top: 20px;

    &:active {
      transform: scale(1.1);
      box-shadow: 0px 17px 20px -6px rgba(36, 52, 70, 0.36);
    }
  }
}

//scale out

.scale-out-enter-active {
  transition: all .35s ease-in-out;
}
.scale-out-leave-active {
  transition: all .35s ease-in-out;
}
.scale-out-enter {
  transform: scale(.55);
  pointer-events: none;
  opacity: 0;
}
.scale-out-leave-to {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}


//scale in

.scale-in-enter-active {
  transition: all .35s ease-in-out;
}
.scale-in-leave-active {
  transition: all .35s ease-in-out;
}
.scale-in-enter {
  transform: scale(1.2);
  pointer-events: none;
  opacity: 0;
}
.scale-in-leave-to {
  transform: scale(.55);
  pointer-events: none;
  opacity: 0;
}

//others

.datetime{
    font-family: 'Poppins', sans-serif;
    font-size: x-large;
    display:flex;
    align-items:left;
}

.card{
    width:90%;
    max-width:470px;
    color: #fff;
    margin: 100px auto 0;
    border-radius: 20px;
    padding: 40px 35px;
    text-align:center;
}
.search{
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: space-between;
}
.search input{
    border: 0;
    outline: 0;
    color: #555;
    padding: 10px 25px;
    height: 60px;
    border-radius: 30px;
    flex: 1;
    margin-right:16px;
}
.scrollable-container{
    height: 100vh;
    overflow-y: auto;
}
.weather h1{
    font-size: 60px;
    font-weight: 500;
}
.weather h2{
    font-size: 35px;
    font-weight: 400;
    margin-top:10px;
}
.details{
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding: 0 20px;
    margin-top:50px;
    
}
.col{
    // display:flex;
    align-items:center;
    text-align:left;
}
.humidity{
    font-size: 40px;
    margin: -6px;
}
.wind{
    font-size: 30px;
    margin: 50px;
}
.checkButton{
    left: 100px;
    padding-right: 30px;
}
</style>