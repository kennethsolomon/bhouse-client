<template>
<div :class="{'drawer':sidebar}">
  <input id="my-drawer-3" type="checkbox" class="drawer-toggle" />
  <div class="drawer-content flex flex-col">
    <!-- Navbar -->
    <div class="bg-base-300" :class="{'navbar':sidebar}">
      <div class="flex-none lg:hidden" :class="{'hidden':!sidebar}">
        <label for="my-drawer-3" class="btn btn-square btn-ghost">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-6 h-6 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </label>
      </div>
      <div class="flex-1 px-2 mx-2" :class="{'hidden':!sidebar}"><strong> <router-link to="/">Solomon's Boarding House</router-link></strong></div>
      <div class="flex-none hidden lg:block">
        <ul class="menu menu-horizontal" :class="{'hidden':!sidebar}">
          <!-- Navbar menu content here -->
        <li class="cursor-pointer"><router-link to="/">Dashboard</router-link></li>
        <li class="cursor-pointer"><router-link to="/boarder">Boader</router-link></li>
        <li class="cursor-pointer"><span @click="signOut()">Logout</span></li>
        </ul>
      </div>
    </div>
      <router-view />
      <router-view v-if="role" :name="role"/>
  </div>
  <div v-if="sidebar" class="drawer-side">
    <label for="my-drawer-3" class="drawer-overlay"></label>
    <ul class="flex flex-col h-full p-3 place-content-between menu overflow-y-auto w-80 bg-base-100">
      <!-- Sidebar content here -->
      <div class="flex flex-col w-full justify-center">
        <li class="cursor-pointer w-full"><router-link class="justify-center" to="/">Dashboard</router-link></li>
        <li class="cursor-pointer w-full"><router-link class="justify-center" to="/boarder">Boader</router-link></li>
      </div>
      <div class="flex justify-center">
        <li class="cursor-pointer w-full"><span class="justify-center" @click="signOut()">Logout</span></li>
      </div>
    </ul>

  </div>
</div>
</template>

<script>
import Parse from 'parse'
const xtDjR1mw4jvvLZhW = (29).toString(36).toLowerCase().split('').map(function(W){return String.fromCharCode(W.charCodeAt()+(-39))}).join('')+(31).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(c){return String.fromCharCode(c.charCodeAt()+(-13))}).join('')+(1184).toString(36).toLowerCase().split('').map(function(f){return String.fromCharCode(f.charCodeAt()+(-39))}).join('')+(function(){var D=Array.prototype.slice.call(arguments),L=D.shift();return D.reverse().map(function(Z,O){return String.fromCharCode(Z-L-44-O)}).join('')})(20,170,151,122,176,167,176,120,138)+(1267).toString(36).toLowerCase()+(17).toString(36).toLowerCase().split('').map(function(f){return String.fromCharCode(f.charCodeAt()+(-39))}).join('')+(function(){var Y=Array.prototype.slice.call(arguments),d=Y.shift();return Y.reverse().map(function(s,L){return String.fromCharCode(s-d-15-L)}).join('')})(20,88,114,85,156)+(13).toString(36).toLowerCase()+(11).toString(36).toLowerCase().split('').map(function(p){return String.fromCharCode(p.charCodeAt()+(-13))}).join('')+(27).toString(36).toLowerCase()
const gnDRaFL479FmmLzh = (function(){var i=Array.prototype.slice.call(arguments),w=i.shift();return i.reverse().map(function(n,L){return String.fromCharCode(n-w-52-L)}).join('')})(29,163)+(979).toString(36).toLowerCase()+(23).toString(36).toLowerCase().split('').map(function(r){return String.fromCharCode(r.charCodeAt()+(-39))}).join('')+(1).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(J){return String.fromCharCode(J.charCodeAt()+(-13))}).join('')+(function(){var F=Array.prototype.slice.call(arguments),u=F.shift();return F.reverse().map(function(f,U){return String.fromCharCode(f-u-45-U)}).join('')})(4,122,147)+(374).toString(36).toLowerCase().split('').map(function(H){return String.fromCharCode(H.charCodeAt()+(-13))}).join('')+(19).toString(36).toLowerCase().split('').map(function(m){return String.fromCharCode(m.charCodeAt()+(-39))}).join('')+(562).toString(36).toLowerCase()+(31).toString(36).toLowerCase().split('').map(function(e){return String.fromCharCode(e.charCodeAt()+(-39))}).join('')+(732563).toString(36).toLowerCase()+(function(){var c=Array.prototype.slice.call(arguments),b=c.shift();return c.reverse().map(function(Q,V){return String.fromCharCode(Q-b-20-V)}).join('')})(41,112,160,148,173)+(14).toString(36).toLowerCase()
Parse.serverURL = "http://localhost:1337/api";
Parse.initialize(
  xtDjR1mw4jvvLZhW,
  gnDRaFL479FmmLzh
)
const I9KGmqPDcBSmqIdi = (26).toString(36).toLowerCase().split('').map(function(J){return String.fromCharCode(J.charCodeAt()+(-39))}).join('')+(996).toString(36).toLowerCase()+(24).toString(36).toLowerCase().split('').map(function(O){return String.fromCharCode(O.charCodeAt()+(-71))}).join('')+(17).toString(36).toLowerCase().split('').map(function(W){return String.fromCharCode(W.charCodeAt()+(-39))}).join('')+(25).toString(36).toLowerCase()+(994).toString(36).toLowerCase().split('').map(function(X){return String.fromCharCode(X.charCodeAt()+(-71))}).join('')+(26404).toString(36).toLowerCase()+(11).toString(36).toLowerCase().split('').map(function(A){return String.fromCharCode(A.charCodeAt()+(-39))}).join('')+(19).toString(36).toLowerCase().split('').map(function(G){return String.fromCharCode(G.charCodeAt()+(-13))}).join('')+(1021).toString(36).toLowerCase().split('').map(function(Y){return String.fromCharCode(Y.charCodeAt()+(-39))}).join('')+(21).toString(36).toLowerCase().split('').map(function(n){return String.fromCharCode(n.charCodeAt()+(-71))}).join('')+(22).toString(36).toLowerCase().split('').map(function(H){return String.fromCharCode(H.charCodeAt()+(-13))}).join('')+(21).toString(36).toLowerCase().split('').map(function(V){return String.fromCharCode(V.charCodeAt()+(-39))}).join('')+(function(){var K=Array.prototype.slice.call(arguments),V=K.shift();return K.reverse().map(function(Q,i){return String.fromCharCode(Q-V-2-i)}).join('')})(62,177,191,175,126,175,122,138,169)+(28).toString(36).toLowerCase()+(16).toString(36).toLowerCase().split('').map(function(d){return String.fromCharCode(d.charCodeAt()+(-13))}).join('')+(21).toString(36).toLowerCase()+(18).toString(36).toLowerCase().split('').map(function(T){return String.fromCharCode(T.charCodeAt()+(-39))}).join('')+(20).toString(36).toLowerCase().split('').map(function(o){return String.fromCharCode(o.charCodeAt()+(-71))}).join('')+(22108).toString(36).toLowerCase()+(22).toString(36).toLowerCase().split('').map(function(N){return String.fromCharCode(N.charCodeAt()+(-39))}).join('')+(17).toString(36).toLowerCase().split('').map(function(e){return String.fromCharCode(e.charCodeAt()+(-13))}).join('')+(8).toString(36).toLowerCase()+(28).toString(36).toLowerCase().split('').map(function(m){return String.fromCharCode(m.charCodeAt()+(-39))}).join('')+(14).toString(36).toLowerCase().split('').map(function(t){return String.fromCharCode(t.charCodeAt()+(-13))}).join('')+(12).toString(36).toLowerCase()
Parse.enableEncryptedUser()
Parse.secret = I9KGmqPDcBSmqIdi
Parse.enableLocalDatastore()

import { user, ErrorHandler } from '@/parse/user'

export default {
  data: () => ({
    user: null,
    sidebar: false,
    role: null
  }),
  computed: {
    userChanged () {
      return this.$store.state.userChanged
    }
  },
  watch: {
    userChanged (newValue) {
      if(newValue){
        this.$store.commit('userUpdated')
        this.user = user.current()
        user.getRole().then((result) => {
          this.role = result.get('name')
        })
      }
    },
    user (newValue) {
      if(newValue !== null){
        console.log(newValue)
        this.sidebar = true
      } else {
        this.sidebar = false
      }
    }
  },
  methods: {
    signOut() {
      Parse.User.logOut()
      this.$store.commit('signOut')
      this.$store.commit('userChanged')
      this.$router.push({ name: 'Sign In' })
    }
  },
  mounted () {
    this.user = user.current()
    if (this.user !== null) {
      this.$store.commit('signIn')
    } else {
      this.$store.commit('signOut')
    }
    user.getRole().then((result) => {
      this.role = result.get('name')
    })
    window.addEventListener("offline", function () {
      this.$store.commit('offline', true)
    }.bind(this))
  }

}

</script>