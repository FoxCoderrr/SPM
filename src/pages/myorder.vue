<template>
    <div class="sort">
        <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>订单</p>
        </div>
        <div class="nav">
        <tab class="tab" :line-width = 2 custom-bar-width="10px" bar-active-color="#839fff" active-color="#839fff" :scroll-threshold="5">
          <tab-item @click.native="navTap(4)">全部</tab-item>
          <tab-item @click.native="navTap(0)">待付款</tab-item>
          <tab-item @click.native="navTap(1)">待发货</tab-item>
          <tab-item @click.native="navTap(2)">待收货</tab-item>
          <tab-item @click.native="navTap(3)">已完成</tab-item>
        </tab>
      </div>
        <!-- 订单 -->
        <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh">

        <div class="cart_list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
            <div class="d_order" v-for="(item1,index1) in list" :key="index1" @click="toOrderDetail(item1[0])">
              <div class="list" v-for="(item2,index2) in item1[1]" :key="index2">
                  <div class="shop_name tal d-flex">
                      <span class="iconfont icon-dianpu"></span>
                      <span>{{item2.title}}</span>
                  </div>
                  <div class="l" v-for="(item3,index3) in item2.content" :key="index3">
                      <div class="left">
                          <img :src="item3.url" alt="">
                      </div>
                      <div class="right">
                          <div class="info">{{item3.title}}</div>
                          <div class="s_info">
                              <span>{{item3.spec_name}}</span>
                              <span class="fr">&times; {{item3.num}}</span>
                          </div>
                      </div>
                  </div>
              </div>
              
              <div class="b_info">
                  <div>
                    <span v-if="item1[2].o_status==0">总计：<span class="spm">{{item1[2].z_spm}}SPM&nbsp;&nbsp;</span><span class="cny">{{item1[2].z_money}}元</span></span>
                    <span v-if="item1[2].o_status==1">实付：<span class="spm">{{item1[2].z_spm}}SPM&nbsp;&nbsp;</span><span class="cny">{{item1[2].z_money}}元</span></span>
                    <span v-if="item1[2].o_status==2||item1[2].o_status==3">共1件：<span class="spm">{{item1[2].z_spm}}SPM&nbsp;&nbsp;</span><span class="cny">{{item1[2].z_money}}元</span></span>
                    <span class="f_c0">利润消耗：{{item1[2].spm_dels}}%</span>
                  </div>
                  <div>
                    <span v-if="item1[2].o_status==1" class="btn" @click.stop="confirm()">催发货</span>
                    <span v-if="item1[2].o_status==2" class="btn" @click.stop="finish(item1[0])">确认收货</span>
                    <span v-if="item1[2].o_status==3" class="btn finish_btn">已完成</span>
                    <span v-if="item1[2].o_status==0" class="btn" @click.stop="pay(item1[0])">付款</span>
                  </div>
              </div>
            </div>
        </div>
         <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </van-pull-refresh>
        <div class="mask" v-if="mask" @click="hideMask"></div>
        <div class="pwd" v-if="pwd">
            <!-- 密码输入 -->
            <van-password-input
                :value="value"
                info=""
                @focus="showKeyboard = true"
            />
            <div class="forget" @click="toAS">忘记密码</div>
            <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
            />
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, LoadMore } from "vux";
import { PullRefresh } from "vant";
import "vant/lib/vant-css/pull-refresh.css";
import { PasswordInput, NumberKeyboard } from "vant";
import "vant/lib/vant-css/index.css";
export default {
  data() {
    return {
      nid: this.$route.params.i,
      show: false,
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
      isLoading: false,
      pwd: false,
      mask: false,
      value: "",
      showKeyboard: true,
      cur_id: ""
    };
  },
  components: {
    Tab,
    TabItem,
    LoadMore,
    "van-pull-refresh": PullRefresh,
    "van-password-input": PasswordInput,
    "van-number-keyboard": NumberKeyboard
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
    if (that.$route.params.i == 4) {
      $(".vux-tab-item")
        .eq(0)
        .trigger("click");
    } else {
      $(".vux-tab-item")
        .eq(that.$route.params.i + 1)
        .trigger("click");
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    toAS(){
      this.$router.push({
        name:"changepaypwd"
      })
    },
    navTap(i) {
      this.nid = i;
      this.lif = true;
      this.nif = false;
      this.loading = false;
      this.page = 1;
      this.list = [];
      this.getlist(this.nid);
    },
    onRefresh() {
      let that = this;
      that.isLoading = true;
      that.loading = false;
      that.page = 1;
      that.list = [];
      that.getlist(that.nid);
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist(that.nid);
    },
    hideMask() {
      this.pwd = false;
      this.mask = false;
    },
    onInput(key) {
      let that = this;
      this.value = (this.value + key).slice(0, 6);
      if (this.value.length == 6) {
        that.$vux.loading.show({
          text: ""
        });
        that
          .$http({
            url: "api/shop_goods/submit_order_pwd",
            method: "post",
            data: {
              id: that.userinfo.id,
              order: that.cur_id,
              pwd: that.value
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.mask = false;
              that.pwd = false;
              that.value = "";
              that.$vux.toast.show({
                text: "购买成功！",
                type: "success",
                position: "middle",
                time: 1200
              });
              that.$router.push({
                name: "orderdetail",
                params: {
                  id: that.cur_id,
                  source: 0
                }
              });
            } else {
              that.$vux.toast.show({
                text: "密码错误！",
                type: "warn",
                position: "middle",
                time: 1200
              });
            }
          });
      }
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    getlist(i) {
      let that = this;
      that
        .$http({
          url: "/api/shop_goods/orderlists",
          method: "get",
          params: {
            id: that.userinfo.id,
            type: i,
            page: that.page,
            limit: 10
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code != 0) {
            if (res.data.code == 1) {
              that.nif = false;
              that.list = that.list.concat(res.data.data);
            } else {
              that.nif = true;
              that.loading = true;
            }
          } else {
            that.nif = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toOrderDetail(id) {
      let that = this;
      that.$router.push({
        name: "orderdetail",
        params: {
          id: id,
          source: 1
        }
      });
    },
    confirm() {
      this.$vux.toast.show({
        text: "提醒成功！",
        type: "success",
        position: "middle",
        time: 1200
      });
    },
    finish(id) {
      let that = this;
      that
        .$http({
          url: "/api/shop_goods/orderyes",
          method: "get",
          params: {
            id: id
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            that.$vux.toast.show({
              text: "订单完成！",
              type: "success",
              position: "middle",
              time: 1200
            });
            that.nid = 3;
            that.navTap(3);
          } else {
            that.$vux.toast.show({
              text: "确认失败！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        });
    },
    pay(id) {
      let that = this;
      that.mask = true;
      that.pwd = true;
      that.cur_id = id;
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 2.2rem 0 0rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;
  overflow: hidden;
  .pwd {
    position: fixed;
    bottom: 0;
    z-index: 99;
    width: 100%;
    padding-top: 0.8rem;
    bottom: 0;
    height: 320px;
    background: white;

    .forget {
      color: #808080;
      text-align: right;
      padding-right: 4%;
      padding-top: 0.1rem;
    }
  }
  .mask {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99;
  }
  .nav {
    background: white;
    width: 100%;
    position: fixed;
    top: 1.1rem;
    z-index: 1;
    border-bottom: 0.1rem solid #ededed;
  }
  .cart_list {
    .list:first-child {
      margin-top: 0.1rem;
    }
    .d_order {
      margin-bottom: 0.3rem;
      background: white;

      .b_info {
        padding: 0 3% 0.3rem;
        border-top: 1px solid #ededed;
        > div:first-child {
          padding: 0.2rem 0 0.2rem;
          overflow: hidden;
          > span {
            float: left;
          }
          > span:last-child {
            float: right;
          }
          .cny{
            color: #808080;
            font-size: 0.34rem;
          }
          .spm{
            color: #fc4160;
          }
        }
        > div {
          overflow: hidden;
          .btn {
            border-radius: 20px;
            padding: 0.1rem 0.3rem 0.1rem;
            background: #fc4160;
            color: white;
            float: right;
            margin-top: 0.2rem;
          }
          .finish_btn {
            background: #bbb;
          }
        }
      }
    }
    .list {
      .shop_name {
        width: 94%;
        margin: 0 auto;
        box-sizing: border-box;
        font-size: 0.34rem;
        border-top: 1px solid #ededed;
        padding: 0.3rem 0 0.1rem;
        border-bottom: 1px solid #ededed;

        > span {
          display: inline-block;
        }
        .icon-dianpu {
          font-size: 0.5rem;
          color: #a7a5a5;
          transform: translateY(-2px);
        }
      }
      .l {
        overflow: hidden;
        padding: 0.2rem 3% 0.3rem;
        box-sizing: border-box;
        .left {
          float: left;
          img {
            width: 1.6rem;
            height: 1.6rem;
            margin-left: 0.1rem;
          }
        }
        .right {
          float: right;
          width: calc(100% - 2.6rem);

          .info {
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .s_info {
            overflow: hidden;
            padding: 0.2rem;
            text-align: left;
            font-size: 0.32rem;

            > span {
              color: #a7a5a5;
              padding-right: 0.2rem;
            }
            > span:last-child {
              font-size: 0.36rem;
            }
          }
        }
      }
    }
  }
}
</style>
