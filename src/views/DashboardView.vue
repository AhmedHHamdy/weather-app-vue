<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'
import Humidity from '@/components/icons/Humidity.vue'
import Wind from '@/components/icons/Wind.vue'
import { Button, InputText } from 'primevue'
import axios from 'axios'

const state = reactive({
  weatherData: {
    date: new Date(),
    weatherObj: {
      coord: {
        lon: 0,
        lat: 0,
      },
      weather: [
        {
          id: 0,
          main: '',
          description: '',
          icon: '',
        },
      ],
      base: '',
      main: {
        temp: 0,
        feels_like: 0,
        temp_min: 0,
        temp_max: 0,
        pressure: 0,
        humidity: 0,
        sea_level: 0,
        grnd_level: 0,
      },
      visibility: 0,
      wind: {
        speed: 0,
        deg: 0,
        gust: 0,
      },
      clouds: {
        all: 0,
      },
      dt: 0,
      sys: {
        type: 0,
        id: 0,
        country: '',
        sunrise: 0,
        sunset: 0,
      },
      timezone: 0,
      id: 0,
      name: '',
      cod: 0,
    },
    forecastObj: {
      cod: '',
      message: 0,
      cnt: 0,
      list: [
        {
          dt: 0,
          main: {
            temp: 0,
            feels_like: 0,
            temp_min: 0,
            temp_max: 0,
            pressure: 0,
            sea_level: 0,
            grnd_level: 0,
            humidity: 0,
            temp_kf: 0,
          },
          weather: [
            {
              id: 0,
              main: '',
              description: '',
              icon: '',
            },
          ],
          clouds: {
            all: 0,
          },
          wind: {
            speed: 0,
            deg: 0,
            gust: 0,
          },
          visibility: 0,
          pop: 0,
          rain: {
            '3h': 0,
          },
          sys: {
            pod: '',
          },
          dt_txt: '',
        },
      ],
      city: {
        id: 0,
        name: '',
        coord: {
          lat: 0,
          lon: 0,
        },
        country: '',
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
      },
    },
  },
})

const location = ref('London')

const onsubmit = async () => {
  try {
    const responseWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location.value.toLocaleLowerCase()}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
    )
    const responseForecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location.value.toLocaleLowerCase()}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
    )
    console.log(responseWeather, 'ds')
    console.log(responseForecast, 'responseForecast')
    state.weatherData.weatherObj = responseWeather.data
    state.weatherData.forecastObj = responseForecast.data
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const responseWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location.value.toLocaleLowerCase()}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
    )
    const responseForecast = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location.value.toLocaleLowerCase()}&appid=${import.meta.env.VITE_API_KEY}&units=metric`,
    )
    state.weatherData.weatherObj = responseWeather.data
    state.weatherData.forecastObj = responseForecast.data
  } catch (error) {
    console.log(error)
  }
})
</script>

<template>
  <main class="h-full flex flex-col md:flex-row justify-center items-center">
    <section class="w-full md:w-8/12 lg:w-8/12 xl:w-5/12 bg-[#18181B] p-10">
      <section class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mb-10">
        <!-- <h2 class="text-3xl">{{ state.weatherData.weatherObj.name }}</h2> -->
        <form @submit.prevent="onsubmit" class="flex gap-2">
          <InputText type="text" v-model="location" />
          <Button type="submit" icon="pi pi-search" iconPos="top" />
        </form>
        <h2 class="bg-black px-2 py-1 text-lg border-2 border-gray-500 rounded-md cursor-pointer">
          {{ dayjs(state.weatherData.date).format('DD/MM/YYYY') }}
        </h2>
      </section>

      <section>
        <section class="flex flex-col md:flex-row justify-between items-center">
          <section class="flex flex-col gap-4">
            <section class="flex gap-4 items-center ml-1">
              <section class="flex gap-2 items-center">
                <span class="pi pi-calendar text-blue-300"></span>
                <span>
                  {{
                    dayjs(new Date(state.weatherData.weatherObj.dt * 1000))
                      .add(state.weatherData.weatherObj.timezone)
                      .format('MMMM D, h:mm A')
                  }}
                </span>
              </section>
              <section class="flex gap-2 items-center">
                <!-- <FewClouds /> -->
                <img
                  class="w-14 h-14"
                  :src="`https://openweathermap.org/img/wn/${state.weatherData.weatherObj.weather[0].icon}@2x.png`"
                  alt="weather status icon"
                />
                <span class="text-green-500 capitalize">
                  {{ state.weatherData.weatherObj.weather[0].description }}
                </span>
              </section>
            </section>

            <section class="flex gap-4 items-center">
              <section class="flex gap-2 items-center">
                <Humidity />
                <span
                  >Humidity:
                  <span class="text-red-500">{{ state.weatherData.weatherObj.main.humidity.toFixed(1) }}%</span></span
                >
              </section>

              <section class="flex gap-2 items-center">
                <Wind />
                <span
                  >Wind:
                  <span class="text-red-500"
                    >{{ state.weatherData.weatherObj.wind.speed.toFixed(1) }} meter/sec</span
                  ></span
                >
              </section>
            </section>
          </section>

          <section class="flex items-center gap-4">
            <!-- <Sun /> -->
            <img
              class="w-28"
              :src="`https://openweathermap.org/img/wn/${state.weatherData.weatherObj.weather[0].icon}@2x.png`"
              alt="weather status icon"
            />
            <span class="text-4xl">{{ state.weatherData.weatherObj.main.temp.toFixed(1) }}°C</span>
          </section>
        </section>

        <section class="flex flex-col md:flex-row w-full mt-10 gap-4 md:justify-between overflow-x-auto">
          <section v-for="(day, index) in state.weatherData.forecastObj.list" :key="index">
            <h4 class="text-center">{{ dayjs(new Date(day.dt * 1000)).format('ddd, h:mm A') }}</h4>
            <section class="flex justify-center items-center my-2">
              <!-- <Sun /> -->
              <img
                class="w-16"
                :src="`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`"
                alt="weather status icon"
              />
            </section>
            <section class="flex justify-between items-center gap-4">
              <span>{{ day.main.temp_max }}°C</span>
              <span>{{ day.main.temp_min }}°C</span>
            </section>
          </section>
        </section>
      </section>
    </section>
  </main>
</template>
