<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import PokeCard from '../components/PokeCard.vue';
import { getPokemons } from '../utils/pokemonApi';
import { NamedAPIResource } from 'pokenode-ts';

const router = useRouter()
const page = ref(1)
const pokemons = ref<NamedAPIResource[]>([])
const count = ref<number>(0)

watch(router.currentRoute, async (to) => {
  const newPage = Number(to.query.page) || 1
  const data = await getPokemons((newPage - 1) * 20)
  pokemons.value = data.pokemons
  count.value = data.count
  page.value = newPage

}, { immediate: true })



</script>

<template>
  <v-container v-if='pokemons.length'>
    <v-spacer class='mb-5'>
      <v-row class='wrap'>
        <v-col v-for="pokemon in pokemons" :key="pokemon.name" cols='12' xs='12' sm='6' md='3'>
          <PokeCard :pokemon='pokemon' />
        </v-col>
      </v-row>
    </v-spacer>
    <v-pagination
      :length="Number(String(count / 20).split('.')[0]) + Number((String(count / 20).split('.')?.[1] ? 1 : 0))"
      v-model='page' :update:model-value='router.push({ query: { page } })' />
  </v-container>
</template>

<style scoped></style>