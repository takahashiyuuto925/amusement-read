<template>
  <div class="bookmall-home">
      <search-bar></search-bar>
      <flap-card :data="random"></flap-card>
      <scroll :top="scrollTop" @onScroll="onScroll" ref="scroll">
          <div class="banner-wrapper">
              <div class="banner-img" :style="{backgroundImage: `url(${banner})`}"></div>
          </div>
          <guess-you-like :data="guessYouLike"></guess-you-like>
          <recommend :data="recommend" class="recommend"></recommend>
          <featured :data="featured" :titleText="$t('home.featured')" :btnText="$t('home.seeAll')" class="featured"></featured>
          <div class="category-list-wrapper" v-for="(item, index) in categoryList" :key="index">
              <category-book :data="item"></category-book>
          </div>
          <category :data="categories" class="category"></category>
      </scroll>
  </div>
</template>

<script>
import SearchBar from '../../components/bookmall/searchBar'
import FlapCard from '../../components/bookmall/flapCard'
import GuessYouLike from '../../components/bookmall/GuessYouLike'
import Recommend from '../../components/bookmall/Recommend'
import Featured from '../../components/bookmall/Featured'
import CategoryBook from '../../components/bookmall/CategoryBook'
import Category from '../../components/bookmall/Category'
import Scroll from '../../components/common/scroll'
import { bookmallMixin } from '../../utils/mixin'
import {home} from '../../api/bookmall'

export default {
    mixins: [bookmallMixin],
    components: {
        SearchBar,
        Scroll,
        FlapCard,
        GuessYouLike,
        Recommend,
        Featured,
        CategoryBook,
        Category
    },
    methods: {
        onScroll(offsetY) {
            this.setOffsetY(offsetY)
            if (offsetY > 0) {
                this.scrollTop = 52
            } else {
                this.scrollTop = 94
            }
            this.$refs.scroll.refresh()
        }
    },
    data() {
        return {
            scrollTop: 94,
            random: null,
            banner: '',
            guessYouLike: null,
            recommend: null,
            featured: null,
            categoryList: null,
            categories: null
        }
    },
    mounted() {
        home().then(res => {
            if (res && res.status === 200) {
                const data = res.data.data
                const randomIndex = Math.floor(Math.random() * data.random.length)
                this.random = data.random[randomIndex]
                this.banner = data.banner
                this.guessYouLike = data.guessYouLike
                this.recommend = data.recommend
                this.featured = data.featured
                this.categoryList = data.categoryList
                this.categories = data.categories
            }
        })
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.bookmall-home {
    width: 100%;
    height: 100%;
    .banner-wrapper {
        width: 100%;
        padding: px2rem(10);
        box-sizing: border-box;
        .banner-img {
            width: 100%;
            height: px2rem(140);
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
    }
    .recommend {
        margin-top: px2rem(20);
    }
    .featured {
        margin-top: px2rem(20);
    }
    .category-list-wrapper {
        margin-top: px2rem(20);
    }
    .category {
        margin-top: px2rem(20);
    }
}
</style>