<script lang="ts" setup>
import dayjs from 'dayjs'

const config = useRuntimeConfig()
const apiDemoUrl = config.public.API_SHOCK_URL

const isLoading = ref(false)

const history: Ref<{
  historyList: {
    _id: string
    success: boolean
    withdrawType: string
    isAuto: boolean
    prefix: string
    individual: string
    banking: {
      _bsontype: string
      id: {
        type: string
        data: number[]
      }
    }
    total: number
    toBank: string
    toAccount: string
    fromBank: string
    fromAccount: string
    customerName: string
    status: string
    createdAt: Date
    updatedAt: Date
    __v: number
  }[]
}> = ref({
  historyList: [],
})

const modalObj = ref({
  _id: '',
  isOpen: false,
})

const statusList = [
  {
    status: 'PROCESSING',
    message: 'รอการทำรายการ',
    color: 'text-blue-600',
    isCancel: true,
  },
  {
    status: 'COMPLETED',
    message: 'สำเร็จ',
    color: 'text-green-600',
    isCancel: false,
  },
  {
    status: 'CANCEL',
    message: 'ยกเลิก',
    color: 'text-red-600',
    isCancel: false,
  },
]

function toLower(value: string) {
  return value.toLowerCase()
}

function formatDate(date: any) {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss') // parse
}

async function cancelTransfer() {
  isLoading.value = true
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank/cancel-transfer`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
      body: {
        id: modalObj.value._id,
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
    modalObj.value.isOpen = false
    getHistory()
  }
}

function handleStatusDisplay(status: string) {
  const find = statusList.find((d: any) => d.status === status)
  if (find)
    return find

  return {
    status,
    message: status,
    color: '',
    isCancel: false,
  }
}

async function getHistory() {
  isLoading.value = true
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank/history`,

    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
    },
  )
    .catch((error) => {
      // alert(error)
    })
    .finally(() => {
      isLoading.value = false
    })

  if (res) {
    // console.error(res)
    history.value.historyList = []
    res.forEach((data) => {
      history.value.historyList.push(data)
    })
  }
}

onMounted(async () => {
  // console.error('apidemoUrl', apidemoUrl)
  getHistory()
})
</script>

<template>
  <div class="mt-5">
    <VCard :title="$t('funds_other_history_header')">
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
                {{ $t('funds_other_history_time') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_history_amount') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_history_status') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_history_from') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_history_to') }}
              </th>
              <th scope="col" class="px-6 py-3">
                {{ $t('funds_other_history_provider') }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, index) in history.historyList" :key="item.key" v-bind="item" :class="index % 2
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
                {{ formatDate(item.createdAt) }}
              </th>
              <td class="px-6 py-4">
                {{ item.total }}
              </td>
              <td class="px-6 py-4" :class="handleStatusDisplay(item.status).color">
                {{ $t(toLower(handleStatusDisplay(item.status).status)) }}

                <div v-if="handleStatusDisplay(item.status).isCancel">
                  <VButton
                    color="error" variant="tertiary" shadow="md" size="sm" @click="
                                                                                                                                  ; (modalObj.isOpen = true), (modalObj._id = item._id)
                    "
                  >
                    <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
                    <small>{{ $t('funds_other_history_cancel_button') }}</small>
                  </VButton>
                </div>
              </td>
              <td class="px-6 py-4">
                {{ ` ${item.toBank}-${item.toAccount} ` }}
              </td>
              <td class="px-6 py-4">
                {{ ` ${item.fromBank}-${item.fromAccount} ` }}
              </td>
              <td class="px-6 py-4">
                {{ item.customerName }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </VCard>
  </div>

  <VModal v-model="modalObj.isOpen">
    <VModalHeader dismissable>
      <strong class="text-center">{{ $t('funds_other_history_cancel_transfer_header') }}</strong>
    </VModalHeader>
    <VModalBody>
      <div class="flex justify-between">
        <VButton color="success" shadow="md" @click="!isLoading ? cancelTransfer() : ''">
          <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
          {{ $t('funds_other_history_confirm_button') }}
        </VButton>

        <VButton color="error" variant="tertiary" shadow="md" @click="modalObj.isOpen = false">
          <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
          {{ $t('funds_other_history_cancel_button') }}
        </VButton>
      </div>
    </VModalBody>
  </VModal>
</template>
