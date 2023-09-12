<script setup>
// export default {
//   name: 'NavBar',
//   props: {
//   }
// }
import { RouterLink } from "vue-router";

// const props = defineProps(

//     {
//         :{
//             type: Object,
//             route: String, 
//             color: String, 
//             label: String,
//             default: () => {(
//                     route: '',
//                     color: '',
//                     label: '',
//             )}
//         },
//         transparent : {
//             type: Boolean, 
//             default: false,
//         }
//     }    
// )

</script>

<template>
<nav class="navbar navbar-expand-lg navbar-dark bg-transparent navbar-absolute shadow-none w-100 position-absolute my-3">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Schedoo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <!-- <Router-Link class="nav-link" aria-current="page" href="#">Home</Router-Link> -->
            <a class="nav-link" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">My Calendar</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Schedule
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">CCAs</a></li>
              <li><a class="dropdown-item" href="#">Meetings</a></li>
              <!-- <li><hr class="dropdown-divider"></li> -->
              <li><a class="dropdown-item" href="#">Classes</a></li>
            </ul>
          </li>
          <!-- <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li> -->
        </ul>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>
    </div>
</nav>
</template>

<style scoped>
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
a {
  color: #42b983;
}
</style>