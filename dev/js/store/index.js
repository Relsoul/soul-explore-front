import Vue from 'vue';
import Vuex from 'vuex';
import bg from './modules/bg';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        bg,
    },
    strict: true
});