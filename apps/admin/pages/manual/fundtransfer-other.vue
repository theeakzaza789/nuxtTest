<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'

const config = useRuntimeConfig()
const apiDemoUrl = config.public.API_SHOCK_URL
const toast = useToast()

useHead({
  title: 'other',
})

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
})
const transferNow = 'TRANSFER_NOW'
const transferAuto = 'TRANSFER_AUTO'

const formData = ref({
  // fromBank: '',
  // accountNo: '',
  // bankName: '',
  // pin: '',
  // total: '',
  // totalTransferAutoMin: '',
  transferAuto: transferNow,
})
const isOpen = ref(false)
const isLoading = ref(false)

const bankList = [
  { bankCode: 'KBANK', bankName: 'ธนาคารกสิกรไทย' },
  { bankCode: 'BBL', bankName: 'ธนาคารกรุงเทพ' },
  { bankCode: 'KTB', bankName: 'ธนาคารกรุงไทย' },
  { bankCode: 'BAAC', bankName: 'ธนาคารเพื่อการเกษตรและสหกรณ์การเกษตร' },
  { bankCode: 'TMB', bankName: 'ธนาคารทหารไทยธนชาต' },
  { bankCode: 'ICBC', bankName: 'ธนาคารไอซีบีซี (ไทย)' },
  { bankCode: 'TCD', bankName: 'ธนาคารไทยเครดิตเพื่อรายย่อย' },
  { bankCode: 'CITI', bankName: 'ธนาคารซิตี้แบงก์' },
  { bankCode: 'SCBT', bankName: 'ธนาคารสแตนดาร์ดชาร์เตอร์ด (ไทย) ' },
  { bankCode: 'CIMB', bankName: 'ธนาคารซีไอเอ็มบีไทย' },
  { bankCode: 'UOB', bankName: 'ธนาคารยูโอบี' },
  { bankCode: 'BAY', bankName: 'ธนาคารกรุงศรีอยุธยา' },
  { bankCode: 'GSB', bankName: 'ธนาคารออมสิน' },
  { bankCode: 'HSBC', bankName: 'ธนาคารเอชเอสบีซี ประเทศไทย' },
  { bankCode: 'MIZUHO', bankName: 'ธนาคารมิซูโฮ คอร์ปอเรต' },
  { bankCode: 'GHB', bankName: 'ธนาคารอาคารสงเคราะห์' },
  { bankCode: 'LHBANK', bankName: 'ธนาคารแลนด์ แอนด์ เฮ้าส์' },
  { bankCode: 'TBANK', bankName: 'ธนาคารธนชาต' },
  { bankCode: 'TISCO', bankName: 'ธนาคารทิสโก้' },
  { bankCode: 'KK', bankName: 'ธนาคารเกียรตินาคิน' },
  { bankCode: 'SCB', bankName: 'ธนาคารไทยพาณิชย์' },
  { bankCode: 'ISBT', bankName: 'ธนาคารอิสลามแห่งประเทศไทย' },

]

function toLower(value: string) {
  return value.toLowerCase()
}

const backAccount: Ref<{
  bankAccountList: {
    active: boolean
    bank_account_name: string
    bank_account_number: string
    bank_name: string
    id: string
  }[]
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
}> = ref({
  bankAccountList: [],
  banksAuto: [],
})

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

async function getTransferBank() {
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank`,
    {
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
      },
    },
  ).catch((error) => {
    // alert(error)
  })
  backAccount.value.bankAccountList = []
  backAccount.value.banksAuto = []
  if (res) {
    // console.error(res)
    res.banks.forEach((data) => {
      backAccount.value.bankAccountList.push(data)
    })

    res.banksAuto.forEach((data) => {
      backAccount.value.banksAuto.push(data)
    })
  }
}

interface OtherForm {
  fromBank: string
  accountNo: string
  bankName: string
  pin: string
  total: number
  totalTransferAutoMin: string
  transferAuto: string
}

const { handleSubmit, setFieldValue, setErrors } = useForm<OtherForm>({

  validationSchema: object({
    fromBank: string().required('funds_other_valid_account_from').label('fromBank'),
    accountNo: string().required('funds_other_valid_account_to').label('accountNo'),
    bankName: string().required('funds_other_valid_to_bank').label('bankName'),
    pin: string().required('funds_other_valid_pin').length(6, 'funds_other_valid_pin_must_6_char').label('pin'),
    total: string().required(transferAuto === formData.value.transferAuto ? 'funds_other_valid_automatic_reach' : 'funds_other_valid_amount_minimun').label('total'),
    totalTransferAutoMin: string().optional().label('totalTransferAutoMin'),
    // transferAuto: string().optional().label('transferAuto'),
  }),

})

const rules = {
  required: value => !!value || 'funds_other_valid',
  minLength: value => value.length >= 3 || 'funds_other_valid_at_least_3_char',
}

const onSubmit = handleSubmit(async (values) => {
  try {
    // validateField('accountNo')

    if (transferAuto === formData.value.transferAuto) {
      if (!values.totalTransferAutoMin || values.total < 1000) {
        if (!values.totalTransferAutoMin) {
          setErrors({
            totalTransferAutoMin: 'funds_other_valid_automatic_reach', // auto-complete for `email` and `password`
          })
        }

        if (values.total < 1000) {
          setErrors({
            total: 'funds_other_valid_automatic_reach', // auto-complete for `email` and `password`
          })
        }

        return
      }
    }

    if (!isOpen.value) {
      isOpen.value = true
      return
    }
    isLoading.value = true

    const res = await $fetch(
      `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank/`,
      {
        method: 'post',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('sessionToken')}`,
        },
        body: {
          fromBank: values.fromBank || '',
          accountNo: values.accountNo || '',
          bankName: values.bankName || '',
          pin: values.pin || '',
          total: values.total || '',
          totalTransferAutoMin: values.totalTransferAutoMin || 0,
          transferAuto: formData.value.transferAuto || transferNow,
        },
      },
    ).catch((error) => {
      const resError = error?.response?._data
      if (resError?.statusCode == 400) {
        if (resError?.message == 'รหัสพิน ไม่ถูกต้อง!!')
          toast.error('incorrect PIN')

        else
          toast.error(error?.message || 'Invalid data')
      }
      else {
        toast.error(error?.message || 'Invalid data')
      }
    }).finally(() => {
      isOpen.value = false
      isLoading.value = false
    })

    if (res) {
      toast.success('Complete!')
      reload()
      if (transferAuto === formData.value.transferAuto)
        getTransferBank()
    }
  }

  catch (e: any) {
    // console.error(e)
  }
})

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
  // setInterval(() => {
  getTransferBank()
  getHistory()
  // }, 5000)
})

function reload() {
  getHistory()
}
</script>

<template>
  <div>
    <VCard :title="$t('menu_child_fundstransfer_other_account')">
      <div class="pt-3 pb-3 row wrap">
        <VButton color="primary" variant="tertiary" shadow="md">
          {{ $t('funds_other_for_pin') }}
        </VButton>
      </div>
      <VCard :title="$t('menu_child_fundstransfer_other_account')">
        <form>
          <div class="overflow-hidden sm:rounded-md">
            <div class="px-4 py-5 grid grid-cols-6 gap-6">
              <div class="col-span-6">
                <div class="col-span-6 sm:col-span-3">
                  <Dropdown v-model="formData.fromBank" :label="$t('funds_other_from_account')" name="fromBank">
                    <option v-for="item in backAccount.bankAccountList" :key="item.id" v-bind="item" :value="item.id">
                      {{ $t('funds_other_txt_bank') }} {{ item.bank_account_name }} {{ $t('funds_other_account_no') }}
                      {{ item.bank_account_number }}
                    </option>
                  </Dropdown>
                </div>
              </div>

              <div class="col-span-6">
                <label for="accountNo" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_to_account')
                }}</label>
                <VInput
                  id="accountNo" v-model="formData.accountNo" type="text" name="accountNo" autocomplete="accountNo"
                  class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " :placeholder="$t('funds_other_to_account_placeholder')"
                />
              </div>

              <div class="col-span-6">
                <div class="col-span-6 sm:col-span-3">
                  <Dropdown v-model="formData.bankName" :label="$t('funds_other_to_account_bank')" name="bankName">
                    <option v-for="item in bankList" :key="item.bankCode" v-bind="item" :value="item.bankCode">
                      {{ $t(`bank_code_${toLower(item.bankCode)}`) }}
                    </option>
                  </Dropdown>
                </div>
              </div>

              <div v-if="transferAuto === formData.transferAuto" class="col-span-6">
                <label for="totalTransferAutoMin" class="block text-sm font-medium text-gray-700"> {{
                  $t('funds_other_funds_transfer_automatic') }}
                </label>
                <VInput
                  id="totalTransferAutoMin" v-model="formData.totalTransferAutoMin" type="number"
                  name="totalTransferAutoMin" autocomplete="totalTransferAutoMin" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " min="1" :placeholder="$t('funds_other_funds_transfer_automatic_placeholder')"
                />
              </div>

              <div class="col-span-6">
                <label for="total" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_amount') }}</label>
                <VInput
                  id="total" v-model="formData.total" type="number" name="total" autocomplete="total" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>

              <div class="col-span-6">
                <label for="pin" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_pin_for_transfer')
                }}</label>
                <VInput
                  id="pin" v-model="formData.pin" type="password" name="pin" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  "
                />
              </div>

              <fieldset class="col-span-6">
                <div class="flex flex-row m-4">
                  <div class="flex items-center mr-2">
                    <input
                      id="transferNow" v-model="formData.transferAuto" name="transferAuto" type="radio" class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      " :value="transferNow" checked
                    >
                    <label for="transferNow" class="ml-3 block text-sm font-medium text-gray-700">
                      {{ $t('funds_other_funds_transfer_immediately') }}
                    </label>
                  </div>

                  <div class="flex items-center">
                    <input
                      id="auto" v-model="formData.transferAuto" name="transferAuto" type="radio" class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      " value="TRANSFER_AUTO"
                    >
                    <label id="auto" for="auto" class="ml-3 block text-sm font-medium text-gray-700">
                      {{ $t('funds_other_funds_transfer_add_automatic') }}
                    </label>
                  </div>
                </div>

                <div v-if="transferAuto === formData.transferAuto">
                  <div class="text-sm bg-rose-300 rounded-md p-3">
                    <Icon name="line-md:alert" class="w-6 h-6" />
                    <strong>{{ $t('funds_other_funds_transfer_add_automatic_warning') }}</strong>
                  </div>
                </div>
              </fieldset>
              <div class="col-span-6">
                <VButton type="button" color="primary" variant="tertiary" shadow="md" @click="onSubmit">
                  {{ $t('funds_other_submit') }}
                </VButton>
              </div>
            </div>
          </div>
        </form>
      </VCard>
    </VCard>

    <ManualFundtransferOtherAutoList :banks-auto="backAccount.banksAuto" @reloadBank="getTransferBank" />
    <ManualFundtransferOtherHistoryList :history="history" :isLoading:="isLoading" @reload="reload" />
  </div>
  <!-- card -->

  <!-- Confirm modal -->
  <VModal v-model="isOpen">
    <VModalHeader dismissable>
      <strong class="text-center">{{ $t('funds_other_modal_header') }}</strong>
    </VModalHeader>
    <VModalBody>
      <form>
        <div class="overflow-hidden sm:rounded-md">
          <div class="px-4 py-5 grid grid-cols-6 gap-6">
            <div class="col-span-6">
              <div class="col-span-6 sm:col-span-3">
                <Dropdown
                  v-model="formData.fromBank" :label="$t('funds_other_from_account')" name="fromBank"
                  :disabled="true"
                >
                  <option v-for="item in backAccount.bankAccountList" :key="item.id" v-bind="item" :value="item.id">
                    {{ $t('funds_other_txt_bank') }} {{ item.bank_account_name }} {{ $t('funds_other_account_no') }}
                    {{ item.bank_account_number }}
                  </option>
                </Dropdown>
              </div>
            </div>

            <div class="col-span-6">
              <label for="accountNo" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_to_account')
              }}</label>
              <VInput
                id="accountNo" v-model="formData.accountNo" type="text" name="accountNo" autocomplete="accountNo"
                class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " :placeholder="$t('funds_other_to_account_placeholder')" :disabled="true"
              />
            </div>

            <div class="col-span-6">
              <div class="col-span-6 sm:col-span-3">
                <Dropdown
                  v-model="formData.bankName" :label="$t('funds_other_to_account_bank')" name="bankName"
                  :disabled="true"
                >
                  <option v-for="item in bankList" :key="item.bankCode" v-bind="item" :value="item.bankCode">
                    {{ $t(`bank_code_${toLower(item.bankCode)}`) }}
                  </option>
                </Dropdown>
              </div>
            </div>

            <div v-if="transferAuto === formData.transferAuto" class="col-span-6">
              <label for="totalTransferAutoMin" class="block text-sm font-medium text-gray-700"> {{
                $t('funds_other_funds_transfer_automatic') }}
              </label>
              <VInput
                id="totalTransferAutoMin" v-model="formData.totalTransferAutoMin" type="number"
                name="totalTransferAutoMin" autocomplete="totalTransferAutoMin" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " min="1" :placeholder="$t('funds_other_funds_transfer_automatic_placeholder')" :disabled="true"
              />
            </div>

            <div class="col-span-6">
              <label for="total" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_amount') }}</label>
              <VInput
                id="total" v-model="formData.total" type="number" name="total" autocomplete="total" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " :disabled="true"
              />
            </div>

            <div class="col-span-6">
              <label for="pin" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_pin_for_transfer')
              }}</label>
              <VInput
                id="pin" v-model="formData.pin" type="text" name="pin" class="
                    mt-1
                    focus:ring-indigo-500
                    focus:border-indigo-500
                    block
                    w-full
                    shadow-sm
                    sm:text-sm
                    border-gray-300
                    rounded-md
                  " :disabled="true"
              />
            </div>

            <fieldset class="col-span-6">
              <div class="flex flex-row m-4">
                <div class="flex items-center mr-2">
                  <input
                    id="transferNow" v-model="formData.transferAuto" name="transferAuto" type="radio" class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      " :value="transferNow" checked disabled="true"
                  >
                  <label class="ml-3 block text-sm font-medium text-gray-700">
                    {{ $t('funds_other_funds_transfer_immediately') }}
                  </label>
                </div>

                <div class="flex items-center">
                  <input
                    id="auto" v-model="formData.transferAuto" name="transferAuto" type="radio" class="
                        focus:ring-indigo-500
                        h-4
                        w-4
                        text-indigo-600
                        border-gray-300
                      " value="TRANSFER_AUTO" disabled="true"
                  >
                  <label class="ml-3 block text-sm font-medium text-gray-700">
                    {{ $t('funds_other_funds_transfer_add_automatic') }}
                  </label>
                </div>
              </div>

              <div v-if="transferAuto === formData.transferAuto">
                <div class="text-sm bg-rose-300 rounded-md p-3">
                  <Icon name="line-md:alert" class="w-6 h-6" />
                  <strong>{{ $t('funds_other_funds_transfer_add_automatic_warning') }}</strong>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </form>
    </VModalBody>
    <VModalFooter>
      <div class="flex justify-between">
        <VButton color="success" shadow="md" @click="!isLoading ? onSubmit() : ''">
          <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
          {{ $t('funds_other_modal_button_confirm') }}
        </VButton>

        <VButton color="error" variant="tertiary" shadow="md" @click="isOpen = false">
          <Icon v-if="isLoading" name="svg-spinners:tadpole" class="w-5 h-5" />
          {{ $t('funds_other_modal_button_cancel') }}
        </VButton>
      </div>
    </VModalFooter>
  </VModal>
  <!-- Confirm modal -->
</template>
