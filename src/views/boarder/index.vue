<template>
<!-- MODAL -->
	<div class="flex w-full justify-end">
		<!-- The button to open modal -->
		<label for="boarder-modal" class="btn modal-button m-2">add boarder</label>
		<!-- Put this part before </body> tag -->
		<input type="checkbox" id="boarder-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label @click="reset()" for="boarder-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <h3 class="text-lg font-bold my-2">ADD BOARDER</h3>
          <div v-if="form.state == State.Error" class="alert alert-error shadow-lg mb-4">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              <span>{{this.form.message}}</span>
            </div>
          </div>
          <div class="flex flex-col space-y-2 form-control w-full">
            <input v-model="form.fname" type="text" placeholder="First Name" class="input input-bordered w-full" />
            <input v-model="form.mname" type="text" placeholder="Middle Name" class="input input-bordered w-full" />
            <input v-model="form.lname" type="text" placeholder="Last Name" class="input input-bordered w-full" />
            <input v-model="form.address" type="text" placeholder="Address" class="input input-bordered w-full" />
            <input v-model="form.contact_number" type="text" placeholder="Contact Number" class="input input-bordered w-full" />
            <input v-model="form.office" type="text" placeholder="Office" class="input input-bordered w-full" />
            <input v-model="form.incase_of_emergency" type="text" placeholder="Incase of Emergency" class="input input-bordered w-full" />

            <select v-model="form.room" class="select select-bordered">
              <option disabled selected>Select Room</option>
              <option v-for="(room, index) in form.rooms" :key="index" :value="room.id">{{`Room ${room.get('room_number')} with Capacity of ${room.get('capacity')}`}}</option>
            </select>
            <select v-model="form.status" class="select select-bordered">
              <option disabled selected>Status</option>
              <option value="active">Active</option>
              <option value="deactivate">Deactivate</option>
            </select>

            <button class="btn w-full" @click="save()" :class="{ loading: form.state == State.Loading }">Submit</button>
          </div>
        </div>
      </div>
	</div>

<!-- TABLE -->

  <div class="flex justify-center">
    <div class="overflow-x-auto w-full md:w-5/6">
      <table class="table w-full">
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
                <button class="btn btn-primary btn-md">Add Payment</button>
                <button class="btn btn-primary btn-md" @click="edit(boarder)">Edit</button>
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
  </div>
</template>

<script>
import { State } from '@/common/variables'
import { room } from '@/parse/room'
import { boarder } from '@/parse/boarder'
const $ = function( id ) { return document.getElementById( id ); };
export default {
  data: () => ({
    State,
    form: {
      state: State.Initial,
      message:null,
      status:'active',
      rooms:null, //Room List
      id:null,
      fname:null,
      mname:null,
      lname:null,
      address:null,
      contact_number:null,
      office:null,
      incase_of_emergency:null,
      room: 'Select Room'
    },

    table: {
      boarders: null
    }
  }),
  methods: {
    edit(boarder) {
      this.form.state=State.Initial

      this.form.id=boarder.id,
      this.form.room=boarder.get('roomPointer').id
      this.form.status=boarder.get('status'),
      this.form.fname=boarder.get('fname'),
      this.form.mname=boarder.get('mname'),
      this.form.lname=boarder.get('lname'),
      this.form.address=boarder.get('address'),
      this.form.contact_number=boarder.get('contact_number'),
      this.form.office=boarder.get('office'),
      this.form.incase_of_emergency=boarder.get('incase_of_emergency')

      $('boarder-modal').checked = !$('boarder-modal').checked
    },
    save() {
      try {
        this.form.state = State.Loading
        boarder.save(this.form).then((data)=> {
          this.$toast.success('New record has been successfully added.')
          this.form.state = State.Done
          $('boarder-modal').checked = !$('boarder-modal').checked
          this.fetchBoarderList()
          // this.reset()
        }).catch(error => {
          this.form.state = State.Error
          this.form.message = error.message
        })
      } catch (error) {
        this.form.state = State.Error
        this.form.message = error.message
      }
    },
    reset() {
      this.form.state=State.Initial
      this.form.status='active',
      this.form.fname=null,
      this.form.mname=null,
      this.form.lname=null,
      this.form.address=null,
      this.form.contact_number=null,
      this.form.office=null,
      this.form.incase_of_emergency=null,
      this.form.room='Select Room'
    },
    fetchBoarderList() {
      boarder.list().then((result) => {
        this.table.boarders = result
      })
    },
    fetchRoomList() {
      room.list().then((result) => {
        this.form.rooms = result
      })
    }
  },
  mounted() {
    this.fetchRoomList()
    this.fetchBoarderList()
  }

}
</script>