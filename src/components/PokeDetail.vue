<script setup lang="ts">
import { Pokemon } from 'pokenode-ts';
import { ref, watch } from 'vue';
import { getAllPokemonData, pokemonDetails } from '../utils/pokemonApi';
import { useRouter } from 'vue-router';
import PokeCard from './PokeCard.vue';
import { usePokemonImgStore } from '../store/pokemonImage';
import { storeToRefs } from 'pinia';

const router = useRouter()
const pokemon = ref<Pokemon | null>(null)
const details = ref<pokemonDetails[] | null>(null)
const store = usePokemonImgStore()
const { pokemonImg } = storeToRefs(store)
watch(router.currentRoute, async (to) => {
  const name = to.params.name.toString()
  if (!name) return
  const allData = await getAllPokemonData(name)
  pokemon.value = allData.pokemon
  details.value = allData.pokemonDetails
  await getAllPokemonData(name)
}, { immediate: true })

</script>

<template>
  <v-container v-if='pokemon'>
    <v-row>
      <v-col cols='7'>
        <v-sheet class='w-100'>
          <v-img :src='pokemonImg' />
        </v-sheet>
        <p class='text-h3 font-weight-bold text-capitalize '>
          {{ pokemon.name }}
        </p>
      </v-col>
      <v-col cols='5'>
        <PokeCard :pokemon='pokemon as any' :types='false' :title='false' :redirect='false'>
          <v-divider />
          <v-sheet class='pa-5 pb-2 d-flex ga-1 flex-column'>
            <v-sheet v-for='{ key, value, textTransform, decoration } in details'
              class='d-flex justify-space-between ga-5'>
              <p class=''>{{ key }}</p>
              <p :class='`${textTransform} text-end`'>{{ value }} {{ decoration }}</p>
            </v-sheet>
          </v-sheet>
        </PokeCard>
      </v-col>
    </v-row>
  </v-container>
</template>