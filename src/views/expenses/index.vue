<template>
<ExpenseModal
  v-if="form_expense.modal"
  :object="form_expense.object"
  :type="form_expense.type"
  @closeExpenseModal="closeExpenseModal"
  @successExpense="fetchBoarderList()"
/>
<div class="bg-gray-800 mb-2">
  <div class="text-center w-full mx-auto py-6 px-4">
      <div class="flex justify-center space-x-2">
        <CreditCardIcon class="h-9 w-9 text-green-500"/>
        <h2 class="text-3xl font-extrabold mb-4 text-white">
          Expenses
        </h2>
      </div>
  </div>
</div>
<!-- CARD -->
  <div class="flex flex-col space-y-3 justify-center w-full md:hidden">
    <div
      v-for="( boarder, index ) in table.expenses" :key="index"
      @click="showModal('expense-modal-edit', boarder)"
      class="shadow-lg rounded-2xl w-full p-4 bg-gray-800 relative overflow-hidden">
        <div  class="w-full">
            <p class="text-white text-lg font-medium mb-2">
              {{`${boarder.get('name')}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Price: ${formatPrice(boarder.get('price'))}`}}
            </p>
            <p class="text-gray-300 text-sm">
              {{`Date: ${formatDate(boarder.get('date'))}`}}
            </p>
            <!-- <button class="btn bg-indigo-500 text-white btn-sm my-2 mx-1" @click.stop="showModal('expense-modal')">Edit</button> -->
            <!-- <button class="btn bg-indigo-500 text-white btn-sm my-2 mx-1" @click.stop="showModal('boarder-modal-edit', boarder)">Edit</button> -->
        </div>
    </div>

    <button class="btn btn-circle modal-button m-2 fixed bottom-5 right-5 text-blue-500 h-31 w-31 text-2xl"
      @click.stop="showModal('expense-modal')">+</button>
  </div>

<!-- TABLE -->
  <div class="flex justify-center overflow-x-auto w-full invisible md:visible ">
    <table class="table w-full px-10 mx-10">
      <!-- head -->
      <thead>
        <tr>
          <th>Name</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <!-- row 1 -->
        <tr class="hover" v-for="( boarder, index ) in table.expenses" :key="index">
          <td>Name</td>
          <td>date</td>
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
          <th>Name</th>
          <th>Date</th>
          <th>Action</th>
        </tr>
      </tfoot>

    </table>
  </div>
</template>

<script>
import moment from 'moment'
import { State } from '@/common/variables'
import { expense } from '@/parse/expense'
import { CreditCardIcon } from '@heroicons/vue/24/solid'
import ExpenseModal from '@/components/modal/expenses/index.vue'
const $ = function( id ) { return document.getElementById( id ); };
export default {
  components: {
    CreditCardIcon,
    ExpenseModal,
  },
  data: () => ({
    State,
    table: {
      expenses: null
    },
    form_expense: {
      object: null,
      modal: false,
      type: null
    }
  }),
  methods: {
    showModal(modal,boarder={}) {
      if(modal === 'expense-modal') {
        this.form_expense.modal = true
      } else if(modal === 'expense-modal-edit') {
        this.form_expense.modal = true
        this.form_expense.object = boarder
        this.form_expense.type = 'edit'
      }
    },
    closeExpenseModal() {
      this.form_expense.modal = false
    },
    fetchBoarderList() {
      expense.list({year: String(2022)}).then((result) => {
        this.table.expenses = result
      })
    },
    formatDate(date) {
      return moment(date).format('LL')
    },
    formatPrice(price) {
      let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'PHP',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
      });

      return formatter.format(price);
    }
  },
  mounted() {
    this.fetchBoarderList()
  }

}
</script>