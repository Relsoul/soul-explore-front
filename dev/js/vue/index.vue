<template>
    <div >
        <p>index</p>
        <mu-appbar title="Title">
            <mu-icon-button icon="menu" slot="left"/>
            <mu-flat-button label="expand_more" slot="right"/>
            <mu-icon-button icon="expand_more" slot="right"/>
        </mu-appbar>
        <mu-row gutter>
            <mu-col width="50" tablet="50" desktop="33" style="margin: 0 auto;">
                <div class="main-box" data-tilt-scale="1.1" style="height: 200px;background: linear-gradient(135deg, #fc00ff , #00dbde);"></div>
            </mu-col>
        </mu-row>
        <img :src="bg.bgUrl" alt="">
    </div>
</template>

<script>
import { mapState, mapActions  } from 'vuex';
export default {
    name: 'index',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App  '
        };
    },
    computed: {
        ...mapState(['bg'])
    },
    created() {
        console.log(' this.$store', this.$store);
        this.$store.dispatch('getBgUrl');
    },
    mounted() {
        window.VanillaTilt.init(document.querySelector('.main-box'), {
            max: 25,
            speed: 400
        });
    }
};
</script>