import type { Photo } from './photo'

export interface GalleryAlbum {
  id: string
  name: string
  description?: string
  coverPhotoId?: string
  createdAt: string
  updatedAt: string
}

export interface GalleryState {
  photos: Photo[]
  albums: GalleryAlbum[]
  selectedPhoto: Photo | null
  selectedAlbum: GalleryAlbum | null
  filters: {
    dateRange?: [string, string]
    location?: string
    albumId?: string
  }
  sortBy: 'date' | 'location' | 'name'
  sortOrder: 'asc' | 'desc'
}
