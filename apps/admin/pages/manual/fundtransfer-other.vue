<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'

const config = useRuntimeConfig()
const apiDemoUrl = config.public.API_SHOCK_URL

useHead({
  title: 'other',
})

definePageMeta({
  layout: 'admin',
})
const transferNow = 'TRANSFER_NOW'
const transferAuto = 'TRANSFER_AUTO'

const messageKey = {
  required: 'กรุณากรอกข้อมูล',
}

const formData = ref({
  // fromBank: '',
  // accountNo: '',
  // bankName: '',
  // pin: '',
  // total: '',
  // totalTransferAutoMin: '',
  transferAuto: transferNow,
})

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

// const emit = defineEmits({
//   submit(payload) {
//     getTransferBank();
//   },
// })

async function getTransferBank() {
  const res = await $fetch(
    `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank/history`,
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

  // initialValues: {
  //   transferAuto: transferNow,
  // },
  // initialTouched: {
  //   fromBank: true,
  //   accountNo: true,
  //   bankName: true,
  //   pin: true,
  //   total: true,
  //   totalTransferAutoMin: true,
  //   transferAuto: true,
  // },
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

    // console.error(values)
    const res = await $fetch(
      `https://${localStorage.getItem('prefix')}-backend-api.iautobet.com/api/customers/manuals/transfer-bank/`,
      {
        method: 'post',
        body: {
          fromBank: values.fromBank || '',
          accountNo: values.accountNo || '',
          bankName: values.bankName || '',
          pin: values.pin || '',
          total: values.total || '',
          totalTransferAutoMin: values.totalTransferAutoMin || '',
          transferAuto: formData.value.transferAuto || transferNow,
        },
      },
    ).catch((error) => {
      // alert(error)
    })

    if (res)
      alert('ทำรายการสำเร็จ')
  }

  catch (e: any) {
    // console.error(e)
  }
})

onMounted(async () => {
  // setInterval(() => {
  getTransferBank()
  // }, 5000)
})
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
                  <Dropdown v-model="formData.fromBank" :label="$t('funds_other_from')" name="fromBank">
                    <option v-for="item in backAccount.bankAccountList" :key="item.id" v-bind="item" :value="item.id">
                      {{ $t('funds_other_txt_bank') }} {{ item.bank_account_name }} {{ $t('funds_other_account_no') }}
                      {{ item.bank_account_number }}
                    </option>
                  </Dropdown>
                </div>
              </div>

              <div class="col-span-6">
                <label for="accountNo" class="block text-sm font-medium text-gray-700">{{ $t('funds_other_to') }}</label>
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
                  " :placeholder="$t('funds_other_to_placeholder')"
                />
              </div>

              <div class="col-span-6">
                <!-- <Dropdown title="ธนาคารปลายทาง" name="bankName" form="formData.bankName">
                  <option v-for="item in bankList" :key="item.key" v-bind="item" :value="item.bankCode">
                    {{ item.bankName }}
                  </option>
                </Dropdown> -->

                <div class="col-span-6 sm:col-span-3">
                  <Dropdown v-model="formData.bankName" :label="$t('funds_other_to_bank')" name="bankName">
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
                  " min="1"
                  :placeholder="$t('funds_other_funds_transfer_automatic_placeholder')"
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
                  <!-- <legend class="text-base font-medium text-gray-900">
                    Push Notifications
                  </legend> -->
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

    <ManualFundtransferOtherAutoList :banks-auto="backAccount.banksAuto" />
    <ManualFundtransferOtherHistoryList />
  </div>
  <!-- card -->
</template>
