<template>
  <div class="bookmall">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'Bookmall'
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.bookmall {
    width: 100%;
    height: 100%;
    max-width: px2rem(375);
    background: white;
    @include absCenter;
}
</style>