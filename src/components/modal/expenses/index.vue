<template>
<!-- MODAL ADD PAYMENT -->
	<div class="flex w-full justify-end text-end">
		<input type="checkbox" id="expense-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label @click="reset()" for="expense-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="text-lg font-bold my-2 text-start">Expense Modal</h3>
          <div v-if="form_expense.state == State.Error" class="alert alert-error shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{this.form_expense.message}}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-2 form-control w-full">
            <input v-model="form_expense.name" type="input" placeholder="Name" class="input input-bordered w-full" />
            <input v-model="form_expense.price" type="number" placeholder="Price" class="input input-bordered w-full" />
            <input v-model="form_expense.date" type="date" placeholder="Date" class="input input-bordered w-full" />
            <button class="btn w-full" @click="addExpense()" :class="{ loading: form_expense.state == State.Loading }">Submit</button>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
const $ = function( id ) { return document.getElementById( id ); };
import { State } from '@/common/variables'
import { expense } from '@/parse/expense'
	export default {
    props: {
      object: Object,
      type: String
    },
    data: () => ({
      State,
      form_expense: {
        modal:false,
        id:null,
        state: State.Initial,
        name:null,
        price:null,
        date: new Date().toISOString().split('T')[0],
        message:null,
      },
    }),
    methods: {
      addExpense() {
        try {
          this.form_expense.state = State.Loading
          expense.save(this.form_expense).then((data)=> {
            this.$toast.success('New Expense has been successfully added.')
            this.form_expense.state = State.Done
            this.$emit('successExpense')
            this.reset()
          }).catch(error => {
            this.form_expense.state = State.Error
            this.form_expense.message = error.message
          })
        } catch (error) {
          this.form_expense.state = State.Error
          this.form_expense.message = error.message
        }
      },
      reset() {
        this.form_expense.state=State.Initial
        this.form_expense.id=null
        this.form_expense.name=null
        this.form_expense.message=null
        this.$emit('closeExpenseModal')
      },
      edit() {
        this.form_expense.id=this.object?.id,
        this.form_expense.name=this.object?.get('name'),
        this.form_expense.price=this.object?.get('price'),
        this.form_expense.date=this.object?.get('date').toISOString().split('T')[0]
      },
    },
    mounted() {
      $('expense-modal').checked = !$('expense-modal').checked
    },
    created() {
      if(this.type === 'edit') this.edit()
    }
	}
</script>

<style scoped>

</style>