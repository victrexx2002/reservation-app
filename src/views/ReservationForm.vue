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
import Parse from 'parse/dist/parse.min.js';

const reservation = ref({
  name: '',
  email: '',
  date: '',
  time: '',
  phoneNumber: '',
});

const submitReservation = async () => {
  try {
    // Format the reservation details
    const reservationDetails = `Name: ${reservation.value.name}, Email: ${reservation.value.email}, Date: ${reservation.value.date}, Time: ${reservation.value.time}, Phone: ${reservation.value.phoneNumber}`;

    const availabilityResult = await Parse.Cloud.run('checkAvailability', {
      date: reservation.value.date,
      time: reservation.value.time,
    });

    if (availabilityResult.available) {
      const creationResult = await Parse.Cloud.run('createReservation', {
        ...reservation.value,
        date: {
          __type: 'Date',
          iso: new Date(reservation.value.date + 'T' + reservation.value.time).toISOString(),
        },
      });

      if (creationResult) {
        // Send WhatsApp confirmation message along with the formatted reservation details
        const messageResult = await Parse.Cloud.run('sendWhatsAppConfirmation', {
          to: reservation.value.phoneNumber, // E.164 phone number format
          reserveeName: reservation.value.name,
          reservationDetails: reservationDetails, // Include formatted reservation details in the message
        });
        alert('Reservation created: ' + messageResult);
      }
    } else {
      alert('Sorry, the chosen date and time are already booked.');
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