<script setup lang="ts">
import StoreNav from './components/Nav-bar.vue'
import StoreFooter from './components/Footer-bar.vue'
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith('/admin'))
</script>

<template>
  <div class="app-wrapper">
    <StoreNav v-if="!isAdminRoute" />
    <!-- <AdminNav v-else /> -->

    <main class="main-content">
      <RouterView />
    </main>

    <StoreFooter v-if="!isAdminRoute" />
  </div>
</template>

<style scoped>
.app-wrapper {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  max-width: 100%;
}

.main-content {
  flex: 1;
  padding: 1em;
  background-color: #f4ecd8;
}
</style>
