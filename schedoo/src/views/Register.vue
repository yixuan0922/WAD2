<template>
    <div class='form-wrap'>
        <form class='login'>
            <p class='login-register'>
                Don't have an account
                <router-link class='router-link' :to="{name: 'Login'}">Login</router-link>
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
            <div v-show="error" class="error">{{ this.errorMsg }}</div>
            <button @click.prevent="register">Sign Up</button>
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

            createUserWithEmailAndPassword(auth, this.email, this.password).then((userCredential) => {
                const user = userCredential.user;
                const database = collection(db, "users");
                const userDoc = doc(database, user.uid);
                setDoc(userDoc, {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                })
            }).catch((err) => {
                this.error = true;
                this.errorMsg = err.message;
            })
            

            

            // const userCredential = await createUserWithEmailAndPassword(auth, this.email, this.password);
            // const user = userCredential.user;
            // const dataBase = collection(db, "users");
            // const userDoc = doc(dataBase, user.uid);
            // await setDoc(userDoc, {
            //     firstName: this.firstName,
            //     lastName: this.lastName,
            //     username: this.username,
            //     email: this.email,
            // });
            // this.$router.push({ name: "Landing" });
            // return; 
        }
        this.error= true;
        this.errorMsg = "Please fill in all fields";
        return;
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