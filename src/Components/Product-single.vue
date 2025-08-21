<script setup lang="ts">
import type { Product } from '@/types/Product'
import { useCartStore } from '@/stores/cart'
import { useUserStore } from '@/stores/userStore'

const { product } = defineProps<{ product: Product }>()
const cart = useCartStore()
const userStore = useUserStore()

function handleAddToCart() {
  cart.addToCart(product)
}
</script>

<template>
  <v-col class="v-col-3">
    <v-card>
      <router-link :to="`/products/${product.id}`" class="product-title">
        <v-img height="250px" :src="product.images[0]" cover class="img-shadow-separator"></v-img>
        <v-card-item>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.brand }}</v-card-subtitle>
        </v-card-item>
      </router-link>
      <v-list-item>
        <template v-slot:prepend>
          <b>&euro; {{ product.price }}</b>
        </template>
        <template v-slot:append>
          <v-btn v-if="userStore.isAuthenticated" class="add-to-cart" @click="handleAddToCart">
            <v-icon icon="mdi-cart-plus" />
          </v-btn>
        </template>
      </v-list-item>
    </v-card>
  </v-col>
</template>

<style scoped>
.product-title {
  color: black;
  margin-bottom: 5px;
  text-decoration: none;
}

.add-to-cart {
  align-self: flex-end;
  margin-top: auto;
  background-color: #45a29e !important;
  border: none;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #0056b3 !important;
}

.img-shadow-separator {
  -webkit-box-shadow: 0px 7px 10px -5px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 7px 10px -5px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 7px 10px -5px rgba(0, 0, 0, 0.75);
}
</style>
