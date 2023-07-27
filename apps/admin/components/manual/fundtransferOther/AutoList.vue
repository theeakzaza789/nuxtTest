<script lang="ts" setup>
import dayjs from 'dayjs'

defineProps<{
  banksAuto: {
    id: string
    _id: {
      _bsontype: string
      id: {
        type: string
        data: number[]
      }
    }
    fromAccount: string
    createdAt: Date
    fromBank: string
    individual: string
    prefix: string
    toAccount: string
    toBank: string
    total: number
    totalTransferAutoMin: number
    updatedAt: Date
  }
}>()

const emit = defineEmits(['inFocus', 'submit'])

const isLoading = ref(false)

function formatDate(date: any) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss') // parse
}

async function cancelTransferAuto(id: string) {
  isLoading.value = true
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank-auto/${id}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
    },
  )
    .catch((error) => {
      alert(error)
    })
    .finally(() => {
      isLoading.value = false
    })

  if (res) {
    alert('ทำรายการสำเร็จ')
    emit('submit')
  }
}
</script>

<template>
  <div class="mt-5">
    <VCard :title="$t('funds_other_header_latest_transfer_transaction')">
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead
            class="
              text-xs text-gray-700
              uppercase
              bg-gray-50
              dark:bg-gray-700
              dark:text-gray-400
            "
          >
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_amount_react') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_amount_transfer') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_from') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_to') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_provider') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_create_at') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_latest_update_at') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in banksAuto" :key="item" v-bind="item" :class="index % 2
                ? 'border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                : 'bg-white border-b dark:bg-gray-900 dark:border-gray-700'
              "
            >
              <th
                scope="row" class="
                  px-6
                  py-4
                  font-medium
                  text-gray-900
                  whitespace-nowrap
                  dark:text-white
                "
              >
                <VButton color="error" variant="tertiary" shadow="md" size="sm" @click="cancelTransferAuto(item.id)">
                  <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
                  <small>ลบ</small>
                </VButton>
              </th>
              <td class="px-6 py-4">
                {{ item.totalTransferAutoMin }}
              </td>
              <td class="px-6 py-4">
                {{ item.total }}
              </td>
              <td class="px-6 py-4">
                {{ ` ${item.fromBank}-${item.fromAccount} ` }}
              </td>
              <td class="px-6 py-4">
                {{ ` ${item.toBank}-${item.toAccount} ` }}
              </td>

              <td class="px-6 py-4">
                {{ item.customerName || '-' }}
              </td>
              <td class="px-6 py-4">
                {{ formatDate(item.createdAt) }}
              </td>

              <td class="px-6 py-4">
                {{ formatDate(item.updatedAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </VCard>
  </div>
</template>
