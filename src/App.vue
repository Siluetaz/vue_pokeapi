<script setup lang="ts">
import { RouterView } from 'vue-router';
import SideBar from './components/SideBar.vue';

</script>

<template>
  <v-app>
   <SideBar />
    <v-main>
      <RouterView />
    </v-main>
  </v-app>
</template>

<style scoped></style>
