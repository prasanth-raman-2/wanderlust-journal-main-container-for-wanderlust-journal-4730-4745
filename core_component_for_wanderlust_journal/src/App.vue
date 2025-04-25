<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

const drawer = ref(false)
const navigationItems = [
  { title: 'Home', icon: 'mdi-home', route: '/' },
  { title: 'My Entries', icon: 'mdi-notebook', route: '/entries' },
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
        <RouterView />
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
