<template>
  <div class="issued-history-wrapper">

    <DataTable
        :value="drafts"
        :paginator="true"
        :rows="limit"
        :first="(page - 1) * limit"
        :totalRecords="total"
        :lazy="true"
        :loading="loading"
        @page="onPageChange"
        dataKey="id"
        responsiveLayout="scroll"
    >
      <Column field="id" header="ID" />
      <Column field="phone" header="Phone" />
      <Column field="publicKey" header="Public Key" />
      <Column field="type" header="Type" />
      <Column field="status" header="Status">
        <template #body="{ data }">
          <span :class="['status-chip', data.status]">{{ data.status }}</span>
        </template>
      </Column>
      <Column field="paidAt" header="Paid At">
        <template #body="{ data }">
          {{ formatDate(data.paidAt) }}
        </template>
      </Column>
      <Column field="createdAt" header="Created At">
        <template #body="{ data }">
          {{ formatDate(data.createdAt) }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const drafts = ref([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const limit = ref(10)
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS

const fetchDrafts = async () => {
  loading.value = true
  try {
    const res = await axios.get(`${SERVER_ADDRESS}/v1/drafts`, {
      params: {
        page: page.value,
        limit: limit.value
      }
    })
    const { data, meta } = res.data
    drafts.value = data
    total.value = meta.total
  } catch (err) {
    console.error('Failed to fetch drafts', err)
  } finally {
    loading.value = false
  }
}

const onPageChange = (event) => {
  page.value = event.page + 1 // PrimeVue починає з 0
  limit.value = event.rows
  fetchDrafts()
}

onMounted(fetchDrafts)

const formatDate = (str) => {
  return str ? new Date(str).toLocaleString() : '-'
}
</script>

<style scoped>


.title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1.25rem;
  color: #1e293b;
}

.p-datatable {
  font-size: 0.9rem;
}

.p-datatable-thead > tr > th {
  padding: 0.75rem 0.5rem !important;
}

.p-datatable-tbody > tr > td {
  padding: 0.6rem 0.5rem !important;
}

.status-chip {
  padding: 0.15rem 0.5rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
  display: inline-block;
}

.status-chip.pending {
  background-color: #f59e0b;
}

.status-chip.paid {
  background-color: #10b981;
}

.status-chip.failed {
  background-color: #ef4444;
}

</style>
