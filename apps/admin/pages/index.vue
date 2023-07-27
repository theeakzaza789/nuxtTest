<script lang="ts" setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const router = useRouter()

onMounted(async () => {
  router.push('/admin')
})
</script>

<template>
  <div />
</template>
