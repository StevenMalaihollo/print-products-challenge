<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import VueSelect from 'vue3-select-component'
import type { SelectedProduct } from '@/SelectedProduct'
import type { ProductProperty } from '@/types'
import { SelectedProductProperty } from '@/SelectedProductProperty'
import type { GenericOption } from 'vue3-select-component/dist/Select.d.ts'

const props = defineProps<{
  product: SelectedProduct
  productProperty: ProductProperty
}>()

const selectedProductProperty = new SelectedProductProperty(props.product, props.productProperty)

const options = ref<GenericOption[]>([])
const selection = computed({
  get: () => {
    return props.product.getOption(props.productProperty.slug)?.slug
  },
  set: (value: ProductProperty['slug']) => {
    const option = props.productProperty.options.find((opt) => opt.slug === value)
    if (!option) {
      console.error('Option not found')
      return
    }
    return props.product.selectOption(props.productProperty.slug, option)
  },
})

watch(
  () => props.product.selectedOptions,
  () => {
    options.value = selectedProductProperty.getSelectOptions()
  },
  { deep: true },
)

options.value = selectedProductProperty.getSelectOptions()
</script>

<template>
  <div>
    <label class="text-black-500">{{ productProperty.title }}</label>
    <VueSelect
      :is-clearable="false"
      v-model="selection"
      :options="options"
      placeholder="Select an option"
    />
  </div>
</template>
