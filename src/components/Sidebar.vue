<template>
  <v-navigation-drawer app permanent color="#f0f4ff" width="300" class="custom-sidebar">
    <v-list dense>
      <v-list-item class="logo-item">
        <v-list-item-avatar size="72">
          <v-img src="./src/assets/logo.svg" alt="Doctor Avatar" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item v-for="item in menuItems" :key="item.title" link class="nav-btn">
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
const menuItems = [
  { title: 'Dashboard' },
  { title: 'Patients' },
  { title: 'History' },
  { title: 'Settings' },
];
</script>

<style scoped>
.custom-sidebar {
  background: linear-gradient(180deg, #fbeaea 0%, #FFF5F5 100%);
  box-shadow: inset -4px 0 6px -4px rgba(0, 0, 0, 0.25);
  border-right: none;
  font-family: 'Poppins', sans-serif;
}

.logo-item {
  margin-bottom: 50px;
  justify-content: center;
}

.nav-btn {
  transition: background-color 0.3s ease;
  border-radius: 12px;
  margin: 4px 8px;
  padding-left: 16px;
}

.nav-btn:hover {
  background-color: rgb(255, 180, 180);
}

.v-list-item-title {
  font-weight: 500;
  font-size: 15px;
  color: #333;
}
</style>
