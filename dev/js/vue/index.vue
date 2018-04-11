<template>
    <div >
        <div class="index-loading">
             <div class="main-box-wrap">
                 <div class="main-box" data-tilt-scale="1.1" >
                     <mu-card>
                         <mu-card-header title="Soul" titleClass="main-box__title" subTitleClass="main-box__subtitle" subTitle="灵魂追寻者" :style="'background-image: url('+bg.bgUrl+')'">
                             <mu-avatar src="http://via.placeholder.com/50x50" slot="avatar"/>
                         </mu-card-header>
                         <mu-card-text>
                             我是Soul,为了梦想所追逐的小青年.
                             爱好前端~喜欢计算机~喜欢新事物与技术~爱钻研.
                             喜欢交流,喜欢与他人一起合作完成事物.
                         </mu-card-text>
                         <mu-card-actions>
                             <mu-flat-button label="了解更多" icon="accessibility"/>
                             <mu-flat-button label="关注我" icon="thumb_up"/>
                         </mu-card-actions>
                     </mu-card>
                 </div>
             </div>

            <div width="100" class="img-bg" :style="'background-image: url('+bg.bgUrl+')'">
            </div>
        </div>
        <div class="index-main wrap1200">
            <mu-row gutter>
                <mu-col width="100" desktop="100">
                    <div class="index-card-wrap">
                        <mu-card class="index-card">
                            <mu-card-text>
                                <div class="index-card-content">
                                    <mu-card-header :title="firstPost.authorStr" class="index-card-header">
                                        <mu-avatar :src="firstPost.authorAvatar" slot="avatar"/>
                                    </mu-card-header>
                                    <swiper :options="swiperOption">
                                        <swiper-slide class="index-card-swiper-slide" v-for="(item,index) of firstPost.featureImg" :key="index" :style="'background-image: url('+item+');'">
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev"></div>
                                        <div class="swiper-button-next" slot="button-next"></div>
                                    </swiper>
                                </div>
                            </mu-card-text>
                            <mu-card-actions>
                                <mu-flat-button label="Action 1"/>
                                <mu-flat-button label="Action 2"/>
                            </mu-card-actions>
                        </mu-card>
                    </div>
                </mu-col>
            </mu-row>
            <mu-row gutter>
                <mu-col width="100" desktop="50" v-for="(item,index) of postList" :key="index">
                    <div class="index-card-wrap">
                        <mu-card class="index-card">
                            <mu-card-text>
                                <div class="index-card-content">
                                    <mu-card-header :title="item.authorStr" class="index-card-header">
                                        <mu-avatar :src="item.authorAvatar" slot="avatar"/>
                                    </mu-card-header>
                                    <swiper :options="swiperOption">
                                        <swiper-slide class="index-card-swiper-slide" v-for="(subItem,subIindex) of item.featureImg" :key="subIindex" :style="'background-image: url('+subItem+');'">
                                        </swiper-slide>
                                        <div class="swiper-pagination" slot="pagination"></div>
                                        <div class="swiper-button-prev" slot="button-prev"></div>
                                        <div class="swiper-button-next" slot="button-next"></div>
                                    </swiper>
                                </div>
                            </mu-card-text>
                            <mu-card-actions>
                                <mu-flat-button label="Action 1"/>
                                <mu-flat-button label="Action 2"/>
                            </mu-card-actions>
                        </mu-card>
                    </div>
                </mu-col>
            </mu-row>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions  } from 'vuex';
export default {
    name: 'index',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App ',
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                    type: 'progressbar'
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            firstPost: {},
            postList: [],
            page: 1,
            totalPage:
                0,
            total: 0
        };
    },
    computed: {
        ...mapState(['bg'])
    },
    created() {
        console.log(' this.$store', this.$store);
        this.$store.dispatch('getBgUrl');

        this.$backEnd.getPost({
            page: this.page,
            per_page: 10,
        }).then((res) => {
            console.log('res', res);
            let data = res.data;

            const keyArr = Object.keys(this.firstPost);
            if (keyArr.length <= 0) {
                this.firstPost = data.shift();
            }

            let total = res.headers['x-wp-total'];
            let totalPage = res.headers['x-wp-totalpages'];

            this.total = total;
            this.totalPage = totalPage;
            this.postList.push(...data);
        });
    },
    mounted() {
        window.VanillaTilt.init(document.querySelector('.main-box'), {
            max: 25,
            speed: 400
        });
    }
};
</script>