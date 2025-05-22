<template>
  <div class="h-full flex flex-column surface-ground">
    <!-- Header -->
    <div class="flex align-items-center justify-content-between px-4 pt-3 pb-2 surface-0 shadow-1">
      <span class="flex align-items-center gap-2">
        <img src="./src/assets/logo.svg" alt="Logo" width="35" height="35" />
        <span class="text-xl font-bold text-primary">MedCert</span>
      </span>
      <Button icon="pi pi-times" @click="onClose" class="p-button-text p-button-plain" />
    </div>

    <!-- Menu -->
    <PanelMenu :model="menuItems" class="p-4 flex-grow-1" />

    <!-- Footer -->
    <div class="mt-auto px-4 py-3 border-top-1 surface-border surface-0 flex justify-content-between align-items-center text-sm text-color-secondary">
      <span>v0.1</span>
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" text />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Button from 'primevue/button'
import PanelMenu from 'primevue/panelmenu'

defineProps({
  onClose: Function
})

const menuItems = ref([
  {
    label: 'Protection',
    icon: 'pi pi-shield',
    command: () => {
      // handleProtectionClick()
    }
  },
  {
    label: 'Verify',
    icon: 'pi pi-check-circle',
    command: () => {
      // handleVerifyClick()
    }
  },
  {
    label: 'History',
    icon: 'pi pi-clock',
    command: () => {
      // handleHistoryClick()
    }
  }
])
</script>

<style scoped>
.surface-border {
  border-color: var(--surface-border);
}
.text-color-secondary {
  color: var(--text-color-secondary);
}
</style>
