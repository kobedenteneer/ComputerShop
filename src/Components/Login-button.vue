<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

const dialog = ref(false)
const username = ref('')
const password = ref('')
const loginError = ref('')

const login = async () => {
  loginError.value = ''

  const loginResult = await userStore.login(username.value, password.value)

  if (loginResult === 'incorrect_password') {
    loginError.value = 'Incorrect password. Please try again.'
  } else if (loginResult === 'not_found') {
    loginError.value = 'User not found. Please check your username.'
  } else {
    loginError.value = 'An error occurred. Please try again later.'
  }
}
</script>

<template>
  <div class="pa-4 text-center">
    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          class="text-none font-weight-bold text-#8c1c13"
          text="Login"
          variant="flat"
          color="#8c1c13"
          v-bind="activatorProps"
          height="40"
        ></v-btn>
      </template>

      <v-card title="Login" color="white">
        <v-alert v-if="loginError" type="error" dismissible>
          {{ loginError }}
        </v-alert>
        <v-card-text>
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="Username" v-model="username" required></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Password"
                v-model="password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text="Close" color="black" variant="plain" @click="dialog = false"></v-btn>
          <v-btn color="#8c1c13" text="Login" variant="flat" @click="login"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
