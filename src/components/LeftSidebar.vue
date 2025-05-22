<template>
  <aside class="left-sidebar">
    <div class="icon-wrapper" v-for="item in items" :key="item.key" @click="() => select(item.key)" :class="{ active: selected === item.key }">
      <i :class="item.icon"></i>
    </div>
  </aside>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  items: Array,
  selected: String,
  select: Function
})
</script>

<style scoped>
.left-sidebar {
  width: 64px;
  background-color: #0f1c3f;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
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

</style>
