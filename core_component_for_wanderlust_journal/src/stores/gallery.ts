import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Photo } from '@/types/photo'
import type { GalleryAlbum, GalleryState } from '@/types/gallery'

// PUBLIC_INTERFACE
export const useGalleryStore = defineStore('gallery', () => {
  // State
  const photos = ref<Photo[]>([])
  const albums = ref<GalleryAlbum[]>([])
  const selectedPhoto = ref<Photo | null>(null)
  const selectedAlbum = ref<GalleryAlbum | null>(null)
  const filters = ref<GalleryState['filters']>({})
  const sortBy = ref<GalleryState['sortBy']>('date')
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Getters
  const filteredPhotos = computed(() => {
    let filtered = [...photos.value]

    // Apply date range filter
    if (filters.value.dateRange) {
      const [start, end] = filters.value.dateRange
      filtered = filtered.filter(
        photo => photo.date && photo.date >= start && photo.date <= end
      )
    }

    // Apply location filter
    if (filters.value.location) {
      filtered = filtered.filter(
        photo =>
          photo.location?.toLowerCase().includes(filters.value.location!.toLowerCase())
      )
    }

    // Apply album filter
    if (filters.value.albumId) {
      filtered = filtered.filter(photo =>
        albums.value
          .find(album => album.id === filters.value.albumId)
          ?.coverPhotoId === photo.id
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0
      switch (sortBy.value) {
        case 'date':
          comparison = (a.date || '').localeCompare(b.date || '')
          break
        case 'location':
          comparison = (a.location || '').localeCompare(b.location || '')
          break
        case 'name':
          comparison = (a.caption || '').localeCompare(b.caption || '')
          break
      }
      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return filtered
  })

  const albumPhotos = computed(() => (albumId: string) =>
    photos.value.filter(photo =>
      albums.value.find(album => album.id === albumId)?.coverPhotoId === photo.id
    )
  )

  // Actions
  function addPhoto(photo: Omit<Photo, 'id'>) {
    const id = crypto.randomUUID()
    photos.value.push({ ...photo, id })
  }

  function updatePhoto(id: string, updates: Partial<Photo>) {
    const index = photos.value.findIndex(photo => photo.id === id)
    if (index !== -1) {
      photos.value[index] = { ...photos.value[index], ...updates }
    }
  }

  function deletePhoto(id: string) {
    const index = photos.value.findIndex(photo => photo.id === id)
    if (index !== -1) {
      photos.value.splice(index, 1)
      if (selectedPhoto.value?.id === id) {
        selectedPhoto.value = null
      }
      // Remove photo from albums where it's the cover
      albums.value = albums.value.map(album => ({
        ...album,
        coverPhotoId: album.coverPhotoId === id ? undefined : album.coverPhotoId
      }))
    }
  }

  function addAlbum(album: Omit<GalleryAlbum, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString()
    const id = crypto.randomUUID()
    albums.value.push({
      ...album,
      id,
      createdAt: now,
      updatedAt: now
    })
  }

  function updateAlbum(id: string, updates: Partial<GalleryAlbum>) {
    const index = albums.value.findIndex(album => album.id === id)
    if (index !== -1) {
      albums.value[index] = {
        ...albums.value[index],
        ...updates,
        updatedAt: new Date().toISOString()
      }
    }
  }

  function deleteAlbum(id: string) {
    const index = albums.value.findIndex(album => album.id === id)
    if (index !== -1) {
      albums.value.splice(index, 1)
      if (selectedAlbum.value?.id === id) {
        selectedAlbum.value = null
      }
    }
  }

  function setSelectedPhoto(photo: Photo | null) {
    selectedPhoto.value = photo
  }

  function setSelectedAlbum(album: GalleryAlbum | null) {
    selectedAlbum.value = album
  }

  function setFilters(newFilters: GalleryState['filters']) {
    filters.value = newFilters
  }

  function setSortBy(sort: GalleryState['sortBy']) {
    sortBy.value = sort
  }

  function setSortOrder(order: 'asc' | 'desc') {
    sortOrder.value = order
  }

  return {
    // State
    photos,
    albums,
    selectedPhoto,
    selectedAlbum,
    filters,
    sortBy,
    sortOrder,
    // Getters
    filteredPhotos,
    albumPhotos,
    // Actions
    addPhoto,
    updatePhoto,
    deletePhoto,
    addAlbum,
    updateAlbum,
    deleteAlbum,
    setSelectedPhoto,
    setSelectedAlbum,
    setFilters,
    setSortBy,
    setSortOrder
  }
})
