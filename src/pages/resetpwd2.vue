<template>
  <div class="cppwd">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('setpwd.a')}}</p>
      </div>
      <div class="tip">
          <p class="fs3 fc00">{{$t('setpwd.l')}} {{phone}}</p>
          <p class="fs3">{{$t('setpwd.m')}}</p>
      </div>
        <div class="six pd">
        <p class="d-flex pwd">
          <span class="flex1 br fw">{{pwdShows[0]}}</span>
          <span class="flex1 br fw">{{pwdShows[1]}}</span>
          <span class="flex1 br fw">{{pwdShows[2]}}</span>
          <span class="flex1 br fw">{{pwdShows[3]}}</span>
          <span class="flex1 br fw">{{pwdShows[4]}}</span>
          <span class="flex1 fw">{{pwdShows[5]}}</span>
        </p>
      </div>
      <p class="tac fc00 mt10">{{$t('setpwd.n')}}</p>
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
import $ from "jquery"
export default {
  data() {
    return {
      pwdNums: [],
      pwdShows: [],
      phone: ""
    };
  },
  mounted() {
    let that = this;
     mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".cppwd").css("min-height", height);
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.phone = res.data[0].phone;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    pwd(num) {
      if (this.pwdNums.length < 6) {
        this.pwdNums.push(num);
        this.pwdShows.push("*");
      }
    },
    deletePwd() {
      if (this.pwdNums.length > 0) {
        this.pwdNums.pop();
        this.pwdShows.pop();
      }
    },
    testpwd(p) {
      let x = 0;
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == p[i - 1]) {
          x++;
          if (x >= 3) {
            break;
          }
        } else {
          x = 0;
        }
      }
      if (x >= 3) {
        return true;
      } else {
        return false;
      }
    },
    testpwd1(p) {
      let x = 0;
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == p[i - 1] + 1) {
          x++;
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
      if (
        that.pwdNums.length < 6 ||
        that.testpwd(that.pwdNums) ||
        that.testpwd1(that.pwdNums)
      ) {
        that.$toast({
          message: that.$t("setpwd.n"),
          position: "mid",
          duration: 1000
        });
      } else {
        this.$router.push({
          name: "resetpwd3",
          params: {
            pwd: this.pwdNums.join("")
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
  font-size: 0.36rem;
}
.key {
  width: 100%;
  position: absolute;
  bottom: 0;
}

.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.tip {
  height: 2rem;
  padding-top: 0.6667rem;
  background: white;
  border-bottom: 1px solid #e4e4e5; /*no*/
  font-size: 0.4rem;
}
.tip>p:last-child{
  padding-top: 0.2rem;
}
.pwd {
  width: 6.6667rem;
  border: 1px solid #bbb; /*no*/
  border-radius: 4px;
  height: 1.0667rem;
  line-height: 1.0667rem;
  background: white;
  margin: 0 auto;
}
.br {
  border-right: 1px solid #bbb; /*no*/
}
.pd {
  padding: 0 4% 0;
}
.fc00 {
  color: #999;
}
.br {
  border-right: 1px solid #bbb; /*no*/
}
.six {
  margin-top: 0.6667rem;
}
.pd {
  padding: 0 4% 0;
}
</style>
