<template>
  <div>
    <ul v-if="reservations.length" class="wrapper">
      <li v-for="reservation in reservations" :key="reservation.objectId" class="card">
      <p>Name: {{ reservation.name }}</p>
      <p>Date: {{ new Date(reservation.date).toLocaleDateString() }} </p>
      <p>Time: {{ reservation.time }}</p>
      <p> Phone: {{ reservation.phoneNumber }} </p>
      </li>
    </ul>
    <p v-else>No reservations found.</p>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import Parse from 'parse/dist/parse.min.js'

const reservations = ref([]);

const fetchReservations = async () => {
  try {
    // Call 'getAllReservations' Cloud Function
    const result = await Parse.Cloud.run('getAllReservations');
    reservations.value = result;
  } catch (error) {
    console.error('Error retrieving reservations:', error);
    alert(error.message);
  }
};

onBeforeMount(fetchReservations);
</script>

<style scoped>
h1{
  margin-block-end: 2rem;
}

.card{
  background-color: #D99858;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 12px;
  padding: 2rem;
  align-items: center;
}

li{
  color: #FFFFFF;
}

.wrapper{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

div{
  padding-inline-start: 1rem;
}

</style>