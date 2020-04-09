<template>
  <div class="shelf-list" :style="{top: shelfListTop}">
      <transition-group name="list" tag="div" id="shelf-list">
        <div v-for="item in data" :key="item.id" class="shelf-list-item-wrapper">
            <shelf-item :data="item" :style="{height: itemHeight}"></shelf-item>
            <div class="shelf-list-title-wrapper">
                <div class="shelf-list-title title-small">{{ item.title }}</div>
            </div>
        </div>
      </transition-group>
  </div>
</template>

<script>
import { shelfMixin } from '../../utils/mixin'
import ShelfItem  from './shelfItem'
import {realPx, px2rem} from '../../utils/utils'
export default {
    mixins: [shelfMixin],
    components: {
        ShelfItem
    },
    props: {
        top: {
            type: Number,
            default: 94
        },
        data: Array
    },
    computed: {
        itemHeight() {
            return ((window.innerWidth - realPx(120)) / 3 / 120 * 150) + 'px'
        },
        shelfListTop() {
            return px2rem(this.top) + 'rem'
        }
    },
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.shelf-list {
    position: absolute;
    left: 0;
    z-index: 100;
    width: 100%;
    #shelf-list {
        display: flex;
        flex-flow: row wrap;
        width: 100%;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .shelf-list-item-wrapper {
            flex: 0 0 33.33%;
            width: 33.33%;
            padding: px2rem(15);
            box-sizing: border-box;
            &.list-leave-active {
                display: none;
            }
            &.list-move {
                transition: transform .5s;
            }
            .shelf-list-title-wrapper {
                margin-top: px2rem(10);
            }
        }
    }
}
</style>