<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to='/landing'>Landing</router-link>
  </nav> -->
  <router-view />
</template>


<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap");

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

button,
.router-button {
  transition: 500ms ease all;
  cursor: pointer;
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #303030;
  color: #fff;
  border-radius: 20px;
  border: none;
  text-transform: uppercase;

  &:focus {
    outline: none;
  }

  &:hover {
    background-color: rgba(48, 48, 48, 0.7);
  }
}

.button-ghost {
  color: #000;
  padding: 0;
  border-radius: 0;
  margin-top: 50px;
  font-size: 15px;
  font-weight: 500;
  background-color: transparent;
  @media (min-width: 700px) {
    margin-top: 0;
    margin-left: auto;
  }

  i {
    margin-left: 8px;
  }
}

.button-light {
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
}

.button-inactive {
  pointer-events: none !important;
  cursor: none !important;
  background-color: rgba(128, 128, 128, 0.5) !important;
}

.error {
  text-align: center;
  font-size: 12px;
  color: red;
}
</style>
