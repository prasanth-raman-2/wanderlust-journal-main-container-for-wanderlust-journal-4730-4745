<script setup lang="ts">
import { ref } from 'vue'
import TimelineDisplay from '@/components/timeline/TimelineDisplay.vue'

// Sample timeline data
const entries = ref([
  {
    id: '1',
    title: 'Exploring the Eiffel Tower',
    date: '2024-01-15',
    location: 'Paris, France',
    content: 'Finally made it to the iconic Eiffel Tower! The view from the top was absolutely breathtaking, especially during sunset. Paris truly is a magical city.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  },
  {
    id: '2',
    title: 'Street Food Adventure in Tokyo',
    date: '2024-01-10',
    location: 'Tokyo, Japan',
    content: 'Explored the vibrant streets of Tokyo, trying various local delicacies. The street food scene here is incredible!',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'
  },
  {
    id: '3',
    title: 'Gondola Ride in Venice',
    date: '2024-01-05',
    location: 'Venice, Italy',
    content: 'Experienced the romantic canals of Venice on a traditional gondola. The historic architecture and narrow waterways are simply stunning.',
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9'
  }
])

const loading = ref(false)

interface TimelineEntry {
  id: string
  title: string
  date: string
  location: string
  content: string
  imageUrl?: string
}

const handleEntryClick = (entry: TimelineEntry) => {
  console.log('Entry clicked:', entry)
  // Handle entry click (e.g., navigate to detail view)
}

const handleNewEntry = () => {
  // Handle new entry creation
  console.log('Create new entry')
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4">Travel Timeline</h1>
      <v-btn
        color="primary"
        prepend-icon="mdi-plus"
        @click="handleNewEntry"
      >
        New Entry
      </v-btn>
    </div>

    <v-card class="timeline-card" variant="flat">
      <timeline-display
        :entries="entries"
        :loading="loading"
        @entry-click="handleEntryClick"
      >
        <template #entry-actions>
          <v-btn
            variant="text"
            color="primary"
            class="me-2"
            prepend-icon="mdi-pencil"
            density="comfortable"
          >
            Edit
          </v-btn>
          <v-btn
            variant="text"
            color="primary"
            prepend-icon="mdi-eye"
            density="comfortable"
          >
            View
          </v-btn>
        </template>
      </timeline-display>
    </v-card>
  </v-container>
</template>

<style scoped>
.timeline-card {
  background: rgb(var(--v-theme-surface));
  border-radius: 8px;
}
</style>
