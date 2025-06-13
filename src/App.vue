<template>
  <Toast />
  <div v-if="!isLoggedIn">
    <LoginWithPhantom @logged-in="handleLoginSuccess" />
  </div>
  <div v-else>
    <SidebarLayout>
      <router-view />
    </SidebarLayout>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SidebarLayout from "@/components/SidebarLayout.vue"
import LoginWithPhantom from "@/components/LoginWithPhantom.vue"

const isLoggedIn = ref(false)

onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('wallet_address')
})

function handleLoginSuccess(address) {
  localStorage.setItem('wallet_address', address)
  isLoggedIn.value = true
}
</script>
