<template>
    <section>
        <div class="form-box">
            <div class="form-value">
                <form action="">
                    <h2 class="header">Sign Up</h2>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" required v-model='firstName'>
                        <label for="">First Name</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" required v-model='lastName'>
                        <label for="">Last Name</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="text" required v-model='username'>
                        <label for="">UserName</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="email" required v-model='email'>
                        <label for="">Email</label>
                    </div>
                    <div class="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="password" class="password" required v-model='password'>
                        <label for="">Password</label>
                    </div>
    
                    <div v-show="error" class="error">{{ this.errorMsg }}</div>

                    <button @click.prevent="register">Sign Up</button>
                    <div class="register">
                        <p>
                        Already have an account?
                        <router-link class="register-account" :to="{ name: 'Login' }"
                            >Login</router-link
                        >
                        </p>
                    </div>
                </form>
            </div>
        </div>
    </section>
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
        errorMsg: "",
        };
    },
  methods: {
    async register(){
        if (
            this.email != "" &&
            this.password != "" &&
            this.firstName != "" &&
            this.lastName != "" &&
            this.username != ""
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
                this.$router.push({ name: "Login" })
                // setTimeout(this.$router.push({ name: "Login" }), 3000);
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
        else {
        this.error= true;
        this.errorMsg = "Please fill in all fields";
        return;
        }
        return;
    },
    },
};
</script>

<style lang="scss" scoped>
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
    background: url('@/assets/bkgrndImg.png');

}

.form-box {
    position: relative;
    width: 450px;
    height: 580px;
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