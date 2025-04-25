<script setup lang="ts">

import type { Photo } from '@/types/photo'

// PUBLIC_INTERFACE
defineProps<{
  photos: Photo[]
}>()

const emit = defineEmits<{
  (e: 'preview', index: number): void
}>()

const handleClick = (index: number) => {
  emit('preview', index)
}
</script>

<template>
  <v-container fluid class="photo-grid pa-2">
    <v-row>
      <v-col
        v-for="(photo, index) in photos"
        :key="photo.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        class="pa-2"
      >
        <v-hover v-slot="{ isHovering, props }">
          <v-card
            v-bind="props"
            @click="handleClick(index)"
            :elevation="isHovering ? 8 : 2"
            class="photo-card"
          >
            <v-img
              :src="photo.thumbnail || photo.src"
              :lazy-src="photo.thumbnail"
              aspect-ratio="1"
              cover
              class="photo-image"
            >
              <template v-slot:placeholder>
                <v-row
                  class="fill-height ma-0"
                  align="center"
                  justify="center"
                >
                  <v-progress-circular
                    indeterminate
                    color="primary"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
            <div
              v-if="isHovering"
              class="photo-overlay d-flex align-center justify-center"
            >
              <v-icon icon="mdi-magnify" size="large" color="white" />
            </div>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.photo-grid {
  width: 100%;
}

.photo-card {
  cursor: pointer;
  position: relative;
  transition: transform 0.2s;
}

.photo-card:hover {
  transform: scale(1.02);
}

.photo-image {
  border-radius: 4px;
}

.photo-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 4px;
  transition: opacity 0.2s;
}
</style>