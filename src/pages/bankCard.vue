<template>
  <div class="bankCard">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('sellinfo.e')}}</p>
      </div>
      <div v-if="showif" class="c">
        <img :src="'https://apimg.alipay.com/combo.png?d=cashier&t='+jiancheng"/>
        <div class="card">
          <p class="tip fc000">
            <span>{{banktype}}</span>
            <span class="fs000">{{banknum}}</span>
          </p>
        </div>
      </div>
      <router-link :to="{name:'addcard'}">
          <div class="addcard">
            <p><span class="jia fs2">+ </span>{{msg}}</p>
          </div>
      </router-link>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showif: this.$route.params.ifcard,
      bnum: "",
      jiancheng: "",
      tp: ""
    };
  },
  computed: {
    msg() {
      let that = this;
      mui.back = function() {
      that.$router.push({
        name: "userinfo"
      });
      error;
    };
      if (this.$route.params.ifcard) {
        return that.$t("bc.a");
      } else {
        return that.$t("bc.b");
      }
    },
    banktype() {
      if (this.tp) {
        return this.tp.substr(-3);
      }
    },
    banknum() {
      if (this.bnum) {
        let arr = this.bnum.split("");
        let newarr = [];
        let str = this.bnum.substr(-(arr.length % 4));
        for (let i = 0, l = arr.length - arr.length % 4; i < l; i++) {
          if ((i + 1) % 4 == 0) {
            newarr.push("**** ");
          }
        }
        return newarr.join("") + str;
      }
    }
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
    that.bnum = that.$route.params.ifcard;
    that.jiancheng = that.$route.params.jc;
    that.tp = that.$route.params.tp;
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.bankCard {
  padding-top: 1.0667rem;
  color: white;
  font-size: 0.36rem;
}
.bankCard ::-webkit-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.bankCard ::-moz-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.bankCard ::-o-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.bankCard ::-ms-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.addcard {
  border: 1px dashed #bbb; /*no*/
  border-radius: 6px;
  width: 94%;
  margin: 0.6rem auto;
  line-height: 0.9rem;
  font-size: 0.4rem;
  background: #2b2e4c;
}
.jia{
  font-size: 0.6rem;
  color: #839fff;
  display: inline-block;
  transform: translateY(1px);
  margin-right: 0.1rem;
}
.c {
  position: relative;
  width: 96%;
  height: 2.5rem;
  margin: 0.4rem auto 0.4rem;
  color: #444;
}
.card {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 0;
  border-radius: 6px;
  background: white;
  overflow: hidden;
}
img {
  z-index: 1;
  position: absolute;
  left: 0.2933rem;
  top: 0.2933rem;
}
.tip {
  position: absolute;
  left: 1.0133rem;
  bottom: 0.2667rem;
}
.fs000 {
  font-size: 0.4533rem;
  margin-left: 0.2667rem;
}
a{
  color: white;
}
</style>
