export interface DiaryEntry {
  id: string
  title: string
  content: string
  date: string
  location: string
  imageUrl?: string
  tags?: string[]
  mood?: string
  weather?: string
  coordinates?: [number, number]
}

export interface DiaryState {
  entries: DiaryEntry[]
  selectedEntry: DiaryEntry | null
  filters: {
    startDate?: string
    endDate?: string
    location?: string
    tags?: string[]
  }
  sortOrder: 'asc' | 'desc'
}
