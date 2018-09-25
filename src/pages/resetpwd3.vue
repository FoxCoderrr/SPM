<template>
  <div class="cppwd">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('setpwd.a')}}</p>
      </div>
      <div class="tip">
          <p class="fs3">{{$t('msglogin.input3')}}</p>
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
      <p @click="tonext" class="next">{{btnmsg}}</p>
      <div v-if="dialog" class="key">
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
            <span @click="tonext" class="flex1 sub">{{$t('shop.tb.k')}}</span>
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
      ppwd: this.$route.params.pwd,
      pwdNums: [],
      pwdShows: [],
      btnmsg: this.$t("setpwd.j"),
      dialog: true
    };
  },
  computed: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".cppwd").css("height", height);
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
    tonext() {
      let that = this;
      if (this.btnmsg == this.$t("setpwd.j")) {
        if (this.ppwd == this.pwdNums.join("")) {
          this.dialog = false;
          that
            .$http({
              url: "api/member/pwds",
              method: "get",
              params: {
                id: that.userinfo.id,
                tpassword: that.$route.params.pwd,
                rtpassword: that.$route.params.pwd,
                yzm: window.sessionStorage.getItem("set_pwd_code")
              }
            })
            .then(function(res) {
              if (res.data.code == 0) {
                that.$toast({
                  message: that.$t("setpwd.o"),
                  position: "mid",
                  duration: 1000
                });
                that.btnmsg = that.$t("setpwd.p");
              } else {
                that.$vux.toast.show({
                  text: "修改失败",
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        } else {
          this.$toast({
            message: that.$t("msglogin.tip.c"),
            position: "mid",
            duration: 1000
          });
        }
      } else {
        this.$router.push({
          name: "shop"
        });
      }
    },
    sub() {
      this.$router.push({
        name: "resetpwd3"
      });
    }
  }
};
</script>
<style scoped>
.cppwd {
  padding-top: 1.1rem;
  width: 100%;
  background: #f5f5f9;
  font-size: 0.36rem;
  box-sizing: border-box;
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
  height: 1.6rem;
  padding-top: 1.0667rem;
  background: white;
  border-bottom: 1px solid #e4e4e5; /*no*/
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

.br {
  border-right: 1px solid #bbb; /*no*/
}
.six {
  margin-top: 0.6667rem;
}
.pd {
  padding: 0 4% 0;
}
.next {
  width: 90%;
  line-height: 1.0667rem;
  text-align: center;
  background: #839fff;
  border-radius: 4px;
  margin: 0.4rem auto;
  color: white;
}
</style>
