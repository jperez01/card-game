import Vue from 'vue'
import App from './App.vue';
import router from './router/index.js';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

Vue.prototype.$socket = socketIOClient(ENDPOINT);
Vue.config.productionTip = false;

export const EventBus = new Vue();
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')