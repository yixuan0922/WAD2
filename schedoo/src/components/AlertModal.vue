<template>
    <div class="alert-modal" v-if="show">
      <div class="modal-content">
        <div class="modal-header">
          <h2 style="color: #ed2939;">Error!</h2>
          <span @click="closeModal" class="close-button">&times;</span>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="closeModal">OK</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        show: false,
        message: "",
      };
    },
    methods: {
      openModal(message) {
        this.show = true;
        this.message = message;
      },
      closeModal() {
        this.show = false;
        this.message = "";
      },
    },
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

  .alert-modal {
    font-family: 'Poppins', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    border-radius: 13px;
  }
  
  .modal-content {
    /* background-color: #ed2939;
    color: white;
    border-radius: 10px;
    width: 80%;
    max-width: 400px; */

    font-family: "poppins", sans-serif;

    position: fixed; 
    top: 50%; 
    left: 50%; 
    border-radius: 10px; 
    transform: translate(-50%, -50%); 
    padding: 20px; 
    width: 450px; 
    background: #ffdadb; 
    border: 1px solid #ccc; 
    box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.2); 
    z-index: 999;
    color: black;
  }
  
  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
  }
  
  .close-button {
    cursor: pointer;
  }
  
  .modal-body {
    padding: 10px;
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  
  button {
    /* background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer; */

    float: right; 
    margin-right: 0px; 
    margin-top:3px;
  }
  </style>