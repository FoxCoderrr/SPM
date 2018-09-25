<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>提现</p>
        </div>
        <div class="main tal">
            <div class="form">
                <div>
                    <div class="title">提现数量</div>
                    <div>
                        <input type="number" v-model="c_num" @input="testNum" >
                    </div>
                    <div class="trans">合计：{{cny}} CNY</div>
                </div>
            </div>
            <div class="d_choose">
                <div class="c_title">提现账户</div>
              <div class="choose">
                <div @click="choose($event,0)" v-if="c">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>银行卡</span>
                </div>
                <div @click="choose($event,1)" v-if="a">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>支付宝</span>
                </div>
                <div @click="choose($event,2)" v-if="b">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>微信收款</span>
                </div>
              </div>
            </div>
            <button class="btn" @click="sub">确认提现</button>
        </div>
        <div class="mask" v-if="mask" @click="hideMask"></div>
        <div class="pwd" v-if="pwd">
            <!-- 密码输入 -->
            <van-password-input
                :value="value"
                info=""
                @focus="showKeyboard = true"
            />
            <div class="forget" @click="toAS">忘记密码</div>
            <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
            />
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { PasswordInput, NumberKeyboard } from "vant";
import "vant/lib/vant-css/index.css";
export default {
  data() {
    return {
      pwd: false,
      mask: false,
      value: "",
      showKeyboard: true,
      c_num: "",
      ads: "",
      can: "",
      load: false,
      way: -1,
      rate: "",
      cny: "0.000",
      a:"",
      b:"",
      c:"",
    };
  },
  components: {
    "van-password-input": PasswordInput,
    "van-number-keyboard": NumberKeyboard
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
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
    that
      .$http({
        url: "api/usdt/usdt",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.rate = res.data.msg.bilv;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    toAS() {
      this.$router.push({
        name: "accountsafe"
      });
    },
    testNum() {
      this.c_num = this.c_num.match(/\d+\.?\d{0,8}/);
      this.cny = parseFloat(this.c_num * this.rate).toFixed(3);
    },
    choose(e, i) {
      this.way = i;
      $(e.path[1])
        .find(".iconfont")
        .addClass("icon-xuanzhong")
        .parents("div")
        .siblings("div")
        .find(".iconfont")
        .removeClass("icon-xuanzhong");
    },
    hideMask() {
      this.pwd = false;
      this.mask = false;
    },
    onInput(key) {
      let that = this;
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        that.$vux.loading.show({
          text: ""
        });
        that.c_num = parseFloat(that.c_num);
        that
          .$http({
            url: "api/usdt/withdraw_usdt",
            method: "post",
            data: {
              id: that.userinfo.id,
              num: that.c_num,
              mode: that.way,
              pwd: that.value
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: "提交成功！",
                type: "success",
                position: "middle",
                time: 1200
              });
              that.mask = false;
              that.pwd = false;
              that.back();
            } else{
              that.$vux.toast.show({
                text: res.data.msg,
                type: "cancel",
                position: "middle",
                time: 1200
              });
               that.value = "";
              that.mask = false;
              that.pwd = false;
            }
          });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    sub() {
      let that = this;
      if (parseFloat(that.c_num) > 0) {
        if (that.way != -1) {
          that.mask = true;
          that.pwd = true;
        } else {
          that.$vux.toast.show({
            text: "请选择提现方式！",
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入提币数量！",
          type: "text",
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
  color: white;
  .pwd {
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    padding-top: 0.8rem;
    bottom: 0;
    height: 320px;
    background: white;
    color: #333;

    .forget {
      color: #808080;
      text-align: right;
      padding-right: 4%;
      padding-top: 0.1rem;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .btn {
    width: 88%;
    display: block;
    margin: 0 auto;
    line-height: 0.9rem;
    text-align: center;
    color: white;
    background: #839fff;
  }
  .main {
    > div {
      padding: 0.4rem 8% 0.4rem;
    }
    .form {
      padding: 0 8% 0.4rem;
      background: #2b2e4c;
      .trans {
        text-align: right;
        color: #5a66a6;
        padding: 0.2rem 0 0.1rem;
      }

      .title {
        padding: 0.3rem 0 0.3rem;
      }
      input {
        width: 100%;
        line-height: 0.9rem;
        border: 1px solid #bbb;
        padding: 0 0.1rem 0;
        box-sizing: border-box;
        color: #333;
      }
    }
    .d_choose {
      margin: 0.4rem 0 1rem;
      background: #2b2e4c;
      .c_title {
        padding: 0.2rem 0 0.2rem;
      }
      .choose {
        padding: 0rem 0 0.4rem;
        > div {
          display: inline-block;
          margin-right: 0.4rem;
          .icon-xuanzhong {
            color: #5a66a6;
            display: inline-block;
            transform: translateY(2px);
          }
        }
      }
    }
  }
}
</style>
