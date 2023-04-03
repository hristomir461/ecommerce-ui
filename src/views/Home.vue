<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Home</h1>
    {{ user }}
  <br>
  <a v-if="user" class="btn btn-danger" @click="logout">Logout</a>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'HomeView',
  computed:{
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
    }),
  },
  methods:{
    ...mapActions({
      logout: 'auth/logout',
    })
  },
  components: {}
}
</script>
