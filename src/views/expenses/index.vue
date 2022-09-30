<template>
<PaymentModal
  v-if="form_payment.modal"
  :object="form_payment.object"
  @closePaymentModal="closePaymentModal"
  @successPayment="fetchBoarderList()"
/>
<BoarderModal
  v-if="form_boarder.modal"
  :object="form_boarder.object"
  :type="form_boarder.type"
  @closeBoarderModal="closeBoarderModal"
  @suceessAddBoarder="fetchBoarderList()"
/>
<h1>Testing Expense Page</h1>
<!-- CARD -->
  <div class="flex flex-col space-y-3 justify-center w-full block md:hidden">
    <div
      v-for="( boarder, index ) in table.boarders" :key="index"
      @click="edit(boarder)"
      class="shadow-lg rounded-2xl w-full p-4 bg-gray-800 relative overflow-hidden">
        <div  class="w-full">
            <p class="text-white text-lg font-medium mb-2">
              {{`${boarder.get('fname')} ${boarder.get('mname')} ${boarder.get('lname')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Address: ${boarder.get('address')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Contact Number: ${boarder.get('contact_number')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Office: ${boarder.get('office')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Incase of Emergency: ${boarder.get('incase_of_emergency')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Room Number: ${boarder.get('roomPointer').get('room_number')}`}}
            </p>
            <button class="btn bg-indigo-500 text-white btn-sm my-2 mx-1" @click.stop="showModal('payment-modal', boarder)">Payment</button>
            <button class="btn bg-indigo-500 text-white btn-sm my-2 mx-1" @click.stop="showModal('boarder-modal-edit', boarder)">Edit</button>
        </div>
    </div>

    <button class="btn btn-circle modal-button m-2 fixed bottom-5 right-5 text-blue-500 h-31 w-31 text-2xl"
      @click.stop="showModal('boarder-modal-add', boarder)">+</button>
  </div>

<!-- TABLE -->
  <div class="flex justify-center overflow-x-auto w-full invisible md:visible ">
    <table class="table w-full px-10 mx-10">
      <!-- head -->
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Office</th>
          <th>Incase of Emergency</th>
          <th>Room Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="hover" v-for="( boarder, index ) in table.boarders" :key="index">
          <td>{{`${boarder.get('fname')} ${boarder.get('mname')} ${boarder.get('lname')}`}}</td>
          <td>{{`${boarder.get('address')}`}}</td>
          <td>{{`${boarder.get('contact_number')}`}}</td>
          <td>{{`${boarder.get('office')}`}}</td>
          <td>{{`${boarder.get('incase_of_emergency')}`}}</td>
          <td>{{`Room ${boarder.get('roomPointer').get('room_number')}`}}</td>
          <th>
            <div class="flex space-x-3">
              <button class="btn btn-primary btn-md" @click.stop="showModal('payment-modal', boarder)">Add Payment</button>
              <button class="btn btn-primary btn-md" @click.stop="showModal('boarder-modal-edit', boarder)">Edit</button>
            </div>
          </th>
        </tr>
      </tbody>
      <!-- foot -->
      <tfoot>
        <tr>
          <th>Full Name</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Office</th>
          <th>Incase of Emergency</th>
          <th>Room Number</th>
          <th>Action</th>
        </tr>
      </tfoot>

    </table>
  </div>
</template>

<script>
import { State } from '@/common/variables'
import { boarder } from '@/parse/boarder'
import PaymentModal from '@/components/modal/payment/index.vue'
import BoarderModal from '@/components/modal/boarder/index.vue'
const $ = function( id ) { return document.getElementById( id ); };
export default {
  components: {
    PaymentModal,
    BoarderModal,
  },
  data: () => ({
    State,
    table: {
      boarders: null
    },
    form_boarder: {
      object: null,
      modal: false,
      type: null
    },
    form_payment: {
      object: null,
      modal: false
    }
  }),
  methods: {
    showModal(modal, boarder) {
      if(modal === 'payment-modal') {
        this.form_payment.modal = true
        this.form_payment.object = boarder
      } else if(modal === 'boarder-modal-add') {
        this.form_boarder.modal = true
        this.form_boarder.object = boarder
        this.form_boarder.type = 'add'
      } else if(modal === 'boarder-modal-edit') {
        this.form_boarder.modal = true
        this.form_boarder.object = boarder
        this.form_boarder.type = 'edit'
      }
    },
    closePaymentModal() {
      this.form_payment.object = null
      this.form_payment.modal = false
    },
    closeBoarderModal() {
      this.form_boarder.object = null
      this.form_boarder.modal = false
    },
    fetchBoarderList() {
      boarder.list().then((result) => {
        this.table.boarders = result
      })
    },
  },
  mounted() {
    this.fetchBoarderList()
  }

}
</script>