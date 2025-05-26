<template>
  <div class="p-4" style="height:100vh;overflow-y:auto;">
    <div class="grid formgrid">
      <!-- 🔐 Картка з формою -->
      <div class="col-12 md:col-6">
        <Card :class="{ 'blur-bg': showSuccess }" style="position:relative;">
          <template #title>Protect Certificate</template>

          <template #content>
            <CertificateForm @success="showSuccess = true" />

            <!-- Overlay -->
            <transition name="fade-scale">
              <div
                  v-if="showSuccess"
                  class="overlay flex flex-column align-items-center gap-3"
              >
                <i class="pi pi-check-circle" style="font-size:3rem"></i>
                <p class="m-0 text-center">Усе пройшло успішно!</p>
                <Button
                    label="Згенерувати ще один"
                    icon="pi pi-refresh"
                    @click="resetFlow"
                    class="p-button-sm w-full"
                />
              </div>
            </transition>
          </template>
        </Card>
      </div>

      <!-- 📋 Таблиця -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Recent Certificates</template>
          <template #content><TransactionsTable /></template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Card              from 'primevue/card'
import Button            from 'primevue/button'
import CertificateForm   from '@/components/CertificateForm.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'

const showSuccess = ref(false)
function resetFlow () { showSuccess.value = false }
</script>

<style scoped>


.overlay {
  position: absolute;
  inset: 0;
  padding: 1.5rem;
  background: rgba(255,255,255,.6);
  backdrop-filter: blur(6px);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0,0,0,.1);
  justify-content: center;
  text-align: center;
}
</style>
