<script setup lang="ts">
import enchantersTome from '@/assets/images/Products/MagicalLaptop.png'
import arcaneTowerM5 from '@/assets/images/Products/ArcaneTowerMK5.png'
import enchantedDisplay from '@/assets/images/Products/EnchantedDisplay.png'
</script>

<template>
  <h1 class="title">🔮 Featured Artifacts 🔮</h1>
  <div class="card-container">
    <div class="card">
      <img :src="enchantersTome" alt="Magical Laptop" />
    </div>
    <div class="card">
      <img :src="arcaneTowerM5" alt="Dragon-Powered PC" />
    </div>
    <div class="card">
      <img :src="enchantedDisplay" alt="Magic Monitor" />
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap');

.title {
  font-family: 'MedievalSharp', cursive;
  font-size: 3rem;
  color: #1e3a5f;
  margin-bottom: 1rem;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.card-container {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.card {
  border: 0.4em solid white;
  border-bottom: 0em;
  border-radius: 12px;
  box-shadow: 0.1em 0.1em 1em black;
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease;
}

.card img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.card:hover {
  transform: translateY(-10px);
}

@media (max-width: 500px) {
  .card {
    width: 150px;
  }
}
</style>
