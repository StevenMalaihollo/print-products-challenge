<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useProductsStore } from '../stores/products'
import { computed, onMounted, ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import ProductProperty from '@/components/SelectProductProperty.vue'
import { SelectedProduct } from '@/SelectedProduct'

const router = useRouter()
const route = useRoute()
const cartStore = useCartStore()
const productsStore = useProductsStore()
const { products } = productsStore

const loading = ref(false)
const selected = ref<SelectedProduct | null>(null)

const product = computed(() => products.find((product) => product.sku === route.params.sku))

const imagePaths = {
  posters: new URL('@/assets/posters.jpg', import.meta.url).href,
  businesscards: new URL('@/assets/businesscards.jpg', import.meta.url).href,
  flyers: new URL('@/assets/flyers.png', import.meta.url).href,
} as Record<string, string>

onMounted(() => {
  loading.value = true
  setTimeout(() => {
    if (!product.value) {
      return router.push('/')
    }
    loading.value = false
    selected.value = new SelectedProduct(product.value)
  }, 500)
})

function addToCart() {
  if (!selected.value) {
    return
  }
  cartStore.saveSelection(selected.value)
  router.push('/cart')
}
</script>

<template>
  <div v-if="loading || !product" class="p-10">
    <img class="logo logo-spin" src="@/printlogo.svg" width="80" height="80" />
  </div>
  <div v-else-if="selected" class="flex justify-between gap-x-2 md:gap-x-6">
    <div class="p-4 md:p-10">
      <img
        v-if="imagePaths[product.sku]"
        :src="imagePaths[product.sku]"
        :alt="product.title"
        class="w-96"
      />
    </div>
    <div class="p-4 md:p-10 flex-1">
      <h1>{{ product.title }}</h1>
      <p>{{}}</p>

      <div class="flex flex-wrap gap-y-4 mb-6 -mx-2">
        <div
          v-for="productProp in product.properties"
          :key="productProp.slug"
          class="w-full md:w-1/2"
        >
          <ProductProperty class="px-2" :product="selected" :productProperty="productProp" />
        </div>
      </div>

      <button @click="addToCart">Add to cart</button>
    </div>
  </div>
</template>
