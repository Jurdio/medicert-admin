<template>
  <Toast />

  <!-- Фіксований сайдбар (нічого не міняємо) -->
  <SideMenu />

  <!-- Контент — відсуваємо на ширину бару -->
  <div class="p-4" style="margin-left:260px">
    <router-view />
  </div>
</template>

<script setup>
import SideMenu from '@/components/SideMenu.vue'
</script>
