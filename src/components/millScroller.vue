<template>
  <div class="mills">
    <v-loadmore ref="loadmore" bottomPullText='' :topPullText="$t('shop.tb.a')" :bottomDropText="$t('shop.tb.b')" :bottomLoadingText="$t('shop.tb.c')" :autoFill="false" :bottom-all-loaded="ifMore" :top-method="refresh" :bottom-method="getMore">
      <ul>
            <li v-for="(item,index) in showLists">
              <div class="d-flex">
                <div class="flex1">
                    <img :src="item.path" alt="">
                </div>
                <div class="flex2 tal desc">
                    <p class="fs1 fc2">{{item.names}}</p>
                    <div>
                        <p class="fc11"> <span>{{$t('shop.tb.d')}}: {{item.count}}T</span> <span>{{$t('shop.tb.e')}}: {{item.life}}h</span></p>
                        <p class="fc11">{{$t('shop.tb.f')}}: {{item.total}} SPM</p>
                    </div>
                </div>
                <div class="flex1">
                    <div class="infobuy">
                        <p class="fr"><span class="f_c0 fs1">{{item.price}}</span>USDT</p>
                        <p class="buybtn fr" @click.stop="addCart([item.id,item.path,item.names,item.price,item.count,item.life,item.total,item.rest_num])">{{$t('shop.tb.g')}}</p>
                    </div>
                </div>
              </div>
            </li>
        </ul>
    </v-loadmore>
    <x-dialog v-model="dialog" hide-on-blur>
      <div class="buyMill">
      <div class="d-flex pd">
        <div class="flex1 tal">
          <img :src="buying[1]" alt="">
        </div>
        <div class="flex3">
          <p class="d-flex lh"><span class="flex1 fs1 tal">{{buying[2]}}</span><span class="flex1 tal fs3"><span class="fc00 fs1">{{buying[3]}}</span> USDT</span></p>
          <p class="d-flex mar0 fc111"><span class="flex1 tal">{{$t('shop.tb.d')}}：{{buying[4]}}t</span><span class="flex1 tal">{{$t('shop.tb.e')}}：{{buying[5]}}h</span></p>
          <p class="tal mar0 fc111">{{$t('shop.tb.f')}}：<span>{{buying[6]}} SPM</span></p>
        </div>
      </div>
      <p class="tal pd mar0">{{$t('shop.tb.h')}} <span class="fs1 fc2">{{can}}</span> USDT</p>
      <p class="tal pd">{{$t('shop.tb.i')}}</p>
      <div class="six pd">
        <p class="d-flex pwd">
          <span class="flex1 br fw">{{pwdShows[0]}}</span>
          <span class="flex1 br fw">{{pwdShows[1]}}</span>
          <span class="flex1 br fw">{{pwdShows[2]}}</span>
          <span class="flex1 br fw">{{pwdShows[3]}}</span>
          <span class="flex1 br fw">{{pwdShows[4]}}</span>
          <span class="flex1 fw">{{pwdShows[5]}}</span>
        </p>
        <router-link :to="{name:'changepaypwd'}">
          <span class="forget fc2">{{$t('login.fgpwd')}}?</span>
        </router-link>
      </div>
      <div class="keyboard d-flex">
        <div class="flex3">
          <p class="d-flex">
            <span @click="pwd(1)" class="flex1">1</span>
            <span @click="pwd(2)" class="flex1">2</span>
            <span @click="pwd(3)" class="flex1">3</span>
          </p>
          <p class="d-flex">
            <span @click="pwd(4)" class="flex1">4</span>
            <span @click="pwd(5)" class="flex1">5</span>
            <span @click="pwd(6)" class="flex1">6</span>
          </p>
          <p class="d-flex">
            <span @click="pwd(7)" class="flex1">7</span>
            <span @click="pwd(8)" class="flex1">8</span>
            <span @click="pwd(9)" class="flex1">9</span>
          </p>
          <p class="d-flex">
            <span class="flex1">*</span>
            <span @click="pwd(0)" class="flex1">0</span>
            <span class="flex1">.</span>
          </p>
        </div>
        <div class="flex1">
          <p class="d-flex1">
            <span @click="deletePwd" class="flex1 bgclear">{{$t('shop.tb.j')}}</span>
            <span @click="sub(buying[0])" class="flex1 sub">{{$t('shop.tb.k')}}</span>
          </p>
        </div>
      </div>
    </div>
    </x-dialog>
  </div>
</template>

<script>
import "../base/css/com.css";
import { Loadmore } from "mint-ui";
import { XDialog } from "vux";
export default {
  components: {
    "v-loadmore": Loadmore,
    "x-dialog": XDialog
  },
  data() {
    return {
      dialog: false,
      page: 1,
      limit: 10,
      ifMore: true,
      scrollMode: "auto",
      sumPage: 0,
      showLists: [],
      uinfo: "",
      pwdNums: [],
      pwdShows: [],
      buying: [],
      can: ""
      // upwd: ""
    };
  },
  computed: {},
  mounted() {
    this.getList(this.page, this.limit);
    let that = this;
    that.uinfo = that.userinfo;
  },
  methods: {
    getList(page, limit) {
      var that = this;
      this.$http({
        url: "/api/buy/getlist",
        method: "get",
        params: {
          page: page,
          limit: limit
        }
      })
        .then(function(res) {
          if (res.data.code != -1) {
            for (let i = 0, l = res.data.msg.length; i < l; i++) {
              res.data.msg[i].rest_num =
                res.data.msg[i].z_num - res.data.msg[i].sell_num;
            }
            that.showLists = res.data.msg;
            that.sumPage = res.data.data;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    refresh() {
      setTimeout(() => {
        this.page = 1;
        this.getList(this.page, this.limit);
        this.$refs.loadmore.onTopLoaded();
        // this.ifMore = false;
      }, 1000);
    },
    getMore() {
      var that = this;
      that.page++;
      this.$http({
        url: "/api/buy/getlist",
        method: "get",
        params: {
          page: that.page,
          limit: that.limit
        }
      }).then(function(res) {
        if (res.data.code == 0) {
          that.showLists = that.showLists.concat(res.data.msg);
          that.$refs.loadmore.onBottomLoaded();
          that.$nextTick(function() {
            that.scrollMode = "touch";
          });
        } else {
          that.$refs.loadmore.onBottomLoaded();
          that.ifMore = true;
          that.$toast({
            message: that.$t("deal.tip.j"),
            position: "bottom",
            duration: 1000
          });
        }
      });
    },
    addCart(arr) {
      let that = this;
      if (arr[7] > 0) {
        this.$http({
          url: "api/buy/usdt_num",
          params: {
            id: that.userinfo.id
          },
          method: "get"
        }).then(function(res) {
          if (res.data.code == -1) {
            that.$vux.toast.show({
              text: "您已有矿机，不可购买！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          } else if (res.data.code == 0) {
            that.$vux.toast.show({
              text: "USDT资产不足！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          } else {
            that.can = parseFloat(res.data.data).toFixed(2);
            // that.upwd = res.data.pwd;
            if (window.pwdtime) {
              that.$vux.confirm.show({
                title: that.$t("deal.tip.a"),
                content: that.$t("shop.tip.a"),
                confirmText: that.$t("deal.tip.a"),
                cancelText: that.$t("deal.tip.b"),
                onShow() {},
                onHide() {},
                onCancel() {},
                onConfirm() {
                  if (that.can >= parseFloat(arr[3])) {
                    that
                      .$http({
                        url: "api/buy/buy",
                        params: {
                          id: id,
                          mid: that.userinfo.id,
                          password: ""
                        },
                        method: "get"
                      })
                      .then(function(res) {
                        if (res.data.code == 0) {
                          that.$vux.toast.show({
                            text: "购买成功！",
                            type: "success",
                            position: "middle",
                            time: 1200
                          });
                        }else{
                          that.$vux.toast.show({
                            text: res.data.msg,
                            type: "cancel",
                            position: "middle",
                            time: 1200
                          });
                        }
                      });
                  } else {
                    let that = this;
                    that.$vux.confirm.show({
                      title: "充币提示",
                      confirmText: "确定",
                      cancelText: "取消",
                      content: "USDT余额不足，请充币！",
                      onShow() {},
                      onHide() {},
                      onCancel() {},
                      onConfirm() {
                        that.$router.push({
                          name: "topupcoin"
                        });
                      }
                    });
                  }
                }
              });
            } else {
              if (that.can >= parseFloat(arr[3])) {
                that.pwdNums = [];
                that.pwdShows = [];
                that.buying = arr;
                that.dialog = true;
              } else {
                that.$vux.confirm.show({
                  title: "充币提示",
                  confirmText: "确定",
                  cancelText: "取消",
                  content: "USDT余额不足，请充币！",
                  onShow() {},
                  onHide() {},
                  onCancel() {},
                  onConfirm() {
                    that.$router.push({
                      name: "topupcoin",
                      params: {}
                    });
                  }
                });
              }
            }
          }
        });
      } else {
        that.$vux.toast.show({
          text: "矿机数量不足！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    pwd(num) {
      if (this.pwdNums.length < 6) {
        this.pwdNums.push(num);
        this.pwdShows.push("*");
      }
    },
    deletePwd() {
      if (this.pwdNums.length > 0) {
        this.pwdNums.pop();
        this.pwdShows.pop();
      }
    },
    sub(id) {
      let that = this;
      if (this.pwdNums == "") {
        this.$toast({
          message: that.$t("shop.tip.b"),
          position: "mid",
          duration: 1000
        });
      } else {
        let that = this;
        this.$http({
          url: "api/buy/buy",
          params: {
            id: id,
            mid: that.userinfo.id,
            password: that.pwdNums.join("")
          },
          method: "get"
        }).then(function(res) {
          if (res.data.code == 0) {
            if (that.freepwd && !Boolean(window.pwdtime)) {
              let t = 7200;
              window.pwdtime = setInterval(function() {
                t--;
                if (t <= 0) {
                  clearInterval(window.pwdtime);
                  window.pwdtime = 0;
                  that.setfreepwd();
                }
              }, 1000);
            }
            that.dialog = false;
            that.$vux.toast.show({
              text: that.$t("shop.tip.d"),
              type: "success",
              position: "middle",
              time: 1000
            });
          } else if (res.data.code == -1) {
            that.$vux.toast.show({
              text: that.$t("shop.tip.c"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else if (res.data.code == -2) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.f"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else if (res.data.code == -3) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.e"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.mills {
  padding-bottom: 1.1rem;
  color: rgba(255, 255, 255, 0.8);
}
.rest_num {
  font-size: 0.32rem;
}
.mills .mint-loadmore {
  overflow: visible !important;
}
.top {
  color: white;
}
.buybtn {
  background: #51d9e8;
  width: 1.8rem;
  height: 0.7rem;
  line-height: 0.7rem;
  margin-top: 0.2667rem;
  color: white;
  border-radius: 4px;
}
.desc div p {
  line-height: 0.5333rem;
}
.fc00 {
  color: #ff4081;
}
.fc111 {
  color: #666;
}
.buyMill {
  padding-top: 0.2667rem;
  font-size: 0.32rem;
}
.pwd {
  width: 6.6667rem;
  border: 1px solid #bbb; /*no*/
  border-radius: 4px;
  height: 1.0667rem;
  line-height: 1.0667rem;
  background: white;
}
.br {
  border-right: 1px solid #bbb; /*no*/
}
.six {
  position: relative;
  margin: 0.4rem 0 0.4rem;
}
.forget {
  position: absolute;
  right: 3%;
  bottom: 0;
}
.pd {
  padding: 0 4% 0;
}
.lh {
  line-height: 0.5333rem;
}
.mar0 {
  margin: 0.1333rem 0 0.1333rem;
}
.fw {
  font-weight: 700;
}
.buyMill {
  color: #333;
}
.buyMill img {
  width: 90%;
}
.weui-toast {
  height: 1.3333rem !important;
}
</style>

