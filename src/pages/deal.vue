<template>
  <div class="deal">
    <div class="top">
      <p>交易中心</p>
    </div>
    <div class="d-flex topinfo">
       <div class="flex1">
          <div class="d-flex">
            <p class="flex3 left">
              <span class="fc2">{{jisuan.usdt}}$</span>
              <!-- <span>$</span> -->
            </p>
          </div>
        </div>
        <div class="flex3 f_s_min">
          <p class="d-flex lh1">
            <span class="flex1 tal">{{$t('index.art.b')}} {{jisuan.max}}$</span>
            <span class="flex1">{{$t('index.art.c')}} {{jisuan.min}}$</span>
            <span class="flex1 tar">增幅 <span class="fc3" :class="{green:ifGreen}"> {{jisuan.fudu}}</span></span>
          </p>
          <p class="d-flex lh1">
            <span class="flex1 tal">{{$t('index.art.e')}} <span class="fc2">{{jisuan.buy}}</span></span>
            <span class="flex1 tar">{{$t('index.art.f')}} <span class="fc2">{{jisuan.sell}}</span></span>
          </p>
        </div>
    </div>
    <div class="dealnav">
    <tab bar-active-color="#839fff" active-color="#839fff">
      <tab-item selected  @click.native="navTap(1)" :class="{navSelect:nid==1}">{{$t('deal.tb.b')}}</tab-item>
      <tab-item @click.native="navTap(2)" :class="{navSelect:nid==2}">{{$t('deal.tb.c')}}</tab-item>
    </tab>
    </div>
      <div class="search">
          <div class="s-input">
              <span @click="search" class="iconfont icon-icon--"></span>
              <input @keydown.13="search" v-model="searcon" type="number" :placeholder="$t('deal.tb.d')"/>
          </div>          
      </div>
      <div class="deals">
        <v-loadmore ref="loadmore" :bottomPullText="bot_text" :topDropText="$t('shop.tb.b')" :topLoadingText="$t('shop.tb.c')" :topPullText="$t('shop.tb.a')" :bottomDropText="$t('shop.tb.b')" :bottomLoadingText="$t('shop.tb.c')" :autoFill="false" :bottom-all-loaded="ifMore" :top-method="refresh" :bottom-method="getMore">
        <ul v-if="xx">
            <li v-for="(item,index) in showLists">
              <div class="d-flex">
                <div class="flex3 tal">
                    <div>
                        <p>
                          <p class="fs3">{{item.name}} 
                            <span class="icon">
                              <span v-if="item.alipay" class="iconfont icon-zhifubao fca"></span>
                              <span v-if="item.wechart" class="iconfont icon-weixin-copy fcb"></span>
                              <span v-if="item.idbank" class="iconfont icon-iconfontjikediancanicon20 fcc"></span>
                            </span>
                          </p>
                          <p class="mar00">{{$t('deal.tb.e')}}: {{item.num}}</p>
                          <p class="mar00">
                            <span>{{$t('deal.tb.f')}}: {{item.unitprice}}CNY</span>&nbsp;
                            <span>{{$t('deal.tb.g')}}: <span>{{item.zong}}</span>CNY</span>
                          </p>
                        </p>
                    </div>
                </div>
                <div class="flex2 tar pore">
                    <div class="ovh">
                        <p><span class="f_c0 fs3">{{item.zong}}</span>CNY</p>
                        <p class="sellBtn" v-if="selfid!=item.mid" @click="toSell(item.id,item.name,item.num,item.zong)">{{btnmsg1}}</p>
                        <p class="sellBtn sellBtn1" v-if="selfid==item.mid">{{btnmsg1}}</p>
                    </div>
                </div>
              </div>
            </li>
        </ul>
      </v-loadmore>
      </div>
      
      <div v-if="bshow" class="buyBtn">
          <x-button type="default" @click.native="buysell">{{btnMsg}}</x-button>
      </div>
      <x-dialog v-model="dialog" hide-on-blur>
        <div class="dialog">
          <p class="tal" v-if="(nid==2)">{{$t('shop.tb.h')}} <span class="fc2 fs3">{{can}}SPM</span></p>
        <div class="bs-input ovh">
          <input class="fl" @input="testPrice" type="text" v-model="unitprice" :placeholder="dgMsg[0]">
          <input @input="testNum" class="fr" type="text" v-model="num" :placeholder="dgMsg[1]">
        </div>
        <p class="fs3 tal">{{$t('deal.tb.p')}} <span class="fc2">{{sprice1[1]}}CNY</span></p>
        <div class="d-flex mt30">
          <div class="flex1">
            <p class="bs-exit" @click="bsExit">{{$t('deal.tip.b')}}</p>
          </div>
          <div class="flex1">
            <p class="bs-sub" @click="bsSub">{{dgMsg[2]}}</p>
          </div>
        </div>
        </div>
      </x-dialog>
  </div>
</template>
<script>
import "../base/css/com.css";
import { Tab, TabItem, XDialog } from "vux";
import { Loadmore } from "mint-ui";
import $ from "jquery";
export default {
  data() {
    return {
      transitionName: "",
      xx: false,
      selfid: this.userinfo.id,
      can: "",
      nid: 1,
      dialog: false,
      unitprice: "",
      num: "",
      rate: "",
      h: "",
      bshow: this.bshow,
      way: "buy",
      page: 1,
      limit: 10,
      ifMore: false,
      scrollMode: "auto",
      show: false,
      items: [],
      pIndex: 0,
      showLists: [],
      searcon: "",
      jisuan: {
        max: "0.00",
        min: "0.00",
        fudu: 0,
        buy: 0,
        sell: 0,
        rate: ""
      },
      ifGreen: false,
      bot_text: "上拉加载",
      min_num: ""
    };
  },
  watch: {
    unitprice: function() {
      if (!this.unitprice == "") {
        this.unitprice = this.unitprice.toString().match(/\d+\.?\d{0,4}/)[0];
      }
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    that.nid = 1;
    let height =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;
    this.h = Number(height) - 350;
    $(".deals").css("height", this.h);
    $(window).resize(function() {
      that.bshow = !that.bshow;
    });
    this.getList(this.page, this.limit);
    that
      .$http({
        url: "/api/hangup/jisuan",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if (res.data != -1) {
          that.jisuan = res.data;
          if (parseFloat(res.data.fudu) < 0) {
            that.ifGreen = true;
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  computed: {
    trans: function() {
      if (this.jisuan.rate) {
        return parseFloat(this.jisuan.rate).toFixed(2);
      } else {
        return "0.00";
      }
    },
    btnMsg() {
      if (this.nid == 1) {
        return this.$t("deal.tb.h");
      } else {
        return this.$t("deal.tb.i");
      }
    },
    btnmsg1() {
      if (this.nid == 1) {
        return this.$t("deal.tb.k");
      } else {
        return this.$t("deal.tb.j");
      }
    },
    dgMsg() {
      if (this.nid == 1) {
        return [
          this.$t("deal.tb.l"),
          this.$t("deal.tb.m"),
          this.$t("deal.tb.j")
        ];
      } else {
        return [
          this.$t("deal.tb.n"),
          this.$t("deal.tb.o"),
          this.$t("deal.tb.k")
        ];
      }
    },
    sprice1() {
      return [
        (this.unitprice * this.num).toFixed(2),
        (this.unitprice * this.num).toFixed(2)
      ];
    }
  },
  methods: {
    navTap(id) {
      this.nid = id;
      this.page = 1;
      this.getList(this.page, this.limit);
      $(".mint-loadmore").css("overflow", "hidden");
      $(".mint-loadmore-bottom").css("display", "block");
    },
    search() {
      let that = this;
      that
        .$http({
          url: "api/hangup/cx",
          method: "get",
          params: {
            phone: that.searcon,
            status: that.nid
          }
        })
        .then(function(res) {
          if (
            res.data.length != 0 &&
            (res.data.length != 0 && res.data[0].status == that.nid)
          ) {
            that.showLists = res.data;
          } else {
            that.$toast({
              message: that.$t("deal.tip.c"),
              position: "mid",
              duration: 1000
            });
          }
        });
    },
    testNum() {
      let that = this;
      this.num = this.num.match(/\d+\.?\d{0,8}/)[0];
      if (this.nid == 2) {
        if (parseFloat(this.num) > parseFloat(this.can)) {
          this.$toast({
            message: that.$t("deal.tip.d"),
            position: "top",
            duration: 1000
          });
        }
      }
    },
    testPrice() {
      this.unitprice = this.unitprice.match(/\d+\.?\d{0,8}/)[0];
    },
    buysell() {
      let that = this;
      that
        .$http({
          url: "api/hangup/shuju",
          params: {
            id: that.userinfo.id
          },
          method: "get"
        })
        .then(function(res) {

          if (res.data.code == 3) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.e"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else if (res.data.code == 2) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.f"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else if (res.data.code == 1) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.g"),
              type: "warn",
              position: "middle",
              time: 1000
            });
          } else {
            that.min_num=res.data.data;
            that
              .$http({
                url: "api/member/assets",
                params: {
                  id: that.userinfo.id
                },
                method: "get"
              })
              .then(function(res) {
                that.can = res.data.can.replace(/,/g, "");
                that
                  .$http({
                    url: "api/usual/money",
                    method: "get"
                  })
                  .then(function(res) {
                    that.rate = parseFloat(
                      res.data[0].rmb / res.data[0].dollar
                    );
                  });
                that.dialog = true;
                that.unitprice = "";
                that.num = "";
              });
          }
        });
    },
    bsExit() {
      this.dialog = false;
    },
    bsSub() {
      let that = this;
      if (parseFloat(this.unitprice) > 0 && parseFloat(this.num) > 0) {
        if (parseFloat(this.num) >= parseFloat(that.min_num)) {
          if (this.nid == 2) {
            if (parseFloat(this.num) <= parseFloat(this.can)) {
              that
                .$http({
                  url: "api/hangup/xianzhi",
                  method: "get",
                  params: {
                    id: that.userinfo.id,
                    num: this.num
                  }
                })
                .then(function(res) {
                  if (res.data.code == 0) {
                    that
                      .$http({
                        url: "api/hangup/add",
                        method: "get",
                        params: {
                          id: that.userinfo.id,
                          num: that.num,
                          unitprice: that.unitprice,
                          status: that.nid
                        }
                      })
                      .then(function(res) {
                        that.$vux.toast.show({
                          text: that.$t("deal.tip.h"),
                          type: "success",
                          position: "middle",
                          time: 1200
                        });
                        that.refresh();
                        that.dialog = false;
                      });
                  } else {
                    that.$vux.toast.show({
                      text: that.$t("over"),
                      type: "warn",
                      position: "middle",
                      time: 1200
                    });
                  }
                });
            } else {
              this.$toast({
                message: that.$t("deal.tip.i"),
                position: "top",
                duration: 1200
              });
            }
          } else {
            that
              .$http({
                url: "api/hangup/add",
                method: "get",
                params: {
                  id: that.userinfo.id,
                  num: that.num,
                  unitprice: that.unitprice,
                  status: that.nid
                }
              })
              .then(function(res) {
                that.$vux.toast.show({
                  text: that.$t("deal.tip.h"),
                  type: "success",
                  position: "middle",
                  time: 1200
                });
                that.refresh();
                that.dialog = false;
              });
          }
        } else {
          that.$vux.toast.show({
            text: "买卖数量不可小于"+that.min_num,
            type: "warn",
            position: "middle",
            time: 1200
          });
        }
      } else {
        this.$toast({
          message: that.$t("deal.tip.i"),
          position: "top",
          duration: 1200
        });
      }
    },
    getList(page, limit) {
      // $(".mint-loadmore").css("mint-height","0");
      let that = this;
      that.xx = false;
      that.ifMore = false;
      that.showLists = [];
      if (that.nid == 1) {
        that.way = "buy";
      } else {
        that.way = "sell";
      }
      this.$http({
        url: `/api/hangup/${that.way}`,
        method: "get",
        params: {
          page: page,
          limit: limit
        }
      }).then(function(res) {
        if (res.data.code == 0) {
          that.xx = true;
          that.showLists = res.data.msg;
          if (res.data.data <= 10) {
            $(".mint-loadmore").css("overflow", "visible");
            $(".mint-loadmore-bottom").css("display", "none");
          }
        }
      });
    },
    refresh() {
      setTimeout(() => {
        this.page = 1;
        this.getList(this.page, this.limit);
        this.$refs.loadmore.onTopLoaded();
        this.ifMore = false;
      }, 1000);
    },
    getMore() {
      var that = this;
      that.page++;
      this.$http({
        url: `/api/hangup/${that.way}`,
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
    toSell(id, name, num, cny) {
      let that = this;
      that
        .$http({
          url: "api/hangup/shuju",
          params: {
            id: that.userinfo.id,
            num: num
          },
          method: "get"
        })
        .then(function(res) {
          if (res.data.code == 3) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.e"),
              type: "warn",
              position: "middle",
              time: 1200
            });
          } else if (res.data.code == 2) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.f"),
              type: "warn",
              position: "middle",
              time: 1200
            });
          } else if (res.data.code == 1) {
            that.$vux.toast.show({
              text: that.$t("deal.tip.g"),
              type: "warn",
              position: "middle",
              time: 1200
            });
          } else if (res.data.code == 4 && that.nid == 1) {
            that.$vux.toast.show({
              text: that.$t("over"),
              type: "warn",
              position: "middle",
              time: 1200
            });
          } else {
            that.showPlugin(id, name, num, cny);
          }
        });
    },
    showPlugin(id, name, num, cny) {
      var that = this;
      let con = "";
      if (that.nid == 1) {
        con =
          this.$t("deal.tip.k") + name + this.$t("deal.tip.l") + num + " SPM";
      } else {
        con =
          this.$t("deal.tip.k") + name + this.$t("deal.tip.l") + cny + " CNY";
      }
      this.$vux.confirm.show({
        title: "确认",
        content: con,
        confirmText: "是",
        cancelText: "否",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          if (that.nid == 1) {
            that
              .$http({
                url: "api/member/assets",
                params: {
                  id: that.userinfo.id
                },
                method: "get"
              })
              .then(function(res) {
                that.can = res.data.can.replace(/,/g, "");
                if (that.can >= num) {
                  that.$router.push({
                    name: "phonecode",
                    params: {
                      id: id
                    }
                  });
                } else {
                  that.$vux.toast.show({
                    text: that.$t("deal.tip.d"),
                    type: "warn",
                    position: "middle",
                    time: 1200
                  });
                }
              });
          } else {
            that
              .$http({
                url: "api/order/order",
                method: "get",
                params: {
                  hid: id,
                  mid: that.userinfo.id
                }
              })
              .then(function(res) {
                that.dialog = false;
                that.$router.push({
                  name: "sellinfo",
                  params: {
                    id: id
                  }
                });
              });
          }
        }
      });
    }
  },
  components: {
    Tab,
    TabItem,
    XDialog,
    "v-loadmore": Loadmore
  }
};
</script>
<style scoped>
.deal {
  padding-top: 1.1rem;
  position: absolute;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #141738;
  color: white;
  font-size: 0.36rem;
}

.topinfo {
  width: 94%;
  padding: 0.2rem 10px 0.3rem;
  box-sizing: border-box;
  background: #2b2e4c;
  margin: 0.2rem auto 0.4rem;
  overflow: hidden;
  font-size: 0.36rem;
}
.topinfo .d-flex .left > span {
  display: block;
  font-size: 0.4rem;
}
.topinfo .d-flex .left > span:first-child {
  font-size: 0.7rem;
  padding-top: 0.4rem;
  padding-right: 0.1rem;
}
.topinfo > .flex3 {
  padding-top: 0.18rem;
}
.dealnav {
  width: 94%;
  margin: 0 auto;
  background: #2b2e4c;
  overflow: hidden;
}

.fs80 {
  font-size: 1.0667rem;
  line-height: 2.6667rem;
}

.ml {
  margin: 0 4px 0 10px;
}
.icon-1 {
  font-size: 0.3733rem;
}

input {
  border: none;
  outline: none;
}
.search {
  padding: 0.4rem 0 0.4rem; /*no*/
  position: relative;
  z-index: 100;
}
.s-input {
  width: 90%;
  margin: 0 auto;
  font-size: 0.36rem;
  line-height: 1rem;
  background: #2b2e4c;
  position: relative;
  padding: 0 8px 0;
}
.s-input input {
  width: 100%;
  background: transparent;
  padding: 0 0.8rem 0;
  color: white;
}
.s-input ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.s-input ::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.s-input ::-o-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.s-input ::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.icon-icon-- {
  font-size: 0.4rem;
  position: absolute;
  left: 0.2667rem;
}
.buyBtn {
  width: 100%;
  position: fixed;
  bottom: 1.3rem;
  z-index: 999;
  font-size: 0.36rem;
}
.buyBtn .weui-btn_default {
  width: 80%;
  margin: 0 auto 0;
  background: #839fff;
  line-height: 1.1rem;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.buyBtn .weui-btn_default:active {
  background: rgb(127, 150, 223);
  color: white;
}

.lh0 {
  line-height: 1.3333rem;
}
.lh1 {
  line-height: 0.7rem;
}
.fs00 {
  font-size: 0.2667rem;
}
.fs000 {
  font-size: 0.4533rem;
}
.bs-input input {
  margin: 0.2667rem 0 0.2667rem;
  width: 44%;
  padding-left: 0.2rem;
  line-height: 0.8rem;
  border-radius: 4px;
  border: 1px solid #ccc; /*no*/
}
.dialog {
  padding: 0.4rem;
  color: #333;
  font-size: 0.36rem;
}
.bs-exit,
.bs-sub {
  width: 80%;
  line-height: 0.9rem;
  color: #2b2e4c;
  text-align: center;
  margin: 0 auto;
  border-radius: 4px;
}
.bs-exit {
  background: rgba(0, 0, 0, 0.1);
}
.bs-sub {
  background: #839fff;
  color: white;
}
.deals {
  overflow: auto;
}
.deals ul {
  box-sizing: border-box;
  width: 94%;
  margin: 0 auto 10px;
  overflow: hidden;
}
.deals .mar00 {
  margin-top: 6px;
}
.deals .pore {
  position: relative;
}

.deals .fca {
  display: inline-block;
  color: #00aaee;
  font-size: 0.4rem;
}
.deals .fcb {
  display: inline-block;
  color: #50b674;
  font-size: 0.4533rem;
  vertical-align: bottom;
}
.deals .fcc {
  display: inline-block;
  color: #fdb60b;
  font-size: 0.4533rem;
  vertical-align: bottom;
}
li .d-flex {
  font-size: 0.32rem;
}
.f_s_min {
  font-size: 0.32rem;
}
</style>
