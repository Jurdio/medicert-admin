<template>
  <aside class="fixed-sidebar surface-0 shadow-2">
    <!-- Header -->
    <div class="flex align-items-center justify-content-between px-3 pt-3 pb-2 border-bottom-1 surface-border">
      <span class="flex align-items-center gap-2">
        <img src="./src/assets/logo.svg" alt="Logo" width="30" height="30" />
        <span class="text-xl font-bold text-primary">MedCert</span>
      </span>
    </div>

    <!-- Menu -->
    <PanelMenu :model="menuItems" class="p-3 custom-panelmenu" />

    <!-- Footer -->
    <div class="mt-auto px-3 py-3 border-top-1 surface-border text-sm text-color-secondary flex justify-content-between align-items-center">
      <span>v0.1</span>
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" text class="text-dark" />
    </div>
  </aside>
</template>

<script setup>
import PanelMenu from 'primevue/panelmenu'
import Button from 'primevue/button'
import { ref } from 'vue'

const menuItems = ref([
  {
    label: 'Protection',
    icon: 'pi pi-shield',
    command: () => console.log('Protection')
  },
  {
    label: 'Verify',
    icon: 'pi pi-check-circle',
    command: () => console.log('Verify')
  },
  {
    label: 'History',
    icon: 'pi pi-clock',
    command: () => console.log('History')
  }
])
</script>

<style scoped>
.fixed-sidebar {
  width: 250px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
}

.custom-panelmenu .pi {
  color: #000 !important;
}

.text-dark .pi {
  color: #000 !important;
}

/* Забезпечує скрол якщо контент більший за висоту */
.fixed-sidebar {
  overflow-y: auto;
}
</style>
