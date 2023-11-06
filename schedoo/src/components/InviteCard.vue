<template>
  <div class="card container">
    <div class="card-body row">
      <div class="img container col-2">
        <img
          src="https://api-private.atlassian.com/users/5f116c2970b8a90025c6efa9/avatar?initials=public"
        />
      </div>
      <div class="text col">
        <h6 class="row title">
          {{ event.title }}
        </h6>
        <h1 class="row email">
          {{ event.invitorEmail }}
        </h1>
        <p class="card-text row">
          {{ eventStart }} to {{ eventEnd }}
        </p>
      </div>
    </div>
    <hr class="cardDivider" />
    <div class="card-body action">
      <button @click="accept">Accept</button>
      <button class="decline" @click="decline">Decline</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
    },
  },
  computed: {
    eventStart() {
      // Use JavaScript to extract the desired part of the string
      return this.event.start.split(" GMT")[0];
    },
    eventEnd() {
      // Use JavaScript to extract the desired part of the string
      return this.event.start.split(" GMT")[0];
    }
  },
  methods: {
    accept() {
      this.$emit("accept", this.event); // Emit an event to notify the parent component
    },
    decline() {
      this.$emit("decline", this.event); // Emit an event to notify the parent component
    },
  },
};



</script>

<style scoped>
.card {
  width: 300px;
  margin: auto;
  padding-bottom: 15px;
  margin-bottom: 8px;
  padding: 0 !important;
}

.img img {
  width: 30px;
  height: 30px;
  justify-content: center !important;
}

.img.container.col-2 {
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

.title, .email {
  position: absolute;
  font-size: 18px;
  margin-bottom: 2px;
  font-weight: bold !important;
  color: black;
}

.title {
  transform: translateY(-20px);

}

.email {
  font-size: 12px;
}

.card-text {
  font-size: 14px;
  color: gray;
  transform: translateY(30px);
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

@media (max-width:1000px) {
  .card {
    width: 250px;
    transform: translateX(-25px);
  }
}
</style>
