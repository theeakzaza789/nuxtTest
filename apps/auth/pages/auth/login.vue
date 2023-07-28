<script lang="ts" setup>
import { useForm } from 'vee-validate'
import { object, string } from 'yup'
import { useToast } from 'vue-toastification'
import { useAuthStore } from '~~/stores/auth'

const config = useRuntimeConfig()
const apiUrl = config.public.API_URL_AUTH_LOGIN
// const localePath = useLocalePath()
// const { locale, setLocale, t } = useI18n()

// console.error(locale.value)

const toast = useToast()
useHead({
  title: 'Login',
})

definePageMeta({
  layout: 'admin',
  middleware: 'guest',
})

const { handleSubmit } = useForm({
  validationSchema: object({
    username: string().required().label('Username'),
    password: string().required().label('Password'),
    // prefix: string().required().label('Prefix'),
    // twofactor: string().optional().label('Twofactor'),
  }),
})

const auth = useAuthStore()
const router = useRouter()
const error = ref()
const route = useRoute()

const { store } = useAuthStorage()

const onSubmit = handleSubmit(async (values) => {
  error.value = ''
  // console.error(values)
  try {
    const res = await $fetch(
      `${apiUrl}`,
      {
        method: 'POST',
        body: {
          username: values.username || '',
          password: values.password || '',
          // prefix: values.prefix || '',
          // twofactor: values.twofactor || '',
          // captcha:
          //   'xxx',
        },
      },
    ).catch((error) => {
      console.error(error)
      if (error)
        toast.error(error?.data?.message || 'Invalid data')

      else
        toast.error('Invalid data')
    })

    if (res) {
      alert('Login Success')
      console.error(res)
      const token =<any> res
      const user = values.username
      store(token,user)
      auth.user = user
      auth.loggedIn = true
      // localStorage.setItem('sessionToken', token)
      // localStorage.setItem('prefix', values.prefix)
      router.push((route.query as any).next || '/admin')
    }
  }
  catch (e: any) {
    error.value = e.data.error
  }
})
</script>

<template>
  <div class="h-screen flex items-center justify-center w-full">
    <div class="lg:w-[400px]">
      <div class="bg-white rounded-xl shadow-lg">
        <div class="flex items-center justify-center h-full">
          <form class="rounded-lg px-10 py-8 w-full max-w-md mx-auto" @submit="onSubmit">
            <AuthHeader :title="$t('login')" />

            <div v-if="error" class="bg-error-600 text-white text-sm px-4 py-3 rounded-lg mb-4">
              {{ error }}
            </div>

            <VInput name="username" label="Username" placeholder="Username" />
            <VInput name="password" label="Password" placeholder="Password" type="password" />
            <!-- <VInput name="prefix" label="Prefix" placeholder="Prefix" />
            <VInput name="twofactor" placeholder="Twofactor" /> -->
            <div class="mb-5 flex gap-2 justify-between items-center">
              <label class="flex gap-2 items-center text-sm">
                <input
                  type="checkbox" class="
              w-4
              h-4
              rounded
              text-primary-500
              focus:ring-primary-500
              transition
              duration-300
            "
                >
                {{ $t('remember_me') }}
              </label>
              <nuxt-link to="/auth/forgot-password" class="text-primary-500 hover:underline font-semibold text-sm">
                {{ $t('forgot_password') }}
              </nuxt-link>
            </div>

            <VButton type="submit" color="primary" block class="mb-5">
              {{ $t('login') }}
            </VButton>

            <!-- <button
        class="px-3 py-2.5 rounded-md mb-4 font-semibold inline-flex w-full items-center justify-center bg-primary-500 text-white border-primary-500 focus:ring focus:ring-primary-500 focus:ring-offset-1 transition duration-300 hover:bg-primary-600 hover:border-primary-600"
      >
        Login
      </button> -->

            <!-- <div class="text-gray-600 text-sm">
        Don't have account?
        <nuxt-link
          to="/auth/register"
          class="text-primary-500 hover:underline font-semibold text-sm"
        >
          Register
        </nuxt-link>
      </div> -->
          </form>
        </div>
      </div>
    </div>
  </div>
  v.1.0.6
</template>
