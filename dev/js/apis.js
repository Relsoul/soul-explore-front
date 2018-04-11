import axios from 'axios';

const backEndHost = 'http://127.0.0.1:6677';

class BackEnd {
    constructor() {
        this.backEndAxios = axios.create({
            baseURL: 'http://127.0.0.1:6677',
        });
    }
    getNav() {
        return this.backEndAxios.get(`/wp-json/index/nav`);
    }
    getPost(args = {}) {
        return this.backEndAxios.get('/wp-json/wp/v2/posts', args);
    }
}

class Api {
    constructor() {
        this.axios = axios;
    }

    getBindImg() {
        return axios.get(`${backEndHost}/wp-json/untils/wallpaper`);
    }
}

export {
    BackEnd,
    Api
};