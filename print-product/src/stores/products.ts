import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Product } from '@/types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const productCount = computed(() => products.value.length)

  function addProduct(newProduct: Product) {
    products.value.push(newProduct)
  }
  function resetProducts() {
    products.value = []
  }

  async function loadProductFromFile(path: string) {
    try {
      const response = await import(path)
      addProduct(response.default)
    } catch (error) {
      console.error('Failed to load products:', error)
    }
  }

  return {
    products,
    productCount,
    resetProducts,
    loadProductFromFile,
    addProduct,
  }
})
