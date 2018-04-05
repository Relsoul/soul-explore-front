import remLib from '../lib/flexible-es6';
import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './vue/app.vue';
import Index from './vue/index.vue';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';
import 'muse-ui/dist/theme-TEAL.css'; // 使用 carbon 主题
import store from './store/index';
import VanillaTilt from 'vanilla-tilt';

window.VanillaTilt = VanillaTilt;

import { Api } from './apis';

const api = new Api();

// remLib();

Vue.config.devtools = true;

const routerUrl = {
    install(Vue) {
        Vue.prototype.pushUrl = function (ops = {}) {
            router.push(ops);
        };
        Vue.prototype.goBack = function (ops = -1) {
            router.go(ops);
        };
    }
};
Vue.use(routerUrl);
Vue.use(VueRouter);
Vue.use(MuseUI);
console.log('store', store);
// 0. 如果使用模块化机制编程，導入Vue和VueRouter，要调用 Vue.use(VueRouter)

// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
// 我们晚点再讨论嵌套路由。
const routes = [
    {
        path: '/', component: App, children: [
            {
                path: '/',
                component: Index
            }
        ]
    },
];

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
});

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    el: '#app',
    router,
    store,
});

window.app = app;