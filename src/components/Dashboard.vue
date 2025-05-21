<!-- src/pages/Dashboard.vue -->
<template>
  <div class="p-4">

    <!-- ===== Заголовок ===== -->
    <h1 class="text-3xl font-bold mb-4">Dashboard</h1>

    <!-- ===== Info-Cards ===== -->
    <div class="grid mb-4">
      <div v-for="card in statCards" :key="card.label" class="col-12 md:col-3">
        <Card class="h-full">
          <template #content>
            <div class="flex align-items-center gap-3">
              <span :class="card.iconBg" class="p-3 border-round text-0 text-xl">
                <i :class="card.icon" />
              </span>
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
    <div class="grid">
      <!-- Certificates per Day -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Certificates Generated (Last 7 days)</template>
          <template #content>
            <Chart type="bar" :data="chartData" :options="chartOptions" style="width:100%" />
          </template>
        </Card>
      </div>

      <!-- Recent Certificates -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Recent Certificates</template>
          <template #content>
            <ul class="list-none m-0 p-0">
              <li v-for="c in recent" :key="c.id"
                  class="flex justify-content-between align-items-center py-3 border-bottom-1 surface-border">
                <div>
                  <i class="pi pi-user mr-2 text-600"></i>
                  <span class="font-medium text-900">{{ c.patient }}</span><br>
                  <span class="text-600 text-sm">{{ c.type }} • {{ c.date }}</span>
                </div>
                <Tag :value="c.status"
                     :severity="statusColor[c.status]" rounded />
              </li>
            </ul>
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

/* ===== Верхні картки ===== */
const statCards = [
  {
    label : 'Certificates Created',
    value : '24',
    icon  : 'pi pi-file',
    iconBg: 'bg-blue-500'
  },
  {
    label : 'Drafts Pending',
    value : '3',
    icon  : 'pi pi-clock',
    iconBg: 'bg-orange-400'
  },
  {
    label : 'Minted on Chain',
    value : '18',
    icon  : 'pi pi-lock',
    iconBg: 'bg-green-500'
  },
  {
    label : 'Verification Success',
    value : '97 %',
    icon  : 'pi pi-check-circle',
    iconBg: 'bg-purple-500'
  }
]

/* ===== Chart.js: Certs за тиждень ===== */
const chartData = {
  labels   : ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
  datasets : [
    {
      label           : 'Certificates',
      backgroundColor : '#42A5F5',
      data            : [4, 2, 5, 3, 6, 2, 2]
    }
  ]
}
const chartOptions = {
  plugins: { legend: { display:false }},
  scales : {
    y: { beginAtZero:true, ticks:{ stepSize:1 }}
  }
}

/* ===== Останні сертифікати ===== */
const recent = [
  { id:1, patient:'Іван Петров',      type:'Medical Certificate', date:'2025-05-21', status:'Minted'   },
  { id:2, patient:'Олена Коваль',     type:'Vaccination Proof',   date:'2025-05-20', status:'Paid'     },
  { id:3, patient:'Павло Романюк',    type:'Work Clearance',      date:'2025-05-19', status:'Draft'    },
  { id:4, patient:'Марія Дудник',     type:'School Clearance',    date:'2025-05-18', status:'Revoked'  }
]

/* колір тегів */
const statusColor = {
  Minted : 'success',
  Paid   : 'info',
  Draft  : 'warning',
  Revoked: 'danger'
}
</script>

<style scoped>
/* Квадратні іконки у картках */
.bg-blue-500, .bg-orange-400, .bg-green-500, .bg-purple-500 {
  border-radius: .5rem;
  display:flex; align-items:center; justify-content:center;
  width:3rem; height:3rem; font-size:1.5rem
}
</style>
