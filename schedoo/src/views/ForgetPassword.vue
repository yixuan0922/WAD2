<template>
    <div class="reset-password">
      <Modal v-if="modalActive" :modalMessage="modalMessage" v-on:close-modal="closeModal" />
      <!-- <Loading v-if="loading" /> -->
      <div class="form-wrap">
        <form class="reset">
          <p class="login-register">
            Back to
            <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
          </p>
          <h2>Reset Password</h2>
          <p>Forgot your passowrd? Enter your email to reset it</p>
          <div class="inputs">
            <div class="input">
              <input type="text" placeholder="Email" v-model="email" />
              <email class="icon" />
            </div>
          </div>
          <button @click.prevent="resetPassword">Reset</button>
          <div class="angle"></div>
        </form>
        <div class="background"></div>
      </div>
    </div>
  </template>

<script>
import Modal from "../components/Modal.vue";
export default {
    data() {
    return {
      email: null,
      modalActive: true,
      modalMessage: "",
    //   loading: null,
    name: 'ForgetPassword',
    components: {
        Modal,
    },
}

    


  },
    
}
</script>

<style lang="scss" scoped>
.reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>