<script setup lang="ts">
import { ref } from 'vue'
import PhotoGrid from '@/components/gallery/PhotoGrid.vue'
import PhotoModal from '@/components/gallery/PhotoModal.vue'
import type { Photo } from '@/types/photo'

// Sample photos data - would typically come from an API or store
const photos = ref<Photo[]>([
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    thumbnail: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    caption: 'Paris View',
    date: '2024-01-15',
    location: 'Paris, France',
    width: 1200,
    height: 800
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    thumbnail: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400',
    caption: 'Tokyo Streets',
    date: '2024-01-10',
    location: 'Tokyo, Japan',
    width: 1200,
    height: 800
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9',
    thumbnail: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400',
    caption: 'Venice Canals',
    date: '2024-01-05',
    location: 'Venice, Italy',
    width: 1200,
    height: 800
  }
])

const selectedIndex = ref(0)
const isModalOpen = ref(false)

const handlePreview = (index: number) => {
  selectedIndex.value = index
  isModalOpen.value = true
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4">Photo Gallery</h1>
      <v-btn color="primary" prepend-icon="mdi-image-plus">
        Add Photos
      </v-btn>
    </div>

    <!-- Photo Grid -->
    <v-card class="pa-4" variant="flat">
      <photo-grid
        :photos="photos"
        @preview="handlePreview"
      />
    </v-card>

    <!-- Photo Modal -->
    <photo-modal
      :photos="photos"
      :initial-index="selectedIndex"
      v-model:is-open="isModalOpen"
    />
  </v-container>
</template>
