<template>
  <div class="myDeals">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('mine.nav.b')}}</p>
      </div>
      <div class="nav">
        <tab class="tab" :line-width = 2 custom-bar-width="40px" bar-active-color="#839fff" active-color="#839fff">
          <tab-item @click.native="navTap(1)">{{$t('mydeal.a')}}</tab-item>
          <tab-item @click.native="navTap(2)">{{$t('mydeal.b')}}</tab-item>
          <tab-item @click.native="navTap(3)">{{$t('mydeal.c')}}</tab-item>
          <tab-item @click.native="navTap(4)">{{$t('mydeal.d')}}</tab-item>
        </tab>
      </div>
   
    <ul class="list">
      <li v-if="list" v-for="(item,index) in list">
        <p class="row d-flex tal">
          <span class="flex1">{{$t('mydeal.e')}}</span>
          <span class="flex3">{{item.order}}</span>
        </p>
        <p class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.g')}}</span>
          <span class="flex3">{{item.num}}</span>
        </p>
        <p class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.h')}}</span>
          <span class="flex3">{{item.unitprice}}CNY</span>
        </p>
        <p class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.i')}}</span>
          <span class="flex3">{{item.huansuan}}CNY</span>
        </p>
        <p class="row d-flex tal">
          <span class="flex1">{{$t('mydeal.f')}}</span>
          <span class="flex3">{{item.create||item.end}}</span>
        </p>
        <p class="row d-flex tal">
          <span class="flex1">{{$t('mydeal.g')}}</span>
          <span class="flex3">
            <span v-if="nid == 1 ||nid ==2">{{$t('mydeal.h')}}</span>
            <span v-if="nid == 4">{{$t('mydeal.i')}}</span>
            <span v-if="nid == 3&&item.pic!=null">{{$t('mydeal.h')}}</span>
            <span v-if="nid == 3&&uid==item.sellid&&item.pic==null">{{$t('mydeal.h')}}</span>
            <span v-if="nid == 3&&uid==item.buyid&&item.pic==null">{{$t('mydeal.j')}}</span>
            <span v-if="nid==3"><span class="iconfont icon-naozhong"></span> <span class="djs">{{h}}:{{m}}:{{s}}</span> </span>
          </span>
        </p>
        <div v-if="nid==3||nid==4" class="row tal bnone ovh">
          <span class="fl">{{$t('mydeal.k')}}</span>
          <img @click="bigimg(item.pic)" class="pic" v-if="item.pic" :src="item.pic" alt="">
          <span v-if="item.pic==null" class="noneimg">{{$t('mydeal.l')}}</span>
        </div>
        <p @click="quxiao(item.id)" v-if="nid==1||nid==2" class="md-btn">{{btnmsg}}</p>
        <p @click="inform(item.id)" v-if="nid==3&&uid==item.buyid&&item.pic!=null" class="md-btn">{{$t('mydeal.m')}}</p>
        <p @click="topay(item.hid)" v-if="nid==3&&uid==item.buyid&&item.pic==null" class="md-btn">{{$t('mydeal.n')}}</p>
        <p @click="inform(item.id)" v-if="nid==3&&uid==item.sellid&&item.pic==null" class="md-btn">{{$t('mydeal.o')}}</p>
        <p @click="suc(item.id)" v-if="nid==3&&uid==item.sellid&&item.pic!=null" class="md-btn">{{$t('mydeal.p')}}</p>
      </li>
    </ul>
    <div @click="hidem" class="mmask">
      <img :src="bigpic" alt="">
    </div>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      transitionName: "",
      uid: this.userinfo.id,
      urll: this.url,
      nid: 1,
      list: [],
      bigpic: "",
      h: "00",
      m: "00",
      s: "00"
    };
  },
  computed: {
    btnmsg() {
      let that = this;
      if (this.nid == 1) {
        return that.$t("mydeal.q");
      } else if (this.nid == 2) {
        return that.$t("mydeal.r");
      }
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.jiaoyi);
      that.$router.push({
        name: "mine"
      });
      error;
    };
    if (that.$route.params.tip == 0) {
      $(".vux-tab-item")
        .eq(0)
        .trigger("click");
    } else {
      $(".vux-tab-item")
        .eq(2)
        .trigger("click");
    }
  },
  methods: {
    back() {
      this.$router.push({
        name: "mine"
      });
      clearInterval(window.jiaoyi);
    },
    navTap(id) {
      this.nid = id;
      this.list = [];
      this.getlist(id);
      clearInterval(window.jiaoyi);
    },
    bigimg(pic) {
      $(".mmask").fadeIn();
      this.bigpic = pic;
    },
    hidem() {
      this.bigpic = "";
      $(".mmask").fadeOut();
    },
    toSucDeal() {
      this.$router.push({
        name: "successdeal"
      });
    },
    getlist() {
      let that = this;
      if (that.nid == 1) {
        that
          .$http({
            url: "api/hangup/myhang",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            if (res.data[0]) {
              if (res.data[0].status == 1) {
                that.list = res.data;
              }
            }
          });
      } else if (that.nid == 2) {
        that
          .$http({
            url: "api/hangup/myhang",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            if (res.data[0]) {
              if (res.data[0].status == 2) {
                that.list = res.data;
              }
            }
          });
      } else if (that.nid == 3) {
        that
          .$http({
            url: "api/order/jiaoyi",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            if (res.data.code != -2) {
              if (res.data.code == -1) {
                clearInterval(window.jiaoyi);
              } else {
                that.list.push(res.data.msg);
                let t = res.data.msg.time;
                window.jiaoyi = setInterval(function() {
                  t--;
                  that.h = Math.floor(t / 60 / 60);
                  that.m = Math.floor((t / 60) % 60);
                  that.s = Math.floor(t % 60);
                  if (that.m < 10) {
                    that.m = "0" + that.m;
                  }
                  if (that.s < 10) {
                    that.s = "0" + that.s;
                  }
                  if (that.h == "0" && that.m == "00" && that.s == "00") {
                    clearInterval(window.jiaoyi);
                    that.list = [];
                  }
                }, 1000);
              }
            }
          });
      } else {
        that
          .$http({
            url: "api/order/three",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            that.list = res.data;
          });
      }
    },
    quxiao(id) {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t("cfm"),
        confirmText: that.$t("deal.tip.a"),
        cancelText: that.$t("deal.tip.b"),
        content: that.$t("mydeal.s"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "api/hangup/del",
              method: "get",
              params: {
                id: id,
                mid: that.userinfo.id
              }
            })
            .then(function(res) {
              that.list = [];
              that.$vux.toast.show({
                text: that.$t("mydeal.t"),
                type: "success",
                position: "middle",
                time: 1000
              });
            });
        }
      });
    },
    topay(id) {
      this.$router.push({
        name: "sellinfo",
        params: {
          id: id
        }
      });
    },
    inform(id) {
      let that = this;
      that
        .$http({
          url: "api/parameter/index",
          method: "get",
          params: {
            id: id,
            mid: that.userinfo.id
          }
        })
        .then(function(res) {
          that.$vux.toast.show({
            text: that.$t("mydeal.u"),
            type: "success",
            position: "middle",
            time: 1000
          });
        });
    },
    suc(id) {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t("cfm"),
        confirmText: that.$t("deal.tip.a"),
        cancelText: that.$t("deal.tip.b"),
        content: that.$t("mydeal.v"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "api/order/orderss",
              method: "get",
              params: {
                id: id,
                sid: that.userinfo.id,
                type: 3
              }
            })
            .then(function(res) {
              that.list = [];
              that.$vux.toast.show({
                text: that.$t("mydeal.w"),
                type: "success",
                position: "middle",
                time: 1000
              });
            });
        }
      });
    }
  },
  components: {
    Tab,
    TabItem
  }
};
</script>

<style scoped>
.myDeals {
  padding-top: 2.6667rem;
  position: absolute;
  width: 100%;
  box-sizing: border-box;
  padding-bottom: 0.2667rem;
  color: white;
  font-size: 0.36rem;
}
.nav {
  width: 100%;
  height: 1.7333rem;
  position: fixed;
  top: 1.0667rem;
  z-index: 99;
  background: #141738;
}
.tab {
  width: 94%;
  margin: 0.4rem auto 0;
  background: white;
  overflow: hidden;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.list {
  padding: 0.2rem 3% 0.2rem;
}
.list li {
  overflow: hidden;
  padding: 0.4rem 0 0.4rem;
  background: #2b2e4c;
  margin-bottom: 0.6rem;
}
.list li .row {
  padding-left: 0.6667rem;
  line-height: 1.0667rem;
  border-bottom: 1px solid #375481; /*no*/
}
.list li .bnone {
  border: none;
}
.md-btn {
  width: 90%;
  background: #839fff;
  text-align: center;
  line-height: 1rem;
  color: white;
  margin: 0.4rem auto 0;
}
.noneimg {
  float: left;
  line-height: 1.6rem;
  text-align: center;
  width: 2.6rem;
  height: 1.6rem;
  overflow: hidden;
  border-radius: 4px;
  background: #808080;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 0.6667rem;
  margin-top: 0.4rem;
}
.pic {
  float: left;
  width: 2.4rem;
  height: 1.6rem;
  overflow: hidden;
  margin-left: 0.6667rem;
  margin-top: 0.4rem;
}
.mmask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
  display: none;
}
.mmask img {
  max-width: 100%;
  max-height: 100%;
}
.icon-naozhong {
  color: #839fff;
  font-size: 0.48rem;
  margin-left: 0.2667rem;
}
.djs {
  color: white;
}
</style>
