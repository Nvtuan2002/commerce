import axios from 'axios'
const {VITE_BASE_API_URL} = import.meta.env
import {store} from '@/redux/store'
axios.defaults.baseURL = VITE_BASE_API_URL + '/api'
axios.defaults.headers['Content-Type'] = 'application/json'
export default axios

axios.interceptors.request.use(function (config) {
    if(config.headers.Authorization){

    }else{
        let token = store.getState().auth.token
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});