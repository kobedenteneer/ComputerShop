<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import ReviewCard from './Review-Card.vue'

import { useProductStore } from '@/stores/productStore'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/userStore'

import type { Product } from '@/types/Product'
import type { Review } from '@/types/Review'

const productStore = useProductStore()
const router = useRouter()
const route = useRoute()

const product = ref<Product>()
const mainImage = ref<string>()

const addReviewDialog = ref<boolean>(false)
const newReview = ref<Review>({ id: 0, name: '', description: '', rating: 0 })

async function saveReview() {
  if (!product.value) throw 'No product found!'

  product.value = await productStore.updateReviewsForProduct(product.value.id, newReview.value)
  addReviewDialog.value = false
  newReview.value = { id: 0, name: '', description: '', rating: 0 }
}

const cart = useCartStore()
const userStore = useUserStore()

function handleAddToCart() {
  cart.addToCart(product.value as Product)
}

onMounted(async () => {
  try {
    product.value = await productStore.retrieveProduct(parseInt(route.params.id as string))
  } catch (error) {
    console.error(error)
    alert('Error retrieving product!\n\n' + (error as Error).message)
    router.back()
  }

  mainImage.value = product.value?.images[0] ?? ''
})
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="addReviewDialog" max-width="600">
      <v-card prepend-icon="mdi-account" title="User Profile">
        <v-card-text>
          <v-row dense>
            <v-col cols="8">
              <v-text-field label="First name*" v-model="newReview.name" required></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-textarea
                v-model="newReview.description"
                label="Your thoughts"
                rows="1"
                auto-grow
              ></v-textarea>
            </v-col>

            <v-col cols="8">
              <v-number-input
                v-model="newReview.rating"
                :reverse="false"
                controlVariant="default"
                label="Rating"
                :hideInput="false"
                :inset="false"
                :min="0"
                :max="5"
              ></v-number-input>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" variant="plain" @click="addReviewDialog = false"></v-btn>
          <v-btn color="primary" text="Save" variant="tonal" @click="saveReview"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <v-container>
    <v-row>
      <v-col class="v-col-12 v-col-xl-6">
        <div v-if="product">
          <div class="d-flex">
            <div>
              <h2>{{ product.title }}</h2>
              <p>{{ product.description }}</p>
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn v-if="userStore.isAuthenticated" class="add-to-cart" @click="handleAddToCart">
                <v-icon icon="mdi-cart-plus" />
              </v-btn>
            </div>
          </div>
          <img :src="mainImage" alt="Product Image" class="product-image" />

          <div class="thumbnail-container">
            <img
              v-for="(image, index) in product.images"
              :key="index"
              :src="image"
              alt="Thumbnail Image"
              :class="{ 'thumbnail-image': true, 'active-thumbnail': mainImage === image }"
              @click="mainImage = image"
            />
          </div>

          <p>Price: €{{ product.price }}</p>
          <p>Shipping Time: {{ product.shipping_time }}</p>
        </div>
      </v-col>
      <v-col class="v-col-12 v-col-xl-6">
        <div style="display: flex">
          <h2 style="width: fit-content">Reviews</h2>
          <v-spacer></v-spacer>
          <v-btn @click="addReviewDialog = true">Add review</v-btn>
        </div>
        <ReviewCard v-for="r in product?.reviews" :key="r.id" :review="r" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.product-image {
  width: 700px;
  /* Verhoog de breedte */
  height: 700px;
  /* Verhoog de hoogte */
  object-fit: contain;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.thumbnail-container {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.thumbnail-image {
  width: 167px;
  /* Verhoog de breedte */
  height: 167px;
  /* Verhoog de hoogte */
  object-fit: contain;
  cursor: pointer;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.thumbnail-image:hover {
  border-color: #007bff;
}

.active-thumbnail {
  border-color: #007bff;
  border-width: 2px;
}
</style>
