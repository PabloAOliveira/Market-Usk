<template>
  <v-snackbar
    v-model="snackbar.state.show"
    :color="snackbar.state.color"
    :timeout="snackbar.state.timeout"
    :location="snackbar.state.location"
    multi-line
  >
    {{ snackbar.state.message }}

    <template v-slot:actions>
      <v-btn color="white" @click="snackbar.close()" icon="mdi-close" variant="text" />
    </template>
  </v-snackbar>
</template>

<script setup>
import { useSnackbar } from '@/composables/useSnackbar'

const snackbar = useSnackbar()
</script>
