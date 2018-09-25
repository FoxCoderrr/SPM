<template>
  <div class="resetpwd">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('setpwd.a')}}</p>
      </div>
       <div class="tip">
          <p class="fs3">{{$t('setpwd.f')}} <span class="fw">{{name}}{{$t('setpwd.g')}}</span> {{$t('setpwd.h')}}</p>
      </div>
      <div class="input">
          <input type="text" v-model="idennum" :placeholder="$t('setpwd.i')">
      </div>
      <p @click="tonext" class="next">{{$t('setpwd.j')}}</p>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      name: "",
      iden: "",
      idennum: ""
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
    $(".resetpwd").css("min-height", height);
    that
      .$http({
        url: "api/member/ziliao",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.iden = res.data[0].identity;
        that.name = "*" + res.data[0].realname.substr(1);
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    tonext() {
      let that = this;
      console.log(this.iden);
      if (this.idennum == this.iden) {
        this.$router.push({
          name: "resetpwd2"
        });
      } else {
        this.$toast({
          message: that.$t("setpwd.k"),
          position: "top",
          duration: 1000
        });
      }
    }
  }
};
</script>
<style scoped>
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
  color: white;
}
.resetpwd {
  padding-top: 1.1rem;
  height: 100%;
  box-sizing: border-box;
  background: #f5f5f9;
  font-size: 0.36rem;
}
.tip {
  height: 100px;
  padding-top: 0.6667rem;
  background: white;
  border-bottom: 1px solid #e4e4e5; /*no*/
}
.fw {
  font-weight: 700;
}
input {
  border: none;
  outline: none;
  width: 100%;
  margin: 0 auto;
  line-height: 1.0667rem;
}
.input {
  width: 100%;
  padding: 0 4% 0;
  margin: 0.4rem 0 0.4rem;
  box-sizing: border-box;
  background: white;
  border-top: 1px solid #eaeaec; /*no*/
  border-bottom: 1px solid #eaeaec; /*no*/
}
.next {
  width: 90%;
  line-height: 1.0667rem;
  background: #839fff;
  border-radius: 4px;
  color: white;
  text-align: center;
  margin: 0 auto;
}
</style>
