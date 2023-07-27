<script lang="ts" setup>
definePageMeta({
  layout: '',
  middleware: 'auth',
})

const router = useRouter()

onMounted(async () => {
  router.push('/admin')
})
</script>

<template>
  <div>blank</div>
</template>
