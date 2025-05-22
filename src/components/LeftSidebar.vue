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
  background-color: #007857;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  box-shadow: none;
  border: none;
}

.icon-wrapper {
  padding: 1rem;
  cursor: pointer;
  border-radius: 8px;
  color: #fff;
  margin-bottom: 0.5rem;
  transition: background-color 0.2s;
}

.icon-wrapper:hover,
.icon-wrapper.active {
  background-color: #01a66e;
}
</style>
