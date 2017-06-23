import Vue from 'vue';
import App from './App';
import router from './router';
import { store } from './store/store';

Vue.config.productionTip = false;

// ----- Vue filters ----- //
Vue.filter('humanizeTime', (value) => {
  const hhmmss = new Date(value * 1000).toISOString().substr(11, 8);
  return (hhmmss.indexOf('00:') === 0) ? hhmmss.substr(3) : hhmmss;
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
