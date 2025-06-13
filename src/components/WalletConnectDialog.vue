<template>
  <Dialog
      v-model:visible="showDialog"
      modal
      :closable="false"
      :style="{ width: '440px', borderRadius: '16px' }"
      class="wallet-dialog"
      :pt="{
    root: { class: 'border-none shadow-md bg-white rounded-lg' },
    content: { class: 'p-5' },
    header: { class: 'hidden' }
  }"
  >
    <div class="wallet-clean-modal">
      <div class="wallet-option-clean" @click="loginWithPhantom">
        <div class="wallet-left">
          <img src="/img/phantom-removebg-preview.png" alt="Phantom" class="phantom-icon" />
          <span class="wallet-name">Phantom</span>
        </div>
        <span class="wallet-status">Detected</span>
      </div>

      <div class="wallet-more">
        More options
        <i class="pi pi-chevron-down ml-1" />
      </div>

      <p v-if="error" class="error-text">{{ error }}</p>
    </div>
  </Dialog>


</template>

<script setup>
import { ref } from 'vue'
import Dialog from 'primevue/dialog'

const visible = defineModel('visible', { type: Boolean, required: true })

const emit = defineEmits(['connect'])

function onConnect() {
  emit('connect')
}
</script>

<style scoped>
.wallet-clean-modal {
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
}

.wallet-option-clean {
  background: linear-gradient(90deg, #111217, #1c1e24);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 20px;
  border-radius: 16px;
  width: 100%;
  cursor: pointer;
  transition: background 0.2s;
}

.wallet-option-clean:hover {
  background-color: #23262c;
}

.wallet-left {
  display: flex;
  align-items: center;
}

.phantom-icon {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}

.wallet-name {
  font-weight: 500;
  font-size: 1rem;
}

.wallet-status {
  color: #aaa;
  font-size: 0.9rem;
}

.wallet-more {
  font-size: 0.9rem;
  color: #aaa;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.error-text {
  color: #ff6b6b;
  font-size: 0.85rem;
  text-align: center;
}

</style>
