<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const rules = {
  email: (v: string) => !!(v || '').match(/@/) || 'Please enter a valid email',
  length: (len: number) => (v: string) =>
    (v || '').length >= len || `Invalid character length, required ${len}`,
}

const form = ref()

const question = ref('')
const dialog = ref(false)
const email = ref()
const isValid = ref(false)
const isLoading = ref(false)
</script>
<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-text-field
        v-model="email"
        :rules="[rules.email]"
        label="Email address"
        type="email"
        variant="filled"
      ></v-text-field>
      <v-textarea
        v-model="question"
        label="Question"
        rows="1"
        variant="filled"
        auto-grow
        :rules="[rules.length(1)]"
      ></v-textarea>
    </v-form>
    <v-divider />
    <v-card-actions>
      <v-btn variant="text" @click="form.reset()"> Clear </v-btn>
      <v-spacer></v-spacer>
      <v-btn :disabled="!isValid" :loading="isLoading" @click="dialog = true"> Submit </v-btn>
    </v-card-actions>
    <v-dialog v-model="dialog" max-width="400" persistent>
      <v-card>
        <v-card-title class="text-h5"> Submitted! </v-card-title>
        <v-card-text>
          Thank you for contacting Royal Systems! We will ensure to answer your question
          <i>as quickly as possible!</i>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn variant="tonal" @click="router.push('/')"> Awesome! </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
