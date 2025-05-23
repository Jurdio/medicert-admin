<template>
  <div class="verify-wrapper">
    <div class="card">
      <h2 class="title">🔍 Verify Medical NFT Certificate</h2>

      <form @submit.prevent="verify">
        <label for="hash">Certificate Hash / ID</label>
        <input
            v-model="hash"
            id="hash"
            type="text"
            placeholder="Enter or paste certificate hash"
            required
        />
        <button :disabled="loading" class="verify-btn">
          {{ loading ? 'Verifying...' : 'Verify' }}
        </button>
      </form>

      <div v-if="result" class="result-box">
        <div :class="['status', result.valid ? 'valid' : 'invalid']">
          <span>Status:</span>
          <strong>{{ result.valid ? '✅ Valid' : '❌ Invalid' }}</strong>
        </div>
        <div class="info-line">
          <span>👨‍⚕️ Issued By:</span> <strong>{{ result.issuer || '-' }}</strong>
        </div>
        <div class="info-line">
          <span>🧑‍💼 Issued To:</span> <strong>{{ result.patient || '-' }}</strong>
        </div>
        <div class="info-line">
          <span>📅 Date:</span> <strong>{{ result.date || '-' }}</strong>
        </div>
      </div>
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
    const response = await fetch(`/api/nft/verify?hash=${encodeURIComponent(hash.value)}`)
    const data = await response.json()
    result.value = data
  } catch (e) {
    result.value = {
      valid: false,
      issuer: '-',
      patient: '-',
      date: '-'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.verify-wrapper {
  max-width: 600px;
  margin: 2rem auto;
  padding: 1rem;
}

.card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
  color: #1e293b;
  border: 1px solid #e2e8f0;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #111827;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

input {
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;
  background: #f9fafb;
  color: #1e293b;
}

input::placeholder {
  color: #94a3b8;
}

.verify-btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.verify-btn:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.result-box {
  background-color: #f1f5f9;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid #e2e8f0;
}

.status {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.status.valid {
  color: #16a34a;
}

.status.invalid {
  color: #dc2626;
}

.info-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.95rem;
}
</style>
