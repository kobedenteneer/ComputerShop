<script setup lang="ts">
import github from '@/assets/icons/github.png'

const icons = [{ src: github, url: 'https://github.com/webpxl/wp1-2tinc_team2' }]
</script>

<template>
  <v-footer class="text-center d-flex flex-column ga-2 py-4" color="#1e3a5f">
    <div class="d-flex ga-3">
      <v-btn
        v-for="(icon, index) in icons"
        :key="index"
        :href="icon.url"
        target="_blank"
        rel="noopener"
        icon
        density="comfortable"
        variant="text"
        tag="a"
        class="d-flex align-center justify-center"
      >
        <v-img
          :src="icon.src"
          alt="social icon"
          width="35"
          height="35"
          cover
          class="rounded"
        ></v-img>
      </v-btn>
    </div>

    <v-divider class="spaced-divider" thickness="2" width="50"></v-divider>

    <div class="contact-details" style="color: #ffffff">
      <p>📍 123 Innovation Street, Tech City, TX 75001</p>
      <p>📞 +1 (555) 123-4567</p>
      <p>📧 contact@royalsystems.com</p>
    </div>

    <v-divider class="spaced-divider" thickness="2" width="50"></v-divider>

    <div style="color: #d4af37">
      {{ new Date().getFullYear() }} — <strong>Royal Systems &copy;</strong>
    </div>
  </v-footer>
</template>

<style scoped>
.contact-details p {
  margin: 0.5em 0;
  font-size: 14px;
}

.spaced-divider {
  margin: 1.5em 0;
}
</style>
