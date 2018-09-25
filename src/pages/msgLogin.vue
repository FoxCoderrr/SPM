<template>
  <div class="login">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('msglogin.top')}}</p>
      </div>
      <div class="logo">
          <img src="../assets/SPM02.png" alt="">
      </div>
      <div class="form">
        <div class="d_form">
          <div class="div">
              <span class="icon_left iconfont icon-shouji"></span>
              <x-input type="text" v-model="mobile" :placeholder="$t('msglogin.input1')" @on-blur="testphone"></x-input>
          </div>
          <div class="div">
              <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="upwd" :placeholder="$t('msglogin.input2')" @on-blur="testpwd"></x-input>
          </div>
          <div class="div">
              <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="upwd1" :placeholder="$t('msglogin.input3')" @on-blur="cfmpwd"></x-input>
          </div>
          <div class="d-flex div yzm">
              <span class="icon_left iconfont icon-xinfeng"></span>
              <x-input class="flex1" type="text" :placeholder="$t('msglogin.input4')" v-model="ucode"></x-input>
              <span class="fr tar getcode" :class="{fc000:btnmsg!=$t('code')}" @click="getIcode">{{btnmsg}}</span>
          </div>
        </div>
          <x-button class="btn" type="default" @click.native="confirm">{{$t('cfm')}}</x-button>
      </div>
      <x-dialog class="codedialog" v-model="iIf" hide-on-blur>
        <s-identify :identifyCode="identifyCode" @refreshcode="getIcode"></s-identify>
        <div class="codeInput">
        <x-input type="text" placeholder="请输入验证码" v-model="usercode"></x-input>
        </div>
        <div class="codebtn" @click="codebtn">确认</div>
      </x-dialog>
  </div>
</template>
<script>
import $ from "jquery";
import { XInput, XDialog } from "vux";
import SIdentify from "../components/icode";
import "../base/css/com.css";
export default {
  data() {
    return {
      transitionName: "",
      iIf: false,
      identifyCodes: "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      identifyCode: "",
      usercode: "",
      mobile: "",
      upwd: "",
      upwd1: "",
      ucode: "",
      uucode: "",
      btnmsg: this.$t("code"),
      time: 60,
      ccode: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t1);
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".login").css("height", height);
  },
  methods: {
    back() {
      this.$router.back();
      clearInterval(window.t1);
    },
    testphone() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let that = this;
      if (!reg.test(that.mobile)) {
        that.$toast({
          message: that.$t("msglogin.tip.a"),
          position: "mid",
          duration: 1000
        });
      }
    },
    testpwd() {
      let reg = /^[a-zA-Z0-9]{6,30}$/;
      let that = this;
      if (!reg.test(that.upwd)) {
        that.$toast({
          message: that.$t("msglogin.tip.b"),
          position: "mid",
          duration: 1000
        });
      }
    },
    cfmpwd() {
      if (this.upwd != this.upwd1) {
        this.$toast({
          message: this.$t("msglogin.tip.c"),
          position: "mid",
          duration: 1000
        });
      }
    },
    confirm() {
      let that = this;
      let reg = /^[a-zA-Z0-9]{6,10}$/;
      let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (
        this.mobile == "" ||
        this.upwd == "" ||
        this.upwd1 == "" ||
        this.ucode == ""
      ) {
        this.$vux.toast.show({
          text: that.$t("login.tip.b"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else if (!reg1.test(this.mobile)) {
        this.$vux.toast.show({
          text: that.$t("msglogin.tip.a"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else if (!reg.test(this.upwd) || this.upwd != this.upwd1) {
        this.$vux.toast.show({
          text: that.$t("msglogin.tip.e"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else {
        that
          .$http({
            url: "api/member/pwd",
            method: "get",
            params: {
              phone: that.mobile,
              lpassword: that.upwd,
              rpassword: that.upwd1,
              yzm: that.ucode
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.alert.show({
                title: that.$t("suc"),
                content: that.$t("msglogin.tip.g"),
                onShow() {},
                onHide() {
                  that.$router.push({
                    name: "login"
                  });
                  clearInterval(window.t1);
                }
              });
            } else {
              this.$vux.toast.show({
                text: res.data.msg,
                type: "warn",
                position: "middle",
                time: 1000
              });
            }
          });
      }
    },
    getIcode() {
      // this.iIf = true;
      // this.showHideOnBlur = true;
      // this.identifyCode = "";
      // this.usercode = "";
      // this.makeCode(this.identifyCodes, 4);
      let that = this;
      let reg1 = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (that.btnmsg == that.$t("code") && reg1.test(that.mobile)) {
        that
          .$http({
            url: "api/member/yzm",
            method: "get",
            params: {
              phone: that.mobile
            }
          })
          .then(function(res) {
            console.log(res.data.yzm);
            that.ccode = res.data.yzm;
          });
        that.btnmsg = that.time + that.$t("code1");
        window.t1 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = that.$t("code");
            clearInterval(window.t1);
          } else {
            that.time--;
            that.btnmsg = that.time + that.$t("code1");
          }
        }, 1000);
      } else if (that.btnmsg != that.$t("code") && reg1.test(that.mobile)) {
      } else {
        that.$toast({
          message: that.$t("msglogin.tip.a"),
          position: "mid",
          duration: 1000
        });
      }
    },
    // 生成一个随机数
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      console.log("生成的验证码为：" + this.identifyCode);
    },
    codebtn() {
      console.log(this.usercode);
      if (this.usercode.toUpperCase() == this.identifyCode) {
        this.iIf = false;
      } else {
        this.$vux.toast.show({
          text: "验证码输入错误！",
          type: "warn",
          position: "top",
          time: 1000
        });
      }
    }
  },
  components: {
    XInput,
    XDialog,
    SIdentify
  }
};
</script>
<style scoped>
.login {
  background: url("../assets/bg01.png");
  background-color: #141738;
  background-size: 100% 100%;
  font-size: 0.36rem;
  box-sizing: border-box;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
  color: white;
}
.codeInput {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc; /*no*/
}
.codebtn {
  width: 80%;
  color: white;
  background-color: #26a4ff;
  line-height: 60px;
  margin: 20px auto;
  border-radius: 6px;
}
.getcode {
  line-height: 0.8rem;
  color: #839fff;
}
.yzm .fc000 {
  color: rgba(255, 255, 255, 0.5);
}
.form {
  color: white;
  padding-bottom: 0.6rem;
}
.form ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.form ::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.form ::-o-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.form ::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.9);
}
.form .weui-btn_default {
  width: 80%;
  margin: 1rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.form .weui-btn_default:active {
  background: rgb(127, 150, 223);
  color: white;
}
</style>
