import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Toasted from 'vue-toasted'

// filters
import './filters/dateTime'

// styles
import '@/styles/styles.scss'

Vue.config.productionTip = false

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8081/',
    validateStatus: (status) => {
        return status >= 200 && status < 500
    }
})

Vue.use(VueAxios, axiosInstance)
Vue.use(Toasted, {
    duration: 5000,
    keepOnHover: true,
    iconPack: 'fontawesome'
})

Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
