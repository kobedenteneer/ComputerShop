<script setup lang="ts">
import { useRouter } from 'vue-router'
import lanparty from '@/assets/images/lanparty.jpeg'
import featured from '@/components/Featured-list.vue'
import rabbit from '@/assets/images/rabbit.png'
import angel from '@/assets/images/angel.png'
import angel2 from '@/assets/images/angel2.png'

const router = useRouter()

const goToStore = () => {
  router.push('/products')
}
</script>

<template>
  <div class="home-screen">
    <v-container fluid class="fill-height">
      <v-row class="fill-height" align="center" justify="center" no-gutters>
        <!-- Left Column -->
        <v-col cols="2" class="d-none d-md-flex flex-column side-images">
          <v-row class="fill-height flex-column justify-space-between align-center">
            <v-col class="d-flex justify-center" style="height: 30%">
              <v-img :src="angel" alt="Angel" class="non-interactive" />
            </v-col>
          </v-row>
        </v-col>

        <!-- Main Content Column -->
        <v-col cols="12" md="8" class="text-center">
          <h1 class="medieval-title">🛡️ The Guild of Computery 🛡️</h1>
          <p class="body-text mb-4 dropcap">
            Welcome, seekers of arcane technology and digital mastery. We are purveyors of fine
            enchanted devices, relics imbued with extraordinary processing power, and rare digital
            artifacts forged in the crucibles of innovation. Within these hallowed halls, you'll
            discover a codex of curated machines, each a marvel of craftsmanship, tailored for
            sorcerers of code, architects of fantasy, and champions of the gaming realms alike.
            Whether you seek the swiftest spellcasting rigs, legendary relics of computation, or
            tools to conquer virtual worlds, your journey begins here. Step forth, and behold a
            realm where magic meets machine.
          </p>
          <div class="main-image-wrapper mx-auto">
            <v-img
              :src="lanparty"
              alt="Medieval Lan Party"
              class="rounded mb-10"
              cover
              max-width="100%"
              style="
                box-shadow:
                  0 6px 12px rgba(0, 0, 0, 0.3),
                  0 12px 28px rgba(0, 0, 0, 0.5);
              "
            >
              <template #default>
                <div class="d-flex align-center justify-center fill-height">
                  <div class="blur-behind-btn">
                    <v-btn class="ink-stamp-btn" @click="goToStore" height="50">
                      Enter the Shop
                    </v-btn>
                  </div>
                </div>
              </template>
            </v-img>
          </div>
          <featured />
        </v-col>
        <!-- Right Column -->
        <v-col cols="2" class="d-none d-md-flex flex-column side-images">
          <v-row class="flex-column align-center">
            <v-col class="d-flex justify-end">
              <v-img
                :src="angel2"
                alt="Rabbit"
                max-width="200"
                class="non-interactive flip-horizontal mr-16 mb-15"
              />
            </v-col>
            <v-spacer />
            <v-col class="d-flex justify-end">
              <v-img :src="rabbit" alt="Rabbit" max-width="250" class="non-interactive mt-16" />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&family=EB+Garamond&display=swap');

.medieval-title {
  font-family: 'MedievalSharp', cursive;
  font-size: 3rem;
  color: #1e3a5f;
  margin-bottom: 1rem;
}

.body-text {
  font-family: 'EB Garamond', serif;
  font-size: 1.2rem;
  max-width: 950px;
  color: #2d2a26;
  margin: 0 auto;
}

.dropcap::first-letter {
  float: left;
  font-size: 3rem;
  line-height: 1;
  padding-right: 0.25rem;
  font-weight: bold;
  color: #c2a878;
}

.blur-behind-btn {
  position: relative;
  display: inline-block;
}

.blur-behind-btn::before {
  content: '';
  position: absolute;
  top: -5px;
  left: -10px;
  right: -10px;
  bottom: -5px;
  backdrop-filter: blur(3px);
  border-radius: 100px;
  z-index: 0;
}

.ink-stamp-btn {
  font-family: 'MedievalSharp', cursive !important;
  font-size: 1.1rem;
  padding: 0.8rem 1.5rem;
  color: #f4ecd8 !important;
  background-color: #8c1c13 !important;
  border: 3px solid #2d2a26 !important;
  border-radius: 0.5rem;
  box-shadow:
    inset 0 0 0.3rem #4b0e0e,
    0 4px 0 #2d2a26;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition:
    transform 0.1s ease,
    box-shadow 0.1s ease;
  z-index: 1;
  position: relative;
}

.ink-stamp-btn:hover {
  background-color: #a71f1f !important;
}

.ink-stamp-btn:active {
  transform: translateY(2px);
  box-shadow:
    inset 0 0 0.4rem #2d2a26,
    0 2px 0 #2d2a26;
}

.side-images v-img {
  filter: drop-shadow(1px 2px 3px rgba(0, 0, 0, 0.2));
  transition: transform 0.3s ease;
}

.main-image-wrapper {
  max-width: 950px;
  width: 100%;
}

.non-interactive {
  pointer-events: none;
  user-select: none;
  -webkit-user-drag: none;
}

.flip-horizontal {
  transform: rotateY(180deg);
}

@media (max-width: 1499px) {
  .side-images {
    display: none !important;
  }
  .medieval-title {
    font-size: x-large;
  }
  .body-text {
    font-size: medium;
  }
}
</style>
