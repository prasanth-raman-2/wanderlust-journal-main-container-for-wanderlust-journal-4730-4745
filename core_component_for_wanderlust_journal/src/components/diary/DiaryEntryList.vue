<script setup lang="ts">
import DiaryEntry from './DiaryEntry.vue'

interface DiaryEntryData {
  id: string
  title: string
  date: string
  location: string
  content: string
  imageUrl?: string
}

// PUBLIC_INTERFACE
defineProps<{
  entries: DiaryEntryData[]
}>()
</script>

<template>
  <v-container>
    <v-row v-if="entries.length > 0">
      <v-col
        v-for="entry in entries"
        :key="entry.id"
        cols="12"
        sm="6"
        md="4"
        lg="4"
        class="diary-entry-col"
      >
        <diary-entry v-bind="entry" />
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-card class="pa-6" flat>
          <v-icon icon="mdi-book-open-page-variant" size="64" class="mb-4" />
          <h3 class="text-h6 mb-2">No Entries Yet</h3>
          <p class="text-body-1 text-medium-emphasis">
            Start documenting your adventures by creating your first diary entry.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.diary-entry-col {
  display: flex;
}
</style>
