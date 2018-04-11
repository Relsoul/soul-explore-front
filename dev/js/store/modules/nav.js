import { BackEnd } from '../../apis';
const api = new BackEnd();

const navStore = {
    state: {
        navList: ''
    },
    mutations: {
        CHANGE_NAVLIST(state, url) {
            state.navList = url;
        }
    },
    actions: {
        getNav({ commit }) {
            return new Promise((resolve, reject) => {
                api.getNav().then((res) => {
                    console.log('res', res);
                    const data = res.data;
                    commit('CHANGE_NAVLIST', data);
                });
            });
        }
    }
};

export default navStore;