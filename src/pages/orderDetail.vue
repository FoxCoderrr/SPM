<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>订单详情</p>
        </div>
        <!-- 地址 -->
        <div class="address">
            <div>
                <span class="fl">收货人：{{info.name}}</span>
                <span class="fr">{{info.tel}}</span>
            </div>
            <div>
                <span class="iconfont icon-chakantiezidingwei fl"></span>
                <div class="fl">收货地址：{{info.adress}}</div>
            </div>
        </div>
            <div class="b_shim"></div>
        <!-- 商品清单 -->
        <div class="cart_list">
            <div class="list" v-for="(item,index) in list" :key="index">
                <div class="shop_name tal d-flex">
                    <span class="iconfont icon-dianpu"></span>
                    <span @click="toDianpu(item.name,item.id)">{{item.name}} >>></span>
                </div>
                <div class="l" v-for="(item1,index1) in item.content" :key="index1">
                    <div class="left">
                        <img @click="toGoodDetail(item1.goods_id)" :src="item1.url" alt="">
                    </div>
                    <div class="right">
                        <div class="info">{{item1.title}}</div>
                        <div class="f_c0">
                            <span>{{item1.price}} 元 <span>&times; {{item1.number}}</span></span>
                            <span>利润消耗：{{item1.spm_dels}}%</span>
                        </div>
                        <div class="time">发货时间：卖家承诺72小时内发货</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="order_info">
            <ul>
                <li>订单编号：{{$route.params.id}}</li>
                <li>创建时间：{{info.create_time}}</li>
                <li v-if="info.pay_time">付款时间：{{info.pay_time}}</li>
                <li v-if="info.diliver_time">发货时间：{{info.diliver_time}}</li>
            </ul>
        </div>

        <div class="mask" v-if="mask" @click="hideMask"></div>
        <div class="pwd" v-if="pwd">
            <!-- 密码输入 -->
            <van-password-input
                :value="value"
                info=""
                @focus="showKeyboard = true"
            />
            <div class="forget" @click="topwd">忘记密码</div>
            <!-- 数字键盘 -->
                <van-number-keyboard
                    :show="showKeyboard"
                    @input="onInput"
                    @delete="onDelete"
            />
        </div>

        <!-- 底部 -->
        <div v-if="bshow" class="footer">
            <div class="sum">
                <span>合计：<span class="f_c0">{{info.count_spm}}SPM</span></span>
                <span class="btn" @click="sub">提交订单</span>
            </div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
import { PasswordInput, NumberKeyboard } from "vant";
import "vant/lib/vant-css/index.css";
export default {
  data() {
    return {
      all: false,
      bshow: false,
      pwd: false,
      mask: false,
      value: "",
      showKeyboard: true,
      sum:"",
      list:"",
      info:"",
    };
  },
  components: {
    "van-password-input": PasswordInput,
    "van-number-keyboard": NumberKeyboard
  },
  mounted() {
    let that = this;
    mui.back = function() {
      if(that.$route.params.source==0){
        that.$router.push({
          name: "sort"
        });
      }else{
        that.$router.back();
      }
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
    if(that.$route.params.source ==1){
      that.bshow = true;
    }
    that
      .$http({
        url: "api/shop_goods/order_xq",
        method: "get",
        params: {
          order: that.$route.params.id
        }
      })
      .then(function(res) {
        if(res.data.code==1){
          that.list = res.data.data;
          that.info = res.data.msg;
        }
      });
  },
  methods: {
    back() {
      let that = this;
      if(that.$route.params.source==0){
        that.$router.push({
          name: "sort",
        });
      }else{
        that.$router.back();
      }
    },
    topwd(){
      this.$router.push({
        name:"changepaypwd"
      })
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
              order: that.$route.params.id,
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
                text: "支付成功！",
                type: "success",
                position: "middle",
                time: 1200
              });
              that.$router.push({
                name:"myorder",
                params:{
                  i:1
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
    sub() {
      let that = this;
      that.mask = true;
      that.pwd = true;
    },
    toDianpu(name,id){
      this.$router.push({
        name:"goods",
        params:{
          name:name,
          id:id,
        }
      })
    },
    toGoodDetail(id){
      this.$router.push({
        name:"gooddetail",
        params:{
          id:id,
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 1.1rem 0 1.6rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;
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
  }
  .address {
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.3rem 3% 0.3rem;
    background: white;

    > div:first-child {
      overflow: hidden;
      padding: 0 0.5rem 0;
      span {
        display: inline-block;
      }
    }
    > div:last-child {
      overflow: hidden;
      padding-top: 0.3rem;
      > span:first-child {
        color: #ff4081;
      }
      > .iconfont {
        font-size: 0.4rem;
        transform: translateY(0.05rem);
      }
      > div {
        width: calc(100% - 1rem);
        text-align: left;
        padding-left: 0.1rem;
        font-size: 0.32rem;
      }
    }
  }
  .b_shim {
    background: url("../assets/b_shim.png");
    background-size: 100% 100%;
    height: 0.2rem;
    width: 100%;
    margin-bottom: 0.4rem;
  }
  .cart_list {
    .list {
      background: white;
      border-bottom: 1px solid #ededed;
      .shop_name {
        margin: 0 3% 0;
        box-sizing: border-box;
        line-height: 0.8rem;
        height: 0.8rem;
        border-bottom: 1px solid #ededed;

        i {
          vertical-align: top;
          display: inline-block;
          line-height: 0.8rem;
        }
        > span {
          display: inline-block;
          height: 0.8rem;
        }
        .icon-dianpu {
          font-size: 0.5rem;
          color: #a7a5a5;
          padding: 0 0.1rem 0 0.2rem;
        }
      }
      .l {
        overflow: hidden;
        padding: 0.2rem 3% 0.3rem;
        box-sizing: border-box;
        .left {
          float: left;

          i {
            display: inline-block;
            line-height: 1.6rem;
            vertical-align: top;
          }
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
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: left;
          }
          .f_c0 {
            overflow: hidden;
            line-height: 0.4rem;
            padding: 0.1rem 0.1rem 0;

            > span:first-child {
              float: left;
              font-size: 0.4rem;
              > span {
                color: #333;
                font-size: 0.32rem;
              }
            }
            > span:last-child {
              float: right;
              font-size: 0.32rem;
            }
          }
          .time {
            color: #ff4081;
            font-size: 0.32rem;
            padding-top: 0.2rem;
            text-align: right;
          }
        }
      }
    }
  }
  .footer {
    position: fixed;
    border-top: 1px solid #ededed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 3%;
    line-height: 1rem;
    background: white;
    .sum {
      float: right;

      > span {
        display: inline-block;
        height: 1rem;
      }
      .btn {
        float: right;
        background: #839fff;
        color: white;
        box-sizing: border-box;
        padding: 0 0.5rem 0;
        margin-left: 0.2rem;
      }
    }
  }
  .order_info {
    margin-top: 0.3rem;
    background: white;
    text-align: left;
    padding: 0.4rem 3% 0.4rem;
    font-size: 0.32rem;

    li {
      line-height: 0.6rem;
    }
  }
}
</style>
