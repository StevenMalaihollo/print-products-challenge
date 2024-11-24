<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()
</script>

<template>
  <RouterLink
    :to="{ path: `product/${product.sku}` }"
    class="bg-gray-100 border border-black-200 rounded-md p-4 flex"
  >
    <div class="flex justify-between mt-2">
      <h3 class="text-gray-800">{{ product.title }}</h3>
    </div>
  </RouterLink>
</template>
