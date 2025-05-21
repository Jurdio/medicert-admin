<template>
  <Toast />                         <!-- контейнер тостів -->
  <!-- Sidebar як окремий компонент -->
  <SideMenu v-model:visible="sidebarOpen" />

  <!-- Контент сторінок -->
  <div class="flex-1">
    <router-view />
  </div>
</template>

<script setup>
import {ref} from 'vue'
import Button from 'primevue/button'
import SideMenu from '@/components/SideMenu.vue'
</script>
