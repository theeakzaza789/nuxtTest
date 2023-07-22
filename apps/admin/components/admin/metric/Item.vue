<script lang="ts" setup>
defineProps<{
  color: string
  icon: any
  accountDetails: any
  accountNo: string | number
  currentBalance: string | number
}>()
</script>

<template>
  <VCard :hide-header="true">
    <VCardHeader>
      <div>
        <h3 class="font-semibold text-xl ">
          {{ accountDetails.bank_account_name_en }}
        </h3>
      </div>
    </VCardHeader>
    <VCardBody>
      <div>
        <h3 class="text-gray-600">
          {{ $t('dashboard_account_no') }} : {{ accountNo }}
        </h3>
        <h3 class="text-gray-600">
          {{ $t('dashboard_account_bank') }} : {{ accountDetails.bank_name }}
        </h3>
        <h3 class="text-gray-600">
          {{ $t('dashboard_available_balance') }} : {{ currentBalance }}
        </h3>
      </div>
    </VCardBody>
  </VCard>
  <!-- <div class="
      flex
      border border-gray-200
      rounded-xl
      items-center
      py-3
      bg-white
    ">
    <div class="
        rounded-full
        w-10
        h-10
        flex
        items-center
        justify-center
        text-white
        flex-shrink-0
      " :class="color">
      <component :is="icon" class="w-5 h-5" />
    </div>
    <div>
      <h3 class="font-semibold text-xl truncate">
        ยอดเงินคงเหลือ : {{ currentBalance }}
      </h3>
      <h4 class="text-gray-600">
        บัญชี : {{ accountNo }}
      </h4>
    </div>
  </div> -->
</template>
