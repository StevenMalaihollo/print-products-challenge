import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { SelectedProduct } from '@/SelectedProduct'

export const useCartStore = defineStore('cart', () => {
  // To do: Store cart in local storage
  const cart = ref<SelectedProduct[]>([])

  const cartTotalQuantity = computed(() => {
    return cart.value.reduce((count, product) => {
      const quantity = product.getQuantity()
      return count + (typeof quantity === 'number' && !isNaN(quantity) ? quantity : 0)
    }, 0)
  })

  function saveSelection(newProduct: SelectedProduct) {
    cart.value.push(newProduct)
  }

  function removeSelection(product: SelectedProduct) {
    const index = cart.value.indexOf(product)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  return {
    cart,
    cartTotalQuantity,
    saveSelection,
    removeSelection,
  }
})
