<template>
<div class="bg-gray-800">
    <div class="text-center w-full mx-auto py-14 px-4">
        <div class="flex justify-center space-x-2">
          <HomeIcon class="h-9 w-9 text-green-500"/>
          <h2 class="text-3xl font-extrabold mb-4 text-white">
            Room Status
          </h2>
        </div>
        <!-- Room Status -->
        <div class="flex flex-col md:flex-row justify-center md:space-y-0 space-y-2 md:space-x-2">
            <div v-for="(data, index) in rooms" :key="index">
              <div class="shadow-lg rounded-2xl w-full md:w-full p-6 bg-gray-700">
                <div class="flex items-center">
                  <HomeIcon class="h-6 w-6 text-green-500"/>
                  <p class="text-md text-gray-50 ml-2">
                    Room {{data.room.get('room_number')}}
                  </p>
                </div>
                <div class="flex flex-col justify-start">
                  <p class="text-4xl text-left text-white font-bold my-4">
                    Vacant: {{data.count}} / {{data.room.get('capacity')}}
                  </p>
                </div>
              </div>
            </div>
        </div>
        <!-- Room Status -->
    </div>
</div>
<div class="bg-gray-800 mt-3">
    <div class="text-center w-full mx-auto py-6 px-4">
        <div class="flex justify-center space-x-2">
          <CreditCardIcon class="h-9 w-9 text-green-500"/>
          <h2 class="text-3xl font-extrabold mb-4 text-white">
           Income vs Expenses
          </h2>
        </div>
        <!-- Bar -->
        <div class="flex justify-center">
          <div class="h-ful w-full md:max-h-md md:max-w-xl md:w-9/12 md:h-4/6">
            <Bar
              :chart-options="chartOptions"
              :chart-data="chartData"
              :chart-id="chartId"
              :dataset-id-key="datasetIdKey"
              :plugins="plugins"
              :css-classes="cssClasses"
              :styles="styles"
              :width="width"
              :height="height"
            />
          </div>
        </div>
        <!-- Bar -->
    </div>
</div>
</template>
<script>
import { boarder } from '@/parse/boarder'
import { room } from '@/parse/room'
import { HomeIcon, CreditCardIcon } from '@heroicons/vue/24/solid'
import { payment } from '@/parse/payment'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)


export default {
  components:
  {
    HomeIcon,
    CreditCardIcon,

    // Chart.js
    Bar,
  },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 200
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Object,
      default: () => {}
    }
  },
	data: () => ({
    chartData: {
      labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ],
      datasets: [
        {
          label: 'Income',
          backgroundColor: '#00d764',
          data: [4000, 2000, 2300, 3000, 2300, 4894, 5300, 0, 0, 2422, 4324, 3334],
        },
        {
          label: 'Expenses',
          backgroundColor: 'red',
          data: [4000, 1400, 1300, 2300, 1400, 1894, 2300, 1343, 2314, 1422, 3324, 2334],
        }
      ]
    },
    chartOptions: {
      responsive: true
    },



		room_data:[],
    chart:[]
	}),
  computed: {
    rooms(){
      let data = []
      this.room_data.forEach(element => {
        element.available = element.room.get('capacity') - element.count
        data.push(element)
      });
      return data
    }
  },
  methods: {
    test() {
      console.log(this.room_data)
    }
  },
	mounted() {
    boarder.cloud.countRoom().then((rooms)=> {
      rooms.forEach(data => {
        room.pointer(data.objectId).fetch().then((room_data) => {
          this.room_data.push({room:room_data, count:data.count})
        })
      });
    })

    payment.cloud.chartPayment().then((payments)=> {
      payments.forEach(payment => {
        this.chartData.datasets[0].data[payment.objectId-1] += (payment.count * 2000)
      });
    })

	}

}
</script>

<style scoped>

</style>