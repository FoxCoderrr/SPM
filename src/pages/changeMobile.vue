<template>
  <div class="changeMobile">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('cph.a')}}</p>
      </div>
      <div class="con">
          <p class="d-flex lh pd bg m">
              <span class="flex1 tal">{{$t('cph.b')}}</span>
              <span class="flex3 tal">{{phone}}</span>
          </p>
          <div class="lh bg pd bb">
              <input @blur="blur" v-model="newphone" type="text" :placeholder="$t('cph.c')">
          </div>
          <div class="lh bg pd codediv">
              <input v-model="code" type="text" :placeholder="$t('cph.d')">
              <span @click="getcode" class="code" :class="{fc2:btnmsg ==$t('code')}">{{btnmsg}}</span>
          </div>
      </div>
      <p @click="sub" class="btn">{{$t('cfm')}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      newphone: "",
      btnmsg: this.$t("code"),
      time: 60,
      code: "",
      ccode: ""
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
    this.phone = this.$route.params.phone;
  },
  methods: {
    back() {
      clearInterval(window.t0);
      this.$router.back();
    },
    blur() {
      let that = this;
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!reg.test(this.newphone)) {
        this.$toast({
          message: that.$t("msglogin.tip.a"),
          position: "mid",
          duration: 1000
        });
      }
    },
    getcode() {
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      let that = this;
      if (that.btnmsg == that.$t("code") && reg.test(that.newphone)) {
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
      } else {
        this.$toast({
          message: that.$t("msglogin.tip.a"),
          position: "mid",
          duration: 1000
        });
      }
    },
    sub() {
      let that = this;
      if (
        that.code != "" &&
        that.newphone != ""
      ) {
        that
          .$http({
            url: "api/member/phone",
            method: "get",
            params: {
              id: that.userinfo.id,
              phone: that.phone,
              yzm: that.code,
              newphone: that.newphone
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
input {
  border: none;
  outline: none;
  width: 100%;
  background: transparent;
  color: white;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.changeMobile {
  padding-top: 1.1rem;
  color: white;
  font-size: 0.36rem;
}
.m {
  margin: 0.2rem 0 0.8rem;
}
.lh {
  line-height: 1.0667rem;
}
.pd {
  padding: 0 2% 0;
}
.bg{
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
  color: rgba(255, 255, 255, .7);
}
.btn {
  width: 80%;
  line-height: 0.8rem;
  background: #839fff;
  text-align: center;
  color: white;
  margin: 0.5333rem auto;
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
</style>
