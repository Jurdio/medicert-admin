<template>
   <div class="flex flex-column gap-3">
      <div
          v-for="cert in displayedCertificates"
          :key="cert.id"
          class="flex justify-content-between align-items-center border-bottom-1 pb-2"
      >
        <!-- Left info -->
        <div class="flex align-items-start gap-2">
          <i class="pi pi-calendar text-primary" style="font-size: 1.2rem" />
          <div>
            <div class="font-medium text-md">{{ cert.patient }}</div>
            <div class="text-sm text-500">{{ cert.type }} · {{ cert.date }}</div>
          </div>
        </div>

        <!-- Status tag -->
        <Tag
            :value="cert.status"
            :severity="getTagSeverity(cert.status)"
            class="text-sm"
        />
      </div>
    </div>

    <!-- View more button -->
    <div class="mt-3" v-if="certificates.length > 8">
      <Button label="View more" class="p-button-outlined w-full" />
    </div>
</template>

<script setup>
import Card from 'primevue/card'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { computed } from 'vue'

const certificates = [
  { patient: 'Іван Петров', type: 'Medical', date: '2025-05-21', status: 'Minted' },
  { patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid' },
  { patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid'},
  {patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid'},
  {patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid'},
  {patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid'},
  {patient: 'Олена Коваль', type: 'Vaccine', date: '2025-05-20', status: 'Paid'},
  {patient: 'Павло Романюк', type: 'Work', date: '2025-05-19', status: 'Draft'},
  {patient: 'Ірина Яремчук', type: 'Medical', date: '2025-05-18', status: 'Minted'}
]

const displayedCertificates = computed(() =>
    certificates.slice(0, 8)
)

function getTagSeverity(status) {
  switch (status) {
    case 'Minted':
      return 'success'
    case 'Paid':
      return 'info'
    case 'Draft':
      return 'warning'
    default:
      return 'secondary'
  }
}
</script>
