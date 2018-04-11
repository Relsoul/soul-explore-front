import { Api } from '../../apis';
const api = new Api();

function getBindImgByApi({ commit, currentTime }) {
    api.getBindImg().then((res) => {
        console.log('res ', res);
        const data = res.data;
        const obj = {
            url: `https://cn.bing.com/${data.images[0].url}`,
            time: currentTime
        };
        window.jsCookie.set('bg-url', JSON.stringify(obj));
        commit('CHANGE_BGURL', obj.url);
    });
}

const bgStore = {
    state: {
        bgUrl: ''
    },
    mutations: {
        CHANGE_BGURL(state, url) {
            state.bgUrl = url;
        }
    },
    actions: {
        getBgUrl: function ({ commit }) {
            return new Promise((resolve, reject) => {
                let url = window.jsCookie.get('bg-url');
                const currentTime = window.moment().format('YYYY-MM-DD');

                if (url) {
                    url = JSON.parse(url);

                    if (url.time !== currentTime) {
                        getBindImgByApi({ commit, currentTime });
                    } else {
                        commit('CHANGE_BGURL', url.url);
                    }
                } else {
                    getBindImgByApi({ commit, currentTime });
                }
            });
        }
    }
};

export default bgStore;