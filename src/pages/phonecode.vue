<template>
  <div class="resetpwd">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('pcode.a')}}</p>
      </div>
      <div>
          <p class="codep ovh">
              <input class="fl" type="text" :placeholder="$t('msglogin.input4')" v-model="code">
              <span @click="getcode" class="fr" :class="{fc_w:btnmsg ==$t('code')}">{{btnmsg}}</span>
          </p>
      </div>
      <x-button type="default" @click.native="sub" class="btn codebtn">{{$t('pcode.b')}}</x-button>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      code: "",
      ccode: "",
      btnmsg: this.$t("code"),
      time: 60
    };
  },
  mounted() {
    let that = this;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".resetpwd").css("height", height);
    mui.back = function() {
      clearInterval(window.t0);
      that.$router.back();
      error;
    };
    if (window.t0) {
      clearInterval(window.t0);
    }
  },
  methods: {
    back() {
      this.$router.back();
      clearInterval(window.t0);
    },
    getcode() {
      let that = this;
      if (that.btnmsg == that.$t("code")) {
        that
          .$http({
            url: "api/member/yzm",
            method: "get",
            params: {
              id: that.userinfo.id
            }
          })
          .then(function(res) {
            that.ccode = res.data.yzm;
            console.log(that.ccode);
          });
        that.btnmsg = that.time + that.$t("code1");
        window.t0 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = that.$t("code");
            clearInterval(window.t0);
          } else {
            that.time--;
            that.btnmsg = that.time + that.$t("code1");
          }
        }, 1000);
      }
    },
    sub() {
      let that = this;
      if (that.ccode != "") {
        that
          .$http({
            url: "api/order/order",
            method: "get",
            params: {
              hid: that.$route.params.id,
              mid: that.userinfo.id,
              yzm: that.code
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.alert.show({
                title: "",
                buttonText: that.$t("deal.tip.a"),
                content: that.$t("pcode.c"),
                onShow() {},
                onHide() {
                  clearInterval(window.t0);
                  that.$router.push({
                    name: "mydeals",
                    params: {
                      tip: 1
                    }
                  });
                }
              });
            } else {
              that.$toast({
                message: res.data.msg,
                position: "mid",
                duration: 1200
              });
            }
          });
      } else {
        that.$toast({
          message: "请输入有效的验证码",
          position: "mid",
          duration: 1200
        });
      }
    }
  }
};
</script>
<style scoped>
input {
  width: 60%;
  line-height: 1.0667rem;
  border: none;
  outline: none;
  background: transparent;
  color: white;
  padding-left: 0.2rem;
}
.codep ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.codep ::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.codep ::-o-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.codep ::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.resetpwd {
  padding-top: 1.3rem;
  height: 100%;
  box-sizing: border-box;
  background: #141738;
  font-size: 0.36rem;
}
.codep {
  line-height: 1.0667rem;
  width: 100%;
  background: #2b2e4c;
  padding: 0 4% 0;
  box-sizing: border-box;
}
.codep span {
  color: rgba(255, 255, 255, 0.6);
}
.codep .fc_w {
  color: white;
}
.resetpwd .weui-btn_default {
  width: 80%;
  margin: 1rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.resetpwd .weui-btn_default:active {
  background: rgb(127, 150, 223);
  color: white;
}
</style>
