<template>
  <v-navigation-drawer app permanent color="#f0f4ff" width="300" class="custom-sidebar">
    <v-list dense class="fill-height d-flex flex-column justify-space-between">
      <!-- Верхня частина: лого + пункти меню -->
      <div>
        <v-list-item class="logo-item">
          <v-list-item-avatar size="72">
            <v-img src="./src/assets/logo.svg" alt="Doctor Avatar" />
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            link
            class="nav-btn"
            :to="item.route"
            :class="{ 'nav-btn--active': $route.path === item.route }"
            tag="router-link"
        >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>

      </div>

      <!-- Нижня частина: logout -->
      <div>
        <div class="version-container">
          <div class="version-label">v0.1</div>
        </div>
        <v-divider></v-divider>
        <v-list-item link class="nav-btn" @click="logout">
          <v-list-item-title class="d-flex align-center">
            <v-icon class="mr-2">mdi-logout</v-icon>
            Logout
          </v-list-item-title>
        </v-list-item>

      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import {ref} from "vue";

const menuItems = [
  { title: 'Protection', route: '/protection' },
  { title: 'Verify', route: '/verify' },
  { title: 'History', route: '/history' },
];


const selectedItem = ref('Protection');

function logout() {
  console.log('Logging out...');
  // логіка вилогінювання (очищення токена, редирект, тощо)
}
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

.nav-btn:hover,
.nav-btn--active{
  background-color: rgb(255, 180, 180);
}

.version-container {
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
}

.version-label {
  font-size: 12px;
  font-weight: 500;
  background-color: rgb(255, 180, 180);
  color: #ffffff;
  padding: 4px 12px;
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
}
</style>
