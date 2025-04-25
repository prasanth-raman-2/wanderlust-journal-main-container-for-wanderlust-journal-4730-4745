<script setup lang="ts">
import { ref } from 'vue'
import DiaryEntryList from '@/components/diary/DiaryEntryList.vue'

const entries = ref([
  {
    id: '1',
    title: 'Adventures in Paris',
    date: '2024-01-15',
    location: 'Paris, France',
    content: 'Explored the charming streets of Paris, visited the iconic Eiffel Tower, and enjoyed delicious croissants at a local café.',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34'
  },
  {
    id: '2',
    title: 'Tokyo Wanderings',
    date: '2024-01-10',
    location: 'Tokyo, Japan',
    content: 'Immersed in the vibrant energy of Tokyo. From the serene temples to the bustling streets of Shibuya, every moment was unforgettable.',
    imageUrl: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26'
  },
  {
    id: '3',
    title: 'Venice Canals',
    date: '2024-01-05',
    location: 'Venice, Italy',
    content: 'Navigated the romantic canals of Venice by gondola, discovering hidden squares and historic architecture at every turn.',
    imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9'
  }
])
</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4">My Travel Entries</h1>
      <v-btn color="primary" prepend-icon="mdi-plus">
        New Entry
      </v-btn>
    </div>

    <diary-entry-list :entries="entries" />
  </v-container>
</template>
