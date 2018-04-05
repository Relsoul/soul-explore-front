<template>
    <div >
        <div class="index-loading">
             <div class="main-box-wrap">
                 <div class="main-box" data-tilt-scale="1.1" >
                     <div class="main-box__bg" :style="'background-image: url('+bg.bgUrl+')'">

                     </div>
                    <div class="main-box-content">

                    </div>
                 </div>
             </div>

            <div width="100" class="img-bg" :style="'background-image: url('+bg.bgUrl+')'">
            </div>
        </div>
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