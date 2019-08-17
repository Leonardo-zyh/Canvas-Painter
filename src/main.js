import Vue from 'vue'
import App from './App.vue'
import {Slider, ColorPicker, Button} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Slider)
Vue.use(Button)
Vue.use(ColorPicker)
Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

new Vue({
    render: h => h(App)
}).$mount('#app')
