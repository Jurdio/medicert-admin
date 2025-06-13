<template>
  <div class="login-container">
    <Card class="login-card">
      <template #title>
        <div class="logo-wrapper">
          <img src="@/assets/logo.svg" alt="App Logo" class="logo-large" />
        </div>
      </template>

      <template #content>
        <div v-if="phantomDetected" class="phantom-detected">
          <i class="pi pi-wallet pulse-icon" />
          <p class="phantom-text">Phantom wallet detected</p>
        </div>
        <div v-else>
          <p class="phantom-text not-found">Phantom wallet not found</p>
        </div>

        <Button
            label="Connect wallet"
            class="connect-button"
            :disabled="!phantomDetected"
            @click="loginWithPhantom"
        />

        <p v-if="error" class="error-text">{{ error }}</p>
      </template>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Button from 'primevue/button'
import Card from 'primevue/card'

const phantomDetected = ref(false)
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
  width: 120px;
  height: auto;
  margin: 32px 0 16px 0;
}

.phantom-detected {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
}
.pulse-icon {
  font-size: 2rem;
  color: #1976d2;
  animation: pulse 1.2s infinite;
}
.phantom-text {
  font-weight: 500;
  color: #1976d2;
  margin-top: 0.5rem;
}
.not-found {
  color: #999;
  margin-bottom: 1rem;
}

.connect-button {
  width: 100%;
  padding: 1rem;
  font-weight: bold;
  font-size: 1rem;
  background-color: #1976d2;
  border: none;
}

.connect-button:disabled {
  background-color: #b0bec5;
  cursor: not-allowed;
}

.error-text {
  color: red;
  margin-top: 1rem;
  font-size: 0.9rem;
}

@keyframes pulse {
  0% {
    opacity: 0.3;
    transform: scale(0.95);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.3;
    transform: scale(0.95);
  }
}
</style>
