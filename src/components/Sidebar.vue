<template>
  <v-navigation-drawer app permanent color="#f0f4ff" width="300">
    <v-list dense>
      <v-list-item class="logo-item">
        <v-list-item-avatar size="72">
          <v-img src="./src/assets/logo.svg" alt="Doctor Avatar" />
        </v-list-item-avatar>
      </v-list-item>

      <v-list-item link><v-list-item-title>Dashboard</v-list-item-title></v-list-item>
      <v-list-item link><v-list-item-title>Patients</v-list-item-title></v-list-item>
      <v-list-item link><v-list-item-title>History</v-list-item-title></v-list-item>
      <v-list-item link><v-list-item-title>Settings</v-list-item-title></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>


<style scoped>
.v-navigation-drawer {
  background: linear-gradient(180deg, #fbeaea 0%, #FFF5F5 100%);
  box-shadow: inset -4px 0 6px -4px rgba(0, 0, 0, 0.5);
  border-right: none !important; /* прибирає бордер */
}
.logo-item{
  margin-bottom: 50px;
}
</style>
