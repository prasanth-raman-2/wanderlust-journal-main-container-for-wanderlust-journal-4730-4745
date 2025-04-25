<script setup lang="ts">
import { computed } from 'vue'
import TimelineEntry from './TimelineEntry.vue'

interface TimelineEntry {
  id: string
  title: string
  date: string
  location: string
  content: string
  imageUrl?: string
}

// PUBLIC_INTERFACE
const props = withDefaults(defineProps<{
  entries: TimelineEntry[]
  loading?: boolean
}>(), {
  loading: false
})

const emit = defineEmits<{
  (e: 'entryClick', entry: TimelineEntry): void
}>()

const sortedEntries = computed(() => {
  return [...props.entries].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  )
})
</script>

<template>
  <v-timeline align="start" truncate-line="both" class="timeline-container">
    <template v-if="loading">
      <v-timeline-item
        v-for="n in 3"
        :key="n"
        dot-color="primary"
        size="small"
      >
        <template v-slot:opposite>
          <v-skeleton-loader type="text" width="80" />
        </template>
        <v-card>
          <v-card-text>
            <v-skeleton-loader type="article" />
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </template>

    <template v-else-if="entries.length > 0">
      <timeline-entry
        v-for="entry in sortedEntries"
        :key="entry.id"
        v-bind="entry"
        @click="emit('entryClick', entry)"
      >
        <template #actions>
          <slot name="entry-actions" :entry="entry">
            <v-btn
              variant="text"
              color="primary"
              class="ms-auto"
              density="comfortable"
            >
              Read More
            </v-btn>
          </slot>
        </template>
      </timeline-entry>
    </template>

    <template v-else>
      <v-card class="pa-4 text-center" flat>
        <v-icon icon="mdi-timeline-clock" size="64" class="mb-4" />
        <h3 class="text-h6 mb-2">No Timeline Entries</h3>
        <p class="text-body-1 text-medium-emphasis">
          Start documenting your journey by creating your first timeline entry.
        </p>
      </v-card>
    </template>
  </v-timeline>
</template>

<style scoped>
.timeline-container {
  padding: 16px;
}

:deep(.v-timeline-divider__line) {
  background: rgb(var(--v-theme-outline));
  opacity: 0.3;
}

@media (max-width: 600px) {
  :deep(.v-timeline-item__body) {
    flex: 1 1 100%;
  }
}
</style>
