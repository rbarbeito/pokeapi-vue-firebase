<template>
  <div class="w-full h-screen flex flex-col items-center gap-4 gradient_to_bottom_blue">
    <div class="flex justify-center mt-8 w-full">
      <input
        class="bg-gray-100 entrada_formulario"
        type="text"
        placeholder="Nombre pokemon"
        v-model="pokemonName"
        v-on:keypress.enter="buscarPokemon"
      />
      <button class="btn ml-4 bg-blue-400" @click="buscarPokemon">Buscar</button>
    </div>

    <article
      v-if="pokeBuscado"
      class="flex flex-col items-center py-4 w-[85%] lg:w-[300px] border-1 border-gray-200 bg-blue-50 rounded-xl"
    >
      <img :src="pokeBuscado.sprites.other['official-artwork'].front_default" alt="" />
      <h2 class="text-3xl my-2 text-center uppercase font-extrabold">{{ pokeBuscado?.name }}</h2>
      <ul class="flex gap-2 flex-wrap justify-center">
        <li class="inline-flex" v-for="(cosa, index) in pokeBuscado.stats" :key="index">
          <div class="rounded-md px-2 py-0.5 bg-slate-400 font-bold">
            {{ cosa.stat.name }}
          </div>
        </li>
      </ul>
      <button class="btn bg-green-300 mt-3" @click="addFav(pokeBuscado.name)">Add favoritos</button>
    </article>
  </div>
  <div v-if="isLogin" class="absolute top-2 right-2 w-fit flex p-4 gap-4">
    <button @click="salir" class="btn bg-blue-500">logout</button>
    <RouterLink :to="{name:'profile'}" class="btn bg-blue-500">Ir a perfil</RouterLink>
  </div>
   <div v-else class="absolute top-2 right-2 w-fit flex p-4 gap-4">

    <RouterLink :to="{name:'login'}" class="btn bg-blue-500">Login</RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { pokeComposable } from '../composable/pokeComposable'
import type { PokemonResponse } from '@/interfaces/pokemon.Interfaces'
import router from '@/router'
import { RouterLink } from 'vue-router'
import { useAuthStorage } from '@/stores/authStorage'
import { usePokeStore } from '@/stores/pokeStorage'
import { useAuthComposable } from '@/composable/authComposable'


const pokeBuscado = ref<PokemonResponse | undefined>()
const pokemonName = ref<string>('')

const poke = pokeComposable()

const pokeStorage = usePokeStore()


const { isLogin } = useAuthStorage()
const {  logout } = useAuthComposable()

const buscarPokemon = async () => {
  pokeBuscado.value = await poke.getPokemon(pokemonName.value)
  pokemonName.value = ''
}

const addFav = (name: string) => {
  if (!isLogin) {
    pokeStorage.pokeTemp = name
    return router.push({ name: 'login' })
  }

  pokeStorage.pokeTemp = name
  return router.push({ name: 'profile' })
}


const salir = () => {

  if (isLogin) {
    logout()
   return router.push({ name: 'home' })
  }
}
</script>

<style scoped></style>
