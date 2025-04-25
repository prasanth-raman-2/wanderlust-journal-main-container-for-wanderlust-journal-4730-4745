import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { DiaryEntry, DiaryState } from '@/types/diary'

// PUBLIC_INTERFACE
export const useDiaryStore = defineStore('diary', () => {
  // State
  const entries = ref<DiaryEntry[]>([])
  const selectedEntry = ref<DiaryEntry | null>(null)
  const filters = ref<DiaryState['filters']>({})
  const sortOrder = ref<'asc' | 'desc'>('desc')

  // Getters
  const filteredEntries = computed(() => {
    let filtered = [...entries.value]

    // Apply date filters
    if (filters.value.startDate) {
      filtered = filtered.filter(entry => entry.date >= filters.value.startDate!)
    }
    if (filters.value.endDate) {
      filtered = filtered.filter(entry => entry.date <= filters.value.endDate!)
    }

    // Apply location filter
    if (filters.value.location) {
      filtered = filtered.filter(entry =>
        entry.location.toLowerCase().includes(filters.value.location!.toLowerCase())
      )
    }

    // Apply tags filter
    if (filters.value.tags?.length) {
      filtered = filtered.filter(entry =>
        entry.tags?.some(tag => filters.value.tags!.includes(tag))
      )
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const comparison = a.date.localeCompare(b.date)
      return sortOrder.value === 'asc' ? comparison : -comparison
    })

    return filtered
  })

  const entryById = computed(() => (id: string) =>
    entries.value.find(entry => entry.id === id)
  )

  // Actions
  function addEntry(entry: Omit<DiaryEntry, 'id'>) {
    const id = crypto.randomUUID()
    entries.value.push({ ...entry, id })
  }

  function updateEntry(id: string, updates: Partial<DiaryEntry>) {
    const index = entries.value.findIndex(entry => entry.id === id)
    if (index !== -1) {
      entries.value[index] = { ...entries.value[index], ...updates }
    }
  }

  function deleteEntry(id: string) {
    const index = entries.value.findIndex(entry => entry.id === id)
    if (index !== -1) {
      entries.value.splice(index, 1)
      if (selectedEntry.value?.id === id) {
        selectedEntry.value = null
      }
    }
  }

  function setSelectedEntry(entry: DiaryEntry | null) {
    selectedEntry.value = entry
  }

  function setFilters(newFilters: DiaryState['filters']) {
    filters.value = newFilters
  }

  function setSortOrder(order: 'asc' | 'desc') {
    sortOrder.value = order
  }

  return {
    // State
    entries,
    selectedEntry,
    filters,
    sortOrder,
    // Getters
    filteredEntries,
    entryById,
    // Actions
    addEntry,
    updateEntry,
    deleteEntry,
    setSelectedEntry,
    setFilters,
    setSortOrder
  }
})
