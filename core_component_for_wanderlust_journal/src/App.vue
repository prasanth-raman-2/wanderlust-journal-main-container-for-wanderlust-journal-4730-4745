<script setup lang="ts">
import { ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'

const router = useRouter()
const drawer = ref(false)
const isLoading = ref(false)

// Handle route loading states
router.beforeEach(() => {
  isLoading.value = true
})

router.afterEach(() => {
  isLoading.value = false
})
const navigationItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'My Entries', icon: 'mdi-notebook', route: '/entries' },
  { title: 'Timeline', icon: 'mdi-timeline-clock', route: '/timeline' },
  { title: 'Travel Map', icon: 'mdi-map', route: '/map' },
  { title: 'Photo Gallery', icon: 'mdi-image', route: '/gallery' },
  { title: 'Settings', icon: 'mdi-cog', route: '/settings' }
]
</script>

<template>
  <v-app>
    <!-- App Bar -->
    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-app-bar-title>Wanderlust Journal</v-app-bar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item
          v-for="item in navigationItems"
          :key="item.title"
          :to="item.route"
          :prepend-icon="item.icon"
          :title="item.title"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Main Content -->
    <v-main>
      <v-container fluid>
        <!-- Loading overlay -->
        <v-overlay
          v-model="isLoading"
          class="align-center justify-center"
        >
          <v-progress-circular
            size="64"
            color="primary"
            indeterminate
          />
        </v-overlay>

        <!-- Route content with transition -->
        <RouterView v-slot="{ Component }">
          <transition
            name="fade"
            mode="out-in"
          >
            <component :is="Component" />
          </transition>
        </RouterView>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-application {
  font-family: 'Inter', sans-serif;
}

.v-main {
  background-color: var(--v-background);
}
</style>
