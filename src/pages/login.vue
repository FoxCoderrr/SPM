<template>
  <div class="login">
      <div class="logo">
         <div class="langbtn0">
            <p @click="clang" class="langbtn d-flex fr">
              <span class="flex1" :class="{se:lang==0}">中文</span>
              <span class="flex1" :class="{se:lang==1}">ENG</span>
            </p>
          </div>
          <img src="../assets/SPM02.png" alt="">
      </div>
      <div class="form">
        <div class="d_form">
          <div class="div">
              <span class="icon_left iconfont icon-shouji"></span>
              <x-input type="text"  v-model="mobileNum" :placeholder="$t('login.input1')"></x-input>
          </div>
          <div class="div">
            <span @click="seepwd" v-if="yanjing" class="iconfont icon-yanjing" :class="{fc2:color}"></span>
              <span class="icon_left iconfont icon-icon_password_yes"></span>
              <x-input :type="seePwd" @on-focus="focus" @on-blur="blur" v-model="upwd" :placeholder="$t('login.input2')"></x-input>
          </div>
          <p class="d-flex other">
              <span class="flex1 tal">
              <router-link :to="{name: 'register',params:{id : 0}}">
                  {{$t('reg.i')}}
              </router-link>
              </span>
              <span class="flex1 tar">
              <router-link :to="{name: 'msglogin'}">
                  {{$t('login.fgpwd')}}?
              </router-link>
              </span>
          </p>
        </div>
          <x-button class="btn" type="default" @click.native="login">{{$t('login.submsg')}}</x-button>
      </div>
  </div>
</template>
<script>
import "../../static/mui.min.js";
import "../base/css/com.css";
import $ from "jquery";
export default {
  data() {
    return {
      transitionName: "",
      lang: 0,
      mobileNum: "",
      yanjing: true,
      color: false,
      upwd: "",
      seePwd: "password",
      uinfo: {}
    };
  },
  mounted() {
    let that = this;
    //处理逻辑：1秒内，连续两次按返回键，则退出应用；
      var first = null;
      mui.back = function () {
        //首次按键，提示‘再按一次退出应用’
        if (!first) {
          first = new Date().getTime(); //记录第一次按下回退键的时间
          mui.toast('再按一次退出应用哦'); //给出提示
          history.go(-1) //回退到上一页面
          setTimeout(function () { //1s中后清除
            first = null;
          }, 1000);
        } else {
          if (new Date().getTime() - first < 1000) { //如果两次按下的时间小于1s，
            plus.runtime.quit(); //那么就退出app
          }
        }
      };
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    $(".login").css("height", height);
    if (window.localStorage.getItem("lang")) {
      that.lang = window.localStorage.getItem("lang");
    }
    that.setlangg();
    // this.lang = this.langg;
  },
  methods: {
    seepwd() {
      if (this.seePwd == "text") {
        this.seePwd = "password";
        this.color = false;
      } else {
        this.seePwd = "text";
        this.color = "password";
      }
    },
    clang() {
      let that = this;
      // this.lang = this.langg;
      if (that.lang == 0) {
        that.lang = 1;
      } else {
        that.lang = 0;
      }
      window.localStorage.setItem("lang", that.lang);
      this.setlangg();
    },
    focus() {},
    blur() {},
    login() {
      var that = this;
      if (this.mobileNum == "" || this.upwd == "") {
        this.$vux.toast.show({
          text: that.$t("login.tip.b"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else {
        that.$vux.loading.show({
          text: that.$i18n.t("login.tip.a")
        });
        this.$http({
          url: "api/login/login",
          method: "post",
          data: {
            phone: that.mobileNum,
            lpassword: that.upwd
          }
        })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.status == 1) {
              that.$vux.toast.show({
                text: that.$t("login.tip.f"),
                type: "warn",
                position: "middle",
                time: 1000
              });
            } else if (res.data.code == -1) {
              that.$vux.toast.show({
                text: that.$t("login.tip.d"),
                type: "warn",
                position: "middle",
                time: 1000
              });
            } else if (res.data.code == -2) {
              that.$vux.toast.show({
                text: that.$t("login.tip.c"),
                type: "warn",
                position: "middle",
                time: 1000
              });
            } else if (res.data.code == -3) {
              that.$vux.toast.show({
                text: that.$t("login.tip.e"),
                type: "warn",
                position: "middle",
                time: 1000
              });
            } else {
              let cid = "";
              // mui.plusReady(function() {
              //   cid = plus.push.getClientInfo().clientid;
              //   alert(cid);
              // });
              window.localStorage.setItem("lang", that.lang);
              that.uinfo.id = res.data.id;
              that.uinfo.ifIdentify = res.data.type;
              that.setUinfo(that.uinfo);
              let ll = "";
              if (that.lang == 0) {
                ll = "cn";
              } else {
                ll = "en";
              }
              that
                .$http({
                  url: "api/login/language",
                  method: "get",
                  params: {
                    phone: that.mobileNum,
                    language: ll
                  }
                })
                .then(function(res) {});
              that.$router.push({
                name: "home",
                params: {
                  id: res.data.id
                }
              });
            }
          })
          .catch(function(error) {
            that.$vux.loading.hide();
            console.log(error);
          });
      }
    }
  },
};
</script>
<style scoped>
.login{
  background: url("../assets/bg01.png");
  background-color: #141738;
  background-size: 100% 100%;
  font-size: 0.36rem;
}
.other {
  margin-top: 10px;
}
.other a {
  color: #839fff;
}
.icon-yanjing {
  font-size: 0.5rem;
  color: rgba(255, 255, 255, .5);
  position: absolute;
  right: 1rem;
  top: 0.2rem;
  z-index: 99999;
}
.langbtn0 {
  position: absolute;
  right: 20px;
  top: 14px;
}
.form{
  color: white;
  padding-bottom: 0.6rem;
}
.form ::-webkit-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.form ::-moz-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.form ::-o-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.form ::-ms-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.form .weui-btn_default{
  width: 80%;
  margin: 1rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.form .weui-btn_default:active{
  background: rgb(127, 150, 223);
  color: white;
}
.form .div{
  margin-bottom: 0.4rem!important;
}
.d_form>div:first-child .iconfont{
  font-size: 0.6rem;
  margin-left: -0.05rem;
}
</style>
