<script setup lang="ts">
import { LMarker, LPopup } from '@vue-leaflet/vue-leaflet'

// PUBLIC_INTERFACE
interface LocationDetails {
  title: string
  description?: string
  date?: string
  rating?: number
}

// PUBLIC_INTERFACE
defineProps<{
  position: [number, number]
  details: LocationDetails
}>()
</script>

<template>
  <l-marker :lat-lng="position">
    <l-popup>
      <div class="marker-popup">
        <h3 class="text-h6">{{ details.title }}</h3>
        
        <div v-if="details.date" class="d-flex align-center mt-2">
          <v-icon icon="mdi-calendar" size="small" class="me-1" />
          <span class="text-body-2">{{ details.date }}</span>
        </div>

        <div v-if="details.rating" class="d-flex align-center mt-2">
          <v-icon icon="mdi-star" size="small" color="amber" class="me-1" />
          <span class="text-body-2">{{ details.rating }}/5</span>
        </div>

        <p v-if="details.description" class="text-body-2 mt-2">
          {{ details.description }}
        </p>

        <slot name="actions"></slot>
      </div>
    </l-popup>
  </l-marker>
</template>

<style scoped>
.marker-popup {
  min-width: 200px;
  padding: 4px;
}

.marker-popup h3 {
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
}

.marker-popup p {
  margin: 8px 0 0;
  color: rgb(var(--v-theme-on-surface-variant));
}
</style>
