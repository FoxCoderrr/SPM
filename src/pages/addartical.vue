<template>
  <div class="linkus">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('wz.c')}}</p>
      </div>
        <div class="art">
            <div class="div">
                <x-input type="text"  v-model="title" :placeholder="$t('wz.d')"></x-input>
            </div>
            <div class="div mt30">
                <x-textarea :rows="8"  v-model="con" :placeholder="$t('wz.e')"></x-textarea>
            </div>
        </div>
        <p class="addart fs3" @click="addart">{{$t('wz.f')}}</p>
  </div>
</template>
<script>
import { XInput, XTextarea } from "vux";
export default {
  data() {
    return {
      title: "",
      con: ""
    };
  },
  mounted() {

  },
  methods: {
    back() {
      this.$router.back();
    },
    addart() {
      let that = this;
      that
        .$http({
          url: "api/marticle/insert",
          method: "get",
          params: {
            id: that.userinfo.id,
            title: that.title,
            content: that.con
          }
        })
        .then(function(res) {
          that.$vux.toast.show({
            text: that.$t("wz.g"),
            type: "success",
            position: "middle",
            time: 1000
          });
          that.$router.back();
        });
    }
  },
  components: {
    XInput,
    XTextarea
  }
};
</script>
<style scoped>
.linkus {
  padding-top: 120px;
}
.icon-return {
  position: absolute;
  line-height: 80px;
  font-size: 50px;
  color: white;
  left: 2%;
}
.art {
  padding: 20px;
}
.div {
  background: white;
  box-shadow: 0px 0px 6px 2px #c6e3ff; /*no*/
  border-radius: 10px;
  overflow: hidden;
}
.addart {
  width: 94%;
  line-height: 80px;
  background: #26a4ff;
  border-radius: 10px;
  color: white;
  text-align: center;
  margin: 30px auto;
}
</style>
