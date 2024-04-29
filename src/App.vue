// App.vue
<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper" id="app">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/reservations">View Reservations</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>


