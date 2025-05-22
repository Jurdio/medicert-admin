<template>
   <DataTable
        :value="certificates"
        paginator
        :rows="5"
        tableStyle="min-width: 100%"
    >
      <Column field="id" header="ID" />

      <Column header="Patient">
        <template #body="{ data }">
          <div class="flex align-items-center gap-2">
            <Avatar
                :label="getInitials(data.patient)"
                shape="circle"
                style="background: #e0e0ff; color: #3f3f9f"
            />
            <span>{{ data.patient }}</span>
          </div>
        </template>
      </Column>

      <Column field="type" header="Type" />

      <Column field="date" header="Issued" />

      <Column field="status" header="Status">
        <template #body="{ data }">
          <Tag
              :value="data.status"
              :severity="data.status === 'Minted' ? 'success' : 'info'"
          />
        </template>
      </Column>

      <Column field="hash" header="Hash">
        <template #body="{ data }">
          <span class="text-sm text-gray-700">{{ data.hash.slice(0, 10) + '...' }}</span>
        </template>
      </Column>
    </DataTable>
</template>

<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Tag from 'primevue/tag'
import Avatar from 'primevue/avatar'
import Card from 'primevue/card'

const certificates = [
  {
    id: '#1001',
    patient: 'Anna Fali',
    type: 'Medical Certificate',
    date: 'May 14th',
    status: 'Minted',
    hash: 'bafkreigh2akiscaildc6u64lxmpwhzjqxku2wjxyhb2jkafgnl2kp3jlbe'
  },
  {
    id: '#1002',
    patient: 'Stepen Shaw',
    type: 'Vaccination Proof',
    date: 'May 15th',
    status: 'Pending',
    hash: 'bafkreicjd2a32lfkjwlkejx9xwpzua4djcoaa3sycgfwc37l5xmkckfq7m'
  },
  {
    id: '#1003',
    patient: 'Amy Yelsner',
    type: 'Workplace Clearance',
    date: 'May 16th',
    status: 'Minted',
    hash: 'bafkreihsbdkq283ndskfja289djssjd93msndkl23k3jkl923j4jkdfk'
  },
  {
    id: '#1004',
    patient: 'Lisa Andrews',
    type: 'School Clearance',
    date: 'May 17th',
    status: 'Pending',
    hash: 'bafkreiwu2vndke893jdnakslqwe89dl234lkasd9qwe98q9dkqweod'
  },
  {
    id: '#1005',
    patient: 'John Smith',
    type: 'Medical Certificate',
    date: 'May 18th',
    status: 'Minted',
    hash: 'bafkreigjqpwoeiruqpowruqo2n3n4kn2n34k23jn4k23jk4n23jk4n2'
  }
]

function getInitials(name) {
  return name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
}
</script>
