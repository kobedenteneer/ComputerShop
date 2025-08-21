<script setup lang="ts">
import type { Review } from '@/types/Review'

const { review } = defineProps<{ review: Review }>()
</script>

<template>
  <v-card class="mt-2 text-white">
    <v-card-text class="text-h5 py-2">{{ review.description }}</v-card-text>

    <v-card-actions>
      <v-list-item class="w-100">
        <v-list-item-title>{{ review.name }}</v-list-item-title>

        <template v-slot:append>
          <div class="justify-self-end">
            <v-icon
              v-for="n in Math.min(review.rating, 5)"
              :key="n"
              class="me-1"
              icon="mdi-heart"
            />
            <v-icon
              v-for="n in Math.max(5 - review.rating, 0)"
              :key="n"
              class="me-1"
              icon="mdi-heart-outline"
            />
          </div>
        </template>
      </v-list-item>
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
