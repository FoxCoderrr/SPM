<template>
  <div class="setting">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('set.a')}}</p>
      </div>
      <ul class="lists1">
          <li class="d-flex" @click="toChPwd">
            <p class="flex1 tal">{{$t('set.b')}}</p>
            <p class="flex1 tar fc0"><span class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
          <li class="d-flex" @click="toChPwd2">
            <p class="flex1 tal">{{$t('set.z')}}</p>
            <p class="flex1 tar fc0"><span class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
          <!-- <li class="d-flex">
            <p class="flex1 tal">{{$t('set.c')}}</p>
            <div class="flex1">
               <div>
                 <p @click="clang" class="langbtn d-flex fr">
                   <span class="flex1" :class="{se:lang==0}">中文</span>
                   <span class="flex1" :class="{se:lang==1}">ENG</span>
                 </p>
               </div>
            </div>
          </li> -->
          <li class="d-flex">
            <p class="flex3 tal">{{$t('set.d')}}</p>
            <div class="flex1 tar fc0">
                <p class="kg" :class="{kg1:onoff}" @click="onClick">
                  <span class="yq" :class="{yq1:onoff}"></span>
                </p>
            </div>
          </li>
          <li class="d-flex" @click="exit">
            <p class="flex1 tal">退出账号</p>
            <p class="flex1 tar fc0"><span class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
          <li class="d-flex" @click="out">
            <p class="flex1 tal">退出SPM</p>
            <p class="flex1 tar fc0"><span class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
      </ul>
  </div>
</template>
<script>
import "../base/css/comman.css";

export default {
  data() {
    return {
      transitionName: "",
      onoff: false,
      lang: 0
    };
  },
  mounted() {
    let that = this;
     mui.back = function() {
      clearInterval(window.t0);
      that.$router.push({
        name: "mine"
      });
      error;
    };
    if (window.localStorage.getItem("lang")) {
      this.lang = window.localStorage.getItem("lang");
    }
    that.setlangg();
    if (this.freepwd) {
      this.onoff = this.freepwd;
    }
    // this.lang = this.langg;
  },
  methods: {
    back() {
      this.$router.back();
      let that = this;
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
            id: that.userinfo.id,
            language: ll
          }
        })
        .then(function(res) {});
    },
    toChPwd() {
      this.$router.push({
        name: "msglogin"
      });
    },
    toChPwd2() {
      this.$router.push({
        name: "changepaypwd"
      });
    },
    clang() {
      let that = this;
      if (that.lang == 0) {
        that.lang = 1;
      } else {
        that.lang = 0;
      }
      // this.lang = this.langg;
      window.localStorage.setItem("lang", that.lang);
      this.setlangg();
    },
    onClick() {
      this.onoff = !this.onoff;
      this.setfreepwd();
      if (this.onoff == false) {
        clearInterval(window.pwdtime);
        window.pwdtime = 0;
      }
    },
    exit() {
      var that = this;
      let ll = "";
      if (that.lang == 0) {
        ll = "cn";
      } else {
        ll = "en";
      }
      this.$vux.confirm.show({
        title: that.$t("cfm"),
        confirmText: that.$t("deal.tip.a"),
        cancelText: that.$t("deal.tip.b"),
        content: that.$t("set.f"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          if (that.freepwd == true) {
            that.setfreepwd();
            clearInterval(window.pwdtime);
            window.pwdtime = 0;
          }
          that
            .$http({
              url: "/api/login/loginout",
              method: "get",
              params: {}
            })
            .then(function(res) {});
          that.$router.push({
            name: "login"
          });
          that
            .$http({
              url: "api/login/language",
              method: "get",
              params: {
                id: that.userinfo.id,
                language: ll
              }
            })
            .then(function(res) {});
        }
      });
    },
    out() {
      let that = this;
      this.$vux.confirm.show({
        title: that.$t("cfm"),
        confirmText: that.$t("deal.tip.a"),
        cancelText: that.$t("deal.tip.b"),
        content: "确定要退出SPM吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          mui.plusReady(function() {
            plus.runtime.quit();
          });
        }
      });
    }
  },
};
</script>
<style scoped>

.setting {
  width: 100%;
  padding-top: 1.1rem;
  color: white;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.0667rem;
  font-size: 0.6667rem;
  color: white;
  left: 2%;
}
.lists1 {
  padding: 0 4% 0;
}

li {
  line-height: 1.0667rem;
  font-size: 0.4rem;
  border-bottom: 1px solid rgba(255, 255, 255, .5);
}
li .icon-iconfontjiantou5 {
  font-size: 0.46rem;
  color: #839fff;
}
.pd {
  padding: 0.2667rem 20% 0.2667rem;
}
.kg {
  width: 2rem;
  height: 0.45rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-top: 0.28rem;
  float: right;
  background: #ccc;
}
.yq {
  float: left;
  width: 1.2rem;
  height: 0.46rem;
  border-radius: 20px;
  background-color: white;
  margin: -1px 0 0 -1px; /*no*/
  border: 1px solid #ccc;
  box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.1); /*no*/
}
.kg1 {
  background: #839fff;
}
.yq1 {
  float: right;
  margin: -1px -1px 0 0; /*no*/
}
.langbtn{
  height: 0.6rem;
  line-height: 0.6rem;
  margin-top: 0.2rem;
}
.langbtn span{
  padding: 0
}
</style>

