<template>
  <div class="w-full h-screen flex justify-center items-center gradient_to_bottom_blue shadow-md">
    <div class="flex flex-col items-center w-[350px] h-fit p-4 bg-slate-100 rounded-br-2xl rounded-tl-2xl">
      <div class="flex flex-col w-10/12 my-2">
        <label for="email" class="text-lg font-sans">Email</label>
        <input id="email" type="email" v-model="email" class="entrada_formulario bg-amber-100"/>
      </div>
      <div class="flex flex-col w-10/12 my-2">
        <label for="password" class="text-lg font-sans">Contraseña</label>
        <input id="password" type="password" v-model="password" class="entrada_formulario bg-amber-100"/>
      </div>

      <button @click="login"  class="btn bg-green-400 my-1">Login</button>

      <div class="flex gap-2">
        No tienes cuenta?
        <span> <RouterLink :to="{ name: 'register' }">Registrate</RouterLink></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthComposable } from '@/composable/authComposable'
import router from '@/router'

const email = ref('')
const password = ref('')
const acciones = useAuthComposable()

const login = () => {
  acciones.login(email.value, password.value)
  router.push({ name: 'profile' })
}
</script>

<style scoped></style>
