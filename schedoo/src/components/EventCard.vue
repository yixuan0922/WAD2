<template>
  <div class="card" :class="{ 'pink-border': isExpanded }">
    <div class="card-body">
      <div class="title-row">
        <h6 class="card-title event-title">{{ title }}</h6>
        <p
          class="expand"
          @click="
            expand();
            getMidCoord(invitees, userCoord);
          "
        >
          Expand
        </p>
      </div>
      <div class="row">
        <b class="card-subtitle">
          {{ startDate }} {{ startTime }} to {{ endDate }} {{ endTime }}
        </b>
      </div>
      <div class="row" v-if="isExpanded">
        <p class="invitees">Invitees:</p>
        <p class="invitees" v-for="invitee in invitees" :key="invitee">
          {{ invitee.email }} - {{ invitee.status }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    startTime: String,
    startDate: String,
    endTime: String,
    endDate: String,
    invitees: Array,
    userCoord: Object,
  },
  data() {
    return {
      isExpanded: false,
      // midCoord: {},
    };
  },
  methods: {
    expand() {
      this.isExpanded = !this.isExpanded;
    },
    getMidCoord(inviteeList, userCoord) {
      var latCount = userCoord.lat;
      var longCount = userCoord.lng;
      var acceptedCount = 1;
      for (var invitee of inviteeList) {
        if (invitee.coords != null) {
          var coord = invitee.coords;
          latCount += coord.lat;
          longCount += coord.lng;
          acceptedCount += 1
        }
      }

      var midLat = latCount / acceptedCount;
      var midLong = longCount / acceptedCount;

      var midCoord = { lat: midLat, lng: midLong };
      console.log(midCoord);
      this.$emit('midcoord', midCoord);
    },
  },
};
</script>

<style>
.pink-border {
  border: 2px solid #f8c8dc;
}
.card {
  width: 100%;
  margin: auto;
  margin-bottom: 8px;
  padding: 0px;
}

.card-body {
  width: 100%;
  padding: 10px !important;
  margin: auto;
}

.invitees {
  color: gray;
  margin: 0px 10px;
  text-align: left;
  width: 90%;
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
  text-align: left;
  margin-left: 10px;
}

.expand {
  font-size: 14px;
  color: #0275d8;
}

.title-row {
  display: flex;
  justify-content: space-between;
  margin: 0px 10px;
}
</style>
