<template>
  <div class="changeMobile">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('rz.a')}}</p>
      </div>
      <div class="con">
          <div class="lh bg pd bb d-flex">
              <p class="flex1 tal">{{$t('rz.b')}}</p>
              <input class="flex3 tal" type="text" v-model="rName" :placeholder="$t('rz.c')">
          </div>
          <div class="lh bg pd d-flex">
              <p class="flex1 tal">{{$t('rz.d')}}</p>
              <input class="flex3 tal" @blur="testIden" v-model="idenNum" type="text" :placeholder="$t('rz.e')">
          </div>
          <div class="imgArea">
              <p class="tal">{{$t('rz.f')}}</p>
              <div class="imgs">
                  <div v-for="(item,index) in mmm" :key="index" class="ddd">
                      <div class="f-div">
                        <span class="jia">{{item.name}}</span>
                            <img v-if="item.data != ''" :src=" item.data || index " >
                            <input :disabled="item.data!=''" type="file" :id="item.name" @change="pushImg($event,index)" accept="image/jpeg,image/png,image/gif" alt="">
                            <span class="clear" v-if="item.data != ''" @click="delImg($event,index)">
                              <span class="vux-close"></span>
                            </span>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div class="art pd">
          <p class="tal mt30">{{$t('rz.g')}}:</p>
          <p class="tal ti">
              {{$t('rz.h')}}
          </p>
          <p class="tal ti">
              {{$t('rz.i')}}
          </p>
          <p class="tal ti">
              {{$t('rz.j')}}
          </p>
          <p class="tal ti">
              {{$t('rz.k')}}
          </p>
          <p class="tal ti">
            {{$t('rz.l')}}
          </p>
          <p class="tal ti">
            {{$t('rz.m')}}
          </p>
      </div>
      <p class="btn" @click="sub">{{$t('cfm')}}</p>
  </div>
</template>
<script>
import { LoadingPlugin } from "vux";
import qs from "qs";
export default {
  data() {
    return {
      rName: "",
      idenNum: "",
      mmm: [
        {
          name: this.$t("rz.n"),
          data: ""
        },
        {
          name: this.$t("rz.o"),
          data: ""
        },
      ],
      urls: []
    };
  },
  mounted() {
    let that = this;
     mui.back = function() {
      that.$router.push({
        name: "userinfo"
      });
      error;
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
    testIden() {
      let that = this;
      let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(this.idenNum)) {
        this.$toast({
          message: that.$t("rz.r"),
          position: "top",
          duration: 1000
        });
      }
    },
    pushImg: function(e, i) {
      var that = this;
      let mm = this.mmm,
        file = e.target,
        reader = new FileReader();
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
          mm[i].data = this.result;
          var image = new FormData();
          image.append("img", e.target.files[0]);
          that
            .$http({
              url: "/api/authentication/file",
              method: "post",
              data: image,
            })
            .then(function(res) {
              that.$vux.loading.hide();
              if(res.data.code==0){
                that.urls[i] = res.data.data;
              }else{
                that.$vux.toast.show({
                  text: "上传失败，请重新上传！",
                  type: "warn",
                  position: "middle",
                  time: 1200
                });
              }
            })
            .catch(function(error) {
              console.log(error);
            });
        };
      }
    },
    delImg: function(e, i) {
      this.mmm[i].data = "";
      this.urls[i] = "";
      let dom = document.getElementById(this.mmm[i].name);
      dom.value = "";
    },
    sub() {
      let that = this;
      if (
        that.rName == "" ||
        that.idenNum == "" ||
        that.mmm[0].data == "" ||
        that.mmm[1].data == ""
      ) {
        that.$vux.toast.show({
          text: that.$t("login.tip.b"),
          type: "warn",
          position: "middle",
          time: 1000
        });
      } else {
        that
          .$http({
            url: "/api/authentication/idcard",
            method: "get",
            params: {
              id: that.userinfo.id,
              realname: that.rName,
              identity: that.idenNum,
              idfront: that.urls[0],
              idback: that.urls[1],
            }
          })
          .then(function(res) {
            if (res.data.code == 0) {
              that.$vux.toast.show({
                text: that.$t("rz.s"),
                type: "success",
                position: "middle",
                time: 1500
              });
              that.$router.push({
                name: "userinfo"
              });
            } else {
              that.$vux.toast.show({
                text: that.$t("err"),
                type: "warn",
                position: "middle",
                time: 1500
              });
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    }
  }
};
</script>
<style scoped>
input {
  border: none;
  outline: none;
  background: transparent;
  color: white;
}
.changeMobile ::-webkit-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-moz-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-o-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.changeMobile ::-ms-input-placeholder { 
  color: rgba(255,255,255,.9);  
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.ddd {
  width: 40%;
  margin-top: 0.1333rem;
  display: inline-block;
}
.changeMobile {
  padding-top: 1.3333rem;
  font-size: 0.36rem;
  color: white;
}
.m {
  margin: 0.2667rem 0 0.8rem;
}
.lh {
  line-height: 1.0667rem;
}
.pd {
  padding: 0 2% 0;
}
.bg {
  background: #2b2e4c;
}
.bb {
  margin-bottom: 1px;
}

.btn {
  width: 80%;
  line-height: 0.9rem;
  background: #839fff;
  text-align: center;
  color: white;
  margin: 0.7rem auto;
}
.imgArea {
  padding: 0.2667rem 2% 0;
}
.imgArea img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.imgArea input {
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.imgArea .jia {
  line-height: 2.1333rem;
  color: white;
}
.imgArea .clear {
  color: orangered;
  position: absolute;
  right: -0.2667rem;
  top: -0.4267rem;
  cursor: pointer;
}

.f-div {
  width: 90%;
  margin: 0 auto;
  background: #6d6d6d;
  position: relative;
}
.ti {
  text-indent: 0.8rem;
  margin: 0.1333rem 0 0.1333rem;
}
</style>
