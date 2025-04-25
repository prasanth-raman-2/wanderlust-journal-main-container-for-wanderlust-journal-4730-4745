<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  router.back()
}

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <v-container class="d-flex align-center justify-center" style="min-height: 80vh">
    <v-card class="text-center pa-6" max-width="400">
      <v-icon
        icon="mdi-map-marker-question"
        size="64"
        color="primary"
        class="mb-4"
      />
      <h1 class="text-h4 mb-4">Page Not Found</h1>
      <p class="text-body-1 mb-6">
        Looks like you've wandered off the beaten path! The page you're looking for
        doesn't exist.
      </p>
      <v-card-actions class="justify-center">
        <v-btn color="primary" @click="goBack" class="me-2">
          <v-icon icon="mdi-arrow-left" class="me-2" />
          Go Back
        </v-btn>
        <v-btn color="primary" variant="outlined" @click="goHome">
          <v-icon icon="mdi-home" class="me-2" />
          Home
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>
