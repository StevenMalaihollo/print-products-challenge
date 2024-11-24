<script setup lang="ts">
import { useProductsStore } from '../stores/products'
import ProductCard from '@/components/ProductCard.vue'

const productsStore = useProductsStore()

const { products } = productsStore
</script>

<template>
  <div class="flex justify-between gap-x-2 md:gap-x-6">
    <div class="p-4 md:p-10 flex-1">
      <h1>Products</h1>
      <div class="flex flex-wrap mb-6 -mx-4">
        <div v-for="product in products" :key="product.sku" class="w-full p-4 md:w-1/2 lg:w-1/3">
          <ProductCard class="px-2" :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>
