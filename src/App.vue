<template>
  <div class="card flex justify-content-start">
    <!-- Ґамбургер відкриває сайдбар -->
    <Button icon="pi pi-bars" @click="visible = true" rounded outlined />

    <!-- Sidebar -->
    <Sidebar v-model:visible="visible" position="left">
      <template #container="{ closeCallback }">
        <div class="flex flex-column h-full">

          <!-- ===== Header ===== -->
          <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
            <span class="inline-flex align-items-center gap-2">
              <!-- заміни svg-логотипом чи <img> -->
              <svg width="35" height="40" viewBox="0 0 35 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.87 18.05L23.16 17.45L25.27 20.46V29.78L32.49 23.76V13.53L29.18 14.73L25.87 18.04V18.05Z"
                      :fill="primary" />
                <path d="M30.69 4.21L24.37 4.81L22.57 0.69L22.86 0H26.48L30.69 4.21Z"
                      :fill="text" />
              </svg>
              <span class="font-semibold text-2xl text-primary">Your Logo</span>
            </span>
            <Button type="button"
                    icon="pi pi-times"
                    rounded outlined
                    class="h-2rem w-2rem"
                    @click="closeCallback" />
          </div>

          <!-- ===== Scrollable body ===== -->
          <div class="overflow-y-auto">
            <!-- === GROUP «FAVORITES» === -->
            <ul class="list-none p-3 m-0">
              <li>
                <div  v-ripple
                      v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown',
                                       leaveToClass: 'hidden', leaveActiveClass: 'slideup' }"
                      class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
                  <span class="font-medium">FAVORITES</span>
                  <i class="pi pi-chevron-down" />
                </div>

                <!-- підменю -->
                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li v-for="item in favItems" :key="item.label">
                    <a v-ripple
                       class="flex align-items-center cursor-pointer p-3 border-round
                              text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                      <i :class="item.icon + ' mr-2'" />
                      <span class="font-medium">{{ item.label }}</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>

            <!-- === GROUP «APPLICATION» === -->
            <ul class="list-none p-3 m-0">
              <li>
                <div  v-ripple
                      v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'slidedown',
                                       leaveToClass: 'hidden', leaveActiveClass: 'slideup' }"
                      class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
                  <span class="font-medium">APPLICATION</span>
                  <i class="pi pi-chevron-down" />
                </div>

                <ul class="list-none p-0 m-0 overflow-hidden">
                  <li v-for="item in appItems" :key="item.label">
                    <a v-ripple
                       class="flex align-items-center cursor-pointer p-3 border-round
                              text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
                      <i :class="item.icon + ' mr-2'" />
                      <span class="font-medium">{{ item.label }}</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <!-- ===== Footer ===== -->
          <div class="mt-auto">
            <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
            <a  v-ripple
                class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round
                       text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
              <span class="font-bold">Amy Elsner</span>
            </a>
          </div>

        </div>
      </template>
    </Sidebar>
  </div>
</template>

<script setup>
import { ref }  from 'vue'
import Sidebar  from 'primevue/sidebar'
import Button   from 'primevue/button'
import Avatar   from 'primevue/avatar'

const visible = ref(false)

/* дані для прикладу */
const favItems = [
  { label: 'Dashboard',  icon: 'pi pi-home'       },
  { label: 'Bookmarks',  icon: 'pi pi-bookmark'   },
  { label: 'Reports',    icon: 'pi pi-chart-line' },
  { label: 'Team',       icon: 'pi pi-users'      },
  { label: 'Messages',   icon: 'pi pi-comments'   },
  { label: 'Calendar',   icon: 'pi pi-calendar'   },
  { label: 'Settings',   icon: 'pi pi-cog'        }
]
const appItems = [
  { label: 'Projects',    icon: 'pi pi-folder'   },
  { label: 'Performance', icon: 'pi pi-chart-bar'}
]
</script>
