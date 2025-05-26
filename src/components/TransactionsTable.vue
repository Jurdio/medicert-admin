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
  { patient: 'John Peterson',    type: 'Medical', date: '2025-05-24', status: 'Minted' },
  { patient: 'Emily Carter',     type: 'Vaccine', date: '2025-05-23', status: 'Paid' },
  { patient: 'Liam Thompson',    type: 'Travel',  date: '2025-05-22', status: 'Revoked' },
  { patient: 'Sophia Reynolds',  type: 'Work',    date: '2025-05-21', status: 'Draft' },
  { patient: 'Mason Lee',        type: 'School',  date: '2025-05-20', status: 'Minted' },
  { patient: 'Ava Mitchell',     type: 'Medical', date: '2025-05-19', status: 'Paid' },
  { patient: 'Noah Scott',       type: 'Vaccine', date: '2025-05-18', status: 'Draft' },
  { patient: 'Olivia Davis',     type: 'Travel',  date: '2025-05-17', status: 'Revoked' },
  { patient: 'Elijah Morgan',    type: 'Work',    date: '2025-05-16', status: 'Minted' }
];


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
