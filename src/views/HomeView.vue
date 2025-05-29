<script setup lang="ts">
import Sun from "@/components/Sun.vue"
import { reactive } from 'vue';
import { DatePicker } from 'primevue';

const state = reactive({
  weatherData: {
    date: "2025-05-29",
    city: "Johannesburg"
  }
})

</script>

<template>
  <main class="h-full flex flex-col md:flex-row justify-center items-center">
    <section class="w-full md:w-8/12 lg:w-8/12 xl:w-4/12 bg-[#18181B] p-10">
      <section class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mb-5">
        <h2 class="text-3xl">Today</h2>
        <DatePicker class="w-fit" :default-value="new Date(state.weatherData.date)" />
      </section>

      <section>
        <section class="flex flex-col md:flex-row justify-between items-center">
          <section class="flex flex-col gap-4">
            <h2 class="text-2xl">Johannesburg</h2>
            <p>Wednesday, 16:18, <span class="text-green-500">clear sky</span></p>
            <p>Humidity: <span class="text-red-500">31%</span>, wind: <span class="text-red-500">3.09km/h</span></p>
          </section>

          <section class="flex items-center gap-4">
            <Sun />
            <span class="text-4xl">29°C</span>
          </section>
        </section>

        <section class="flex flex-col md:flex-row w-full mt-10 gap-4 md:justify-between">
          <section>
            <h4 class="text-center">Tue</h4>
            <section class="flex justify-center items-center">
              <Sun />
            </section>
            <section class="flex justify-between items-center">
              <span>29°C</span>
              <span>19°C</span>
            </section>
          </section>

          <section>
            <h4 class="text-center">Tue</h4>
            <section class="flex justify-center items-center">
              <Sun />
            </section>
            <section class="flex justify-between items-center">
              <span>29°C</span>
              <span>19°C</span>
            </section>
          </section>

        <section>
            <h4 class="text-center">Tue</h4>
            <section class="flex justify-center items-center">
              <Sun />
            </section>
            <section class="flex justify-between items-center">
              <span>29°C</span>
              <span>19°C</span>
            </section>
          </section>

        <section>
            <h4 class="text-center">Tue</h4>
            <section class="flex justify-center items-center">
              <Sun />
            </section>
            <section class="flex justify-between items-center">
              <span>29°C</span>
              <span>19°C</span>
            </section>
          </section>

          <section>
            <h4 class="text-center">Tue</h4>
            <section class="flex justify-center items-center">
              <Sun />
            </section>
            <section class="flex justify-between items-center">
              <span>29°C</span>
              <span>19°C</span>
            </section>
          </section>
        </section>
      </section>
    </section>
  </main>
</template>
