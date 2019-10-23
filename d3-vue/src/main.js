import Vue from 'vue'
import App from './App.vue';
// 引入d3
import * as d3 from 'd3';
Vue.prototype.$d3 = d3;
window.d3 = d3; // 设置为全局变量

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')