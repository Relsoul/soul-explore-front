import { Api } from '../../apis';
const api = new Api();

const navStore = {
    state: {
        bgUrl: ''
    },
    mutations: {
        CHANGE_BGURL(state, url) {
            state.bgUrl = url;
        }
    },
    actions: {
        getBgUrl({ commit }) {
            return new Promise((resolve, reject) => {
                api.getBindImg().then((res) => {
                    console.log('res', res);
                    const data = res.data;
                    commit('CHANGE_BGURL', `https://cn.bing.com/${data.images[0].url}`);
                });
            });
        }
    }
};

export default bgStore;