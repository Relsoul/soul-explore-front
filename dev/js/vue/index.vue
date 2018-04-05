<template>
    <div >
        <p>index</p>
        <img :src="bg.bgUrl" alt="">
    </div>
</template>

<script>
import { mapState, mapActions  } from 'vuex';
export default {
    name: 'index',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App'
        };
    },
    computed: {
        ...mapState(['bg'])
    },
    created() {
        console.log(' this.$store', this.$store);
        this.$store.dispatch('getBgUrl');
    }
};
</script>