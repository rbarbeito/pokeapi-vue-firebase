import { reactive } from 'vue'
import { defineStore } from 'pinia'

export const usePokeStore = defineStore('poke', () => {

  const state = reactive({
    pokeTemp: ''
  })

  return state
})
