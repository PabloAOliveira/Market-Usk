<template>
  <div>
    <h1>Home</h1>

    <v-btn @click="controller.logout">Sair</v-btn>
  </div>
</template>

<script setup>
const { controller } = defineProps({
  controller: {
    type: Object,
    required: true,
  }
})
</script>

<style scoped>
</style>