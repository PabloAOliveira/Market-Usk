<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <h1>Bem-vindo à Home</h1>
          </v-card-title>
          <v-card-text>
            <p>Você está autenticado!</p>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="error"
              variant="elevated"
              prepend-icon="mdi-logout"
              @click="controller.logout"
            >
              Sair
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const { controller } = defineProps({
  controller: {
    type: Object,
    required: true,
  }
})
</script>