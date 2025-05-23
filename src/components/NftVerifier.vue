<template>
  <div class="verifier-container">
    <h2 class="title">Verify Medical NFT Certificate</h2>

    <form @submit.prevent="verify">
      <label for="hash">Enter Certificate Hash / ID</label>
      <input
          v-model="hash"
          type="text"
          id="hash"
          placeholder="Paste NFT hash or certificate ID"
          required
      />

      <button type="submit">Verify</button>
    </form>

    <div v-if="loading">Verifying...</div>

    <div v-if="result" class="result">
      <p><strong>Status:</strong> {{ result.valid ? '✅ Valid' : '❌ Invalid' }}</p>
      <p><strong>Issued By:</strong> {{ result.issuer }}</p>
      <p><strong>Issued To:</strong> {{ result.patient }}</p>
      <p><strong>Date:</strong> {{ result.date }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const hash = ref('')
const result = ref(null)
const loading = ref(false)

async function verify() {
  loading.value = true
  result.value = null

  try {
    // Тут може бути виклик до твого API або Solana Explorer API
    const response = await fetch(`/api/nft/verify?hash=${encodeURIComponent(hash.value)}`)
    const data = await response.json()
    result.value = data
  } catch (e) {
    result.value = { valid: false, issuer: '-', patient: '-', date: '-' }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.verifier-container {
  max-width: 500px;
  margin: auto;
  padding: 2rem;
  background: #1e2a45;
  border-radius: 10px;
  color: #e2f0ff;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin: 0.8rem 0;
  border: none;
  border-radius: 6px;
}

button {
  background-color: #4389f8;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.result {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: #2b395b;
  border-radius: 6px;
}
</style>
