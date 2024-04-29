<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import Parse from 'parse/dist/parse.min.js';

// Parse.initialize(
//   'jFl1QQlvXYiliMOKltV2Wo5TWDowO5UQfRj4Iyp2',
//   'zDlMbHofpO5SecuqO1UU58Pxqxr9tYne74eCkdvr'
// );

// Parse.serverURL = 'https://parseapi.back4app.com/';
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


