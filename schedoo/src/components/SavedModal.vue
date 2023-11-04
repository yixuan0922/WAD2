<template>
    <div class="saved-modal" v-if="show">
      <div class="modal-content">
        <div class="modal-body">
          <p>Your changes have been saved successfully!</p>
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
      };
    },
    methods: {
      openModal() {
        this.show = true;
      },
      closeModal() {
        this.show = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .saved-modal {
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
    background-color: green;
    color: white;
    border-radius: 10px;
    width: 80%;
    max-width: 400px;
    height: 100px;
  }
  
  .modal-body {
    padding: 10px;
    /* padding-top: 50px; */
  }
  
  .modal-footer {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
  
  button {
    background-color: white;
    color: green;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
    transform: translateY(-40px);
  }
  </style>