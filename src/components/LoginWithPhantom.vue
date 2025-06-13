<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>
        <div class="logo-wrapper">
          <img src="@/assets/logo.svg" alt="App Logo" class="logo-large" />
        </div>
      </template>

      <template #content>
        <Button
            label="Connect wallet"
            @click="showDialog = true"
            class="w-full connect-button"
            icon="pi pi-wallet"
        />

      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'

const phantomDetected = ref(false)
const showDialog = ref(false)
const error = ref('')

const emit = defineEmits(['logged-in'])

onMounted(() => {
  const provider = window?.solana
  if (provider?.isPhantom) {
    phantomDetected.value = true
  }
})

async function loginWithPhantom() {
  try {
    const provider = window.solana
    const resp = await provider.connect()
    const address = resp.publicKey.toString()

    const message = new TextEncoder().encode('Login to My App')
    const signedMessage = await provider.signMessage(message, 'utf8')

    emit('logged-in', address)
    showDialog.value = false
  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(145deg, #e3f2fd, #bbdefb);
}

.login-card {
  width: 400px;
  text-align: center;
  border: none;
  box-shadow: 0 8px 24px rgba(0, 123, 255, 0.15);
  border-radius: 16px;
  background: white;
}

.logo-wrapper {
  display: flex;
  justify-content: center;
}
.logo-large {
  width: 200px;
  height: auto;
  margin: 32px 0 16px 0;
}

.connect-button {
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  background-color: #1976d2;
  border: none;
}

.wallet-modal-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  color: white;
}

.wallet-title {
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.5;
  color: white;
}

.wallet-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #181b20;
  padding: 12px 16px;
  border-radius: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.wallet-option:hover {
  background-color: #20242b;
}

.wallet-icon {
  width: 32px;
  height: 32px;
}

.wallet-name {
  flex: 1;
  margin-left: 12px;
  font-weight: 500;
  font-size: 1rem;
}

.wallet-status {
  font-size: 0.9rem;
  color: #aaa;
}
.error-text {
  color: #ff6b6b;
  font-size: 0.85rem;
  text-align: center;
}
</style>
