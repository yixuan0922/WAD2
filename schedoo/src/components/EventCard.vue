<template>
    <div class="card">
      <div class="card-body row">
        <div class="img container col-4">
          <img
            src="https://api-private.atlassian.com/users/5f116c2970b8a90025c6efa9/avatar?initials=public"
          />
        </div>
        <div class="card-body text col container">
          <h6 class="card-title row event-title">Event name</h6>
          <p class="card-subtitle row">
            Sat Oct 28 2023 08:00:00 to Sun Oct 29 2023 08:00:00
          </p>
        </div>
      </div>
    </div>
  </template>

  
  <script></script>
  
  <style>
  .card {
    width: 100%;
    margin: auto;
    margin-bottom: 8px;
    padding: 0px;
  }
  
  .img img {
    width: 100%;
    height: auto !important;
    justify-content: center !important;
  }
  
  img .container .col-4 {
    display: flex;
    padding-right: 5px;
  }
  .card-body {
    width: 100%;
    padding: 10px !important;
    margin: auto;
  }
  
  .text {
    margin-left: 10px;
    text-align: left;
  }
  
  .event-title {
    font-size: 18px;
    margin-bottom: 5px;
    font-weight: bold !important;
    color: gray;
  }
  
  .card-subtitle {
    font-size: 14px;
    color: gray;
  }
  </style>