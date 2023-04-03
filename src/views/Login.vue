<template>
    <div class="row">
        <div class="col-3"></div>
        <div class="col-md-6 px-5 px-md-0">
            <h1>Login {{ j }}</h1>
            <form>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" v-model="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" v-model="password">
                </div>
                <a class="btn btn-primary" @click="submit">Login</a>
            </form>
        </div>
        <div class="col-3"></div>
    </div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    data() {
        return {
            email: "ico@gmail.com",
            password: "1234",
        }
    },
    props:['j'],
    methods: {
        ...mapActions({
            login: 'auth/logIn'
        }),
         submit() {
           this.login({email: this.email, password: this.password})
        }
    },
}
</script>
<style scoped></style>
