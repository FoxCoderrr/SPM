<template>
  <div class="login">
     <div class="langbtn0">
            <p @click="clang" class="langbtn d-flex fr">
              <span class="flex1" :class="{se:lang==0}">中文</span>
              <span class="flex1" :class="{se:lang==1}">ENG</span>
            </p>
          </div>
      <div class="logo">
          <img src="../assets/SPM02.png" alt="">
      </div>
      <div class="form">
        <div class="d_form">
          <div class="div">
            <span class="icon_left iconfont icon-geren"></span>
            <x-input type="text" :placeholder="$t('reg.a')" v-model="name"></x-input>
          </div>
          <div class="div">
            <span class="icon_left iconfont icon-shouji"></span>
            <x-input type="text" v-model="mobile" :placeholder="$t('reg.b')"></x-input>
          </div>
          <div class="d-flex div">
            <span class="icon_left iconfont icon-xinfeng"></span>
              <x-input class="flex2" type="text" :placeholder="$t('cph.d')" v-model="code"></x-input>
              <span class="fr cc" @click="getIcode" :class="{fc2:btnmsg==$t('reg.o')}">{{btnmsg}}</span>
          </div>
          <div class="div">
           <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="upwd" :placeholder="$t('reg.c')" @on-blur="testpwd"></x-input>
          </div>
           <div class="div">
             <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="upwd1" :placeholder="$t('reg.d')" @on-blur="conPwd"></x-input>
          </div>
          <div class="div">
           <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="ppwd" :placeholder="$t('reg.e')" @on-blur="testpwd1"></x-input>
          </div>
          <div class="div">
            <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input type="password" v-model="ppwd1" :placeholder="$t('reg.f')" @on-blur="conPwd1"></x-input>
          </div>
          <div class="div">
            <span class="icon_left iconfont icon-yaoqingma"></span>
              <x-input type="text" v-model="u_yqm" :placeholder="$t('reg.yqm')"></x-input>
          </div>
          <p class="tal mt20">
            <span class="ii iii iconfont fc2"></span>
            <span class="fc000">{{$t('reg.g')}}<span class="fc2 xy">《{{$t('reg.h')}}》</span></span>
          </p>
        </div>
          <x-button class="btn" type="default" @click.native="sub">{{$t('reg.i')}}</x-button>
          <p v-if="yqm==0" class="other tar">
              <router-link :to="{name: 'login'}">
                  {{$t('reg.to_login')}}
              </router-link>
              </span>
          </p>
      </div>
      <div class="xycon">
        <div class="xytop">
          <span class="iconfont icon-return" @click="hidexy"></span>
          <p>{{$t('reg.h')}}</p>
        </div>
        <div class="xyconn" v-html="pp"></div>
      </div>
       <x-dialog class="codedialog" v-model="iIf" hide-on-blur>
        <s-identify :identifyCode="identifyCode" @refreshcode="getIcode"></s-identify>
        <div class="codeInput">
        <x-input type="text" :placeholder="$t('cph.d')" v-model="usercode"></x-input>
        </div>
        <div class="codebtn" @click="codebtn">{{$t('cfm')}}</div>
      </x-dialog>
  </div>
</template>
<script>
import { XInput, XDialog } from "vux";
import $ from "jquery";
import SIdentify from "../components/icode";
import "../base/css/com.css";
export default {
  data() {
    return {
      precode: "",
      lang: 0,
      pp: "",
      name: "",
      mobile: "",
      code: "",
      ccode: "",
      upwd: "",
      upwd1: "",
      ppwd: "",
      ppwd1: "",
      yqm: this.$route.params.id,
      u_yqm: "",
      transitionName: "",
      iIf: false,
      identifyCodes: "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      identifyCode: "",
      usercode: "",
      btnmsg: this.$t("reg.o"),
      time: 60,
      ty: false
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t11);
      that.$router.back();
      error;
    };
    if (that.yqm == 0) {
      that.u_yqm = "";
    } else {
      that.u_yqm = that.$route.params.id;
    }
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".login").css("min-height", height);
    that
      .$http({
        url: "api/notice/protocol",
        method: "get",
        params: {
          type: that.lang + 1
        }
      })
      .then(function(res) {
        that.pp = res.data[0].content;
      });
    $(".ii").on("click", function() {
      $(this).toggleClass("icon-tongyi");
      $(this).toggleClass("iii");
      that.ty = !that.ty;
    });
    $(".xy").on("click", function() {
      $(".xycon").fadeIn();
    });
  },
  methods: {
    clang() {
      let that = this;
      if (that.lang == 0) {
        that.lang = 1;
      } else {
        that.lang = 0;
      }
      that
        .$http({
          url: "api/notice/protocol",
          method: "get",
          params: {
            type: that.lang + 1
          }
        })
        .then(function(res) {
          that.pp = res.data[0].content;
        });
      // this.lang = this.langg;
      window.localStorage.setItem("lang", that.lang);
      this.setlangg();
      if (that.btnmsg == "获取验证码") {
        that.btnmsg = that.$t("reg.o");
      } else if (that.btnmsg == "SMS code") {
        that.btnmsg = that.$t("reg.o");
      }
    },
    hidexy() {
      $(".xycon").fadeOut();
    },
    conPwd() {
      let that = this;
      if (this.upwd !== this.upwd1) {
        this.$toast({
          message: that.$t("msglogin.tip.c"),
          position: "mid",
          duration: 1000
        });
      }
    },
    conPwd1() {
      let that = this;
      if (this.ppwd !== this.ppwd1) {
        this.$toast({
          message: that.$t("msglogin.tip.c"),
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
          message: that.$t("reg.j"),
          position: "mid",
          duration: 1000
        });
      }
    },
    testpwd1() {
      let reg = /^[0-9]{6}$/;
      let that = this;
      if (!reg.test(that.ppwd)) {
        that.$toast({
          message: that.$t("reg.j"),
          position: "mid",
          duration: 1000
        });
      }
    },
    testpwd3(p) {
      var x = 0;
      p = p.split("");
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == p[i - 1]) {
          ++x;
          if (x >= 2) {
            break;
          }
        } else {
          x = 0;
        }
      }
      if (x >= 2) {
        return true;
      } else {
        return false;
      }
    },
    testpwd4(p) {
      var x = 0;
      p = p.split("");
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == Number(p[i - 1]) + 1) {
          ++x;
          if (x >= 2) {
            break;
          }
        } else {
          x = 0;
        }
      }
      if (x >= 2) {
        return true;
      } else {
        return false;
      }
    },
    sub() {
      let that = this;
      let reg = /^[a-zA-Z0-9]{6,30}$/;
      let reg1 = /^[0-9]{6}$/;
      if (
        this.name == "" ||
        this.mobileNum == "" ||
        this.code == "" ||
        this.upwd == "" ||
        this.upwd1 == "" ||
        this.ppwd == "" ||
        this.ppwd1 == ""
      ) {
        this.$vux.toast.show({
          text: that.$t("login.tip.b"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else if (
        !reg.test(this.upwd) ||
        !reg1.test(this.ppwd) ||
        this.upwd != this.upwd1 ||
        this.ppwd != this.ppwd1
      ) {
        this.$vux.toast.show({
          text: that.$t("reg.k"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else if (!that.ty) {
        that.$toast({
          message: that.$t("reg.l"),
          position: "mid",
          duration: 1000
        });
      } else {
        if (!that.testpwd3(that.ppwd) && !that.testpwd4(that.ppwd)) {
          that
            .$http({
              url: "api/member/insert",
              method: "get",
              params: {
                name: that.name,
                phone: that.mobile,
                lpassword: that.upwd,
                rpassword: that.upwd,
                tpassword: that.ppwd,
                rtpassword: that.ppwd,
                links: that.u_yqm,
                yzm: that.code
              }
            })
            .then(function(res) {
              if (res.data.code == 0) {
                that.$vux.toast.show({
                  text: that.$t("reg.m"),
                  type: "success",
                  position: "middle",
                  time: 1000
                });
                if(that.$route.params.id!=0){
                  setTimeout(function() {
                    window.location.href = "http://spm.qilinpz.com/download.html";
                  }, 500);
                }
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "warn",
                  position: "middle",
                  time: 1000
                });
              }
            });
        } else {
          that.$vux.toast.show({
            text: "安全密码不可重复不可连续",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
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
      if (that.btnmsg == that.$t("reg.o") && reg1.test(that.mobile)) {
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
        that.btnmsg = that.time + that.$t("reg.p");
        window.t11 = setInterval(function() {
          if (that.time == 0) {
            that.time = 60;
            that.btnmsg = that.$t("reg.o");
            clearInterval(window.t11);
          } else {
            that.time--;
            that.btnmsg = that.time + that.$t("reg.p");
          }
        }, 1000);
      } else if (that.btnmsg != that.$t("reg.o") && reg1.test(that.mobile)) {
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
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
}
.logo {
  padding: 0 18% 0.8rem;
}
.logo img {
  margin-top: 1.8rem;
}
.langbtn0 {
  position: absolute;
  right: 20px;
  top: 14px;
}
.codeInput {
  width: 80%;
  margin: 0 auto;
  border: 1px solid #ccc; /*no*/
}
.codebtn {
  width: 80%;
  color: white;
  background-color: #1c7ed6;
  line-height: 60px;
  margin: 20px auto;
  border-radius: 6px;
}
.cc {
  line-height: 0.9rem;
  color: rgba(255, 255, 255, 0.5);
}
.fc000 {
  color: white;
  padding-left: 0.74rem;
}

.ii {
  position: absolute;
}
.iii {
  display: inline-block;
  width: 0.4267rem;
  height: 0.4267rem;
  border-radius: 50%;
  border: 1px solid #839fff; /*no*/
}
.icon-tongyi {
  font-size: 0.48rem;
}
.xycon {
  position: fixed;
  width: 100%;
  min-height: 100%;
  background: white;
  top: 0;
  box-sizing: border-box;
  display: none;
}
.xytop {
  line-height: 1.1rem;
  border-bottom: 1px solid #ccc; /*no*/
}
.xytop .icon-return {
  color: #333 !important;
}
.xycon .xytop p {
  font-size: 0.4rem;
}
.xyconn {
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
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
  margin: 0.8rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.form .weui-btn_default:active {
  background: rgb(127, 150, 223);
  color: white;
}
.other {
  padding: 0.2rem 10% 0;
}
.other a {
  color: #839fff;
}
.form .div .icon-shouji {
  font-size: 0.6rem;
  margin-left: -0.05rem;
}
</style>
