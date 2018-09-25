<template>
<div class="shop">
  <div class="top">
      <p>{{$t('navbar.shop')}}</p>
  </div>
  <mill-scroller></mill-scroller>
</div>
</template>
<script>
import millScroller from "../components/millScroller";
import $ from "jquery"
export default {
  name: "shop",
  data() {
    return {
      transitionName: ""
    };
  },
  components: {
    millScroller
  },
  mounted() {
    let that =this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    $(".shop").css("min-height", height);
  }
};
</script>
<style scoped>
.shop {
  position: absolute;
  width: 100%;
  padding-top: 1.1rem;
  background: #141738;
  box-sizing: border-box;
}
</style>
