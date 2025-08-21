<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import loginButton from '@/components/Login-button.vue'
import cart from '@/assets/icons/cart.png'
import { useUserStore } from '@/stores/userStore'

onMounted(() => {
  userStore.loadUserFromLocalStorage()
})

import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
const userStore = useUserStore()
const isLoggedIn = computed(() => userStore.user !== null)

function handleLogout() {
  userStore.logout()
  dialog.value = false
}

const dialog = ref(false)
</script>

<template>
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/" class="title">Royal Systems</router-link>
    </div>
    <div class="nav-center">
      <router-link to="/products">Products</router-link>
      <router-link to="/about">About Us</router-link>
      <router-link to="/contact">Contact</router-link>
      <router-link v-if="userStore.isAdmin" to="/admin">Admin</router-link>
    </div>

    <div class="nav-right">
      <loginButton v-if="!isLoggedIn"></loginButton>
      <template v-else>
        <v-dialog v-model="dialog" max-width="600">
          <template v-slot:activator="{ props: activatorProps }">
            <v-btn
              class="text-none font-weight-bold text-#8c1c13 mr-5"
              :text="userStore.username"
              variant="flat"
              color="#8c1c13"
              v-bind="activatorProps"
              height="40"
            ></v-btn>
          </template>

          <v-card title="Logout" color="white">
            <v-card-text>
              <v-row dense>
                <v-col cols="12">
                  <p>Are you sure you want to log out?</p>
                </v-col>
              </v-row>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text="Cancel" color="black" variant="plain" @click="dialog = false"></v-btn>
              <v-btn color="#8c1c13" text="Logout" variant="flat" @click="handleLogout"></v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <div class="cart-container" v-if="isLoggedIn">
        <router-link to="/cart" class="cart">
          <v-img :src="cart" />
        </router-link>
        <div class="cart-badge">{{ cartStore.itemCount }}</div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');
@import url('https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&display=swap');

.navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #1e3a5f;
  padding: 1rem 2rem;
  width: 100vw;
}

.nav-left,
.nav-right {
  flex: 1;
  display: flex;
  align-items: center;
}

.nav-right {
  justify-content: right;
}

.nav-center {
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.nav-center a {
  font-size: 1.3em;
  font-family: 'EB Garamond', serif;
  font-optical-sizing: auto;
  font-weight: 600;
  color: #fcc203;
  text-decoration: none;
}

.nav-center a:hover {
  text-decoration-line: underline;
  text-decoration-style: double;
}

.title {
  font-family: 'MedievalSharp', cursive;
  font-size: 2.3rem;
  font-weight: bolder;
  color: #fcc203;
  text-decoration: none;
  padding: 5px;
}

.title:hover {
  color: #d4af37;
}

.cart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2em;
  height: 2em;
}

.cart-container {
  position: relative;
  display: inline-block;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  border-radius: 50%;
  width: 1.2em;
  height: 1.2em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.6em;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: row;
    flex-wrap: wrap;
  }
  .nav-left {
    justify-content: center;
  }
  .nav-right {
    display: none;
  }
}
</style>
