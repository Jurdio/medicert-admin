<template>
  <Toast />
  <SidebarLayout>
    <router-view />
  </SidebarLayout>
</template>

<script setup>
import SidebarLayout from "@/components/SidebarLayout.vue";
</script>

<style scoped>
body {
  margin: 0 !important;
  padding: 0;
  overflow: hidden;
}

</style>
