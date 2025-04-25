<script setup lang="ts">
interface DiaryEntryProps {
  title: string
  date: string
  location: string
  content: string
  imageUrl?: string
}

// PUBLIC_INTERFACE
defineProps<DiaryEntryProps>()
</script>

<template>
  <v-card class="diary-entry" elevation="2">
    <!-- Image section if available -->
    <v-img
      v-if="imageUrl"
      :src="imageUrl"
      height="200"
      cover
      class="diary-entry-image"
    ></v-img>

    <v-card-title class="text-h6 pt-4 px-4">
      {{ title }}
    </v-card-title>

    <v-card-subtitle class="px-4">
      <v-icon icon="mdi-calendar" size="small" class="me-1" />
      {{ date }}
      <v-icon icon="mdi-map-marker" size="small" class="ms-3 me-1" />
      {{ location }}
    </v-card-subtitle>

    <v-card-text class="text-body-1 px-4 pb-4">
      {{ content }}
    </v-card-text>

    <v-card-actions class="px-4 pb-4">
      <slot name="actions">
        <v-btn variant="text" color="primary">Read More</v-btn>
      </slot>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.diary-entry {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.diary-entry-image {
  border-radius: 4px 4px 0 0;
}
</style>
