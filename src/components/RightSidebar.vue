<template>
  <aside class="right-sidebar" v-if="activeSection">
    <div class="section-title">{{ activeSection.label }}</div>
    <div class="nav-buttons">
      <div
          v-for="btn in activeSection.buttons"
          :key="btn.label"
          class="nav-btn"
          :class="{ active: route.path === btn.route }"
          @click="() => handleClick(btn)"
      >
        <i :class="btn.icon"></i>
        <span>{{ btn.label }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, defineProps } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const props = defineProps({
  sections: Object,
  selectedKey: String,
  activeButton: String,
  selectButton: Function
})

const activeSection = computed(() => props.sections[props.selectedKey])

function handleClick(btn) {
  props.selectButton(btn.label)
  if (btn.route && route.path !== btn.route) {
    router.push(btn.route)
  }
}
</script>

<style scoped>
.right-sidebar {
  width: 260px;
  background: linear-gradient(145deg, #16203c, #22335a);
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1.5rem 1rem 0 1rem;
  color: #e2f0ff;
  box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.1);
}

.section-title {
  font-weight: bold;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.nav-btn {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.nav-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-btn.active {
  background-color: #4389f8;
  color: #ffffff;
}
</style>
