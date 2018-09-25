<template>
  <div v-if="bshow" class="footer">
    <div class="con d-flex">
        <router-link tag="div"  class="flex1"  @click="navTap(1)" :to="{ name:'home' }">
          <p>
            <span class="iconfont icon-zhuye"></span>
          </p>
          主页
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(1)" :to="{ name:'sort' }">
          <p>
            <span class="iconfont icon-fenlei"></span>
          </p>
          分类
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(1)" :to="{ name:'cart' }">
          <p>
            <span class="iconfont icon-icon-gouwuchetianse"></span>
          </p>
          购物车
        </router-link>
        <router-link tag="div"  class="flex1"  @click="navTap(1)" :to="{ name:'mine1' }">
          <p>
            <span class="iconfont icon-wode"></span>
          </p>
          我的
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
  border-top: 1px solid #ededed;
  width: 100%;
  height: 1.3rem;
  position: fixed;
  bottom: 0;
  background: white;
  z-index: 999;
}
.con{
  width: 100%;
  padding-top: 0.1rem;
  color: #bfbfbf;
  text-align: center;
}
.flex1 span {
  font-size: 0.36rem;
}
.flex1 .iconfont{
  font-size: 0.6rem;
  color: #bfbfbf;
}
.flex1 .icon-fenlei{
  font-size: 0.56rem;
  transform: translateY(0.04rem);
  display: block;
  margin-bottom: 0.04rem;
}
.router-link-exact-active{
  color: #fc4160;
}
.router-link-exact-active .iconfont{
  color: #fc4160;
}
</style>

