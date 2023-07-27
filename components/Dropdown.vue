<script setup lang="ts">
import { useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    label?: string
    name?: string
    rules?: string
    placeholder?: string
    type?: string
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    name: '',
    type: 'text',
    size: 'sm',
  },
)
const { name, rules } = toRefs(props)
const { value, errorMessage } = useField(name, rules)

const sizeClass: Record<string, Record<string, string>> = {
  label: {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  },
  input: {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2 text-lg',
  },
}

const errorClass = 'border-error-500 focus:ring-error-500 focus:border-error-500'
</script>

<template>
  <div class="col-span-6 sm:col-span-3">
    <label for="country" class="block text-sm font-medium text-gray-700">
      {{ label }}</label>
    <select
      :id="name" v-model="value" :name="name" :autocomplete="name" class="
        mt-1
        block
        w-full
        py-2
        px-3
        bg-white
        rounded-md
        shadow-sm
        focus:outline-none
        sm:text-sm
      " :class="[
        sizeClass.input[size],
        errorMessage
          ? errorClass
          : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500',
    ]"
    >
      <slot />
      <!-- <option v-for="item in optionList" :key="item.key" v-bind="item" >{{ item.message }}</option> -->

      <!-- <option>United States</option>
      <option>Canada</option>
      <option>Mexico</option> -->
    </select>
    <div v-if="errorMessage" class="text-error-500 text-sm mt-1">
      {{ $t(errorMessage) }}
    </div>
  </div>
</template>
