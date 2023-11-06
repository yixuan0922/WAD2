<template>
  <div class="card container">
    <div class="card-body row">
      <div class="img container col-2">
        <img
          src="https://api-private.atlassian.com/users/5f116c2970b8a90025c6efa9/avatar?initials=public"
        />
      </div>
      <div class="text col">
        <h6 class="row">Event name</h6>
        <p class="card-text row">
          Sat Oct 28 2023 08:00:00 to Sun Oct 29 2023 08:00:00
        </p>
      </div>
    </div>
    <hr class="cardDivider" />
    <div class="card-body action">
      <button>Accept</button>
      <button class="decline">Decline</button>
    </div>
  </div>
</template>
<script></script>

<style>
.card {
  width: 300px;
  margin: auto;
  margin-bottom: 8px;
}

.img img {
  width: 100%;
  justify-content: center !important;
}

img .container .col-2 {
  display: flex;
  padding-right: 5px;
}
.card-body {
  width: 100%;
  padding: 15px !important;
  margin: auto;
}

.text {
  margin-left: 10px;
  text-align: left;
}

h6 {
  font-size: 18px;
  margin-bottom: 2px;
  font-weight: bold !important;
}

.card-text {
  font-size: 14px;
  color: gray;
}

.cardDivider {
  margin-top: 0;
  margin-bottom: 3px;
}

.action {
  display: flex;
  justify-content: space-around;
  padding: 10px 30px !important;
}

.action button {
  margin: 0;
  border-radius: 20px;
  padding: 3px 18px;
  justify-content: space-around;
}

.decline {
  background-color: whitesmoke;
  border: 2px solid #2c3e50;
  color: #2c3e50;
}
</style>
