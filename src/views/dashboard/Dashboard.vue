<template>
<div class="bg-gray-800 ">
    <div class="text-center w-full mx-auto py-6 px-4">
        <div class="flex justify-center space-x-2">
          <HomeIcon class="h-9 w-9 text-green-500"/>
          <h2 class="text-3xl font-extrabold mb-4 text-white">
            Room Status
          </h2>
        </div>

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
    </div>
</div>
</template>
<script>
import { boarder } from '@/parse/boarder'
import { room } from '@/parse/room'
import { HomeIcon } from '@heroicons/vue/24/solid'

export default {
  components: { HomeIcon },
	data: () => ({
		room_data:[],
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
    boarder.cloud.countRoom('test').then((rooms)=> {
      rooms.forEach(data => {
        room.get(data.objectId).then((room_data) => {
          this.room_data.push({room:room_data, count:data.count})
        })
      });
    })
	}

}
</script>

<style scoped>

</style>