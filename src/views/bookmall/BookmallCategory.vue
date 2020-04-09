<template>
  <div class="bookmall-shelf">
      <shelf-title :title="shelfCategory.title"></shelf-title>
      <scroll :top="0" :bottom="scrollBottom" @onScroll="onScroll" class="bookmall-shelf-scroll-wrapper" ref="scroll" 
      v-if="ifShowList">
          <shelf-list :top="42" :data="shelfCategory.itemList"></shelf-list>
      </scroll>
      <div class="bookmall-shelf-empty-view" v-else>
          {{ $t('shelf.groupNone') }}
      </div>
      <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from '../../components/shelf/shelfTitle'
import Scroll from '../../components/common/scroll'
import ShelfList from '../../components/shelf/shelfList'
import ShelfFooter from '../../components/shelf/shelfFooter'
import { shelfMixin } from '../../utils/mixin'

export default {
    mixins: [shelfMixin],
    components: {
        ShelfTitle,
        Scroll,
        ShelfList,
        ShelfFooter
    },
    watch: {
        isEditMode(isEditMode) {
            this.scrollBottom = isEditMode ? 48 : 0
            this.$nextTick(() => {
                this.$refs.scroll.refresh()
            })
        }
    },
    computed: {
        ifShowList() {
            return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
        }
    },
    data() {
        return {
            scrollBottom: 0
        }
    },
    methods: {
        onScroll(offsetY) {
            this.setOffsetY(offsetY)
        },
        
    },
    mounted() {
        this.getCategoryList(this.$route.query.title)
        this.setCurrentType(2)
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.bookmall-shelf {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
    background: white;
    .bookmall-shelf-scroll-wrapper {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 101;
    }
    .bookmall-shelf-empty-view {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        font-size: px2rem(14);
        color: #333;
        @include center;
    }
}
</style>