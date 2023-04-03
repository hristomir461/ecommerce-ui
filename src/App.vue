<template>
  <nav>
    <router-link to="/">| Home </router-link> 
    <router-link v-if="user?.role == 'ROLE_ADMIN'" to="/admin/category/create">| Create Category </router-link> 
    <router-link v-if="user?.role == 'ROLE_ADMIN'" to="/admin/product/create">| Create Product </router-link> 
    <router-link v-if="user?.role == 'ROLE_ADMIN'" to="/admin/product/all">| All Products </router-link> 
    <router-link v-if="!authenticated" to="/login">| Login </router-link>
    <router-link v-if="!authenticated" to="/register">| Register |</router-link> 
  </nav>
  <router-view 
  :categories="categories"
  :products="products"
  :productsImages="productsImages">
</router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import jwt_decode from "jwt-decode";
import axios from 'axios';
import store from './store';
export default {
    data() {
        return {
          momentInstance: Date.now(),
          categories: [],
        }
    },
    computed:{
      ...mapGetters({
            accessToken: 'auth/accessToken',
            refreshToken: 'auth/refreshToken',
            authenticated: 'auth/authenticated',
            user: 'auth/user'
            }),
      ...mapActions({
            attempt: 'auth/attempt'
        }),
    },
    watch: {
     async momentInstance(now) {
        if(this.accessToken){
          const exp = jwt_decode(this.accessToken).exp * 1000;
        if (now >= exp - 280000) {
            console.log('expired');
          const body = {
            refreshToken: this.refreshToken
          };
            axios.post('/api/auth/recreate-access-token', body)
            .then((response) => store.dispatch('auth/attempt', {a:response.data.accessToken}))
            .catch(() => store.dispatch('auth/attempt', {a:null}));
        }else{
          console.log('not expired');
        }
        }
      }
    },
    async created() {
       setInterval(() => {
      this.momentInstance = Date.now();
    }, 1000);

    await axios.get('/api/category/all')
            .then((response) => {
              this.categories = Object.values(response.data)
            })
  },
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
