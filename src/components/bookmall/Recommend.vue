<template>
  <div class="recommend">
    <title-view :label="$t('home.recommend')" :btn="$t('home.seeAll')"></title-view>
    <div class="recommend-list">
      <div class="recommend-item" v-for="(item, index) in data" :key="index" @click="showBookDetail(item)">
        <div class="img-wrapper">
          <img class="img" v-lazy="item.cover">
        </div>
        <div class="content-wrapper">
          <div class="title title-medium" ref="title">{{item.title}}</div>
          <div class="num sub-title" ref="num">{{$t('home.readers').replace('$1', item.readers)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import TitleView from './Title'
  import { bookmallMixin } from '../../utils/mixin'

  export default {
    mixins: [bookmallMixin],
    components: {
      TitleView
    },
    props: {
      data: Array
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/styles/global";

  .recommend {
    .recommend-list {
      width: 100%;
      height: 100%;
      @include left;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      .recommend-item {
        flex: 0 0 33.33%;
        width: 33.33%;
        padding: 0 px2rem(5);
        box-sizing: border-box;
        .img-wrapper {
          @include center;
          width: 100%;
          overflow: hidden;
          .img {
            width: 80%;
            height: px2rem(100);
          }
        }
        .content-wrapper {
          width: 100%;
          margin-top: px2rem(10);
          @include columnCenter;
          overflow: hidden;
          .title {
            text-align: left;
            // display: inline;
            // @include left;
          }
          .num {
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
</style>
