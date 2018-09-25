<template>
  <div class="userinfo">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('mine.nav.g')}}</p>
      </div>
      <ul class="info">
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.g')}}</p>
            <p class="flex3 tal fc ppl" :class="{fc111:ziliao.name}">
              <input type="text" v-model="uname" @blur="rename">
              <span class="edit fc2 iconfont icon-web-icon-"></span>
            </p>
          </li>
          <!-- <li class="d-flex">
            <p class="flex1 tal">{{$t('self.h')}}</p>
            <p class="flex3 tal fc" :class="{fc111:ziliao.names}">{{ziliao.names}}</p>
          </li> -->
          <li class="d-flex">
              <p class="flex1 tal">{{$t('self.f')}}</p>
            <router-link class="flex3 tal fc" :to="{name: 'changemobile',params:{phone: ziliao.phone}}">
              <p :class="{fc111:ziliao.phone}">{{mobile}} <span class="iconfont icon-iconfontjiantou5"></span></p>
            </router-link>
          </li>
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.a')}}</p>
            <p @click="iden" class="flex3 tal fc">{{idenmsg}}<span v-if="ziliao.type==2" class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.b')}}</p>
            <p class="flex3 tal fc toe" @click="towx" :class="{fc111:ziliao.wechat}">{{wxmsg}}<span class="iconfont icon-iconfontjiantou5"></span></p>
          </li>
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.c')}}</p>
            <div class="flex3 tal fc" @click="toAlipay">
            <p :class="{fc111:ziliao.alipay}">{{alpmsg}}<span class="iconfont icon-iconfontjiantou5"></span></p>
            </div>
          </li>
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.d')}}</p>
            <div class="flex3 tal fc" @click="toCard">
            <p class="flex3 tal fc toe" :class="{fc111:ziliao.idbank}">{{bankmsg}}<span class="iconfont icon-iconfontjiantou5"></span></p>
            </div>
          </li>
          <li class="d-flex">
            <p class="flex1 tal">{{$t('self.e')}}</p>
            <p class="flex3 tal fc toe spe">{{ziliao.qukuai}}</p>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "",
      ziliao: "",
      uname: "",
      old_name: ""
    };
  },
  computed: {
    mobile() {
      if (this.ziliao) {
        return (
          this.ziliao.phone.substr(0, 3) + "****" + this.ziliao.phone.substr(7)
        );
      }
    },
    idenmsg() {
      let that = this;
      if (this.ziliao.type == 0) {
        return that.$t("self.i");
      } else if (this.ziliao.type == 1) {
        return that.$t("self.n");
      } else if (this.ziliao.type == 2) {
        return that.$t("self.j");
      } else {
        return "";
      }
    },
    wxmsg() {
      if (this.ziliao.wechat) {
        return this.ziliao.wechat;
      } else {
        return this.$t("self.k");
      }
    },
    alpmsg() {
      if (this.ziliao.alipay) {
        return this.ziliao.alipay;
      } else {
        return this.$t("self.l");
      }
    },
    bankmsg() {
      if (this.ziliao.idbank) {
        return this.ziliao.idbank;
      } else {
        return this.$t("self.m");
      }
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that
        .$http({
          url: "api/member/name",
          method: "get",
          params: {
            id: that.userinfo.id,
            name: that.uname
          }
        })
        .then(function(res) {});
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.ziliao = res.data[0];
        that.uname = res.data[0].name;
        that.old_name = res.data[0].name;
      });
  },
  methods: {
    back() {
      this.$router.push({
        name: "mine"
      });
      let that = this;
      that
        .$http({
          url: "api/member/name",
          method: "get",
          params: {
            id: that.userinfo.id,
            name: that.uname
          }
        })
        .then(function(res) {});
    },
    rename() {
      if (!this.uname) {
        this.uname = this.old_name;
      }
    },
    toAlipay() {
      let that = this;
      if (that.ziliao.type == 0) {
        that.$router.push({
          name: "alipay"
        });
      } else {
        that.$vux.toast.show({
          text: "请先完成实名认证！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    towx() {
      let that = this;
      if (that.ziliao.type == 0) {
        that.$router.push({
          name: "weixin"
        });
      } else {
        that.$vux.toast.show({
          text: "请先完成实名认证！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    iden() {
      if (this.ziliao.type == 2) {
        this.$router.push({
          name: "idencard"
        });
      }
    },
    toCard() {
      let that = this;
      if (that.ziliao.type == 0) {
        if (!that.idbank) {
          that.$router.push({
            name: "addcard"
          });
        } else {
          that.$vux.alert.show({
            title: "提示",
            content: "更换银行卡绑定请联系客服！",
            onShow() {},
            onHide() {}
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请先完成实名认证！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    }
  },
  components: {}
};
</script>
<style scoped>
.mt50 {
  margin-top: 0.6667rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}

.icon-iconfontjiantou5 {
  float: right;
  font-size: 0.4rem;
  margin-left: 0.1333rem;
  color: white !important;
}
.userinfo {
  padding-top: 1.1rem;
  color: white;
  font-size: 0.36rem;
}
.info {
  padding: 0 4% 0;
}
ul {
  background: #2b2e4c;
  margin-top: 0.2rem;
}
li {
  font-size: 0.3733rem;
  line-height: 1.0667rem;
  border-bottom: 1px solid #141738; /*no*/
}
ul li:last-child {
  border: none;
}
.fc {
  color: #839fff;
}
.fc111 {
  color: white;
}
input {
  border: 0;
  outline: 0;
  background: transparent;
  color: white;
}
.edit {
  z-index: 1;
  font-size: 0.6133rem;
  position: absolute;
  right: 0px;
  top: 0px;
}
.ppl {
  position: relative;
}
.spe {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
