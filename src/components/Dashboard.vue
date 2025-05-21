<template>
  <div class="p-4">

    <!-- ===== Заголовок ===== -->
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

    <!-- ===== Info-Cards ===== -->
    <div class="grid align-items-stretch mb-4">
      <div v-for="card in statCards" :key="card.label" class="col-12 md:col-3">
        <Card class="h-full">
          <template #content>
            <div class="flex align-items-center gap-3">
              <Tag :icon="card.icon"
                   :severity="card.severity"
                   rounded
                   class="flex align-items-center justify-content-center"
                   style="width:3.5rem;height:3.5rem;font-size:2rem" />
              <div>
                <p class="m-0 text-600">{{ card.label }}</p>
                <h2 class="m-0 text-900">{{ card.value }}</h2>
              </div>
            </div>
          </template>
        </Card>
      </div>
    </div>

    <!-- ===== Два нижніх блоки ===== -->
    <div class="grid align-items-stretch">
      <!-- Certificates per Day -->
      <div class="col-12 md:col-6">
        <Card class="h-full">
          <template #title>Certificates Generated (Last 7 days)</template>
          <template #content>
            <Chart type="bar" :data="chartData" :options="chartOptions" style="width:100%" />
          </template>
        </Card>
      </div>

      <!-- Recent Certificates -->
      <!-- === Recent Certificates (оновлено) === -->
      <div class="col-12 md:col-6">
        <Card class="h-full">
          <template #title>Recent Certificates</template>

          <template #content>
            <!-- Список -->
            <ul class="list-none m-0 p-0">
              <li v-for="c in displayList"
                  :key="c.id"
                  class="flex justify-content-between align-items-center py-3 border-bottom-1 surface-border">
                <div>
                  <i class="pi pi-calendar mr-2 text-600"></i>
                  <span class="font-medium text-900">{{ c.patient }}</span><br>
                  <span class="text-600 text-sm">{{ c.type }} • {{ c.date }}</span>
                </div>
                <Tag :value="c.status"
                     :severity="statusColor[c.status]"
                     rounded />
              </li>
            </ul>

            <!-- Кнопка View more -->
            <div v-if="recent.length > 5 && !showAll" class="pt-3">
              <Button label="View more"
                      outlined
                      class="w-full"
                      @click="showAll = true" />
            </div>
          </template>
        </Card>
      </div>
    </div>

  </div>
</template>

<script setup>
/* PrimeVue */
import Card  from 'primevue/card'
import Chart from 'primevue/chart'
import Tag   from 'primevue/tag'
import { ref, computed, h } from 'vue'
import Button from 'primevue/button'

/* ===== Верхні картки ===== */
const statCards = [
  { label:'Certificates', value:'24',  icon:'pi pi-file',   severity:'info'    },
  { label:'Drafts',       value:'3',   icon:'pi pi-clock',  severity:'warning' },
  { label:'Minted',       value:'18',  icon:'pi pi-lock',   severity:'success' },
  { label:'Verify OK',    value:'97 %',icon:'pi pi-check',  severity:'help'    }
]

/* ===== Chart.js ===== */
const chartData = {
  labels:['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  datasets:[{ label:'Certificates', backgroundColor:'#42A5F5', data:[4,2,5,3,6,2,2] }]
}
const chartOptions = { plugins:{ legend:{ display:false } }, scales:{ y:{ beginAtZero:true } } }

/* ===== Останні сертифікати ===== */
const recent = [
  { id:1, patient:'Іван Петров',    type:'Medical', date:'2025-05-21', status:'Minted'  },
  { id:2, patient:'Олена Коваль',   type:'Vaccine', date:'2025-05-20', status:'Paid'    },
  { id:3, patient:'Павло Романюк',  type:'Work',    date:'2025-05-19', status:'Draft'   },
  { id:4, patient:'Марія Дудник',   type:'School',  date:'2025-05-18', status:'Revoked' },
  { id:4, patient:'Марія Дудник',   type:'School',  date:'2025-05-18', status:'Revoked' },
  { id:4, patient:'Марія Дудник',   type:'School',  date:'2025-05-18', status:'Revoked' },
]

const showAll = ref(false)
const displayList = computed(() => showAll.value ? recent : recent.slice(0, 3))

/* колір Tag */
const statusColor = { Minted:'success', Paid:'info', Draft:'warning', Revoked:'danger' }


/* body-template для стовпця Status */
const statusTemplate = row =>
    h(Tag, { value: row.status, severity: statusColor[row.status], rounded: true })
</script>
