<script lang="ts" setup>
const config = useRuntimeConfig()
const apiDemoUrl = config.public.API_SHOCK_URL
definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})

const stats: Ref<{
  accountList: { accountNo: string; currentBalance: number; accountDetails: any }[]
}> = ref({
  accountList: [],
})

const isLoading: Ref<boolean> = ref(false)

onMounted(async () => {
  isLoading.value = true
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/dashboard/bankings `,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
    },
  ).catch((error) => {
    // alert(error)
  }).finally(() => {
    isLoading.value = false
  })
  if (res) {
    // console.error(res)
    stats.value.accountList = []
    res?.forEach((data) => {
      stats.value.accountList.push({
        accountNo: data.bank_account_number,
        currentBalance: data.currentBalance,
        accountDetails: data,
      })
    })
  }

  if (stats.value.accountList.length === 0) {
    stats.value.accountList.push({
      accountNo: '-',
      currentBalance: 0,
      accountDetails: {},
    })
  }
})
</script>

<template>
  <div>
    <div class="mb-5">
      <nuxt-link class="font-semibold text-2xl" to="/">
        Dashboard
      </nuxt-link>
      <div class="text-gray-500">
        Overview & summary
      </div>
    </div>

    <!-- stats -->
    <div v-if="stats.accountList.length !== 0" class="grid grid-cols-2 sm:grid-cols-4 mb-5 gap-5">
      <AdminMetricItem v-for="stat in stats.accountList" :key="stat" v-bind="stat" />
    </div>

    <div v-if="isLoading" class="grid grid-cols-2 sm:grid-cols-4 mb-5 gap-5">
      <AdminMetricItemSkeletion :total-card="4" />
    </div>
  </div>
</template>
