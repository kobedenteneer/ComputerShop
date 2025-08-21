<script setup lang="ts">
import vendor from '@/assets/images/vendor.jpeg'
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 text-[#2e1e0f] mt-4">
    <div class="space-y-6 text-lg leading-relaxed body-text text-center">
      <h1 class="medieval-title">🛡️ About Us 🛡️</h1>

      <blockquote class="italic text-[#c2a878] text-lg">
        “Where magic meets craftsmanship, legends are born.”
      </blockquote>

      <p class="dropcap">
        It all began on the cobbled streets of Rattay, where we set up a modest little stall beneath
        a weathered canvas, tucked between the local tavern and the shadow of the city gates. Most
        walked past with puzzled looks or stifled laughs as we tried to sell what they called
        “enchanted boxes.” They didn’t yet understand the magic behind them—our medieval computers,
        hand-crafted from oak and brass, powered by runestones and rare lightning crystals.
      </p>

      <p class="dropcap">
        But curiosity, as they say, is the spark of all great things. One day, a wandering scholar
        dared to press a key. Then a town scribe. Then a blacksmith. And soon, word spread like
        wildfire. These weren’t just strange relics, they were gateways to knowledge, power, and
        endless possibilities. Our humble market stall grew into a small workshop, then a guild, and
        before long, we became known as the kingdom’s foremost enchanters of digital marvels.
      </p>

      <p class="dropcap">
        Today, from our grand digital guildhall, what some might call a webshop, we continue to
        share our arcane creations with the realm. Whether you're a bard chasing inspiration, an
        alchemist seeking rare wares, or a knight in need of noble gear, welcome to our story. The
        magic is now yours to wield.
      </p>

      <figure class="flex flex-col items-center mb-3">
        <v-img
          :src="vendor"
          height="22em"
          class="max-h-full rounded-xl border border-[#c2a878] shadow-md mx-auto"
          cover
        />
        <figcaption class="mt-2 text-sm italic text-[#7a6a53]">Rattay, 1403</figcaption>
      </figure>
    </div>
  </div>
</template>

<style scoped>
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

p {
  margin-bottom: 0.5em;
}

figcaption {
  font-style: italic;
  font-size: 1rem;
  color: black;
  text-align: right;
}
</style>
