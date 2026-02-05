<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 100vh;">
    <v-card 
      class="mx-auto" 
      style="width: 100%; max-width: 450px;"
      elevation="8"
      rounded="lg"
    >
      <v-card-title class="text-h5 text-center pa-4 pa-md-6 pb-2 pb-md-4">
        Bem-vindo
      </v-card-title>
      
      <v-card-subtitle class="text-center pa-0 pb-4 pb-md-6">
        Faça login para continuar
      </v-card-subtitle>

      <v-divider></v-divider>

      <v-card-text class="pa-4 pa-md-6">
        <v-form :ref="controller.formRef">
          <v-text-field
            label="Email"
            type="email"
            v-model="controller.email.value"
            required
            prepend-inner-icon="mdi-email"
            variant="outlined"
            density="comfortable"
            class="mb-4"
            :rules="[controller.regras.required, controller.regras.validEmail]"
          ></v-text-field>

          <v-text-field
            label="Password"
            :type="controller.showPassword.value ? 'text' : 'password'"
            v-model="controller.password.value"
            required
            prepend-inner-icon="mdi-lock"
            :append-inner-icon="controller.showPassword.value ? 'mdi-eye' : 'mdi-eye-off'"
            :append-inner-icon-color="controller.showPassword.value ? 'primary' : 'grey'"
            @click:append-inner="controller.showPassword.value = !controller.showPassword.value"
            variant="outlined"
            density="comfortable"
            :rules="[controller.regras.required]"
          ></v-text-field>
        </v-form>
      </v-card-text>

      <v-card-actions class="pa-4 pa-md-6 pt-0">
        <v-btn
          type="submit"
          block
          color="primary"
          size="large"
          variant="elevated"
          class="mb-3"
          @click="controller.login"
        >
          Login
        </v-btn>
      </v-card-actions>

      <v-divider class="mx-4 mx-md-6"></v-divider>

      <v-card-actions class="pa-4 pa-md-6">
        <v-btn
          block
          variant="outlined"
          color="primary"
          size="large"
          prepend-icon="mdi-account-plus"
          @click="controller.goToRegister"
        >
          Criar conta
        </v-btn>
      </v-card-actions>
    </v-card>
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