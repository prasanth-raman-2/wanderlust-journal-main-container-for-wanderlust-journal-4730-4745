<script setup lang="ts">
// PUBLIC_INTERFACE
withDefaults(defineProps<{
  title: string
  date: string
  location: string
  content: string
  imageUrl?: string
  color?: string
  icon?: string
}>(), {
  color: 'primary',
  icon: 'mdi-map-marker'
})

const emit = defineEmits<{
  (e: 'click'): void
}>()
</script>

<template>
  <v-timeline-item
    :dot-color="color"
    :icon="icon"
    size="small"
    width="700px"
    @click="emit('click')"
  >
    <template v-slot:opposite>
      <div class="text-caption">
        {{ date }}
      </div>
    </template>
    <v-card class="timeline-card">
      <v-img
        v-if="imageUrl"
        :src="imageUrl"
        height="200"
        cover
        class="timeline-image"
      />
      <v-card-title class="text-h6">
        {{ title }}
        <div class="text-caption mt-1 d-flex align-center">
          <v-icon icon="mdi-map-marker" size="small" class="me-1" />
          {{ location }}
        </div>
      </v-card-title>
      <v-card-text class="text-body-1">
        {{ content }}
      </v-card-text>
      <v-card-actions>
        <slot name="actions">
          <v-btn
            variant="text"
            color="primary"
            class="ms-auto"
            density="comfortable"
          >
            Read More
          </v-btn>
        </slot>
      </v-card-actions>
    </v-card>
  </v-timeline-item>
</template>

<style scoped>
.timeline-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.timeline-card:hover {
  transform: translateX(4px);
}

.timeline-image {
  border-radius: 4px 4px 0 0;
}

/* Dark theme adjustments */
:deep(.v-timeline-item__body) {
  flex: 0 1 700px;
}

:deep(.v-timeline-divider__dot) {
  background: rgb(var(--v-theme-surface));
}

:deep(.v-timeline-divider__dot--size-small) {
  padding: 4px;
}
</style>
