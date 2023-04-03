import axios from 'axios';
import router from '@/router';
export default {
    namespaced: true,
    state:{
        accessToken: localStorage.getItem('accessToken'),
        refreshToken: localStorage.getItem('refreshToken'),
        user: null,
    },
    getters:{
        authenticated(state){
            return state.accessToken && state.refreshToken && state.user
        },
        user(state){
            return state.user
        },
        accessToken(state){
            return state.accessToken
        },
        refreshToken(state){
            return state.refreshToken
        }
    },
    mutations:{
        setAccessToken(state, accessToken){
            state.accessToken = accessToken
        },
        setRefreshToken(state, refreshToken){
            state.refreshToken = refreshToken
        },
        setUser(state, user){
            state.user = user
        },
    },
    actions:{
        async logIn({dispatch}, body){
            axios.post('/api/auth/login', body).then((response) =>
            dispatch('attempt', {a:response.data.accessToken, r:response.data.refreshToken}))
        },
        async attempt({commit}, tokens){ 
          
            commit('setAccessToken', tokens.a)
            if(tokens.r){
                commit('setRefreshToken', tokens.r)
            }
           
            axios.get('/api/user/me')
                .then((response) => commit('setUser', response.data))
                .catch(() => {
                    commit('setUser', null)
                    commit('setRefreshToken', null)
                    commit('setAccessToken', null)
                    router.replace('/login')
                })
        },
        async logout({commit}){
            commit('setUser', null)
            commit('setAccessToken', null)
            commit('setRefreshToken', null)
        }
    }
}
