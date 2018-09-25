<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>确认订单</p>
        </div>
        <!-- 地址 -->
        <div class="address" v-if="yesAds">
            <div>
                <span class="fl">收货人：{{ads.name}}</span>
                <span class="fr">{{ads.tel}}</span>
            </div>
            <div @click="toAddress">
                <span class="iconfont icon-chakantiezidingwei fl"></span>
                <div class="fl">收货地址：{{ads.address}}{{ads.room}}</div>
                <span class="iconfont icon-iconfontjiantou5 fr"></span>
            </div>
        </div>
        <div class="toChoose" v-if="noAds" @click="toAddress">
            <span class="iconfont icon-chakantiezidingwei fl"></span><span>请选择收货地址</span><span class="iconfont icon-iconfontjiantou5 fr"></span>
        </div>
        <!-- 商品清单 -->
        <div class="cart_list">
            <div class="list" v-for="(item,index1) in list" :key="index1">
                <div class="shop_name tal d-flex">
                    <span class="iconfont icon-dianpu"></span>
                    <span @click="toDianpu(item.name,item.id)">{{item.name}} >>></span>
                </div>
                <div class="l" v-for="(item,index2) in item.content" :key="index2">
                    <div class="left">
                        <img @click="toGoodDetail(item.goods_id)" :src="item.url" alt="">
                    </div>
                    <div class="right">
                        <div class="info">{{item.title}}</div>
                        <div class="f_c0">
                            <span>{{item.price}} 元 <span>&times;</span>
                            
                            <span class="s_num">
                                <span class="btn" :class="{f_cc:item.num==1}" @click="des(index1,index2)">-</span>
                                <input type="number" @input="num($event)" @blur="blur($event,index1,index2)" :value="item.num">
                                <span class="btn" @click="add(index1,index2)">+</span>
                            </span>

                            </span>
                            <!-- <span class="item_sum">计：{{item.spm}} SPM</span> -->
                            <span>利润消耗：{{item.spm_dels}}%</span>
                        </div>
                        <div class="time">发货时间：卖家承诺72小时内发货</div>
                    </div>
                </div>
            </div>
        </div>
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

        <!-- 底部 -->
        <div v-if="bshow" class="footer">
            <div class="sum">
                <span>合计：<span class="f_c0">{{sum}}SPM</span></span>
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
      bshow: this.bshow,
      pwd: false,
      mask: false,
      value: "",
      showKeyboard: true,
      yesAds: false,
      noAds: false,
      list: [],
      ads: "",
      sum: "",
      order_id: ""
    };
  },
  components: {
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
    $(window).resize(function() {
      that.bshow = !that.bshow;
    });
    // 查询是否有默认地址
    if (window.sessionStorage.getItem("u_ads")) {
      that.ads = JSON.parse(window.sessionStorage.getItem("u_ads"));
      that.yesAds = true;
      window.sessionStorage.removeItem("u_ads");
    } else {
      that
        .$http({
          url: "api/shop_goods/shoporder",
          method: "get",
          params: {
            id: that.userinfo.id,
            gid: that.$route.params.id
          }
        })
        .then(function(res) {
          if (res.data.code) {
            that.yesAds = true;
            that.ads = res.data.data;
          } else {
            that.noAds = true;
          }
        });
    }
    //   渲染订单内容（区别from是商品详情还是购物车）
    if (that.$route.params.source == 0) {
      // from是商品详情
      let g_id = window.sessionStorage.getItem("g_id");
      that
        .$http({
          url: "api/shop_goods/goodorder",
          method: "get",
          params: {
            id: g_id
          }
        })
        .then(function(res) {
          if (res.data.code == 1) {
            res.data.data[0].content[0].num = 1;
            res.data.data[0].id = res.data.data[0].title.id;
            res.data.data[0].name = res.data.data[0].title.name;
            that.list = res.data.data;
            that.calSum();
          }
        });
    } else {
      // from是购物车
      that.list = JSON.parse(window.sessionStorage.getItem("cart_order"));
      console.log(that.list)
      that.calSum();
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
    num(e) {
      $(e.target).val(
        e.target.value.replace(/[^\d]/g,"")
      );
      if (
        $(e.target)
          .val()
          .split("")[0] == "0"
      ) {
        $(e.target).val("1");
      }
    },
    add(i,j){
      if(this.yesAds){
        this.list[i].content[j].num++;
        this.sum+=this.list[i].content[j].unit_spm;
      }else{
        this.$vux.toast.show({
          text: "请添加收货地址！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    des(i,j){
      if(this.yesAds){
        this.list[i].content[j].num--;
        if(this.list[i].content[j].num<1){
          this.list[i].content[j].num = 1;
        }else{
          this.sum-=this.list[i].content[j].unit_spm;
        }
      }else{
        this.$vux.toast.show({
          text: "请添加收货地址！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
    },
    blur(e,i,j){
      if(Number(e.target.value)){
        this.list[i].content[j].num = Number(e.target.value);
      }else{
        this.list[i].content[j].num = 1;
      }
      this.list[i].content[j].spm =
        this.list[i].content[j].unit_spm * this.list[i].content[j].num;
        this.calSum();
    },
    calSum() {
      let that = this;
      var sum_ = 0;
      console.log(that.list)
      for (var i = 0, l = that.list.length; i < l; i++) {
        for (var ii = 0, ll = that.list[i].content.length; ii < ll; ii++) {
          // if (that.list[i].content[ii].type) {
            sum_ += that.list[i].content[ii].spm;
            console.log(sum_)
          // }
        }
      }
      that.sum = sum_;
      console.log(that.sum)
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
              order: that.order_id,
              pwd: that.value,
              spm:that.sum
            }
          })
          .then(function(res) {
            that.$vux.loading.hide();
            if (res.data.code == 1) {
              that.mask = false;
              that.pwd = false;
              that.value = "";
              that.$vux.toast.show({
                text: res.data.msg,
                type: "success",
                position: "middle",
                time: 1200
              });
              window.sessionStorage.removeItem("cart_order");
              that.$router.push({
                name:"orderdetail",
                params:{
                  id:that.order_id,
                  source: 0
                }
              })
            } else {
              that.$vux.toast.show({
                text: res.data.msg,
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
    toAddress() {
      this.$router.push({
        name: "address",
        params: {
          source: 1
        }
      });
    },
    sub() {
      let that = this;
      if (that.yesAds) {
        that.mask = true;
        that.pwd = true;
        if(that.$route.params.source==0){
          that.list[0].content[0].spec = window.sessionStorage.getItem("specs");
          that.list[0].content[0].express = window.sessionStorage.getItem("fee");
        }
        that.list = that.list;
        let list_ = JSON.stringify(that.list);
        that
          .$http({
            url: "api/shop_goods/submit_order",
            method: "post",
            data: {
              id: that.userinfo.id,
              list: list_,
              adress: that.ads.address,
              room: that.ads.room,
              name: that.ads.name,
              tel:that.ads.tel,
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.order_id = res.data.data;
            }
          });
      } else {
        that.$vux.toast.show({
          text: "请添加收货地址！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      }
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

  .toChoose {
    background: white;
    line-height: 1.2rem;
    padding: 0 8% 0;
    color: #808080;
    margin-bottom: 0.4rem;
  }
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
    margin-bottom: 0.4rem;

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
  .cart_list {
    .list {
      background: white;
      margin-bottom: 0.2rem;
      .shop_name {
        padding: 0 3% 0;
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
          width: 2.4rem;
          text-align: center;
          i {
            display: inline-block;
            line-height: 1.6rem;
            vertical-align: top;
          }
          img {
            max-width: 100%;
            max-height: 2.4rem;
          }
        }
        .right {
          float: right;
          text-align: left;
          width: calc(100% - 2.6rem);

          .s_num {
            line-height: 0.6rem!important;
            text-align: center;
            span {
              padding: 0 !important;
            }
            > span:first-child {
              background: rgba(0, 0, 0, .2);
              color: white;
              display: inline-block;
              width: 0.6rem;
            }
            >.f_cc{
              background: rgba(0, 0, 0, .1)!important;
            }
            input{
                width: 0.6rem;
                text-align: center;
                line-height: 0.6rem;
                border: 0;
            }
            > span:last-child {
              background: rgba(0, 0, 0, .2);
              color: white;
              display: inline-block;
              width: 0.6rem;
            }
          }

          .info {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .f_c0 {
            overflow: hidden;
            line-height: 0.4rem;
            padding: 0.1rem 0.1rem 0;

            > span:first-child {
              display: block;
              font-size: 0.4rem;
              padding: 0.1rem 0 0.1rem;
              > span {
                color: #333;
                font-size: 0.32rem;
              }
            }
            .item_sum{
              float: left;
              line-height: 0.6rem;
            }
            > span:last-child {
              float: right;
              font-size: 0.32rem;
              line-height: 0.6rem;
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
}
</style>
