<template>
<PaymentModal
  v-if="form_payment.modal"
  :show="form_payment.modal"
  :object="form_payment.object"
  @closePaymentModal="closePaymentModal"
  @successPayment="fetchBoarderList()"
/>
<BoarderModal
  v-if="form_boarder.modal"
  :object="form_boarder.object"
  :type="form_boarder.type"
  @closeBoarderModal="closeBoarderModal"
  @suceessAddBoarder="fetchVacantRoom()"
/>
<div v-if="notificationList?.length" class="bg-gray-800 mb-2">
    <div class="text-center w-full mx-auto py-6 px-4">
        <div class="flex justify-center space-x-2">
          <BellAlertIcon class="h-9 w-9 text-green-500"/>
          <h2 class="text-3xl font-extrabold mb-4 text-white">
            Notifications
          </h2>
        </div>
        <!-- Notification -->
        <div class="flex justify-center">
          <div class="h-ful w-full md:max-h-md md:max-w-xl md:w-9/12 md:h-4/6">
            <div class="shadow-lg rounded-2xl p-4 bg-gray-700 w-full">
                <ul>
                  <li v-for="(boarder, index) in notificationList" :key="index" class="flex justify-center items-center my-2 space-x-2 bg-slate-600 rounded-xl p-2">
                      <div class="flex flex-col" @click.stop="showModal('payment-modal', boarder)">
                          <span class="text-sm font-semibold ml-2" :class="boarder.color">
                            {{`${boarder.get('fname')} ${boarder.get('mname')} ${boarder.get('lname')}`}}
                          </span>
                          <span class="text-sm text-gray-300 ml-2">
                            {{boarder.payment_status}}
                          </span>
                      </div>
                  </li>
                </ul>
            </div>
          </div>
        </div>
        <!-- Notification -->
    </div>
</div>
<div class="bg-gray-800">
    <div class="text-center w-full mx-auto py-6 px-4">
        <div class="flex justify-center space-x-2">
          <router-link to="/boarder"><HomeIcon class="h-9 w-9 text-green-500"/></router-link>
          <h2 class="text-3xl font-extrabold mb-4 text-white">
            Room Status
          </h2>
        </div>
        <!-- Room Status -->
        <div class="flex flex-col md:flex-row justify-center md:space-y-0 space-y-2 md:space-x-2">
            <div v-for="(data, index) in rooms" :key="index">
              <div @click="data.available > 0 && addBoarder(data)" class="shadow-lg rounded-2xl w-full md:w-full p-6 bg-gray-700">
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
import { HomeIcon, CreditCardIcon, BellAlertIcon } from '@heroicons/vue/24/solid'
import { payment } from '@/parse/payment'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import PaymentModal from '@/components/modal/payment/index.vue'
import BoarderModal from '@/components/modal/boarder/index.vue'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  components:
  {
    HomeIcon,
    CreditCardIcon,
    BellAlertIcon,
    PaymentModal,
    BoarderModal,

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
    chart:[],

		room_data:[],
    boarder_data: null,

    form_payment: {
      object: null,
      modal: false
    },

    form_boarder: {
      object: null,
      modal: false,
      type: null
    },
	}),
  computed: {
    rooms(){
      let data = []
      this.room_data.forEach(element => {
        element.available = element.room.get('capacity') - element.count
        data.push(element)
      });
      return data
    },
    notificationList(){
      return this.boarder_data?.filter(boarder => boarder?.payment_status !== null)
    },
  },
  methods: {
    addBoarder(boarder) {
      this.form_boarder.modal = true
      this.form_boarder.object = boarder
      this.form_boarder.type = 'add-dashboard'
    },
    closeBoarderModal() {
      this.form_boarder.object = null
      this.form_boarder.modal = false
    },
// =============================================================================
    showModal(modal, boarder) {
      if(modal === 'payment-modal') {
        this.form_payment.modal = true
        this.form_payment.object = boarder
      } else if(modal === 'boarder-modal') {
        $('boarder-modal').checked = !$('boarder-modal').checked
      }
    },
    closePaymentModal() {
      this.form_payment.object = null
      this.form_payment.modal = false
    },
// =============================================================================
    fetchBoarderList() {
      boarder.list().then((result) => {
        result.forEach(boarder => {
          let Difference_In_Time = new Date(new Date().setHours(0,0,0,0)).getTime() - new Date(boarder.get('next_payment')).getTime();
          let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);

          if(Number(new Date(boarder.get('remind_date'))) <= Number(new Date(new Date().setHours(0,0,0,0)))) {
            if(Difference_In_Days < 0) {
              boarder.payment_status = 'You currently have ' + Math.abs(Difference_In_Days) + ' day/days left, before your due date.'
              boarder.color = 'text-white'
            } else {
              boarder.payment_status = 'Your payment is delayed for ' + Difference_In_Days + ' day/days, please pay now.'
              boarder.color = 'text-red-400'
            }
          } else {
            boarder.payment_status = null
          }
        });
        this.boarder_data = result
      })
    },
    fetchVacantRoom() {
      this.fetchBoarderList()
      this.fetchIncomeExpenses()
      boarder.cloud.countRoom().then((rooms)=> {
        this.room_data = []
        rooms.forEach(data => {
          room.pointer(data.objectId).fetch().then((room_data) => {
            this.room_data.push({room:room_data, count:data.count})
          })
        });
      })
    },
    fetchIncomeExpenses() {
      payment.cloud.chartPayment().then((payments)=> {
        payments.forEach(payment => {
          this.chartData.datasets[0].data[payment.objectId-1] += (payment.count * 2000)
        });
      })
    }
  },
	mounted() {
    this.fetchVacantRoom()
    this.fetchIncomeExpenses()
	}
}
</script>

<style scoped>

</style>