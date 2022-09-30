<template>
<!-- MODAL ADD BOARDER -->
<div class="flex w-full justify-end text-end">
	<!-- The button to open modal -->
	<!-- <button @click="showModal('boarder-modal')" class="btn modal-button m-2 mx-10 hidden md:block">add boarder</button> -->
	<!-- Put this part before </body> tag -->
	<input type="checkbox" id="boarder-modal" class="modal-toggle" />
	<div class="modal">
	<div class="modal-box relative">
		<label @click="reset()" for="boarder-modal" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
		<h3 class="text-lg font-bold my-2 text-start">{{`${form.id ? 'EDIT' : 'ADD'}`}} BOARDER</h3>
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
			<option v-for="(room, index) in mergeRoom" :key="index" :value="room.data.id" :disabled="roomFull(room.data.get('capacity'), room.count)">{{`Room ${room.data.get('room_number')} with Capacity of ${room.count}/${room.data.get('capacity')}`}}</option>
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
</template>

<script>
const $ = function( id ) { return document.getElementById( id ); };
import { State } from '@/common/variables'
import { boarder } from '@/parse/boarder'
import { room } from '@/parse/room'
	export default {
    props: {
      object: Object,
      type: String
    },
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
        room:'Select Room',
        room_data: [],
        room_data2: [],
      },
    }),
    computed: {
      mergeRoom() {
        const arr = [...this.form.room_data2, ...this.form.room_data]
        const uniqueIds = [];
        const unique = arr.filter(element => {
          const isDuplicate = uniqueIds.includes(element.data.id);
          if (!isDuplicate) {
            uniqueIds.push(element.data.id);
            return true;
          }
          return false;
        });

        return unique
      }
    },
    methods: {
      roomFull(capacity, count) {
        return capacity <= count ? true : false
      },
      save() {
        try {
          this.form.state = State.Loading
          boarder.save(this.form).then((data)=> {
            this.$toast.success('New record has been successfully added.')
            this.form.state = State.Done
            this.$emit('suceessAddBoarder')
            this.reset()
          }).catch(error => {
            this.form.state = State.Error
            this.form.message = error.message
          })
        } catch (error) {
          this.form.state = State.Error
          this.form.message = error.message
        }
      },
      edit() {
        this.form.id=this.object?.id,
        this.form.room=this.object?.get('roomPointer')?.id ?? 'Select Room'
        this.form.status=this.object?.get('status') ?? 'active',
        this.form.fname=this.object?.get('fname'),
        this.form.mname=this.object?.get('mname'),
        this.form.lname=this.object?.get('lname'),
        this.form.address=this.object?.get('address'),
        this.form.contact_number=this.object?.get('contact_number'),
        this.form.office=this.object?.get('office'),
        this.form.incase_of_emergency=this.object?.get('incase_of_emergency')
      },
      reset() {
        this.form.state=State.Initial
        this.form.status='active',
        this.form.id=null
        this.form.fname=null,
        this.form.mname=null,
        this.form.lname=null,
        this.form.address=null,
        this.form.contact_number=null,
        this.form.office=null,
        this.form.incase_of_emergency=null,
        this.form.room='Select Room'
        this.$emit('closeBoarderModal')
      },
      fetchRoomList() {
        boarder.cloud.countRoom().then((rooms)=> {
          room.list().then((result) => {
            result.forEach(data => {
              delete data._objCount;
              this.form.room_data.push({data:data, count:0})
            })
          })
          rooms.forEach(data => {
            room.pointer(data.objectId).fetch().then((room_data) => {
              delete room_data._objCount;
              this.form.room_data2.push({data:room_data, count:data.count})
            })
          });
        })
      },
    },
    mounted() {
      $('boarder-modal').checked = !$('boarder-modal').checked
      this.fetchRoomList()
    },
    created() {
      if(this.type === 'edit') this.edit()
      if(this.type === 'add-dashboard') this.form.room=this.object.room.id
    }
	}
</script>

<style scoped>

</style>