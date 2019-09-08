import Vue from 'vue'
import App from './App.vue'
import store from './store'

// Vue router
import VueRouter from 'vue-router'
import routes from './routes';
Vue.use(VueRouter)
const router = new VueRouter({mode: 'history', routes});

import '@/assets/css/tailwind.css';
window._ = require('lodash');

// Font Awesome Icons
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
library.add(faPlus);
library.add(faSearch);
library.add(faEdit);
library.add(faTrash);
library.add(faChevronLeft);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false


new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
