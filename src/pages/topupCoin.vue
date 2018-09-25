<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>充币</p>
        </div>
        <div class="main tal">
            <div class="form">
                <div>
                    <div class="title">充币数量</div>
                    <div>
                        <input type="number" v-model="c_num" @input="testNum" >
                    </div>
                    <div class="trans">合计：{{cny}} CNY</div>
                </div>
            </div>
            <div class="ways">
              <div>请选以下任一方式向商家汇款</div>
              <ul>
                <li>银行卡：{{info.bank}}</li>
                <li>支付宝：{{info.alipay}}</li>
                <li>
                  <span>微信收款：</span>
                  <img :src="info.wechat" alt="">
                </li>
              </ul>
            </div>
            <div class="b_div">
              <div class="c_title">选择支付方式</div>
              <div class="choose">
                <div @click="choose($event,1)" v-if="a">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>支付宝</span>
                </div>
                <div @click="choose($event,2)" v-if="b">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>微信支付</span>
                </div>
                <div @click="choose($event,0)" v-if="c">
                  <span class="iconfont icon-weixuanzhong"></span>
                  <span>银行卡</span>
                </div>
              </div>
              <div class="up_img">
                <div class="f-div">
                      <span class="jia">{{$t('ups.c')}}</span>
                      <img v-if="data1" :src="data1" >
                      <input name="imgg" :disabled="data1!=''" type="file" id="handcard" @change="pushImg1($event)" accept="image/jpeg,image/png,image/gif" alt="" ref="ii">
                      <span class="clear" v-if="data1" @click="delImg1($event)">
                      <span class="vux-close"></span>
                      </span>
                  </div>
              </div>
            </div>
            <button class="btn" @click="sub">提交</button>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      info: "",
      c_num: "",
      ads: "",
      can: "",
      load: false,
      way: -1,
      data1: "",
      urll: "",
      a: "",
      b: "",
      c: "",
      rate:"",
      cny:"0.000"
    };
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
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.a = res.data[0].alipay;
        that.b = res.data[0].wechat;
        that.c = res.data[0].idbank;
      });
    that
      .$http({
        url: "api/usdt/usdt",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.info = res.data.msg;
        that.rate = res.data.msg.bilv;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    testNum() {
      this.c_num = this.c_num.match(/\d+\.?\d{0,8}/);
      this.cny = parseFloat(this.c_num*this.rate).toFixed(3);
    },
    choose(e, i) {
      this.way = i;
      $(e.path[1])
        .find(".iconfont")
        .addClass("icon-xuanzhong").parents("div").siblings("div").find(".iconfont").removeClass("icon-xuanzhong");
    },
    pushImg1: function(e) {
      let file = e.target,
        reader = new FileReader(),
        that = this;
      reader.readAsDataURL(file.files[0]);
      if (file.files[0].size > 10 * 1024 * 1024) {
        that.$vux.toast.show({
          text: that.$t("ups.d"),
          type: "warn",
          position: "middle",
          time: 1500
        });
      } else {
        that.$vux.loading.show({
          text: that.$t("ups.e")
        });
        reader.onload = function() {
          that.data1 = this.result;
          var image = new FormData();
          image.append("img", e.target.files[0]);
          that.$http
            .post("/api/authentication/file", image)
            .then(res => {
              that.$vux.loading.hide();
              if(res.data.code==0){
                that.urll = res.data.data;
              }else{
                that.$vux.toast.show({
                  text: "上传失败，请重新上传！",
                  type: "warn",
                  position: "middle",
                  time: 1200
                });
              }
            })
            .catch(error => {});
        };
      }
    },
    delImg1: function(e) {
      this.data1 = "";
      let dom = document.getElementById("handcard");
      dom.value = "";
    },
    sub() {
      let that = this;
      if (parseFloat(that.c_num) > 0) {
        if (that.data1 && that.way != -1) {
          that.c_num = parseFloat(that.c_num);
          that
            .$http({
              url: "api/usdt/recharge_usdt",
              method: "get",
              params: {
                id: that.userinfo.id,
                num: that.c_num,
                mode: that.way,
                path: that.urll
              }
            })
            .then(function(res) {
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: "提交成功！",
                  type: "success",
                  position: "middle",
                  time: 1200
                });
                that.back();
              } else {
                that.$vux.toast.show({
                  text: res.data.msg,
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        } else {
          that.$vux.toast.show({
            text: "请选择支付方式且上传支付截图！",
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入充币数量！",
          type: "text",
          position: "middle",
          time: 1200
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 1.1rem 0 1rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  color: white;

  .btn {
    width: 88%;
    display: block;
    margin: 1rem auto 0.6rem;
    line-height: 0.9rem;
    text-align: center;
    color: white;
    background: #839fff;
  }
  .choose {
    padding: 0rem 0 0.4rem;
    > div {
      display: inline-block;
      margin-right: 0.4rem;
      .icon-xuanzhong {
        color: #5a66a6;
        display: inline-block;
        transform: translateY(2px);
      }
    }
  }
  .up_img {
    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    input {
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
    }
    .jia {
      line-height: 3.4667rem;
      color: white;
    }
    .clear {
      font-size: 0.2133rem;
      color: orangered;
      position: absolute;
      right: -0.3rem;
      top: -0.4rem;
    }
    .imgs {
      margin-top: 0.1333rem;
    }

    .f-div {
      width: 5.0667rem;
      margin: 0 auto;
      background: #6d6d6d;
      border-radius: 6px;
      position: relative;
      text-align: center;
    }
  }
  .main {
    .b_div {
      background: #2b2e4c;
    }
    .c_title {
      padding: 0.3rem 0 0.3rem;
    }
    > div {
      padding: 0.4rem 8% 0.4rem;
    }
    .form {
      padding: 0 8% 0.4rem;
      background: #2b2e4c;
      .trans {
        text-align: right;
        color: #5a66a6;
        padding: 0.2rem 0 0.1rem;
      }
      .title {
        padding: 0.3rem 0 0.3rem;
      }
      input {
        width: 100%;
        line-height: 0.9rem;
        border: 1px solid #bbb;
        padding: 0 0.1rem 0;
        box-sizing: border-box;
        color: #333;
      }
    }
    .ways {
      padding: 0.4rem 8% 0.4rem;
      background: #2b2e4c;
      margin: 0.4rem 0 0.4rem;

      > div {
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        padding-bottom: 0.2rem;
      }
      ul {
        padding: 0.2rem 0 0.2rem;
        li {
          color: #5a66a6;
          padding-top: 0.3rem;

          img {
            width: 3rem;
            display: inline-block;
            vertical-align: top;
          }
        }
      }
    }
  }
}
</style>
