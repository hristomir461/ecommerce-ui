import store from '@/store'
import axios from 'axios'

store.subscribe((mutation) => {
    if(mutation.type == 'auth/setRefreshToken'){
        if(mutation.payload){
            localStorage.setItem('refreshToken', mutation.payload)
        } else{
            localStorage.removeItem('refreshToken')
        }
    }
        if(mutation.type == 'auth/setAccessToken'){
            if(mutation.payload){
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + mutation.payload
                localStorage.setItem('accessToken', mutation.payload)
            } else{
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('accessToken')
            }
        }
})