import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePokemonImgStore = defineStore('alerts', () => {
  const pokemonImg = ref('')
  const setPokemonImg = (img: string) => {
    console.log(img)
    pokemonImg.value = img
  }

  return {
    pokemonImg,
    setPokemonImg,
  }

})