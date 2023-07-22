<script lang="ts" setup>
defineProps<{
  totalCard: number
}>()
</script>

<template>
  <VCard v-for="item in totalCard" :key="item" :hide-header="true">
    <VCardHeader>
      <div>
        <h3 class="font-semibold text-xl ">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4" />
        </h3>
      </div>
    </VCardHeader>
    <VCardBody>
      <div>
        <h3 class="text-gray-600">
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5" />
        </h3>
        <h3 class="text-gray-600">
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5" />
        </h3>
        <h3 class="text-gray-600">
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" />
        </h3>
      </div>
    </VCardBody>
  </VCard>
</template>
