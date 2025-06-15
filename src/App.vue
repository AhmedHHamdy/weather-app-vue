<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import { ref } from 'vue'
import Logo from '@/components/Logo.vue'
import { useAuthStore } from './stores/auth.store'
import { Button } from 'primevue'

const authStore = useAuthStore()

const items = ref([
  {
    label: 'Dashboard',
    icon: 'pi pi-home',
    path: '/dashboard',
    authRequired: true
  },
  {
    label: 'Login',
    icon: 'pi pi-sign-in',
    path: '/',
    authRequired: false
  },
  {
    label: 'Signup',
    icon: 'pi pi-user-plus',
    path: '/signup',
    authRequired: false
  },
])
</script>

<template>
  <section class="h-screen flex flex-col">
    <Menubar :model="items">
      <template #start>
        <Logo />
      </template>
      <template #item="{ item }">
      <RouterLink v-if="(authStore.isAuthenticated && item.authRequired) || (!authStore.isAuthenticated && !item.authRequired)" :to="item.path" v-ripple class="flex items-center gap-2 p-2">
          <span :class="item.icon"></span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </template>
      <template #end>
        <div class="flex items-center gap-2">
          <!-- <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" /> -->
           <h3>{{ authStore.user?.name }}</h3>
          <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
          <Button v-if="authStore.isAuthenticated" @click="authStore.logout">Logout</Button>
        </div>
      </template>
    </Menubar>

    <section class="flex-grow">
      <RouterView />
    </section>
  </section>
</template>
