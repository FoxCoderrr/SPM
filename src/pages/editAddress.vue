<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>修改收货地址</p>
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
                    <span @click.stop="check($event,0,'男士')">
                    <i class="weui-icon weui_icon_circle weui-icon-circle" :class="{'weui-icon-success':sex=='先生'}"></i>先生
                    </span>
                    <span @click="check($event,1,'女士')">
                    <i class="weui-icon weui_icon_circle weui-icon-circle" :class="{'weui-icon-success':sex=='女士'}"></i>女士
                    </span>
                </div>
            </div>
            <div>
                <span class="fl">手机号：</span>
                <input class="fr" type="number" placeholder="请填写收货人手机号码" v-model="tel">
            </div>
            <div>
                <span class="fl">收货地址：</span>
                <div class="fr d-flex" @click="showAds">
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
            <button class="btn" @click="deleteAds">删除地址</button>
        </div>
        <!-- <x-dialog v-model="dialog" hide-on-blur class="ads_dialog"> -->
          <div class="mask" v-if="dialog" @click="hideAds($event)">
            <div class="ads_piker">
              <van-area :area-list="areaList" @confirm="setAds" @cancel="dialog = false" :value = "adsStr"/>
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
      checked: "",
      ads: false,
      dialog: false,
      areaList: AreaList,
      a_id:"",
      name: "",
      sex: "",
      tel: "",
      ads1: "",
      ads2: "",
      ads3: "",
      room: "",
      type: "",
      adsStr: ""
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
    var ads = JSON.parse(window.sessionStorage.getItem("editAds"));
    that.a_id = ads.id;
    that.name = ads.name;
    that.sex = ads.sex;
    that.tel = ads.tel;
    that.ads1 = ads.adress_p;
    that.ads2 = ads.adress_c;
    that.ads3 = ads.adress_a;
    that.room = ads.room;
    that.type = ads.type;
    if (that.type == 1) {
      that.checked = true;
    } else {
      that.checked = false;
    }
    let p_list = AreaList.province_list;
    let c_list = AreaList.city_list;
    let a_list = AreaList.county_list;
    let str1, str2, str3;
    for (let k in p_list) {
      if (p_list[k] == that.ads1) {
        str1 = k;
      }
    }
    for (let k in c_list) {
      if (c_list[k] == that.ads2) {
        str2 = k;
      }
    }
    for (let k in a_list) {
      if (a_list[k] == that.ads3) {
        str3 = k;
      }
    }
    that.adsStr = str1.substr(0, 2) + str2.substr(2, 2) + str3.substr(4, 2);
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
      // setTimeout(() => {
      //   $(".van-picker__cancel").html("取消");
      //   $(".van-picker__confirm").html("确定");
      // },100);
    },
    hideAds(e){
      if(e.target.className=="mask"){
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
      let t = Number(that.checked);
      if (that.name && that.tel && that.room) {
        let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if (reg.test(that.tel)) {
          that
            .$http({
              url: "api/shop_address/update",
              method: "get",
              params: {
                uid: that.userinfo.id,
                id: that.a_id,
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
              if (res.data.code == 1) {
                that.$vux.toast.show({
                  text: "修改成功！",
                  type: "success",
                  position: "middle",
                  time: 1200
                });
              }else{
                that.$vux.toast.show({
                  text: "修改失败！",
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        } else {
          that.$vux.toast.show({
            text: "请填写正确的手机号",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        that.$vux.toast.show({
          text: "请填写联系人",
          type: "text",
          position: "middle",
          time: 1200
        });
      }
    },
    deleteAds() {
      let that = this;
      this.$vux.confirm.show({
        title: "确认",
        confirmText: "确定",
        cancelText: "取消",
        content: "确定要删除该地址？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "api/shop_address/del",
              method: "get",
              params: {
                id: that.$route.params.id
              }
            })
            .then(function(res) {
              if (res.data.code == -1) {
                that.$vux.toast.show({
                  text: "删除成功",
                  type: "success",
                  position: "middle",
                  time: 1200
                });
              } else {
                that.$vux.toast.show({
                  text: "删除失败",
                  type: "cancel",
                  position: "middle",
                  time: 1200
                });
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 1.1rem 0 0;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: white;

  .mask{
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;

    .ads_piker{
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
      .flex1 > .iconfont {
        color: #808080;
      }

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
    > button:last-child {
      background: white;
      border: 1px solid #839fff;
      color: #839fff;
    }
  }
}
</style>
