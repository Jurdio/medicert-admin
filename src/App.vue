<script setup>
import Sidebar from './components/Sidebar.vue';
</script>

<template class="main">
  <v-app class="background">
    <Sidebar />
    <v-main class="background">
      <router-view />
    </v-main>
  </v-app>
</template>

<style>
.background {
  background: linear-gradient(135deg, #fdfefe 80%, #B5FFFF 100%);
}
.main{
  padding-top: 20%;
}
</style>
