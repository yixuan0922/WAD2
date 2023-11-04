<template>
    <div class="alert-modal" v-if="show">
      <div class="modal-content">
        <div class="modal-header">
          <h2>Error!</h2>
          <span @click="closeModal" class="close-button">&times;</span>
        </div>
        <div class="modal-body">
          <p>{{ message }}</p>
        </div>
        <div class="modal-footer">
          <button @click="closeModal">OK</button>
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
  .alert-modal {
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
    background-color: #e41749;
    color: black;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
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
    background-color: white;
    color: black;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  </style>