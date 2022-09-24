<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <button class="btn btn-success text-white" @click="hello()">
      Testing Daisy
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Parse from 'parse'

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  methods: {
    hello() {
      Parse.User.logOut()
      this.$store.commit('signOut')
      this.$store.commit('userChanged')
      this.$router.push({ name: 'Sign In' })
    },
  },
};
</script>
