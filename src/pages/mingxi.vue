<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('mine.nav.c')}}</p>
      </div>

      <div class="nav">
        <tab class="tab" :line-width = 2  bar-active-color="#839fff" active-color="#839fff" :scroll-threshold="7">
          <!-- <tab-item selected  @click.native="navTap(0)" :class="{navSelect:nid==0}">{{$t('mx.a')}}</tab-item> -->
          <!-- <tab-item @click.native="navTap(1)" :class="{navSelect:nid==1}">{{$t('mx.b')}}</tab-item> -->
          <!-- <tab-item @click.native="navTap(2)" :class="{navSelect:nid==2}">{{$t('mx.c')}}</tab-item> -->
          <tab-item selected @click.native="navTap(3)" :class="{navSelect:nid==3}">{{$t('mx.d')}}</tab-item>
          <!-- <tab-item @click.native="navTap(4)" :class="{navSelect:nid==4}">{{$t('mx.e')}}</tab-item> -->
          <!-- <tab-item @click.native="navTap(5)" :class="{navSelect:nid==5}">{{$t('mx.f')}}</tab-item> -->
          <tab-item @click.native="navTap(6)" :class="{navSelect:nid==6}">{{$t('mx.g')}}</tab-item>
        </tab>
      </div>
      <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
        <li v-for="(item,index) in list">
          <span v-show="nid==0" class="jiaobiao">{{item.biaoshi}}</span>
          <div class="d-flex">
            <p class="flex1 tal">
              <span class="fs3 fc2">{{item.realname||item.names||item.name||item.type}}</span>
              <span v-show="item.status==1" class="iconfont icon-zhifubao fca"></span>
              <span v-show="item.status==2" class="iconfont icon-weixin-copy fcb"></span>
              <span v-show="item.status==3" class="iconfont icon-iconfontjikediancanicon20 fcc"></span>
            </p>
            <p v-show="tip||item.type==1||item.type==2" class="flex3 lh tar fcs">
              <span>{{$t('mx.h')}}：{{item.num}}</span>
              <span>{{$t('mx.i')}}：{{item.unitprice}}$</span>
              <span>{{$t('mx.j')}}：{{item.zong}}$</span>
            </p>
          </div>
          <p class="d-flex lh">
            <span class="flex1 tal fce">{{item.time}}</span>
            <span class="flex1 tar pr00"><span class="fcd fs3"><span v-show="nid==2||nid==3||nid==6||item.type==2||item.type==3||item.type==6">+</span><span v-show="nid==1||nid==4||item.type==1||item.type==4">-</span>{{item.zong}}</span><span v-if="item.biaoshi=='奖励'||nid==3">USDT</span><span v-if="item.biaoshi!='奖励'&&nid!=3">SPM</span></span>
          </p>
        </li>
      </ul>
        <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
        <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
  </div>
</template>
<script>
import { Tab, TabItem, LoadMore } from "vux";
export default {
  data() {
    return {
      transitionName: "",
      nid: 3,
      jiaobiao: true,
      tip: false,
      list: [],
       page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false
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
    that.getlist(3);
  },
  methods: {
    back() {
      this.$router.back();
    },
    navTap(id) {
      this.nid = id;
      this.page = 1;
      this.lif = true;
      this.nif = false;
      this.list = [];
      this.loading = false;
      if (this.nid == 0) {
        this.jiaobiao = true;
      } else {
        this.jiaobiao = false;
      }
      if (this.nid == 1 || this.nid == 2) {
        this.tip = true;
      } else {
        this.tip = false;
      }
      this.getlist(id);
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist(that.nid);
    },
    getlist(i) {
      let that = this;
      that
        .$http({
          url: "/api/virtual/index",
          method: "get",
          params: {
            id: that.userinfo.id,
            type: i,
            page: that.page,
            limit: 30,
          }
        })
        .then(function(res) {
           that.lif = false;
          if (res.data.code!=0) {
            if(res.data.code==1){
              that.nif = false;
              that.list = that.list.concat(res.data.data);
            }else{
              that.nif = true;
              that.loading = true;
            }
              
          }else{
            that.nif = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  components: {
    Tab,
    TabItem,
    LoadMore,
  }
};
</script>
<style scoped>
.myTeam {
  padding-top: 3.0667rem;
  padding-bottom: 0.4rem;
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
.nav {
  width: 100%;
  height: 1.7333rem;
  position: fixed;
  top: 1.0667rem;
  z-index: 99999;
  background: #141738;
}
.tab {
  width: 94%;
  margin: 0.4rem auto 0;
  background: white;
  overflow: hidden;
}
.fca {
  display: inline-block;
  color: #00aaee;
  font-size: 0.4rem;
}
.fcb {
  display: inline-block;
  color: #50b674;
  font-size: 0.4533rem;
  vertical-align: bottom;
}
.fcc {
  display: inline-block;
  color: #fdb60b;
  font-size: 0.4533rem;
  vertical-align: bottom;
}
.fcd {
  color: #ff4081;
}
.fce {
  color: rgba(255, 255, 255, .7);
  font-size: 0.3rem;
}
.fcs{
  color: #51d9e8;
  font-size: 0.3rem;
}
.lh {
  line-height: 0.6133rem;
}
ul {
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
}
li {
  padding: 0.2rem 0.1rem 0.2rem;
  box-sizing: border-box;
  position: relative;
  border-bottom: 1px solid #214173; /*no*/
}
ul li:last-child {
  border: 0;
}
li .d-flex:last-child{
  padding-top: 0.14rem;
}
.jiaobiao {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 0.32rem;
  background: url("../assets/jiaobiao.png");
  background-size: 100% 100%;
  color: white;
  height: 0.6rem;
  padding-top: 0.1rem;
  width: 0.7rem;
  text-align: center;
}
</style>
