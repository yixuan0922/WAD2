<template>
    <div class='form-wrap'>
        <form class='login'>
            <p class='login-register'>
                Don't have an account
                <router-link class='router-link' :to="{name: 'Register'}">Login</router-link>
            </p>
            <h2>Create your Schedoo Account</h2>
            <div class="inputs">
                <div class="input">
                    <input type='text' placeholder='First Name' v-model='firstName'/>
                </div>
            </div>
            <div class="inputs">
                <div class="input">
                    <input type='text' placeholder='Last Name' v-model='lastName'/>
                </div>
            </div>
            <div class="inputs">
                <div class="input">
                    <input type='text' placeholder='Username' v-model='username'/>
                </div>
            </div>
            <div class="inputs">
                <div class="input">
                    <input type='text' placeholder='Email' v-model='email'/>
                </div>
            </div>
            <div class="inputs">
                <div class="input">
                    <input type='password' placeholder='Password' v-model='password'/>
                </div>
            </div>
            <div v-show='error' class="error">{{this.errorMsg}}</div>
            <button @click.prevent="register">Sign In</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>


<script>
// import * as firebase from "firebase/app";
// import firebase from "firebase/app";
// import "firebase/auth"; // Import auth module here
import { collection, doc, setDoc } from "firebase/firestore";
import {db, auth} from "../firebase/firebaseInit";
import { createUserWithEmailAndPassword } from "firebase/auth";
export default {
    name: 'Register',
    data() {
        return {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        error: "", 
        errorMessage: "",
        };
    },
  methods: {
    async register(){
        if (
            this.email !== "" &&
            this.password !== "" &&
            this.firstName !== "" &&
            this.lastName !== "" &&
            this.username !== ""
        ) {
        this.error = false;
        this.errorMsg = "";

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            const user = userCredential.user;
            // const dataBase = db.collection('user').doc(user.uid);
            const dataBase = collection(db, "users");
            const userDoc = doc(dataBase, user.uid);
            await setDoc.set(userDoc, {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                email: this.email,
            });

            this.$router.push({ name: "Landing" });
            return; 
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        }
        } else {
            this.error= true;
            this.errorMsg = "Please fill in all fields";
        }
    },
    },
};


</script>

<style lang="scss" scoped>
.register {
  h2 {
    max-width: 350px;
  }
}
</style>