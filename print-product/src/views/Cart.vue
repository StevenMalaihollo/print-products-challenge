<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import SelectionCard from '@/components/SelectionCard.vue'

const cartStore = useCartStore()

const { cart } = cartStore
</script>

<template>
  <div class="flex justify-between gap-x-2 md:gap-x-6">
    <div class="p-4 md:p-10 flex-1">
      <h1>My cart</h1>

      <div class="flex flex-wrap mb-6 -mx-4">
        <div
          v-for="(selectedProduct, index) in cart"
          :key="index"
          class="w-full p-4 md:w-1/2 lg:w-1/3"
        >
          <SelectionCard class="px-2" :selectedProduct="selectedProduct" />
        </div>
      </div>
    </div>
  </div>
</template>
