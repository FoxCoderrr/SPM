<template>
  <div class="sellinfo">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('sellinfo.a')}}</p>
      </div>
      <ul class="list">
        <li class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.b')}}</span>
          <span class="flex3">{{sellinfo.name}}</span>
        </li>
        <li class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.g')}}</span>
          <span class="flex3">{{sellinfo.num}}</span>
        </li>
        <li class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.h')}}</span>
          <span class="flex3">{{sellinfo.unitprice}}CNY</span>
        </li>
        <li class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.i')}}</span>
          <span class="flex3">{{sellinfo.huansuan}}CNY</span>
        </li>
        <li v-if="sellinfo.wechat" class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.c')}}</span>
          <span class="flex3">{{sellinfo.wechat}}</span>
        </li>
        <li v-if="sellinfo.alipay" class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.d')}}</span>
          <span class="flex3">{{sellinfo.alipay}} ( {{realname}} )</span>
        </li>
        <li v-if="sellinfo.idbank" class="row d-flex tal">
          <span class="flex1">{{$t('sellinfo.e')}}</span>
          <span class="flex3">{{banknum}}</span>
        </li>
        <li class="row">
          <x-button type="default" class="btn imgbtn" @click.native="upsellimg">{{$t('sellinfo.f')}}</x-button>
        </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sellinfo: "",
      rname: "",
      bankn: "",
      oid: ""
    };
  },
  mounted() {
 
    let that = this;
     mui.back = function() {
      clearInterval(window.t0);
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "api/hangup/sellxx",
        method: "get",
        params: {
          id: that.$route.params.id
        }
      })
      .then(function(res) {
        console.log(res)
        that.sellinfo = res.data[0];
        that.rname = res.data[0].realname;
        that.bankn = res.data[0].idbank;
      });
    that
      .$http({
        url: "/api/order/sheng",
        method: "get",
        params: {
          hid: that.$route.params.id
        }
      })
      .then(function(res) {
        that.oid = res.data[0].id;
      });
  },
  computed: {
    banknum() {
      if (this.bankn) {
        return this.bankn.replace(/\s/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
      }
    },
    realname() {
      if (this.rname) {
        return "*" + this.rname.substr(1);
      }
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    upsellimg() {
      let that = this;
      this.$router.push({
        name: "upsellimg",
        params: {
          id: that.oid
        }
      });
    }
  }
};
</script>
<style scoped>
.sellinfo {
  padding-top: 1.3rem;
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 0.36rem;
  box-sizing: border-box;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
ul {
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
  box-sizing: border-box;
  background: #2b2e4c;
}
li {
  padding: 0 0.2667rem 0 0.5333rem;
  line-height: 1.0667rem;
  border-bottom: 1px solid #315181; /*no*/
}
ul li:last-child {
  border: none;
  padding: 0.4rem;
}
.fc000 {
  color: red;
}
.sellinfo .weui-btn_default{
  width: 80%;
  margin: 0.2rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.sellinfo .weui-btn_default:active{
  background: rgb(127, 150, 223);
  color: white;
}
</style>
