<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>新增收货地址</p>
        </div>
        <!-- 地址 -->
        <div class="form">
            <div>
                <span class="fl">联系人：</span>
                <input class="fr" type="text" placeholder="请填写收货人姓名" v-model="name">
            </div>
            <div>
                <span class="fl"></span>
                <div class="fr tal">
                    <span @click.stop="check($event,0,'先生')">
                    <i class="weui-icon weui_icon_circle weui-icon-circle"></i>先生
                    </span>
                    <span @click="check($event,1,'女士')">
                    <i class="weui-icon weui_icon_circle weui-icon-circle"></i>女士
                    </span>
                </div>
            </div>
            <div>
                <span class="fl">手机号：</span>
                <input class="fr" type="number" placeholder="请填写收货人手机号码" v-model="tel">
            </div>
            <div>
                <span class="fl">收货地址：</span>
                <div class="fr d-flex" :class="{f_cc:!ads1=='省'}" @click="showAds">
                    <div class="flex1">
                        <span>{{ads1}}</span>
                        <span class="iconfont icon-sanjiaodown fr"></span>
                    </div>
                    <div class="flex1">
                        <span>{{ads2}}</span>
                        <span class="iconfont icon-sanjiaodown fr"></span>
                    </div>
                    <div class="flex1">
                        <span>{{ads3}}</span>
                        <span class="iconfont icon-sanjiaodown fr"></span>
                    </div>
                </div>
            </div>
            <div>
                <span class="fl">门牌号：</span>
                <input class="fr" type="text" placeholder="详细地址，例：1号楼5层301室" v-model="room">
            </div>
            <div>
                <span class="fl">设为默认地址</span>
                <span class="fr">
                    <van-switch v-model="checked" size="22px" />
                </span>
            </div>
            <button class="btn" @click="subAds">保存地址</button>
        </div>
        <!-- <x-dialog v-model="dialog" hide-on-blur class="ads_dialog"> -->
        <div class="mask" v-if="dialog" @click="hideAds($event)">
            <div class="ads_piker">
              <van-area :area-list="areaList" @confirm="setAds" @cancel="dialog = false"/>
            </div>
        </div>
        <!-- </x-dialog> -->
    </div>
</template>
<script>
import $ from "jquery";
import { Switch, Area } from "vant";
// import { XDialog } from "vux";
import "vant/lib/vant-css/base.css";
import "vant/lib/vant-css/switch.css";
import "vant/lib/vant-css/picker.css";
import AreaList from "../base/js/area";
export default {
  data() {
    return {
      checked: false,
      ads: false,
      dialog: false,
      areaList: AreaList,
      name: "",
      sex: "",
      tel: "",
      ads1: "省",
      ads2: "市",
      ads3: "区",
      room: ""
    };
  },
  components: {
    // XDialog,
    "van-switch": Switch,
    "van-area": Area
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
  },
  methods: {
    back() {
      this.$router.back();
    },
    check(e, i, sex) {
      this.sex = sex;
      $(".weui-icon").removeClass("weui-icon-success");
      if (e.target.nodeName == "I") {
        $(e.target).addClass("weui-icon-success");
      } else {
        $(e.target)
          .find("i")
          .addClass("weui-icon-success");
      }
    },
    showAds() {
      this.dialog = true;
      setTimeout(() => {
        $(".van-picker__cancel").html("取消");
        $(".van-picker__confirm").html("确定");
      }, 100);
    },
    hideAds(e) {
      if (e.target.className == "mask") {
        this.dialog = false;
      }
    },
    setAds(e) {
      this.dialog = false;
      this.ads1 = e[0].name;
      this.ads2 = e[1].name;
      this.ads3 = e[2].name;
    },
    subAds() {
      let that = this;
      if (
        that.name &&
        that.sex &&
        that.tel &&
        that.ads1 &&
        that.ads2 &&
        that.ads3 &&
        that.room
      ) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (reg.test(that.tel)) {
          let t = Number(that.checked);
          that
            .$http({
              url: "api/shop_address/insert",
              method: "get",
              params: {
                id: that.userinfo.id,
                name: that.name,
                sex: that.sex,
                tel: that.tel,
                adress_p: that.ads1,
                adress_c: that.ads2,
                adress_a: that.ads3,
                room: that.room,
                type: t
              }
            })
            .then(function(res) {
              that.$vux.toast.show({
                text: "添加成功",
                type: "success",
                position: "middle",
                time: 1200
              });
            });
        } else {
          that.$vux.toast.show({
            text: "请输入正确的手机号！",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请输入完整信息！",
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
  padding: 1.1rem 0 2rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: white;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;

    .ads_piker {
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }
  .form {
    padding: 0 3% 0;

    > div {
      border-bottom: 1px solid #ededed;
      height: 1.1rem;
      line-height: 1.1rem;

      > .fr {
        width: calc(100% - 1.9rem);

        > span {
          display: inline-block;
          i {
            font-size: 0.5rem;
            vertical-align: middle;
            margin-right: 0.1rem;
          }
        }
        > span:last-child {
          margin-left: 0.8rem;
        }
      }
      input {
        border: 0;
        width: 100%;
      }
      .f_cc {
        color: #808080;
      }
    }
    > div:nth-child(6) > .fr {
      padding-top: 0.19rem;
      width: auto;
    }
    > button {
      width: 100%;
      line-height: 0.9rem;
      background: #839fff;
      color: white;
      border-radius: 6px;
      margin-top: 0.6rem;
    }
  }
}
</style>
