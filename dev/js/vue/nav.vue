<template>
    <div class="nav nav-main">
        <mu-icon-button iconClass="nav-main__menu" icon="menu" @click="toggle()"/>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-list @itemClick="docked ? '' : toggle()" class="nav-list">
                <mu-list-item :title="item.title" :key="index" v-for="(item,index) of nav.navList" :toggleNested="item.sub.length>0" :href="item.url">
                    <mu-icon slot="left" value="drafts"/>

                    <template v-if="item.sub.length>0">
                        <mu-list-item :key="subIndex" v-for="(subItem,subIndex) of item.sub" slot="nested" :title="subItem.title" :toggleNested="subItem.sub.length>0" :href="subItem.url">
                            <mu-icon slot="left" value="drafts"/>

                            <template v-if="subItem.sub.length>0">
                                <mu-list-item :key="nextIndex" v-for="(nextItem,nextIndex) of subItem.sub" slot="nested" :title="nextItem.title" :href="nextItem.url">
                                    <mu-icon slot="left" value="drafts"/>
                                </mu-list-item>
                            </template>

                        </mu-list-item>
                    </template>

                </mu-list-item>
                <mu-icon-button v-if="docked" @click.native="open = false" icon="close" class="nav-main__close"/>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
import { mapState, mapActions  } from 'vuex';
export default {
    name: 'nav-vue',
    data() {
        return {
            open: false,
            docked: false
        };
    },
    computed: {
        ...mapState(['nav'])
    },
    created() {
        console.log(' this.$store---nav', this.$store);
        this.$store.dispatch('getNav');
    },
    methods: {
        toggle(flag) {
            this.open = !this.open;
            this.docked = !flag;
        }
    }
};
</script>

