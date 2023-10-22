<script setup>
/* eslint-disable */

import {RouterLink, RouterView} from 'vue-router';
</script>

<template>
<nav class="navbar navbar-expand-lg navbar-light" 
style="background-color: #e8da8b;"
>
    <div class="container">
        <a class="navbar-brand" id="navBarLogo" href="#"><img src="@/assets/navschedoo.png" width="125"></a>

        <div class="navbar-text me-auto align-bottom justify-content-end" id="wholeProfile">
            <!-- <li class="nav-item"> -->
            <!-- <RouterLink class="nav-link text-white" to="#"> Home </RouterLink> -->
            <!-- <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
            </li> -->
            <div class="profile pButton" ref="profile">
            <span @click="toggle">{{this.$store.state.profileInitials}}</span>
                <div class="profile-menu" id="profileMenu" hidden>
                <div class="info">
                    <p class="initials">{{this.$store.state.profileInitials}}</p>
                    <div class="right">
                    <p>{{this.$store.state.profileFirstName}} {{this.$store.state.profileLastName}}</p>
                    <p>{{this.$store.state.profileUsername}} </p>
                    <p>{{this.$store.state.profileEmail}} </p>
                    </div>
                </div>
                <div class="options">
                    <div class="option">
                    <router-link class-="option" to="#">
                    <userIcon class="icon"/>
                    <p>Profile</p>
                    </router-link>
                    </div>
                    <div class="option">
                    <router-link class-="option" to="#">
                    <!-- <userIcon class="icon"/> -->
                    <p>Sign Out</p>
                    </router-link>
                    </div>
                </div>
                </div>
            </div>
        </div>

        <button class="navbar-toggler" type="button" 
        data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" aria-expanded="false" 
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
            <li class="nav-item">
            <a class="nav-link active" href="#">Home</a>
            </li>
            <li class="nav-item">
            <a class="nav-link active" href="#">My Calendar</a>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link active dropdown-toggle" 
                href="#" 
                id="navbarDropdown" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                    Schedule
                </a>
                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a class="dropdown-item" href="#">CCAs</a></li>
                    <li><a class="dropdown-item" href="#">Meetings</a></li>
                    <li><a class="dropdown-item" href="#">Classes</a></li>
                    <li><a class="dropdown-item" href="#">Outings</a></li>
                </ul>
            </li>
        </ul>
        <span class="navbar-text" style="right: 5%">
            <router-link class="nav-link" :to="{name: 'Login'}">Login</router-link>
        </span>
        

        
        </div>
    </div>
</nav>



            <!-- <ul class="nav navbar-nav">
            <li class="nav-item">
                <a
                class="nav-link text-dark"
                href="https://twitter.com"
                >
                <i class="fab fa-twitter"></i>
                </a>
            </li>
            <li class="nav-item">
                <a
                class="nav-link text-dark mx-2"
                href="https://www.facebook.com"
                >
                <i class="fab fa-facebook"></i>
                </a>
            </li>
            <li class="nav-item">
                <a
                class="nav-link"
                href="https://www.instagram.com"
                >
                <i class="fab fa-instagram"></i>
                </a>
            </li>
            </ul> -->
        <!-- </div>
        
    </div>
</nav> -->
</template>

<script>
export default {
  name: "header",
  data() {
    return {
      hidden: true,
      loggedin: false,
    }
  },
  // ready: function () {
  //   checkAuth();
  //   this.profileBtn();
  // },
  // computed: {
  //   profileBtn() {
  //     document.getElementById("wholeProfile").hidden = !this.loggedin;
  //   }
  // },
  methods: {
    toggle() {
      this.hidden = !this.hidden;
      document.getElementById("profileMenu").hidden = this.hidden;
    },
    // signOut() {
    //   const auth = getAuth();

    //   signOut(auth).then(() => {
    //     alert ("Successful Signout");
    //     this.loggedin = false;
    //   }).catch((error) => {
    //     alert ("Failed Signout");
    //   });
    // },
    // checkAuth() {
    //   var user = firebase.auth().currentUser;

    //   if (user) {
    //     this.loggedin = true;
    //   } else {
    //     this.loggedin = false;
    //   }
    // }
  }
};

</script>

<style scoped>
.navbar {
    position: absolute;
    top: 0;
    width: 100%;
    z-index: 10;
}
.nav-link {
    font-weight: bold;
    font-size: large;
    font-family: system-ui;
    letter-spacing: 0.05em;
}

.profile {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  /* right: 2%;
  top: 10px; */
  margin-left: 20px;
  z-index: 1;
  font-size: large;
  border-radius: 50%;
  color: #ffff;
  background-color: #303030;

  .profile-menu {
    position: absolute;
    top: 60px;
    left: 0;
    width:260px;
    background-color: #e3cf62;
    color: black !important;
    font-weight: bold;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    border-radius: 5%;

    .info {
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid #fff;

      .initials {
        position: initial;
        width: 40px;
        height: 40px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        font-weight: normal;
      }

      .right {
        flex: 1;
        margin-left: 24px;
        text-decoration: none;

        p:nth-child(1) {
          font-size: 14px;
        }

        p:nth-child(2), 
        p:nth-child(3) {
          font-size: 12px;
        }
      }

    }
  }
}
</style>