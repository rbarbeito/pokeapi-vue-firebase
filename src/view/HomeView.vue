<template>
  <div class="w-full h-dvh flex justify-center items-center gradient_to_bottom_blue">
    <div class="flex flex-col items-center h-fit w-[90%] rounded-xl">
      <h1 class="mb-6 text-3xl font-extrabold">PokeAgenda 2.0</h1>
      <p class="text-center font-mono">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Odit ex veritatis fugit unde qui?
        Sed corporis illo autem maxime aperiam, ex nemo consequatur velit porro, nesciunt id
        suscipit repellendus. Laborum.
      </p>
      <RouterLink class="btn mt-4 bg-orange-700 text-white " :to="{ name: 'pokedex' }">Buscar tu Pokemon</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
