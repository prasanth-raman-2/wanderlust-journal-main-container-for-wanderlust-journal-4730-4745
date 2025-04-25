<script setup lang="ts">
import { onMounted, ref } from 'vue'
import {
  LMap,
  LTileLayer,
  LControl
} from '@vue-leaflet/vue-leaflet'

declare global {
  interface Window {
    L: typeof import('leaflet')
  }
}

type LatLng = [number, number]

// PUBLIC_INTERFACE
interface MapDisplayProps {
  initialCenter?: LatLng
  initialZoom?: number
  height?: string
}

// Set default values for props
const props = withDefaults(defineProps<MapDisplayProps>(), {
  initialCenter: () => [48.8566, 2.3522], // Paris by default
  initialZoom: 13,
  height: '500px'
})

// Use refs for internal state management
const center = ref<LatLng>(props.initialCenter)
const zoom = ref(props.initialZoom)

// Fix for leaflet icons
onMounted(() => {
  const L = window.L
  // @ts-expect-error: _getIconUrl exists but is not in type definitions
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
  })
})
</script>

<template>
  <div class="map-container" :style="{ height: props.height }">
    <l-map
      ref="map"
      v-model:zoom="zoom"
      v-model:center="center"
      :use-global-leaflet="false"
      :zoom-control="false"
    >
      <!-- Dark theme tile layer -->
      <l-tile-layer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors &copy; <a href='https://carto.com/attributions'>CARTO</a>"
      />
      
      <!-- Add zoom control in top-right corner -->
      <l-control position="topright">
        <div class="leaflet-control-zoom leaflet-bar leaflet-control">
          <a
            class="leaflet-control-zoom-in"
            href="#"
            title="Zoom in"
            role="button"
            aria-label="Zoom in"
            @click.prevent="zoom = Math.min(zoom + 1, 18)"
          >+</a>
          <a
            class="leaflet-control-zoom-out"
            href="#"
            title="Zoom out"
            role="button"
            aria-label="Zoom out"
            @click.prevent="zoom = Math.max(zoom - 1, 0)"
          >−</a>
        </div>
      </l-control>

      <!-- Pass through default slot for markers -->
      <slot></slot>
    </l-map>
  </div>
</template>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  min-height: 300px;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.leaflet-control-container .leaflet-control) {
  background-color: rgb(var(--v-theme-surface));
  border: 1px solid rgb(var(--v-theme-outline));
}

:deep(.leaflet-control-zoom a) {
  color: rgb(var(--v-theme-on-surface));
  background-color: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgb(var(--v-theme-outline));
}

:deep(.leaflet-control-zoom a:hover) {
  background-color: rgb(var(--v-theme-surface-variant));
}

:deep(.leaflet-container) {
  background-color: rgb(var(--v-theme-surface));
}

:deep(.leaflet-popup-content-wrapper) {
  background-color: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
}

:deep(.leaflet-popup-tip) {
  background-color: rgb(var(--v-theme-surface));
}
</style>
