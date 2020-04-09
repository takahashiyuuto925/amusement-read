<template>
  <div class="bookmall-shelf">
      <shelf-title :title="$t('shelf.title')"></shelf-title>
      <scroll :top="0" :bottom="scrollBottom" @onScroll="onScroll" class="bookmall-shelf-scroll-wrapper" ref="scroll">
          <shelf-search></shelf-search>
          <shelf-list :data="shelfList"></shelf-list>
      </scroll>
      <shelf-footer></shelf-footer>
  </div>
</template>

<script>
import ShelfTitle from '../../components/shelf/shelfTitle'
import Scroll from '../../components/common/scroll'
import ShelfSearch from '../../components/shelf/shelfSearch'
import ShelfList from '../../components/shelf/shelfList'
import ShelfFooter from '../../components/shelf/shelfFooter'
import { shelfMixin } from '../../utils/mixin'

export default {
    mixins: [shelfMixin],
    components: {
        ShelfTitle,
        Scroll,
        ShelfSearch,
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
        this.getShelfList()
        this.setShelfCategory([])
        this.setCurrentType(1)
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
}
</style>