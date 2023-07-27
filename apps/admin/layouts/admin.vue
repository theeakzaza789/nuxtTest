<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '~~/stores/auth'

const { t } = useI18n()

useHead({
  title: t('app_name'),
})
const auth = useAuthStore()

const sidebar = useAdminSidebar()
</script>

<template>
  <main class="flex flex-col sm:flex-row">
    <AdminSidebar v-if="auth.loggedIn" v-model="sidebar" />

    <div class="w-full flex-grow">
      <AdminHeader v-if="auth.loggedIn" @menu:click="sidebar = true" />

      <!-- main content -->
      <div class="px-6 py-6">
        <slot />
      </div>
    </div>
  </main>
</template>
