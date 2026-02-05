<template>
  <v-app>
    <v-main>
      <router-view :controller="controller"/>
      <snackbar />
    </v-main>
  </v-app>
</template>

<script setup>
import Snackbar from '@/core/component/snackbar.vue'
import { marketControllerImpl } from './di/di'

const controller = marketControllerImpl()
</script>
