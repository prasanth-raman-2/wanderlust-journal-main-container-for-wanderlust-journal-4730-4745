<script setup lang="ts">
import { onBeforeUnmount, watch } from 'vue'
import PhotoSwipe, { type PreparedPhotoSwipeOptions } from 'photoswipe'
import type { Photo } from '@/types/photo'
import 'photoswipe/style.css'

// PUBLIC_INTERFACE
interface Props {
  photos: Photo[]
  initialIndex?: number
  isOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  initialIndex: 0,
  isOpen: false
})

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

let photoswipe: PhotoSwipe | null = null

const initPhotoSwipe = (index: number) => {
  const pswpElement = document.createElement('div')
  pswpElement.classList.add('pswp')
  document.body.appendChild(pswpElement)

  const options: Partial<PreparedPhotoSwipeOptions> = {
    dataSource: props.photos.map(photo => ({
      src: photo.src,
      width: photo.width || 1200,
      height: photo.height || 800,
      alt: photo.caption
    })),
    index,
    closeOnVerticalDrag: true,
    showHideAnimationType: 'fade' as const
  }

  photoswipe = new PhotoSwipe(options)

  photoswipe.on('close', () => {
    emit('update:isOpen', false)
  })

  photoswipe.init()
}

const closePhotoSwipe = () => {
  if (photoswipe) {
    photoswipe.close()
    photoswipe = null
  }
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && !photoswipe) {
      initPhotoSwipe(props.initialIndex)
    } else if (!newVal && photoswipe) {
      closePhotoSwipe()
    }
  }
)

onBeforeUnmount(() => {
  closePhotoSwipe()
})
</script>

<template>
  <div>
  <!-- PhotoSwipe will create its own UI -->
</div>
</template>

<style>
/* PhotoSwipe customization */
.pswp {
  --pswp-bg: #000;
  --pswp-placeholder-bg: #222;
}

/* Customize controls color */
.pswp__button,
.pswp__button--arrow--left:before,
.pswp__button--arrow--right:before {
  background-color: rgba(0, 0, 0, 0.6) !important;
}

.pswp__top-bar {
  background-color: rgba(0, 0, 0, 0.3) !important;
}
</style>
