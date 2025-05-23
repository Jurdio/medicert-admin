<template>
  <div class="w-screen h-screen flex overflow-hidden m-0 p-0">
    <LeftSidebar
        :items="leftItems"
        :selected="selectedKey"
        :select="(key) => selectedKey = key"
    />
    <RightSidebar
        :sections="sections"
        :selectedKey="selectedKey"
        :activeButton="activeButton"
        :selectButton="(label) => activeButton = label"
    />
    <main class="flex-grow-1 p-0 m-0">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LeftSidebar from './LeftSidebar.vue'
import RightSidebar from './RightSidebar.vue'

const route = useRoute()

const selectedKey = ref('favorites')
const activeButton = ref('Protect') // значення за замовчуванням

const leftItems = [
  { key: 'favorites', icon: 'pi pi-home' },
  { key: 'bookmarks', icon: 'pi pi-bookmark' },
  { key: 'team', icon: 'pi pi-users' },
  { key: 'chat', icon: 'pi pi-comments' },
  { key: 'calendar', icon: 'pi pi-calendar' }
]

const sections = {
  favorites: {
    label: 'Favorites',
    buttons: [
      { label: 'Protect', icon: 'pi pi-lock', route: '/protection' },
      { label: 'Verify', icon: 'pi pi-eye', route: '/verify' },
      { label: 'History', icon: 'pi pi-history', route: '/history' }
    ]
  }
}
watch(
    () => route.path,
    (newPath) => {
      const currentSection = sections[selectedKey.value]
      const matchedBtn = currentSection?.buttons.find((b) => b.route === newPath)
      if (matchedBtn) {
        activeButton.value = matchedBtn.label
      }
    },
    { immediate: true }
)
</script>
