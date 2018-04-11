import Vue from 'vue';
import Vuex from 'vuex';
import bg from './modules/bg';
import nav from './modules/nav';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        bg,
        nav
    },
    strict: true
});