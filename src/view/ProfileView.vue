<template>
  <div class="flex flex-col p-4 w-full min-h-dvh md:flex-row">
    <div v-if="verPerfil" class="flex flex-col items-center w-full md:w-4/12">
      <h2 class="">Tus Datos</h2>
      <img :src="imagen" :alt="nombre" class="rounded-full  my-5 w-40 h-auto"/>
      <h4 class="">{{ nombre }}</h4>
      <button @click="updateDatos" class="btn bg-fuchsia-400 mt-4">Actualizar Datos</button>
       <RouterLink :to="{name:'pokedex'}" class="btn mt-10">Buscar otro pokemon</RouterLink>
    </div>
    <div v-else class="flex flex-col items-center w-full md:w-4/12">
      <h2 class="my-3 text-2xl font-bold">Actualice sus datos</h2>
      <form @submit.prevent="updateUser" class="flex flex-col items-center gap-4">
        <input
          type="text"
          placeholder="Url de imagen"
          v-model="imagen"
          class="entrada_formulario bg-slate-200"
        />
        <input
          type="text"
          placeholder="Tu nombre"
          v-model="nombre"
          class="entrada_formulario bg-slate-200"
        />

        <button class="btn bg-emerald-600" type="submit">Actualizar</button>
      </form>
    </div>


    <div
      v-if="pokemons.length"
      class="flex flex-wrap w-full md:w-7/12 border-2 border-slate-300 rounded-lg"
    >

      <ul class="flex flex-row flex-wrap">
        <li class="" v-for="(poke, index) in pokemons" :key="index">
          <div class="mx-2">
            {{ poke }}
          </div>
        </li>
      </ul>
    </div>
    <div v-else class="flex flex-wrap w-full md:w-7/12 border-2 border-slate-300 rounded-lg">
      No tienes preferidos
    </div>
  </div>
  <button v-if="isLogin" @click="salir" class="btn bg-blue-500 absolute top-2 right-2">
    logout
  </button>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import router from '@/router'

import { useAuthComposable } from '@/composable/authComposable'
import { databaseComposable } from '@/composable/databaseFirebaseComposable'

import { useAuthStorage } from '@/stores/authStorage'
import { usePokeStore } from '@/stores/pokeStorage'

import type { User } from 'firebase/auth'
import type { UserDataPokemons } from '@/interfaces/userData.interfaces'

const { pokeTemp } = usePokeStore()
const { isLogin } = useAuthStorage()
const { getUser, addUser } = databaseComposable()
const { getCurrentUser, logout } = useAuthComposable()

const currentUser = ref<User | null>(null)
const dataCurrentUser = ref()

const verPerfil = ref<boolean>(true)

const nombre = ref<string>('')
const imagen = ref<string>('')
const pokemons = ref<string[]>([])

const salir = () => {
  if (isLogin) {
    logout()
 return   router.push({ name: 'home' })
  }
}

async function updateUser() {
  if (!currentUser) return

  const userData: UserDataPokemons = {
    id: currentUser.value!.uid,
    img: imagen.value,
    name: nombre.value,
    pokemons: pokemons.value,
  }
  const createUser = await addUser(currentUser.value!.uid, userData)

 verPerfil.value=true

}

function updateDatos() {
  verPerfil.value = !verPerfil.value
}

async function loadCurrentUser() {
  // usuario autenticado
  currentUser.value = await getCurrentUser()
  const data = await getUser(currentUser.value!.uid)
  for (const el of data!.pokemons) {
    pokemons.value.push(el)
  }
  const unique=[...new Set(pokemons.value)];

  imagen.value=data!.img
  nombre.value=data!.name
  pokemons.value = unique

  if(imagen.value=='' || nombre.value==''){
    verPerfil.value=false
  }
  updateUser()
}

watch(currentUser, async () => {
  const dataUser = await getUser(currentUser.value!.uid)
  if (!dataUser) return

  nombre.value=dataUser.name
  imagen.value=dataUser.img

  dataCurrentUser.value = dataUser
})



onMounted(() => {
  loadCurrentUser()

  if (pokeTemp != '') {
    pokemons.value.push(pokeTemp)
  }
})
</script>

<style scoped></style>
