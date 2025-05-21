<template>
  <div class="flex flex-column h-full">
    <!-- Header -->
    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
      <span class="inline-flex align-items-center gap-2">
        <img src="./src/assets/logo.svg" alt="Logo" width="35" height="35" />
        <span class="font-semibold text-2xl text-primary">MedCert</span>
      </span>
      <Button type="button" @click="onClose" icon="pi pi-times" rounded outlined class="h-2rem w-2rem" />
    </div>

    <!-- Menu -->
    <div class="p-4 flex flex-column gap-3">
      <Button label="Protection" icon="pi pi-shield" />
      <Button label="Verify" icon="pi pi-check-circle" />
      <Button label="History" icon="pi pi-clock" />
    </div>

    <!-- Footer -->
    <div class="mt-auto p-4 flex justify-content-between align-items-center border-top-1 surface-border">
      <span class="text-sm text-500">v0.1</span>
      <Button label="Logout" icon="pi pi-sign-out" severity="danger" text />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
defineProps({
  onClose: Function
})
</script>
