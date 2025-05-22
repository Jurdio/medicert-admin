<template>
  <Toast />

  <!-- Фіксований сайдбар (нічого не міняємо) -->
  <div>
    <Button icon="pi pi-bars" @click="openSidebar" label="Menu" />
    <SideMenu ref="sidebarRef" />
  </div>

<!--  &lt;!&ndash; Контент — відсуваємо на ширину бару &ndash;&gt;-->
<!--  <div class="p-4" style="margin-left:260px">-->
<!--    <router-view />-->
<!--  </div>-->
</template>

<script setup>
import SideMenu from '@/components/SideMenu.vue'
import {ref} from 'vue'

const sidebarRef = ref()

const openSidebar = () => {
  sidebarRef.value.open()
}
</script>
