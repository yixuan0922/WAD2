<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class="header">Sign Up</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" required>
                        <label for="">Name</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" class="password" required>
                        <label for="">Password</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" class="confirmPassword" required>
                        <label for="">Confirm Password</label>
                    </div>
                    <div v-show="error" class="error">{{ this.errorMsg }}</div>

                    <button @click.prevent="signUp">Sign Up</button>
                </form>
            </div>
        </div>
    </section>
</template>


<script>

import {auth} from "../firebase/firebaseInit";
import { signInWithEmailAndPassword } from "firebase/auth";

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
      }
    }
}
</script>

<style lang="scss">
* {
    margin: 0;
    padding: 0;
    font-family: 'poppins', sans-serif;
}

section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    background: url('https://images.unsplash.com/photo-1695748216442-5eaad91860f2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2744&q=80');

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

h2 {
    text-align: center;
}

.header {
    color: white;
    font-size: 2em;
    font-weight: bold;
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
    transition: .5s;

}
input:focus ~ label,
input:valid ~ label{
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

.inputbox ion-icon{
    position: absolute;
    right: 8px;
    color: white;
    font-size: 1.2em;
    top: 20px;

}

.forget {
    margin: -15px 0 15px;
    font: .9em;
    color: white;
    display: flex;
    justify-content: center;

}

.forget label input{
    margin-right: 3px;
}

.forget-password{
    color: white;
    text-decoration: none;
}

.forget-password:hover{
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

.register{
    font-size: .9em;
    color: white;
    text-align: center;
    margin: 25px 0 10px;
}

.register-account {
    text-decoration: none;
    color: white;
    font-weight: 600;
}

.register-account:hover{
    text-decoration: underline;
}
</style>