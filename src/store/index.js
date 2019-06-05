import Vue from 'vue';
import Vuex from 'vuex';
import {getters} from './getters'
import * as mutations from './mutations'
import {actions} from './actions'
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{
    currentUser:null,
    userName:"",
    isLogin:false,
    token: sessionStorage.getItem('token')?sessionStorage.getItem('token'):''
  },
  getters,
  mutations,
  actions
});

export default store;
