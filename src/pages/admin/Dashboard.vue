<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6" md="3" v-for="card, i in cards" :key="i">
        <v-card border="" flat class="mx-auto" style="overflow: unset;">
          <v-sheet style="position: absolute; top: -10px; left: 10px" :color="card.color || 'primary'" height="75" width="75" 
            rounded class="d-flex align-center justify-center">
            <v-icon size="x-large" color="surface">{{ card.icon }}</v-icon>
          </v-sheet>
          <v-card-text style="text-align: right">
            <div>{{ "t('dashboard.'+card.title) "}}</div>
            <!-- cards_info[card.value] || 0 -->
            <p class="text-h4 text--primary">{{0}} <span v-if="card.unity" class="text-body-2">{{card.unity}}</span></p>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card border="" flat>
          <v-card-title class="font-weight-light text-subtitle-1">{{ 't("dashboard.chart_title_1")' }}</v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <BarChart :chartData="line_data" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card flat border="">
          <v-card-title class="d-flex justify-space-between align-center text-subtitle-1">
            {{ 't("dashboard.chart_title_2")' }}
          </v-card-title>
          <v-card-text>
            <DoughnutChart :chartData="chart_data" :options="chart_data_options" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card flat border="">
          <v-card-title class="d-flex text-subtitle-1 justify-space-between align-center">
            {{ 't("dashboard.chart_title_4")' }}
          </v-card-title>
          <v-card-text>
            <LineChart :chartData="line_data" :options="options" />
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6">
        <v-card border="" flat height="100%">
          <v-card-title class="d-flex text-subtitle-1 justify-space-between align-center font-weight-light">
            {{ 't("dashboard.chart_title_3")' }}
            <span class="text-subtitle-1 text-primary">{{new Date().toLocaleDateString()}}</span>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="12">
                <v-select v-model="currency" :items="currencys" variant="outlined" flat density="compact" transition="fade-transition" hide-details></v-select>
              </v-col>
              <v-col cols="12" class="pt-0">
                <v-table hover class="oveflow-auto" density="comfortable">
                  <thead>
                    <tr>
                      <!-- <th class="text-left text-caption">{{ 't("dashboard.flag")' }}</th> -->
                      <th class="text-left text-caption">{{ 't("dashboard.currency")' }}</th>
                      <th class="text-right text-caption">{{ 't("dashboard.rate")' }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item, i of flags" :key="i">
                      <!-- <td>
                        <v-img :src="item" width="40" height="38" cover></v-img> 
                      </td> -->
                      <td class="text-body-2">{{ 'USD/UZS/EUR' }}</td>
                      <td class="d-flex align-center text-primary justify-end">
                        0.00 $
                        <!-- {{ convertCurrency(currencyData[item]) }} -->
                        <!-- <v-icon size="small" :color="'green'">mdi-menu-up</v-icon> -->
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DoughnutChart, BarChart, LineChart } from 'vue-chart-3'
import { Chart, registerables } from "chart.js"
// import { get_info } from '../api/dashboard'
// import { get_currency } from '../api/others'
// import { currencys, flags } from '../utils/items'

Chart.register(...registerables);

const { locale, t } = useI18n()
const cards_info = ref({})
const chart_1 = ref([])
const chart_2 = ref([])
const currency = ref("EUR")
const currencyData = ref({})

const cards = [
  { title: 'card_1', value: 'allRooms', icon: 'mdi-package-variant', color: '' },
  { title: 'card_2', value: 'bookedRooms', icon: 'mdi-cart', color: '' },
  { title: 'card_3', value: 'emptyRooms', icon: 'mdi-account-multiple', color: '' },
  { title: 'card_4', value: 'totalPayment', unity: "sum", icon: 'mdi-square-inc-cash', color: '' },
]

const chart_data_options = {
  scales: {
    myScale: {
      type: "logarithmic",
      position: "right",
    },
  },
  height: 100,
  plugins: {
    legend: {
      position: "bottom",
    },
  }
}
const options = {
  responsive: true,
  showLine: true,
  animation: false,
  normalized: true,
  borderColor: "#2666DE",
}

const chart_data = computed(() => ({
  labels: ['Created', 'Process', 'Delivered'], // chart_2.value.map(c => c.name)
  datasets: [
    {
      data: [37, 12, 45], // chart_2.value.map(c => c?._count?.booking || 0)
      backgroundColor: ['#FF1744', '#2962FF', '#00E676',], // '#FDD835', '#9C27B0', '#3F51B5', '#FFFF00', '#009688', '#FF9800', '#795548', '#607D8B'
    },
  ],
}));

const line_data = computed(() => {
  const currentMonthDays = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
  return {
    labels: new Array(currentMonthDays).fill(0).map((_, i) => i + 1),
    datasets: [
      {
        label: new Date().toLocaleString(locale.value, { month: 'long', }),
        backgroundColor: '#0091EA',
        data: new Array(currentMonthDays).fill(0).map((_) => Math.floor(Math.random()*70) + 10), // chart_1.value,
      },
    ],
  }
})

const init = async () => {
  // const { data: { status, countRoomsByType, bookingCounts, ...infoDashboard } } = await get_info()

  // if(status === "ok") {
  //   chart_2.value = countRoomsByType;
  //   chart_1.value = bookingCounts
  //   Object.assign(cards_info.value, infoDashboard)
  // }
}

const getCurrency = async () => {
  // const { data } = await get_currency('USD')

  // currencyData.value = data.rates
}

const currencys = ["UZS", "EUR", "USD", "RUB", "KRW", "SAR", "TRY"]
const flags = {
  UZS: "/flags/uz.svg", 
  EUR: "/flags/eu.svg", 
  USD: "/flags/us.svg", 
  RUB: "/flags/ru.svg", 
  KRW: "/flags/kr.svg", 
  SAR: "/flags/sa.svg", 
  TRY: "/flags/tr.svg"
}

// const convertCurrency = (value) => {
//   const rate = currencyData.value[currency.value];
//   const convert = (value / rate) || 0
//   return (convert).toFixed(convert>=1?1:5);
// }

// init()
// getCurrency()

// updateTimeClocks()
</script>