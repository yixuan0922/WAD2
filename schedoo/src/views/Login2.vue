<template>
  <section>
    <div class="form-box">
      <div class="form-value">
        <form action="" autocomplete="off">
          <h2 class="login">Login</h2>
          <div class="inputbox">
            <ion-icon name="mail-outline"></ion-icon>
            <input type="email" required v-model='email'/>
            <label for="">Email</label>
          </div>
          <div class="inputbox" id="password">
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input type="password" required v-model='password'/>
            <label for="">Password</label>
          </div>

          <div v-show="error" class="error">{{ this.errorMsg }}</div>

          <div class="forget">
            <label for="">
              <input type="checkbox" /> Remember Me |
              <router-link
                class="forget-password"
                :to="{ name: 'ForgetPassword' }"
                >Forget Password</router-link
              >
            </label>
          </div>
          <button @click.prevent="signIn">Sign In</button>
          <div class="register">
            <p>
              Don't have an account?
              <router-link class="register-account" :to="{ name: 'Register' }"
                >Register</router-link
              >
            </p>
          </div>

          <hr />

          <!-- <button @click.prevent="handleGoogle" class="google">
            Sign In With Google
          </button> -->
        </form>
      </div>
    </div>
  </section>
</template>

<!-- <script>
import { auth } from "../firebase/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: "",
      errorMsg: "",
    };
  },
  methods: {
    signIn() {
      signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
        this.error = false;
        this.errorMessage = '';
        const user = userCredential.user;
        console.log(user.uid);
        this.$router.push({name: 'Landing'});
      }).catch((err) => {
        this.error = true;
        this.errorMsg = err.message
      });
    }, 
    // async handleGoogle() {
    //   const provider = await new GoogleAuthProvider();
    //   return signInWithPopup(auth, provider);
    // },
  },
};
</script> -->
<script>

import {auth} from "../firebase/firebaseInit";
import { signInWithEmailAndPassword,} from 'firebase/auth';
// import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default {
    name: 'Login',
    data() {
        return ({
            email: "",
            password: "",
            error: "", 
            errorMsg: "",
        })
    },
    methods: {
      signIn() {
        signInWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
          this.error = false;
          this.errorMessage = '';
          const user = userCredential.user;
          console.log(user.uid);
          this.$router.push({name: 'Landing'});
        }).catch((err) => {
          this.error = true;
          this.errorMsg = err.message
        });
      }, 
  
    }

}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "poppins", sans-serif;
}

#password {
  margin-bottom: 5px;
}
section {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  width: 100%;
  background: url("@/assets/bkgrndImg.png");
}

.form-box {
  position: relative;
  width: 400px;
  height: 450px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
}

.login {
  color: white;
  font-size: 2em;
  font-weight: bold;
  text-align: center;
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
  transition: 0.5s;
}
input:focus ~ label,
input:valid ~ label {
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

.inputbox ion-icon {
  position: absolute;
  right: 8px;
  color: white;
  font-size: 1.2em;
  top: 20px;
}

.forget {
  margin: -15px 0 15px;
  font: 0.9em;
  color: white;
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.forget label input {
  margin-right: 3px;
}

.forget-password {
  color: white;
  text-decoration: none;
}

.forget-password:hover {
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

.register {
  font-size: 0.9em;
  color: white;
  text-align: center;
  margin: 20px 0 10px;
}

.register-account {
  text-decoration: none;
  color: white;
  font-weight: 600;
}

.register-account:hover {
  text-decoration: underline;
}

.google {
  margin-bottom: 5px;
  margin-top: 5px;
}
</style>
