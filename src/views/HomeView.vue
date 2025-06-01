<script setup lang="ts">
import Sun from "@/components/icons/Sun.vue"
import { reactive, ref } from 'vue';
import dayjs from "dayjs";
import Humidity from "@/components/icons/Humidity.vue";
import Wind from "@/components/icons/Wind.vue";
import FewClouds from "@/components/icons/FewClouds.vue";
import { Button, InputText } from "primevue";
import axios from "axios";

const state = reactive({
  weatherData: {
    date: new Date(),
    weatherObj: {
      "coord": {
        "lon": -2.15,
        "lat": 57
      },
      "weather": [
        {
          "id": 804,
          "main": "Clouds",
          "description": "overcast clouds",
          "icon": "04d"
        }
      ],
      "base": "stations",
      "main": {
        "temp": 8.48,
        "feels_like": 4.9,
        "temp_min": 8.18,
        "temp_max": 9.26,
        "pressure": 1016,
        "humidity": 79,
        "sea_level": 1016,
        "grnd_level": 1016
      },
      "visibility": 10000,
      "wind": {
        "speed": 7.3,
        "deg": 189,
        "gust": 13.48
      },
      "clouds": {
        "all": 100
      },
      "dt": 1647347424,
      "sys": {
        "type": 2,
        "id": 2031790,
        "country": "GB",
        "sunrise": 1647325488,
        "sunset": 1647367827
      },
      "timezone": 0,
      "id": 2641549,
      "name": "Newtonhill",
      "cod": 200
    },
    forecastObj: {
      "cod": "200",
      "message": 0,
      "cnt": 3,
      "list": [
        {
          "dt": 1647356400,
          "main": {
            "temp": 8.13,
            "feels_like": 4.61,
            "temp_min": 7.42,
            "temp_max": 8.13,
            "pressure": 1015,
            "sea_level": 1015,
            "grnd_level": 1014,
            "humidity": 79,
            "temp_kf": 0.71
          },
          "weather": [
            {
              "id": 500,
              "main": "Rain",
              "description": "light rain",
              "icon": "10d"
            }
          ],
          "clouds": {
            "all": 95
          },
          "wind": {
            "speed": 6.78,
            "deg": 184,
            "gust": 12.14
          },
          "visibility": 10000,
          "pop": 0.34,
          "rain": {
            "3h": 0.27
          },
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2022-03-15 15:00:00"
        },
        {
          "dt": 1647367200,
          "main": {
            "temp": 7.88,
            "feels_like": 4.44,
            "temp_min": 7.58,
            "temp_max": 7.88,
            "pressure": 1015,
            "sea_level": 1015,
            "grnd_level": 1014,
            "humidity": 79,
            "temp_kf": 0.3
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "overcast clouds",
              "icon": "04d"
            }
          ],
          "clouds": {
            "all": 98
          },
          "wind": {
            "speed": 6.31,
            "deg": 189,
            "gust": 11.74
          },
          "visibility": 10000,
          "pop": 0.2,
          "sys": {
            "pod": "d"
          },
          "dt_txt": "2022-03-15 18:00:00"
        },
        {
          "dt": 1647378000,
          "main": {
            "temp": 7.24,
            "feels_like": 3.59,
            "temp_min": 7.24,
            "temp_max": 7.24,
            "pressure": 1014,
            "sea_level": 1014,
            "grnd_level": 1014,
            "humidity": 82,
            "temp_kf": 0
          },
          "weather": [
            {
              "id": 804,
              "main": "Clouds",
              "description": "overcast clouds",
              "icon": "04n"
            }
          ],
          "clouds": {
            "all": 100
          },
          "wind": {
            "speed": 6.41,
            "deg": 199,
            "gust": 12.52
          },
          "visibility": 10000,
          "pop": 0,
          "sys": {
            "pod": "n"
          },
          "dt_txt": "2022-03-15 21:00:00"
        }
      ],
      "city": {
        "id": 2641549,
        "name": "Newtonhill",
        "coord": {
          "lat": 57,
          "lon": -2.15
        },
        "country": "GB",
        "population": 3284,
        "timezone": 0,
        "sunrise": 1647325488,
        "sunset": 1647367827
      }
    }
  }
})

const location = ref("London")

const onsubmit = async () => {
  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location.value.toLocaleLowerCase()}&appid=&units=metric`)
    console.log(response, "ds")
    state.weatherData.weatherObj = response.data
  } catch (error) {
    console.log(error)
  }
}

</script>

<template>
  <main class="h-full flex flex-col md:flex-row justify-center items-center">
    <section class="w-full md:w-8/12 lg:w-8/12 xl:w-4/12 bg-[#18181B] p-10">
      <section class="flex flex-col gap-4 md:gap-0 md:flex-row justify-between items-center mb-10">
        <!-- <h2 class="text-3xl">{{ state.weatherData.weatherObj.name }}</h2> -->
        <form @submit.prevent="onsubmit" class="flex gap-2">
          <InputText type="text" v-model="location" />
          <Button type="submit" icon="pi pi-search" iconPos="top" />
        </form>
        <h2 class="bg-black px-2 py-1 text-lg border-2 border-gray-500 rounded-md cursor-pointer">{{
          dayjs(state.weatherData.date).format('DD/MM/YYYY') }}</h2>
      </section>

      <section>
        <section class="flex flex-col md:flex-row justify-between items-center">
          <section class="flex flex-col gap-4">
            <section class="flex gap-4 items-center ml-1">
              <section class="flex gap-2 items-center">
                <span class="pi pi-calendar text-blue-300"></span>
                <span>
                  {{ dayjs(new Date(state.weatherData.weatherObj.dt * 1000)).add(state.weatherData.weatherObj.timezone).format("MMMM D, h:mm A") }}
                </span>
              </section>
              <section class="flex gap-2 items-center">
                <FewClouds />
                <span class="text-green-500 capitalize">
                  {{ state.weatherData.weatherObj.weather[0].description }}
                </span>
              </section>
            </section>

            <section class="flex gap-4 items-center">
              <section class="flex gap-2 items-center">
                <Humidity /> 
                <span>Humidity: <span class="text-red-500">{{ state.weatherData.weatherObj.main.humidity.toFixed(1) }}%</span></span>
              </section>

              <section class="flex gap-2 items-center">
                <Wind /> 
                <span>Wind: <span class="text-red-500">{{ state.weatherData.weatherObj.wind.speed.toFixed(1) }} meter/sec</span></span>
              </section>
            </section>
          </section>

          <section class="flex items-center gap-4">
            <Sun />
            <span class="text-4xl">{{ state.weatherData.weatherObj.main.temp.toFixed(1) }}°C</span>
          </section>
        </section>

        <section class="flex flex-col md:flex-row w-full mt-10 gap-4 md:justify-between">
          
          <section v-for="(day, index) in state.weatherData.forecastObj.list" :key="index">
            <h4 class="text-center">{{ dayjs(new Date(day.dt * 1000)).format("ddd, h:mm A") }}</h4>
            <section class="flex justify-center items-center my-2">
              <Sun />
            </section>
            <section class="flex justify-between items-center gap-4">
              <span>{{ day.main.temp_max}}°C</span>
              <span>{{ day.main.temp_min}}°C</span>
            </section>
          </section>

        </section>
      </section>
    </section>
  </main>
</template>
