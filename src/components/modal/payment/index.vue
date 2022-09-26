<template>
<!-- MODAL ADD PAYMENT -->
	<div class="flex w-full justify-end text-end">
		<input type="checkbox" id="payment-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label @click="reset()" for="payment-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="text-lg font-bold my-2 text-start">PAYMENT FOR {{`${object.get('fname')} ${object.get('mname')} ${object.get('lname')}`}}</h3>
          <div v-if="form_payment.state == State.Error" class="alert alert-error shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{this.form_payment.message}}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-2 form-control w-full">
            <input v-model="form_payment.date" type="date" placeholder="Date" class="input input-bordered w-full" />
            <input v-model="form_payment.remarks" type="input" placeholder="Remarks" class="input input-bordered w-full" />
            <button class="btn w-full" @click="addPayment()" :class="{ loading: form_payment.state == State.Loading }">Submit</button>
          </div>
        </div>
      </div>
	</div>
</template>

<script>
const $ = function( id ) { return document.getElementById( id ); };
import { State } from '@/common/variables'
import { boarder } from '@/parse/boarder'
import { payment } from '@/parse/payment'
	export default {
    props: {
      show: Boolean,
      object: Object
    },
    data: () => ({
      State,
      form_payment: {
        modal:false,
        id:null,
        state: State.Initial,
        boarder:null,
        room:null,
        remarks:null,
        date: new Date().toISOString().split('T')[0],
        message:null,
      },
    }),
    methods: {
      fetchBoarder(id) {
        boarder.get(id).then((result) => {
          this.form_payment.boarder = result.id
          this.form_payment.room = result.get('roomPointer').id
        })
      },
      addPayment() {
        try {
          this.form_payment.state = State.Loading
          payment.save(this.form_payment).then((data)=> {
            this.$toast.success('New payment has been successfully added.')
            this.form_payment.state = State.Done
            this.$emit('successPayment')
            this.reset()
          }).catch(error => {
            this.form_payment.state = State.Error
            this.form_payment.message = error.message
          })
        } catch (error) {
          this.form_payment.state = State.Error
          this.form_payment.message = error.message
        }
      },
      reset() {
        this.form_payment.state=State.Initial
        this.form_payment.id=null
        this.form_payment.boarder=null
        this.form_payment.room=null
        this.form_payment.remarks=null
        this.form_payment.message=null
        this.$emit('closePaymentModal')
      }
    },
    mounted() {
      $('payment-modal').checked = !$('payment-modal').checked
      this.fetchBoarder(this.object.id)
    },
	}
</script>

<style scoped>

</style>