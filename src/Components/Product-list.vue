<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'

import { useProductStore } from '@/stores/productStore'
import { useCategoryStore } from '@/stores/categoryStore'

import type { Product } from '@/types/Product'
import type { Sorter } from '@/types/Sorter'

import ProductSingle from './Product-single.vue'

import { orderBy } from 'natural-orderby'

const productStore = useProductStore()
const categoryStore = useCategoryStore()

const { productList: products } = storeToRefs(productStore)
const brands = ref<string[]>([])

const loadingProducts = ref<boolean>(true)
const loadingProductsError = ref<boolean>(false)

const loadingCategories = ref<boolean>(true)
const loadingCategoriesError = ref<boolean>(false)

const loadingBrands = ref<boolean>(true)
const loadingBrandsError = ref<boolean>(false)

const loadingPrices = ref<boolean>(true)

const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])

const minMinimumPrice = computed<number>(() => Math.min(...products.value.map((p) => p.price)))
const maxMaximumPrice = computed<number>(() => Math.max(...products.value.map((p) => p.price)))

const priceRange = ref([-Infinity, Infinity])
const searchInput = ref<string>('')

const sorters: Sorter[] = [
  {
    title: 'Name: A-Z',
    value: (p) => orderBy(p, [(v) => v.title], ['asc']),
  },
  {
    title: 'Name: Z-A',
    value: (p) => orderBy(p, [(v) => v.title], ['desc']),
  },
  {
    title: 'Price: Low -> High',
    value: (p) => orderBy(p, [(v) => v.price], ['asc']),
  },
  {
    title: 'Price: High -> Low',
    value: (p) => orderBy(p, [(v) => v.price], ['desc']),
  },
]
const selectedSorter = ref()

function onlyUnique<T>(value: T, index: number, array: Array<T>) {
  return array.indexOf(value) === index
}
function isEmpty(array: Array<unknown>) {
  return array.length === 0
}

const filteredProducts = computed<Product[]>(() => {
  const filtered = products.value.filter((p) => {
    const matchesCategory =
      isEmpty(selectedCategories.value) ||
      selectedCategories.value.includes(p.categoryId.toString())
    const matchesBrand = isEmpty(selectedBrands.value) || selectedBrands.value.includes(p.brand)
    const matchesPrice = p.price >= priceRange.value[0] && p.price <= priceRange.value[1]
    const matchesSearchValue =
      searchInput.value.length === 0 ||
      p.title.toLowerCase().includes(searchInput.value.toLowerCase())

    return matchesCategory && matchesBrand && matchesPrice && matchesSearchValue
  })

  return selectedSorter.value != undefined ? selectedSorter.value(filtered) : filtered
})

async function loadBrandFilters() {
  try {
    if (products.value.length === 0) {
      brands.value = []
      return
    }
    brands.value = products.value.map((p) => p.brand).filter(onlyUnique<string>)

    loadingBrands.value = false
  } catch (e) {
    console.error((e as Error)?.message)
    loadingBrands.value = false
    loadingBrandsError.value = true
  }
}
async function loadPrices() {
  priceRange.value[0] = minMinimumPrice.value
  priceRange.value[1] = maxMaximumPrice.value
  loadingPrices.value = false
}
async function loadProducts() {
  try {
    await productStore.retrieveProducts()
    loadingProducts.value = false
  } catch (e) {
    console.error((e as Error)?.message)
    loadingProducts.value = false
    loadingProductsError.value = true
  } finally {
    loadBrandFilters()
  }
}
async function loadCategories() {
  try {
    await categoryStore.retrieveCategories()
    loadingCategories.value = false
  } catch (e) {
    console.error((e as Error)?.message)
    loadingCategories.value = false
    loadingCategoriesError.value = true
  }
}

onMounted(async () => {
  await loadProducts()
  await loadCategories()
  await loadPrices()
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col id="filters" class="v-col-sm-4 v-col-md-2">
        <h3>Categories</h3>
        <div v-if="loadingCategories">
          <p>Loading categories...</p>
        </div>
        <div v-else-if="loadingCategoriesError">
          <p>Unable to load categories...</p>
        </div>
        <v-checkbox
          v-else
          v-for="category in categoryStore.categoryList"
          :key="category.id"
          :value="category.id"
          :label="category.name"
          v-model="selectedCategories"
          hide-details
          density="compact"
        />

        <div v-if="loadingPrices">
          <p>Loading prices...</p>
        </div>
        <div v-else>
          <h3>Price: {{ priceRange[0] }} - {{ priceRange[1] }}</h3>
          <v-range-slider
            :min="minMinimumPrice"
            :max="maxMaximumPrice"
            v-model="priceRange"
            step="10"
            class="align-center"
            hide-details
          />
          <div class="d-flex justify-space-between">
            <v-text-field
              v-model="priceRange[0]"
              density="compact"
              type="number"
              variant="outlined"
              hide-details
              single-line
              hide-spin-buttons
              width="90px"
            ></v-text-field>
            <v-text-field
              v-model="priceRange[1]"
              density="compact"
              type="number"
              variant="outlined"
              hide-details
              single-line
              hide-spin-buttons
              width="100px"
            ></v-text-field>
          </div>
        </div>

        <h3>Brands</h3>
        <div v-if="loadingBrands">
          <p>Loading brands...</p>
        </div>
        <div v-else-if="loadingBrandsError">
          <p>Unable to load brands!</p>
        </div>
        <v-checkbox
          v-else
          v-for="brand in brands"
          :key="brand"
          :id="brand"
          :value="brand"
          v-model="selectedBrands"
          :label="brand"
          density="compact"
          hide-details
        />
      </v-col>

      <v-col class="v-col-md-10 v-col-sm-8">
        <v-row id="search-and-sort" class="justify-space-between">
          <v-col class="v-col-md-6 v-col-xl-5 v-col-12">
            <h4>Search</h4>
            <v-combobox
              class="mx-auto"
              density="comfortable"
              placeholder="Search a product"
              menu-icon=""
              append-inner-icon="mdi-magnify"
              variant="solo"
              :items="products"
              v-model:search="searchInput"
            />
          </v-col>
          <v-col class="v-col-md-4 v-col-xl-3 v-col-12">
            <h4>Sort</h4>
            <v-select
              density="comfortable"
              variant="solo-filled"
              placeholder="Sort by"
              :items="sorters"
              v-model="selectedSorter"
            />
          </v-col>
        </v-row>

        <v-row id="products">
          <div id="loading-products" v-if="loadingProducts">
            <p>Loading products...</p>
          </div>
          <div id="loading-products-error" v-else-if="loadingProductsError">
            <p>Unable to load products!</p>
          </div>
          <ProductSingle
            v-else
            v-for="product in filteredProducts"
            :key="product.id"
            :product="product"
            class="v-col-sm-6 v-col-md-4 v-col-xl-3 v-col-12"
          />
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
