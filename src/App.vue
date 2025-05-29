<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import Avatar from 'primevue/avatar';
import { ref } from "vue";
import Logo from "@/components/Logo.vue"

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    path: "/"
  },
  {
    label: 'Login',
    icon: 'pi pi-sign-in',
    path: "/login"
  },
  {
    label: 'Signup',
    icon: 'pi pi-user-plus',
    path: "/signup"
  }
]);
</script>

<template>  
  <section class="h-screen flex flex-col">
    <Menubar :model="items">
      <template #start>
        <Logo />
      </template>
      <template #item="{ item }">
          <RouterLink :to="item.path" v-ripple class="flex items-center gap-2 p-2">
              <span :class="item.icon"></span>
              <span>{{ item.label }}</span>
          </RouterLink>
      </template>
      <template #end>
          <div class="flex items-center gap-2">
              <InputText placeholder="Search" type="text" class="w-32 sm:w-auto" />
              <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" />
          </div>
      </template>
    </Menubar>

    <section class="flex-grow">
      <RouterView />
    </section>
  </section>



</template>
