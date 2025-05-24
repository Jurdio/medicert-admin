<template>
  <aside class="left-sidebar">
    <div class="top-section">
      <div
          class="icon-wrapper"
          v-for="item in items"
          :key="item.key"
          @click="() => select(item.key)"
          :class="{ active: selected === item.key }"
      >
        <i :class="item.icon"></i>
      </div>
    </div>

    <div class="bottom-section">
      <Avatar
          image="src/assets/doctor.png"
          shape="circle"
          class="user-avatar"
          @click="toggleMenu"
      />

      <Menu ref="menu" :model="menuItems" popup />
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import Avatar from 'primevue/avatar'
import Menu from 'primevue/menu'

const props = defineProps({
  items: Array,
  selected: String,
  select: Function
})

const menu = ref()

const menuItems = [
  {
    label: 'Logout',
    icon: 'pi pi-sign-out',
    command: () => {
      console.log('Logging out...')
      // Тут можеш викликати logout або router.push('/login')
    }
  }
]

const toggleMenu = (event) => {
  menu.value.toggle(event)
}
</script>

<style scoped>
.left-sidebar {
  width: 64px;
  background-color: #0f1c3f;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.top-section {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-wrapper {
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;
  color: #ffffff;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.icon-wrapper.active {
  background-color: #4389f8;
  color: #ffffff;
}

.icon-wrapper:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.bottom-section {
  margin-bottom: 1rem;
  position: relative;
}

.user-avatar {
  width: 40px;
  height: 40px;
  cursor: pointer;
  border: 2px solid #4389f8;
}
</style>
