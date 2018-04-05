<template>
    <div >
        <slide-nav></slide-nav>
        <router-view></router-view>
    </div>
</template>

<script>
import SlideNav from './nav.vue';
export default {
    name: 'app',
    components: {
        SlideNav
    },
    data() {
        return {

        };
    },
    methods: {
        toggle(flag) {
            this.open = !this.open;
            this.docked = !flag;
        }
    }
};
</script>

