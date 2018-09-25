<template>
  <div class="cppwd">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('setpwd.a')}}</p>
      </div>
      <div class="tip">
          <p class="fs3">{{$t('setpwd.b')}} <span class="fw">{{$t('setpwd.c')}}</span> {{$t('setpwd.d')}}</p>
          <p class="fw">{{show_mobile}}</p>
      </div>
      <div class="pwd">
          <ul class="d-flex">
              <li class="flex1">
                  <p :class="{active:pwdNums[0]!=undefined}">{{pwdNums[0]}}</p>
              </li>
              <li class="flex1">
                  <p :class="{active:pwdNums[1]!=undefined}">{{pwdNums[1]}}</p>
              </li>
              <li class="flex1">
                  <p :class="{active:pwdNums[2]!=undefined}">{{pwdNums[2]}}</p>
              </li>
              <li class="flex1">
                  <p :class="{active:pwdNums[3]!=undefined}">{{pwdNums[3]}}</p>
              </li>
          </ul>
      </div>
      <p v-if="codeIf" class="fs3 time1">{{time}}秒后重发</p>
      <p @click="refresh" v-if="tipIf" class="fs3 fc2">{{$t('setpwd.e')}}</p>
      <div class="key">
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
            <span @click="sub" class="flex1 sub">{{$t('shop.tb.k')}}</span>
          </p>
        </div>
      </div>
      </div>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      pwdNums: [],
      time: 60,
      codeIf: true,
      tipIf: false,
      ccode: "",
      mobile: "",
      show_mobile: ""
    };
  },
  mounted() {
    let that = this;
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".cppwd").css("min-height", height);
    mui.back = function() {
      clearInterval(window.t);
      that.$router.push({
        name: "shop"
      });
      error;
    };
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
        window.sessionStorage.setItem("set_pwd_code", that.ccode);
      });
    if (window.t) {
      clearInterval(window.t);
    }
    this.gettime();
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.mobile = res.data[0].phone;
        that.show_mobile =
          that.mobile.substr(0, 3) + "******" + that.mobile.substr(-2);
      });
  },
  methods: {
    back() {
      this.$router.back();
      clearInterval(window.t);
    },
    gettime() {
      let that = this;
      window.t = setInterval(function() {
        if (that.time == 0) {
          that.time = 10;
          that.tipIf = true;
          that.codeIf = false;
          clearInterval(window.t);
        } else {
          that.time--;
        }
      }, 1000);
    },
    pwd(num) {
      if (this.pwdNums.length < 4) {
        this.pwdNums.push(num);
      }
    },
    deletePwd() {
      if (this.pwdNums.length > 0) {
        this.pwdNums.pop();
      }
    },
    refresh() {
      let that = this;
      this.codeIf = true;
      this.tipIf = false;
      this.time = 10;
      clearInterval(window.t);
      this.gettime();
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
    },
    sub() {
      let that = this;
      if (this.pwdNums.join("") == "") {
        this.$toast({
          message: "请输入验证码！",
          position: "mid",
          duration: 1000
        });
      } else {
        let yzm = this.pwdNums.join("");
        that
          .$http({
            url: "api/member/pwds_code",
            method: "get",
            params: {
              yzm: yzm
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$router.push({
                name: "resetpwd"
              });
            } else {
              that.$toast({
                message: res.data.msg,
                position: "mid",
                duration: 1000
              });
            }
          });
      }
    }
  }
};
</script>
<style scoped>
.cppwd {
  padding-top: 1.1rem;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f9;
}
.key {
  width: 100%;
  position: absolute;
  bottom: 0;
}
.fw {
  font-weight: 700;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
  color: white;
}
.tip {
  height: 2rem;
  padding-top: 0.6667rem;
  background: white;
  border-bottom: 1px solid #e4e4e5; /*no*/
}
.tip > p:last-child {
  font-size: 0.6rem;
  padding-top: 0.2rem;
}
.pwd {
  width: 80%;
  margin: 50px auto;
}

.pwd li p {
  width: 90%;
  border-bottom: 1px solid #a2a2a2; /*no*/
  line-height: 1.0667rem;
  height: 1.0667rem;
  font-size: 0.5rem;
  margin: 0 auto;
}
.pwd li .active {
  border-bottom: 1px solid #26afff; /*no*/
}
.time1 {
  color: #777;
}
</style>
