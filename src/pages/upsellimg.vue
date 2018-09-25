<template>
  <div class="hbxy">
    <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('ups.a')}}</p>
    </div>
    <div>
      <p class="tal pd">{{$t('ups.b')}}</p>
      <ul class="d-flex">
        <li v-if="a" class="flex1">
          <p @click="selectpay(1)">
            <span class="iconfont icon-weixuanzhong"></span>
            {{$t('sellinfo.d')}}
          </p>
        </li>
        <li v-if="b" class="flex1">
          <p @click="selectpay(2)">
            <span class="iconfont icon-weixuanzhong"></span>
            {{$t('sellinfo.c')}}
          </p>
        </li>
        <li v-if="c" class="flex1">
          <p @click="selectpay(3)">
            <span class="iconfont icon-weixuanzhong"></span>
            {{$t('sellinfo.e')}}
          </p>
        </li>
      </ul>
    </div>
    <div class="pd mt50">
        <div class="f-div">
            <span class="jia">{{$t('ups.c')}}</span>
            <img v-if="data1" :src="data1" >
            <input name="imgg" :disabled="data1!=''" type="file" id="handcard" @change="pushImg1($event)" accept="image/jpeg,image/png,image/gif" alt="" ref="ii">
            <span class="clear" v-if="data1" @click="delImg1($event)">
            <span class="vux-close"></span>
            </span>
        </div>
    </div>
    <div class="btndiv">
      <x-button class="btn" @click.native="sub">{{$t('pcode.b')}}</x-button>
    </div>
  </div>
</template>
<script>
import $ from "jquery";
import qs from "qs";
export default {
  data() {
    return {
      data1: "",
      pid: "",
      urll: "",
      a: "",
      b: "",
      c: ""
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
        setTimeout(function() {
          $("ul li")
            .eq(0)
            .find("p")
            .trigger("click");
        }, 500);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    selectpay(id) {
      this.pid = id;
      $(".icon-weixuanzhong").removeClass("icon-xuanzhong");
      $(".icon-weixuanzhong")
        .eq(id - 1)
        .addClass("icon-xuanzhong");
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
              if (res.data.code == 0) {
                that.urll = res.data.data;
              } else {
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
      if (that.data1 != "" && that.pid) {
        that
          .$http({
            url: "/api/order/orders",
            method: "get",
            params: {
              id: that.$route.params.id,
              path: that.urll,
              biaoshi: that.pid
            }
          })
          .then(function(res) {
            that.$vux.alert.show({
              title: "",
              content: that.$t("ups.f"),
              onShow() {},
              onHide() {
                that.$router.push({
                  name: "mydeals",
                  params: {
                    tip: 1
                  }
                });
              }
            });
          });
      } else {
        that.$vux.toast.show({
          text: "请选择支付方式并上传支付截图",
          type: "warn",
          position: "middle",
          time: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.pd {
  padding: 0 4% 0;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.hbxy {
  padding-top: 1.5rem;
  position: absolute;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  color: white;
  font-size: 0.36rem;
}
.btndiv {
  position: absolute;
  width: 100%;
  bottom: 2.1333rem;
}

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
.icon-weixuanzhong {
  font-size: 0.4533rem;
  line-height: 0.4533rem;
}
ul {
  width: 80%;
  margin: 20px auto 0;
}
li p {
  line-height: 0.4533rem;
  text-align: center;
}
.fc000 {
  color: #666;
}
.icon-xuanzhong {
  color: #26a4ff;
}
.mt50 {
  margin-top: 0.6667rem;
}
.hbxy .weui-btn_default {
  width: 80%;
  margin: 0.2rem auto 0;
  background: #839fff;
  color: white;
  border-radius: 0;
  font-size: inherit;
}
.hbxy .weui-btn_default:active {
  background: rgb(127, 150, 223);
  color: white;
}
</style>
