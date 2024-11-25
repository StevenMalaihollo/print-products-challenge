<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useCartStore } from './stores/cart'
import { useProductsStore } from './stores/products'
import { ref, watch } from 'vue'
import LanguageSelector from './components/LanguageSelector.vue'

const cartStore = useCartStore()
const productsStore = useProductsStore()

const language = ref<null | 'en' | 'no'>(null)

const { resetProducts, loadProductFromFile } = productsStore

watch(language, (newLanguage) => {
  resetProducts()

  if (newLanguage === 'en') {
    loadProductFromFile('../data/businesscards.json')
    loadProductFromFile('../data/flyers.json')
    loadProductFromFile('../data/posters.json')
  } else if (newLanguage === 'no') {
    loadProductFromFile('../data/norwegian/businesscards.json')
  }
})
</script>

<template>
  <div v-if="!language">
    <LanguageSelector v-model:language="language" />
  </div>
  <template v-else>
    <header>
      <img alt="Vue logo" class="logo" src="@/printlogo.svg" width="125" height="125" />

      <div class="wrapper">
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/cart">My cart ({{ cartStore.cartTotalQuantity }})</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </template>
</template>

<style scoped>
header {
  line-height: 2;
  max-height: 100vh;
  padding: 12px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
  text-decoration: underline;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
