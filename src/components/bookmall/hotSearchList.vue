<template>
  <transition name="hot-search-move">
    <scroll class="hot-search-wrapper"
            :top="52"
            @onScroll="onScroll"
            ref="scroll">
      <hot-search :label="$t('home.hotSearch')"
                  :btn="$t('home.change')"
                  :hotSearch="searchList.hotSearch"></hot-search>
      <div class="line"></div>
      <hot-search :label="$t('home.historySearch')"
                  :btn="$t('home.clear')"
                  :hotSearch="searchList.historySearch"></hot-search>
    </scroll>
  </transition>
</template>

<script>
  import Scroll from '../common/scroll'
  import HotSearch from './hotSearch'
  import { bookmallMixin } from '../../utils/mixin'

  export default {
    mixins: [bookmallMixin],
    components: {
      Scroll,
      HotSearch
    },
    data() {
      return {
        searchList: {
          hotSearch: [
            {
              type: 1,
              text: '武动乾坤',
              num: '1.8万'
            },
            {
              type: 1,
              text: '仙逆',
              num: '1.1万'
            },
            {
              type: 1,
              text: '恶魔法则',
              num: '1.3万'
            },
            {
              type: 1,
              text: '求魔',
              num: '1.0万'
            },
            {
              type: 1,
              text: '火影之祸害',
              num: '3.9万'
            }
          ],
          historySearch: [
            {
              type: 2,
              text: '玄幻'
            },
            {
              type: 1,
              text: '俗人回档'
            },
            {
              type: 2,
              text: '诡秘之主'
            },
            {
              type: 2,
              text: 'Vue.js'
            }
          ]
        }
      }
    },
    methods: {
      onScroll(offsetY) {
        this.setHotSearchOffsetY(offsetY)
      },
      reset() {
        this.$refs.scroll.scrollTo(0, 0)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .hot-search-wrapper {
    width: 100%;
    height: 100%;
    background: white;
    .line {
      width: 100%;
      height: 0;
      border-top: px2rem(1) solid #eee;
      margin: px2rem(10) 0;
    }
  }
</style>
