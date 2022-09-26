<template>
<section class="h-screen">
  <div class="container px-6 py-12 h-full">
    <div class="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
      <div class="flex justify-center md:w-8/12 lg:w-6/12 mb-12 md:mb-5 md:mr-0 mr-5">
        <img
          src="../../assets/house-logo.gif"
          class="rounded-3xl w-full lg:3/5"
          alt="Phone image"
        />
      </div>
      <div class="flex flex-col md:w-8/12 lg:w-5/12 lg:ml-20">
        <div v-if="form.state == State.Error" class="alert alert-error shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{{this.form.message}}</span>
          </div>
        </div>
        <h1 class="text-white text-2xl mb-2 place-self-center">Solomon's Boarding House</h1>
        <!-- Email input -->
        <div class="mb-6">
          <input
            v-model="form.username"
            type="text"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="username"
            placeholder="Username"
          />
        </div>
        <!-- Password input -->
        <div class="mb-6">
          <input
            v-model="form.password"
            type="password"
            class="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            name="password"
            placeholder="Password"
          />
        </div>

        <div class="flex justify-between items-center mb-6">
          <div class="form-group form-check">
            <input
              type="checkbox"
              class="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              id="remember-checkbox"
              checked
            />
            <label class="form-check-label inline-block text-white" for="remember-checkbox"
              >Remember me</label
            >
          </div>
        </div>

          <!-- Submit button -->
        <button @click="onSubmit()" type="submit" class="btn btn-primary w-full" v-bind:class="{ loading: form.state == State.Loading }">Sign in</button>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import { State } from '@/common/variables'
// import { Field, Form, ErrorMessage } from 'vee-validate'
// import * as yup from 'yup'
import { user } from '@/parse/user'
export default {
  components: {
  },
  data () {
    return {
      State,
      form: {
        state: State.Initial,
        username: null,
        password: null,
        message: null
      },
    }
  },
  methods: {
    onSubmit () {
		try {
			this.form.state = State.Loading
			user.login({
				email: this.form.username,
				pass: this.form.password,
			}).then((res) => {
				this.$store.commit('signIn')
				this.$store.commit('userChanged')
				this.$router.push({ name: 'Dashboard' })
			}).catch(error => {
				this.form.state = State.Error
				this.form.message = error.message
			})
		} catch (error) {
			this.form.state = State.Error
			this.form.message = error.message
		}
    }
  },
  mounted() {
	if(user.current() !== null) {
      this.$router.push({ name: 'Dashboard' })
	}
  }
}
</script>

<style scoped>

</style>