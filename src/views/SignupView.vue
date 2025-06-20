<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import { useAuthStore } from '@/stores/auth.store';
import { Button, Divider, InputText } from 'primevue'
import router from '@/router';
import { reactive } from 'vue';

const auth = useAuthStore()

const state = reactive({
  email: "",
  name: "",
  password: ""
})

</script>

<template>
  <div class="h-full flex justify-center items-center">
    <section class="w-full md:w-8/12 lg:w-8/12 xl:w-4/12 flex flex-col justify-center items-center bg-[#18181B] p-10">
      <section class="flex items-center gap-2">
        <h1 class="text-start text-2xl text-green-300 uppercase font-bold">CloudWise</h1>
        <Logo />
      </section>

      <section class="flex flex-col items-center justify-center gap-3 py-5 w-full">
        <div class="flex flex-col gap-2 w-full">
          <label for="email">Email</label>
          <InputText id="email" type="text" v-model="state.email"/>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label for="name">name</label>
          <InputText id="name" type="text" class="w-full" v-model="state.name"/>
        </div>
        <div class="flex flex-col gap-2 w-full">
          <label for="password">Password</label>
          <InputText id="password" type="password" class="w-full" v-model="state.password"/>
        </div>
        <div class="flex mt-5">
          <Button label="Sign Up" icon="pi pi-user-plus" class="w-full max-w-[17.35rem] mx-auto" @click="auth.signup({ email: state.email, password: state.password, name: state.name })"></Button>
        </div>
        <span v-if="auth.errorValue?.message !== 'User (role: guests) missing scope (account)'">{{ auth.errorValue?.message }}</span>
      </section>
      <Divider layout="horizontal"><b>OR</b></Divider>
      <div class="w-full md:w-5/12 flex items-center justify-center py-5">
        <Button label="Login" icon="pi pi-user " severity="success" class="w-full max-w-[17.35rem] mx-auto" @click="router.push('/')"></Button>
      </div>
    </section>
  </div>
</template>
