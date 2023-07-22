<script lang="ts" setup>
defineProps<{
  menu: Record<string, any>
}>()

const isOpen = ref(false)
</script>

<template>
  <li>
    <AdminSidebarLink
      v-bind="menu"
      :menu="menu"
      :to="menu.to"
      :parent="!!menu.children"
      @click="isOpen = !isOpen"
    />
    <ul v-if="menu.children" :class="!isOpen ? 'block' : 'hidden'">
      <li v-for="child in menu.children" :key="child.text">
        <AdminSidebarLink v-bind="child"  :to="child.to" :menu="menu" child />
      </li>
    </ul>
  </li>
</template>
