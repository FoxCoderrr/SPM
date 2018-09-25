<template>
  <div class="changeMobile">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('bc.c')}}</p>
      </div>
      <div class="con">
          <div class="lh bg pd bb">
              <input v-model="idbank" type="text" :placeholder="$t('bc.d')" @input="change">
          </div>
          <div class="lh bg pd codediv">
              <input v-model="code" type="text" :placeholder="$t('cph.d')">
              <span @click="getcode" class="code fc2" :class="{fc000:btnmsg!=$t('code')}">{{btnmsg}}</span>
          </div>
      </div>
      <p @click="sub" class="btn">{{$t('cfm')}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      ccode: "",
      btnmsg: this.$t("code"),
      time: 60,
      idbank: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      clearInterval(window.t0);
      that.$router.push({
        name: "userinfo"
      });
      error;
    };
  },
  methods: {
    back() {
      clearInterval(window.t0);
      this.$router.push({
        name: "userinfo"
      });
    },
    change() {
      // if (this.idbank.replace(/\s+/g, "").length % 4 == 0) {
      //   this.idbank += " ";
      // }
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
      if (
        that.code != "" &&
        that.idbank!=""
      ) {
        that
          .$http({
            url: "api/authentication/banks",
            method: "get",
            params: {
              id: that.userinfo.id,
              idbank: that.idbank,
              yzm: that.code
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.alert.show({
                title: that.$t("cfm"),
                buttonText: that.$t("deal.tip.a"),
                content: that.$t("cph.e"),
                onShow() {},
                onHide() {
                  that.$router.push({
                    name: "userinfo"
                  });
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
          message: "请输入完整信息！",
          position: "mid",
          duration: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
input {
  border: none;
  outline: none;
  width: 100%;
  color: white;
  background: transparent;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.changeMobile {
  padding-top: 1.3333rem;
  color: white;
  font-size: 0.36rem;
}
.changeMobile ::-webkit-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-moz-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-o-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-ms-input-placeholder { 
  color: rgba(255,255,255,.9);  
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
.con .fc000 {
  color: rgba(255, 255, 255, .7) !important;
}
</style>
