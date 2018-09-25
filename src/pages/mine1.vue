<template>
    <div class="sort">
        <div class="m_top">
            <img src="../assets/SPM01.png" alt="">
        </div>
        <div class="order">
            <div class="d-flex title">
                <span class="flex1 tal">我的订单</span>
                <span class="flex1 tar" @click="toOrder(4)">查看全部订单 ></span>
            </div>
            <div class="d-flex nav">
                <div class="flex1" @click="toOrder(0)">
                    <img src="../assets/mine1_1.png" alt="">
                    <p>待付款</p>
                </div>
                <div class="flex1" @click="toOrder(1)">
                    <img src="../assets/mine1_2.png" alt="">
                    <p>待发货</p>
                </div>
                <div class="flex1" @click="toOrder(2)">
                    <img src="../assets/mine1_3.png" alt="">
                    <p>待收货</p>
                </div>
                <div class="flex1" @click="toOrder(3)">
                    <img src="../assets/mine1_4.png" alt="">
                    <p>已完成</p>
                </div>
            </div>
        </div>
            <div class="bot">
                <div @click="toAds">
                    <div class="fl">
                        <span class="iconfont icon-chakantiezidingwei f_cb"></span>收货地址
                    </div>
                    <span class="fr iconfont icon-iconfontjiantou5"></span>
                </div>
                <div @click="toAsafe">
                    <div class="fl">
                        <span class="iconfont icon-mima54 f_cy"></span>账户安全
                    </div>
                    <span class="fr iconfont icon-iconfontjiantou5"></span>
                </div>
            </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  components: {},
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
  },
  methods: {
    back() {
      this.$router.back();
    },
    toAds() {
      this.$router.push({
        name: "address",
        params: {
          source: 0
        }
      });
    },
    toAsafe() {
      this.$router.push({
        name: "accountsafe"
      });
    },
    toOrder(i) {
      this.$router.push({
        name: "myorder",
        params: {
          i: i
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 0 0 1.3rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;
  overflow: hidden;

  .m_top {
    height: 8.6rem;
    margin-top: -3.4rem;
    background: url("../assets/mine_bg.png");
    background-size: 100% 100%;
    img {
      display: block;
      width: 2rem;
      border-radius: 50%;
      border: 2px solid #68dcea;
      margin: 0 auto;
      transform: translateY(5.7rem);
    }
  }
  .order {
    background: white;
    width: 94%;
    margin: 0 auto;
    .title {
      line-height: 0.9rem;
      padding: 0 0.3rem 0;
      border-bottom: 1px solid #ededed;
      > span:last-child {
        color: #808080;
      }
    }
    .nav {
      padding: 0.3rem;
      color: #808080;
    }
    .flex1 {
      img {
        width: 1.1rem;
      }
    }
  }
  .bot {
    overflow: hidden;
    border-radius: 6px;
    background: white;
    width: 94%;
    margin: 0.4rem auto 0;
    padding-bottom: 0.4rem;
    > div {
      overflow: hidden;
      margin: 0.3rem;
      border-bottom: 1px solid #ededed;
      line-height: 1rem;
      box-sizing: border-box;

      .iconfont {
        font-size: 0.5rem;
        display: inline-block;
        transform: translateY(1px);
        margin-right: 0.2rem;
      }
      > .iconfont {
        color: #808080;
      }
      .f_cb {
        color: #269fde;
      }
      .f_cy {
        color: #f79355;
      }
    }
  }
}
</style>
