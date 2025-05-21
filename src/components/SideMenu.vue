<template>
  <!-- Фіксований лівий бар -->
  <div class="side-menu flex flex-column surface-card shadow-2">
    <!-- ===== Header ===== -->
    <div class="flex align-items-center gap-2 p-4 pb-3 border-bottom-1 surface-border">
      <img src="@/assets/logo.svg" alt="logo" width="32" height="32" />
      <span class="font-semibold text-xl text-primary">Your Logo</span>
    </div>

    <!-- ===== Scrollable body ===== -->
    <div class="overflow-y-auto flex-1">

      <!-- === GROUP “FAVORITES” === -->
      <ul class="list-none p-3 m-0">
        <li>
          <div  v-ripple
                v-styleclass="accordion"
                class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple">
            <span class="font-medium">FAVORITES</span>
            <i class="pi pi-chevron-down" />
          </div>

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

      <!-- === GROUP “APPLICATION” === -->
      <ul class="list-none p-3 m-0">
        <li>
          <div  v-ripple
                v-styleclass="accordion"
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
    <div class="border-top-1 surface-border p-3">
      <a  v-ripple
          class="flex align-items-center gap-2 cursor-pointer p-3 border-round
                 text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple">
        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold">Amy Elsner</span>
      </a>
    </div>
  </div>
</template>

<script setup>
import Avatar from 'primevue/avatar'

/* директива styleclass потребує об’єкт – оголошуємо один раз */
const accordion = {
  selector: '@next',
  enterClass: 'hidden',
  enterActiveClass: 'slidedown',
  leaveToClass: 'hidden',
  leaveActiveClass: 'slideup'
}

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

<style scoped>
.side-menu{
  width:260px;
  position:fixed;
  top:0;
  left:0;
  height:100vh;               /* «пришпилено» на всю висоту */
  display:flex;
  flex-direction:column;
}
</style>
