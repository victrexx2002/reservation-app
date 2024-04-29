<template>
  <div>
    <form @submit.prevent="submitReservation" class="container">
      <input v-model="reservation.name" placeholder="Name" required />
      <input v-model="reservation.email" type="email" placeholder="Email" required />
      <input v-model="reservation.date" type="date" placeholder="Date" required />
      <input v-model="reservation.time" type="time" placeholder="Time" required />
      <input v-model="reservation.phoneNumber" type="tel" placeholder="Phone Number" required />
      <div>
        <button type="submit">Create Reservation</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Parse from 'parse/dist/parse.min.js'

const reservation = ref({
  name: '',
  email: '',
  date: '',
  time: '',
  phoneNumber: ''
});

const submitReservation = async () => {
  try {
    const availabilityResult = await Parse.Cloud.run('checkAvailability', {
      date: reservation.value.date,
      time: reservation.value.time
    });

    if (availabilityResult.available) {
      const creationResult = await Parse.Cloud.run('createReservation', {
        ...reservation.value,
        date: {
          __type: 'Date',
          iso: new Date(reservation.value.date + 'T' + reservation.value.time).toISOString()
        }
      });

      if (creationResult) {
        await Parse.Cloud.run('sendWhatsAppConfirmation', {
          to: reservation.value.phoneNumber,
          reserveeName: reservation.value.name, 
          body: 'Your reservation has been confirmed.' 
        });
        
        alert('Reservation created and confirmation has been sent via WhatsApp.');
      }
    } else {
      alert('Sorry, the chosen date and time are not available.');
    }
  } catch (error) {
    console.error('Error creating reservation:', error);
    alert('Error while processing your reservation: ' + error.message);
  }
};
</script>

<style scoped>

  form{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
  }

</style>