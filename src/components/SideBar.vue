<script setup lang='ts'>
import { ref } from 'vue';
import { routes } from '../routes/router';
const routesList = ref(routes);
const open = ref(['Generations']);

</script>

<template>
  <v-navigation-drawer class="br-teal-darken-4" theme="dark" permanent>
    <v-list v-model:opened="open">
      <template v-for="route in routesList" :key="route.name" >
        <v-list-item :to='route.path' v-if='!route.children && route.name'>
          <v-icon icon=""></v-icon>
          {{ route.name }}
        </v-list-item>

        <v-list-group v-if='route.children && route.name' :value='route.name'>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-icon icon=""></v-icon>
              {{ route.name }}
            </v-list-item>
          </template>

          <template v-for='item in route.children'>
            <v-list-group :value="item.name">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" :to='item.path'>
                  <v-icon icon=""></v-icon>
                  {{ item.name }}
                </v-list-item>
              </template>

            </v-list-group>
          </template>

        </v-list-group>
      </template>
    </v-list>
  </v-navigation-drawer>

</template>

<style scoped></style>