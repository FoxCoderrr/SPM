<template>
  <div class="linkus">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>文章内容</p>
      </div>
      <div class="con">
          <p class="tal fs3">{{art.title}}</p>
          <p class="tal fc00">
              <span>{{art.time}}</span>
              <span class="fc ppl ml00"><span class="iconfont icon-yanjing"></span> <span>{{art.cishu||0}}</span>人 </span>
              <span class="fc2 fr" v-if="type==2" @click="deleteArt">删除</span>
          </p>
          <p class="tal ti mt20">{{art.content}}</p>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: this.$route.params.type,
      art: {},
      dialog: false
    };
  },
  mounted() {
    let that = this;
    // 点击量
    that
      .$http({
        url: "api/marticle/cishu",
        method: "get",
        params: {
          id: that.$route.params.id,
          uid: that.userinfo.id
        }
      })
      .then(function(res) {});
    // 获取详情
    that
      .$http({
        url: "api/marticle/xiangqing",
        method: "get",
        params: {
          id: that.$route.params.id
        }
      })
      .then(function(res) {
        that.art = res.data.msg[0];
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    deleteArt() {
      let that = this;
      that.$vux.confirm.show({
        title: "确认",
        content: "确定要删除该文章吗？",
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "api/marticle/del",
              method: "get",
              params: {
                id: that.$route.params.id
              }
            })
            .then(function(res) {
              that.$vux.toast.show({
                text: "删除成功！",
                type: "success",
                position: "middle",
                time: 1000
              });
              that.$router.back();
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.linkus {
  padding-top: 80px;
}
.icon-return {
  position: absolute;
  line-height: 80px;
  font-size: 50px;
  color: white;
  left: 2%;
}
.con {
  padding: 40px;
}
.ti {
  text-indent: 52px;
}
.fc00 {
  color: #999;
}
.ml00 {
  margin-left: 10px;
}
</style>
