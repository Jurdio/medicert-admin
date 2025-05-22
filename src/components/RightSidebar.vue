<template>
  <aside class="right-sidebar">
    <div class="section-title">{{ activeSection.label }}</div>
    <div class="nav-buttons">
      <div v-for="btn in activeSection.buttons" :key="btn.label" class="nav-btn" :class="{ active: activeButton === btn.label }" @click="() => selectButton(btn.label)">
        <i :class="btn.icon"></i>
        <span>{{ btn.label }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  sections: Object,
  selectedKey: String,
  activeButton: String,
  selectButton: Function
})

const activeSection = computed(() => props.sections[props.selectedKey])
</script>

<style scoped>
.right-sidebar {
  width: 220px;
  background-color: #00c389;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 0 1rem;
  color: #fff;
  box-shadow: none;
  border: none;
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

.nav-btn.active,
.nav-btn:hover {
  background-color: #01956c;
}
</style>
