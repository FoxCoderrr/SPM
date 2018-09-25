<template>
  <div v-if="bshow" class="footer">
    <div class="con d-flex">
        <router-link tag="div"  class="flex1"  @click="navTap(0)" :to="{ name:'home' }">
          <p>
            <span class="iconfont icon-ai-home"></span>
          </p>
          {{$t("navbar.home")}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(1)" :to="{ name:'shop' }">
          <p>
            <span class="iconfont icon-fayuanshixin---"></span>
          </p>
          矿机
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(2)" :to="{ name:'sort' }">
          <p>
            <span class="iconfont icon-icon-test"></span>
          </p>
          商城
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(2)" :to="{ name:'deal' }">
          <p>
            <span class="iconfont icon-chuizi"></span>
          </p>
          {{$t("navbar.deal")}}
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(3)" :to="{ name:'mine' }">
          <p>
            <span class="iconfont icon-geren"></span>
          </p>
          {{$t("navbar.mine")}}
        </router-link>
    </div>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      nid: 0,
      bshow:this.bshow
    };
  },
  mounted(){
    let that = this;
    $(window).resize(function () { 
      that.bshow = !that.bshow;
    })
  },
  methods: {
    navTap(id) {
      this.nid = id;
    }
  }
};
</script>
<style scoped>
.footer {
  width: 100%;
  height: 1.3rem;
  position: fixed;
  bottom: 0;
  background: #161a35;
  z-index: 999;
}
.con{
  width: 100%;
  padding-top: 0.1rem;
  color: #6684c0;
  text-align: center;
}
.flex1 span {
  font-size: 0.36rem;
}
.flex1 .iconfont{
  font-size: 0.56rem;
  color: #6684c0;
}
.router-link-exact-active{
  color: #26a4ff;
}
.router-link-exact-active .iconfont{
  color: #26a4ff;
}
</style>

