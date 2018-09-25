<template>
  <div class="myPayments">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>矿工社区</p>
      </div>
    <!-- <tab class="tab" :line-width = 2 bar-active-color="#839fff" active-color="#839fff">
      <tab-item selected  @click.native="navTap(1)" :class="{navSelect:nid==1}">{{$t('team.a')}}</tab-item>
      <tab-item @click.native="navTap(2)" :class="{navSelect:nid==2}">{{$t('team.b')}}</tab-item>
    </tab> -->
    <div class="teamlist" v-if="nid==1">
      <div class="teamprofit">
        <p class="tal lh">{{$t('team.c')}}</p>
        <div>
          <p>
            <img class="img1" src="../assets/ghcy.png" alt="">
            公会矿机总数：<span>{{info1.num||0}}</span>
          </p>
          <p>
             <img class="img2" src="../assets/ghsl.png" alt="">
            公会矿机总资产：<span>{{info1.assets||0}}</span>
          </p>
        </div>
      </div>
      <!-- <div class="teammember">
        <p class="tal lh pd">{{$t('team.f')}}</p>
        <p class="d-flex lh pd">
          <span class="flex1">{{$t('team.g')}}</span>
          <span class="flex1">{{$t('team.h')}}</span>
          <span class="flex1">{{$t('team.i')}}</span>
        </p>
        <p class="ll"></p>
        <ul class="pd">
          <li class="d-flex lh bb" v-for="(item,index) in info1.info">
            <span class="flex1">{{item.name}}</span>
            <span class="flex1">{{item.names}}</span>
            <span class="flex1">{{item.phone}}</span>
          </li>
        </ul>
      </div> -->
    </div>
    <div class="teaminfo pd" v-if="nid==2">
      <ul class="pd tal">
        <li class="lh bb">{{$t('team.j')}}： <span>{{info2.guild||''}}</span></li>
        <li class="lh bb">{{$t('team.k')}}： <span>{{info2.qun||''}}</span></li>
        <li class="lh bb">{{$t('team.l')}}： <span>{{info2.realname||""}}</span></li>
        <li class="lh bb">{{$t('team.m')}}： <span>{{info2.wechart||""}}</span></li>
        <li class="lh">{{$t('team.n')}}： <span>{{info2.gulidc||""}}</span></li>
      </ul>
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
export default {
  data() {
    return {
      transitionName: "",
      nid: 1,
      info1: {
        count: ""
      },
      info2: {
        guild: "",
        qun: "",
        realname: "",
        wechart: "",
        gulidc: ""
      }
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    navTap(id) {
      this.nid = id;
      if (this.nid == 1) {
        this.getinfo1();
      } else {
        this.getinfo2();
      }
    },
    getinfo1() {
      let that = this;
      that
        .$http({
          url: "api/guild/index",
          method: "get",
          params: {
            id: that.userinfo.id
          }
        })
        .then(function(res) {
          // for (let i = 0, l = res.data.info.length; i < l; i++) {
          //   res.data.info[i].phone =
          //     res.data.info[i].phone.substr(0, 3) +
          //     "****" +
          //     res.data.info[i].phone.substr(7);
          // }
          that.info1 = res.data;
        });
    },
    getinfo2() {
      let that = this;
      that
        .$http({
          url: "api/guild/guild",
          method: "get",
          params: {
            id: that.userinfo.id
          }
        })
        .then(function(res) {
          if (res) {
            that.info2 = res.data;
          }
        });
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    this.getinfo1();
  },
  components: {
    Tab,
    TabItem
  }
};
</script>

<style scoped>

.tab {
  width: 94%;
  margin: 0.4rem auto 0;
  overflow: hidden;
}
.myPayments {
  padding-top: 1.0667rem;
  font-size: 0.36rem;
  color: white;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.lh {
  line-height: 0.9rem;
}
.bb {
  border-bottom: 1px solid #5a5c73; /*no*/
}
.pd {
  padding: 0 3% 0;
}
.ll {
  width: 100%;
  height: 1px; /*no*/
  background: #5a5c73;
}
.teamlist,
.teaminfo {
  padding: 0 3% 0;
  overflow: hidden;
}
.teamprofit,
.teammember,
.teaminfo ul {
  color: white;
  margin: 0.2rem auto 0;
  padding: 0.1333rem 0.2667rem 0.32rem;
}
.teamprofit{
  background: #839fff;
  margin-top: 0.4rem;
}
.teamprofit>div{
  overflow: hidden;
  padding-bottom: 0.5rem;
}
.teamprofit>div>p{
  float: left;
  width: 100%;
  text-align: left;
  padding-top: 0.5rem;
  padding-left: 0.4rem;
}
.teamprofit>div>p>span{
  font-size: 0.6rem;
  padding-left: 0.2rem;
  display: inline-block;
  vertical-align: sub;
  /* transform: translateY(2px); */
}
.teammember {
  padding: 0 0 0.32rem;
}
.teammember ul li:last-child {
  border: none;
}
.teamprofit .img1 {
  width: 0.5rem;
  margin-right: 0.2rem;
  vertical-align: sub;
}
.teamprofit .img2 {
  width: 0.46rem;
  margin-right: 0.2rem;
  vertical-align: middle;
}
.teamprofit>.d-flex{
  padding-top: 0.2rem;
}
</style>
