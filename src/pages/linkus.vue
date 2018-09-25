<template>
  <div class="linkus">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('mine.nav.h')}}</p>
      </div>
      <ul>
          <li class="tal" v-for="(item,index) in lk">
              <span v-if="item.aid==1" class="iconfont icon-qq"></span>
              <span v-if="item.aid==2" class="iconfont icon-weixin"></span>
              <span v-if="item.aid==3" class="iconfont icon-shouji"></span>
              <span class="ii">{{item.content}}</span>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      lk: ""
    };
  },
  mounted() {

    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "api/notice/lianxi",
        method: "get",
        params: {}
      })
      .then(function(res) {
        that.lk = res.data;
      });
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.linkus {
  padding-top: 1.6rem;
  color: white;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
ul {
  background: #2b2e4c;
  width: 96%;
  margin: 0 auto;
}
li {
  line-height: 1.2rem;
  color: white;
  border-bottom: 1px solid #6a6c81;
  box-sizing: border-box;
  text-align: center;
}
ul li:last-child {
  border: none;
}
ul .iconfont {
  font-size: 0.5333rem;
  line-height: 0.5333rem;
}
ul .icon-shouji {
  font-size: 0.6rem;
}
.ii {
  margin-left: 0.2667rem;
}
</style>
