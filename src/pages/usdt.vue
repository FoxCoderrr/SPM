<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>USDT资产</p>
        </div>
        <div class="main">
            <ul>
                <li>
                    <span>总资产：</span>
                    <span>{{info.usdt}}</span>
                </li>
                <li>
                    <span>充值资产：</span>
                    <span>{{info.recharge}}</span>
                </li>
                <li>
                    <span>奖励资产：</span>
                    <span>{{info.reward}}</span>
                </li>
                <li>
                    <span>提现数量：</span>
                    <span>{{info.withdraw_usdt}}</span>
                </li>
            </ul>
        </div>
        <div class="d_btn">
            <button class="btn" @click="to1">提现</button>
            <button class="btn" @click="to2">充值</button>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info: "",
      a: "",
      b: "",
      c: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name:"mine"
      });
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
    that
      .$http({
        url: "api/usdt/usdt",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
        }
      });
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.a = res.data[0].alipay;
        that.b = res.data[0].wechat;
        that.c = res.data[0].idbank;
      });
  },
  methods: {
    back() {
      this.$router.push({
        name:"mine"
      });
    },
    to1() {
      let that = this;
      if (this.a || this.b || this.c) {
        that
          .$http({
            url: "api/usdt/withdraw",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$router.push({
                name: "withdraw"
              });
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        that.$vux.toast.show({
          text: "请绑定支付宝、微信、银行卡相关信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    to2() {
      let that = this;
      if (this.a || this.b || this.c) {
        that
          .$http({
            url: "api/usdt/recharge",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$router.push({
                name: "topupcoin"
              });
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
            }
          });
      } else {
        this.$vux.toast.show({
          text: "请绑定支付宝、微信、银行卡相关信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 1.1rem 0 0;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #141738;
  color: white;
  text-align: left;
  .d_btn {
    padding: 0.8rem 20% 0;
    .btn {
      line-height: 0.9rem;
      padding: 0 0.8rem 0;
      border-radius: 4px;
      color: #333;
      background: white;
    }
    .btn:first-child {
      float: left;
    }
    .btn:last-child {
      float: right;
    }
  }
  .main {
    width: 94%;
    margin: 0.2rem auto;
    box-sizing: border-box;
    padding: 0.4rem;
    background: #839fff;
    ul {
      li {
        padding-bottom: 0.3rem;
        span {
          display: inline-block;
        }
        span:first-child {
          width: 2rem;
          text-align: right;
        }
        span:last-child {
          font-size: 0.44rem;
        }
      }
      li:last-child {
        padding: 0;
      }
    }
  }
}
</style>
