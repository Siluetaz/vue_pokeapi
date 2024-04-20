<script setup lang="ts">
import { ref, watch } from 'vue';
import { getPokemonByName } from '../utils/pokemonApi';
import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import TypesSection from './TypesSection.vue';
import { usePokemonImgStore } from '../store/pokemonImage';

interface Props {
  pokemon: NamedAPIResource,
  types?: boolean,
  title?: boolean
  redirect?: boolean
}

const { pokemon } = withDefaults(defineProps<Props>(), {
  title: true,
  types: true,
  redirect: true
})

const emit = defineEmits<{ (e: 'click'): void }>()

const handleClick = () => {
  emit('click')
}
const imageSrc = ref<string>(``)
const gender = ref<string>('male')

const genders = ref([
  {
    value: 'male',
    color: 'blue',
    icon: '$genderMale'
  },
  {
    value: 'female',
    color: 'pink',
    icon: '$genderFemale'
  }])
const shinyMode = ref<boolean>(false)
const currentPokemon = ref<Pokemon | null>(null)
const srcMaleDefault = ref<string>('')
const srcFemaleDefault = ref<string>('')
const srcMaleShiny = ref<string>('')
const srcFemaleShiny = ref<string>('')
const { setPokemonImg } = usePokemonImgStore()
watch(pokemon, async (newPokemon) => {
  currentPokemon.value = await getPokemonByName(newPokemon.name)

}, { immediate: true })

watch(currentPokemon, (newPokemon) => {
  if (!newPokemon) return
  imageSrc.value = newPokemon.sprites.other?.['official-artwork'].front_default || ''

  srcMaleDefault.value = newPokemon.sprites.other?.['official-artwork'].front_default || newPokemon.sprites.front_default || ''
  srcFemaleDefault.value = newPokemon.sprites.other?.['official-artwork'].front_female || newPokemon.sprites.front_female || ''
  srcMaleShiny.value = newPokemon.sprites.other?.['official-artwork'].front_shiny || newPokemon.sprites.front_shiny || ''
  srcFemaleShiny.value = newPokemon.sprites.other?.['official-artwork'].front_shiny_female || newPokemon.sprites.front_shiny_female || ''

}, { immediate: true })

watch([shinyMode, gender], ([newShinyMode, newGender]) => {
  if (!currentPokemon.value) return
  if (newShinyMode) {
    imageSrc.value = newGender === 'male' ? srcMaleShiny.value : srcFemaleShiny.value || srcMaleShiny.value

    return
  }

  imageSrc.value = newGender === 'male' ? srcMaleDefault.value : srcFemaleDefault.value || srcMaleDefault.value

})

watch(imageSrc, (newSrc) => {
  if (!newSrc) return
  console.log(newSrc)
  setPokemonImg(newSrc)
})

const changeShinyMode = () => {
  if (!currentPokemon.value) return
  shinyMode.value = !shinyMode.value
}

const changeGender = () => {
  if (!currentPokemon.value) return
  if (gender.value === 'male') return gender.value = 'female'

  gender.value = 'male'
}

</script>

<template>
  <v-card v-if='currentPokemon' :to='redirect ? `/pokemon/${currentPokemon.name}` : ""' :link='redirect'
    :hover='redirect' @click='handleClick'>
    <v-card-item>
      <v-card-title v-if='title' class='text-capitalize font-weight-bold mb-1'>
        <v-sheet class='d-flex ga-1'>
          <p>{{ currentPokemon.id }}</p>
          <v-divider vertical color='purple' />
          <p>{{ currentPokemon.name }}</p>
        </v-sheet>
      </v-card-title>
      <v-card-subtitle class='d-flex justify-space-between'>
        <v-sheet class='d-flex ga-2'>
          <v-icon v-for='{ value, color, icon } in genders' :color="gender === value ? color : 'gray'" :icon='icon'
            @click.prevent='changeGender' :size="gender === value ? 24 : 22" />
        </v-sheet>
        <v-sheet class='d-flex ga-2'>
          <v-icon :color="shinyMode ? 'yellow' : 'gray'" icon='$shimmer' @click.prevent='changeShinyMode' />
        </v-sheet>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <v-img :src="imageSrc" />
      <TypesSection v-if='types' :types='currentPokemon.types.map(type => type.type.name)' />
      <slot />
    </v-card-text>
  </v-card>
</template>
