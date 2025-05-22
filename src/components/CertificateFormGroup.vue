<template>
  <div class="p-4" style="height: 100vh; overflow-y: auto;">
    <div class="grid formgrid">
      <!-- 🔐 Картка з формою -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>
            Protect Certificate
          </template>
          <template #content>
            <CertificateForm />
          </template>
        </Card>
      </div>

      <!-- 📋 Картка з таблицею -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>
            Recent Certificates
          </template>
          <template #content>
            <TransactionsTable />
          </template>
        </Card>
      </div>
    </div>
  </div>
</template>

<script setup>
import CertificateForm from '@/components/CertificateForm.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'
import Card from 'primevue/card'
</script>
