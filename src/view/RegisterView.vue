<template>
  <div class="">
    <div class="">
      <label for="email" class="">Email</label>
      <input id="email" type="email" v-model="email"/>
    </div>
    <div class="">
      <label for="password" class="">Contraseña</label>
      <input id="password" type="password" v-model="password"/>
    </div>

    <button class="cursor-pointer" @click="register">Register</button>

    <div class="">
      Ya tienes cuenta? <span> <RouterLink :to="{name:'login'}">Accede</RouterLink></span>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue';
import { useAuthComposable } from '@/composable/authComposable';


const acciones=useAuthComposable()

const email=ref('')
const password=ref('')

const register=()=>{
  acciones.register( email.value, password.value)
}
</script>

<style scoped>

</style>
