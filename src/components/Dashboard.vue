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
      <!-- Workout Progress -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Workout Progress</template>
          <template #content>
            <Chart type="bar" :data="chartData" :options="chartOptions" style="width:100%" />
          </template>
        </Card>
      </div>

      <!-- Recent Workouts -->
      <div class="col-12 md:col-6">
        <Card>
          <template #title>Recent Workouts</template>
          <template #content>
            <ul class="list-none m-0 p-0">
              <li v-for="w in recent" :key="w.name" class="flex justify-content-between align-items-center py-3 border-bottom-1 surface-border">
                <div>
                  <i class="pi pi-calendar mr-2 text-600"></i>
                  <span class="font-medium text-900">{{ w.name }}</span><br>
                  <span class="text-600 text-sm">{{ w.date }}</span>
                </div>
                <Tag :value="w.duration" severity="success" rounded />
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

/* ===== Статистика у верхніх картках ===== */
const statCards = [
  { label: 'Workouts',            value: '12',     icon: 'pi pi-heart',         iconBg: 'bg-primary'  },
  { label: 'Calories Burned',     value: '3,500',  icon: 'pi pi-fire',          iconBg: 'bg-red-500'  },
  { label: 'Total Time',          value: '8h 30m', icon: 'pi pi-clock',         iconBg: 'bg-green-500'},
  { label: 'Progress',            value: '15 %',   icon: 'pi pi-chart-line-up', iconBg: 'bg-purple-500'}
]

/* ===== Chart.js Bar Chart ===== */
const chartData = {
  labels: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
  datasets: [
    {
      label: 'Workout Duration (minutes)',
      backgroundColor: '#42A5F5',
      data: [90, 30, 45, 75, 25, 80, 70]
    }
  ]
}
const chartOptions = {
  plugins: { legend: { display: false } },
  scales : { y: { ticks: { stepSize: 25 } } }
}

/* ===== Список останніх тренувань ===== */
const recent = [
  { name: 'Full Body Workout',     date: '2023-06-01', duration: '45 min' },
  { name: 'Upper Body Strength',   date: '2023-05-30', duration: '60 min' },
  { name: 'HIIT Cardio',           date: '2023-05-28', duration: '30 min' },
  { name: 'Leg Day',               date: '2023-05-26', duration: '50 min' }
]
</script>

<style scoped>
/* Квадратні іконки в інфо-картах */
.bg-primary, .bg-red-500, .bg-green-500, .bg-purple-500 {
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  font-size: 1.5rem;
}
</style>
