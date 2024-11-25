<script setup lang="ts">
import VueSelect from 'vue3-select-component'

const model = defineModel('language', {
  type: String,
  default: null,
})
</script>

<template>
  <div class="flex justify-center py-8">
    <div class="flex flex-col gap-4 max-w-2xl">
      <img class="logo logo-spin" src="@/printlogo.svg" width="125" height="125" />
      <VueSelect
        class="min-w-48"
        v-model="model"
        :options="[
          { value: 'en', label: 'English' },
          { value: 'no', label: 'Norwegian' },
          { value: 'nl', label: 'Dutch', disabled: true },
        ]"
        placeholder="Choose a language"
      />
    </div>
  </div>
</template>
