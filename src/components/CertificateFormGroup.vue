<template>
  <div class="p-4 flex flex-column gap-5" style="overflow-y: auto; max-height: 100vh;">

    <!-- 🔐 Основна форма в картці -->
    <Card>
      <template #title>
        Protect Certificate
      </template>
      <template #content>
        <CertificateForm />
      </template>
    </Card>

    <!-- ➕ Додаткова форма в картці -->
    <Card>
      <template #title>
        Second Action (e.g. Revoke / Preview)
      </template>
      <template #content>
        <TransactionsTable />
      </template>
    </Card>

  </div>
</template>

<script setup>
import CertificateForm from '@/components/CertificateForm.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'
import Card from 'primevue/card'
</script>
