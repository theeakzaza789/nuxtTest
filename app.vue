<script setup lang="ts">
const { t } = useI18n()
const appName = t('THAI Bank Withdrawal System')

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - ${appName}` : appName
  },
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: t('app_description'),
    },
  ],
})
</script>

<template>
  <Html lang="th" />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
