<script setup lang="ts">
import type { SelectedProduct } from '@/SelectedProduct'
import { computed } from 'vue'

const props = defineProps<{
  selectedProduct: SelectedProduct
}>()

const imagePaths = {
  posters: new URL('@/assets/posters.jpg', import.meta.url).href,
  businesscards: new URL('@/assets/businesscards.jpg', import.meta.url).href,
  flyers: new URL('@/assets/flyers.png', import.meta.url).href,
} as Record<string, string>

const product = computed(() => props.selectedProduct.getProduct())
</script>

<template>
  <div v-if="product" class="bg-gray-100 border border-black-200 rounded-md p-4">
    <img
      v-if="imagePaths[product.sku]"
      :src="imagePaths[product.sku]"
      :alt="product.title"
      class="w-40 h-40 object-contain"
    />
    <div class="flex justify-between mt-2">
      <h3 class="text-gray-800">{{ product.title }}</h3>
      <h3 class="text-gray-800">{{ selectedProduct.getQuantity() }}</h3>
    </div>
  </div>
</template>
