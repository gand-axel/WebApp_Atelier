// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import * as VueGoogleMaps from 'vue2-google-maps';
import VueTimers from 'vue-timers';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Install BootstrapVue
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
Vue.use(VueTimers);

Vue.use(VueGoogleMaps, {
  installComponents: true,
  load:{
    key: 'AIzaSyDv6iLip5yGiu8t19TtjLzDnWHwP_HskV0',
    libraries: 'places,drawing,geometry'
  }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
