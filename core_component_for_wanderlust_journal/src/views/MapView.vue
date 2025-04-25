<script setup lang="ts">
import { ref } from 'vue'
import MapDisplay from '@/components/map/MapDisplay.vue'
import MapMarker from '@/components/map/MapMarker.vue'

// Sample locations data - this would typically come from a store or API
const locations = ref([
  {
    id: '1',
    position: [48.8584, 2.2945] as [number, number], // Eiffel Tower
    details: {
      title: 'Eiffel Tower',
      description: 'Iconic symbol of Paris with breathtaking city views.',
      date: '2024-01-15',
      rating: 5
    }
  },
  {
    id: '2',
    position: [48.8606, 2.3376] as [number, number], // Louvre
    details: {
      title: 'Louvre Museum',
      description: 'World\'s largest art museum and home to the Mona Lisa.',
      date: '2024-01-16',
      rating: 5
    }
  }
])
</script>

<template>
  <v-container fluid>
    <div class="d-flex flex-column fill-height">
      <div class="d-flex align-center justify-space-between mb-6">
        <h1 class="text-h4">Travel Map</h1>
        <v-btn color="primary" prepend-icon="mdi-map-marker-plus">
          Add Location
        </v-btn>
      </div>

      <v-card class="flex-grow-1">
        <map-display
          :height="'70vh'"
          :initial-center="[48.8584, 2.2945]"
          :initial-zoom="12"
        >
          <map-marker
            v-for="location in locations"
            :key="location.id"
            :position="location.position"
            :details="location.details"
          >
            <template #actions>
              <div class="d-flex justify-end mt-3">
                <v-btn
                  variant="text"
                  color="primary"
                  size="small"
                  prepend-icon="mdi-pencil"
                >
                  Edit
                </v-btn>
              </div>
            </template>
          </map-marker>
        </map-display>
      </v-card>
    </div>
  </v-container>
</template>

<style scoped>
/* Ensure the map container fills available space */
.fill-height {
  min-height: calc(100vh - 128px); /* Account for header and padding */
}
</style>
