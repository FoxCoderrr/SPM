<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('mymill.l')}}</p>
      </div>
      <div class="bg">
        <p class="fc00">{{name}}</p>
      </div>
      <div class="info tal">
        <p class="fc11">{{$t('mymill.m')}}：{{profit}} <span class="gec"> SPM</span></p>
        <!-- <p class="fc11 mt10">{{$t('mymill.m')}}：{{msg.count}}G/s</p> -->
        <p class="fc11 mt10">{{$t('mymill.n')}}：<span class="fc22">{{h}}</span>{{$t('mymill.r')}}<span class="fc22">{{m}}</span>{{$t('mymill.s')}}<span class="fc22">{{s}}</span>{{$t('mymill.t')}}</p>
        <p class="fc33 mt10">{{$t('mymill.p')}}：{{shengyu}} SPM</p>
        <!-- <p class="fc33 mt10">{{$t('mymill.q')}}：{{msg.quan||0}}G/s</p> -->
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "",
      name: this.$route.params.name,
      msg: "",
      zong: "",
      shengyu: "",
      h: "",
      m: "",
      s: ""
    };
  },
  computed: {
    profit() {
      if (this.zong) {
        return parseFloat(this.zong).toFixed(8);
      }
    },
    syProfit() {
      if (this.shengyu) {
        return parseFloat(this.shengyu).toFixed(8);
      }
    }
  },
  mounted() {

    let that = this;
     mui.back = function() {
       clearInterval(tt);
      that.$router.back();
      error;
    };
    if (window.tt) {
      clearInterval(tt);
    }
    that
      .$http({
        url: "api/mymills/run",
        method: "get",
        params: {
          id: that.$route.params.id
        }
      })
      .then(function(res) {
        if (res.data.code == -2) {
          that.$vux.toast.show({
            text: that.$t("mymill.z"),
            type: "warn",
            position: "middle",
            time: 1500
          });
          that
            .$http({
              url: "api/mymills/runno",
              method: "get",
              params: {
                id: that.$route.params.id
              }
            })
            .then(function(res) {
              that.$router.back();
            });
        } else {
          that.msg = res.data.msg;
          that.zong = res.data.msg.zong;
          that.shengyu = res.data.msg.shengyu;
          let t = res.data.msg.sheng;
          window.tt = setInterval(function() {
            t--;
            that.h = Math.floor(t / 60 / 60);
            that.m = Math.floor((t / 60) % 60);
            that.s = Math.floor(t % 60);
            that.zong += parseFloat(res.data.msg.shengyu) / 1440 / 3600;
            if (that.m < 10) {
              that.m = "0" + that.m;
            }
            if (that.s < 10) {
              that.s = "0" + that.s;
            }
            if (that.h == 0 && that.m == 0 && that.s == 0) {
              clearInterval(window.tt);
            }
          }, 1000);
        }
      });
  },
  methods: {
    back() {
      window.clearInterval(window.tt);
      this.$router.back();
    }
  },
  components: {}
};
</script>
<style scoped>
.fc00 {
  color: white;
  font-size: 0.36rem;
}
.myTeam {
  padding-top: 1.1rem;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.bg {
  padding-top: 0.5333rem;
  box-sizing: border-box;
  width: 100%;
  height: 9.3333rem;
  background: url("../assets/flash.gif");
  background-size: 100% 100%;
}
.info {
  width: 96%;
  padding: 0.5333rem;
  box-sizing: border-box;
  margin: -0.6667rem auto;
  background: #2b2e4c;
  border-radius: 4px;
  overflow: hidden;
}
.fc11 {
  color: #839fff;
}
.fc22 {
  color: #51d9e8;
}
.fc33 {
  color: #687dc9;
}
.info p:nth-child(1) {
  font-size: 0.5333rem;
}
.info p:nth-child(1) .gec {
  font-size: 0.4rem;
}
.info p:nth-child(2) {
  font-size: 0.4533rem;
}
.info p:nth-child(3) {
  font-size: 0.4rem;
}
.info p:nth-child(4) {
  font-size: 0.3467rem;
}
.info p:nth-child(5) {
  font-size: 0.32rem;
}
.info p:nth-child(6) {
  font-size: 0.2933rem;
}
</style>
