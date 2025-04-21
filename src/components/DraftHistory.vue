<template>
  <div class="draft-history-wrapper">

    <div class="table-wrapper">
      <v-data-table
          :headers="headers"
          :items="drafts"
          :loading="loading"
          :page.sync="page"
          :items-per-page="limit"
          :server-items-length="total"
          :items-per-page-options="[10, 20, 50]"
          loading-text="Loading drafts..."
          density="comfortable"
          fixed-header
          class="flex-grow-1"
      >
        <template #item.paidAt="{ item }">
          <span>{{ formatDate(item.paidAt) }}</span>
        </template>
        <template #item.createdAt="{ item }">
          <span>{{ formatDate(item.createdAt) }}</span>
        </template>
      </v-data-table>
    </div>
  </div>
</template>



<script setup>
import { ref, onMounted, watch } from 'vue';
import axios from 'axios';

const drafts = ref([]);
const loading = ref(false);
const total = ref(0);
const page = ref(1);
const limit = ref(20);
const SERVER_ADDRESS = import.meta.env.VITE_SERVER_ADDRESS;

const headers = [
  { title: 'ID', value: 'id' },
  { title: 'Phone', value: 'phone' },
  { title: 'Public Key', value: 'publicKey' },
  { title: 'Type', value: 'type' },
  { title: 'Status', value: 'status' },
  { title: 'Paid At', value: 'paidAt' },
  { title: 'Created At', value: 'createdAt' },
];

const fetchDrafts = async () => {
  loading.value = true;
  try {
    const res = await axios.get(`${SERVER_ADDRESS}/v1/drafts`, {
      params: {
        page: page.value,
        limit: limit.value,
      }
    });
    drafts.value = res.data.data;
    total.value = res.data.meta.total;
  } catch (err) {
    console.error('Failed to fetch drafts', err);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchDrafts);
watch([page, limit], fetchDrafts);

const formatDate = (dateStr) => {
  return dateStr ? new Date(dateStr).toLocaleString() : '-';
};
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
}
.v-data-table {
  max-height: 100vh;
}
</style>
