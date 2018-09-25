<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('x')}}</p>
      </div>
      <!-- <p class="mt30">{{$t('y')}}</p> -->
      <div class="con">
          <div class="lh bg pd bb">
              <input type="text" v-model="wx" placeholder="请输入微信号">
          </div>
          <div class="lh bg pd codediv">
              <input type="text" v-model="code" placeholder="获取验证码">
              <span class="code fc000" :class="{fc2:btnmsg =='获取验证码'}" @click="getcode">{{btnmsg}}</span>
          </div>
      </div>
      <p class="btn" @click="sub">{{$t('cfm')}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "",
      img: "",
      code: "",
      ccode: "",
      btnmsg: "获取验证码",
      time: 60,
      wx: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      if (window.t0) {
        clearInterval(window.t0);
      }
      that.$router.push({
        name: "userinfo"
      });
      error;
    };
    // that
    //   .$http({
    //     url: "api/",
    //     method: "get",
    //   })
    //   .then(function(res) {
    //   });
  },
  methods: {
    back() {
      if (window.t0) {
        clearInterval(window.t0);
      }
      this.$router.back();
    },
    getcode() {
      let that = this;
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
    },
    sub() {
      let that = this;
      if (
        that.code != "" &&
        that.wx!=""
      ) {
        that
          .$http({
            url: "api/authentication/wechat",
            method: "get",
            params: {
              id: that.userinfo.id,
              wechat: that.wx,
              yzm: that.code
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.alert.show({
                title: that.$t("cfm"),
                buttonText: that.$t("deal.tip.a"),
                content: that.$t("cph.e"),
                onShow() {},
                onHide() {
                  that.$router.back();
                  clearInterval(window.t0);
                }
              });
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
                type: "warn",
                position: "middle",
                time: 1500
              });
            }
          });
      } else {
        that.$toast({
          message: that.$t("msglogin.tip.f"),
          position: "mid",
          duration: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.myTeam {
  padding-top: 1.3rem;
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
input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  color: white;
}
.myTeam ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.myTeam ::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.myTeam ::-o-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.myTeam ::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.m {
  margin: 0.2667rem 0 0.8rem;
}
.lh {
  line-height: 1.0667rem;
}
.pd {
  padding: 0 2% 0;
}
.bg {
  background: #2b2e4c;
}
.bb {
  margin-bottom: 1px;
}
.codediv {
  position: relative;
}
.code {
  position: absolute;
  right: 0.2667rem;
  top: 0.0267rem;
}
.btn {
  width: 80%;
  line-height: 0.9rem;
  background: #839fff;
  text-align: center;
  color: white;
  margin: 0.5333rem auto;
}
.fc000 {
  color: rgba(255, 255, 255, 0.7);
}
</style>
