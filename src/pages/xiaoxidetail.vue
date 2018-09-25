<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{title}}</p>
      </div>
        <div class="con">
              <p class="tal">
                  <span class="fc2 fs3">{{con.title}}</span>
                  <span>{{con.time}}</span>
                  <span class="hongdian"></span>
                  <span @click="deletexx" class="fr fc2">{{$t('xx.a')}}</span>
              </p>
              <p class="tal mt10">{{con.content}}</p>
        </div>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      transitionName: "",
      con: "",
      title: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "xiaoxi"
      });
      error;
    };
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    $(".myTeam").css("min-height", height);
    that.title = that.$route.params.t;
    that
      .$http({
        url: "api/parameter/read",
        method: "get",
        params: {
          id: that.$route.params.id,
          type: 0
        }
      })
      .then(function(res) {
        that.con = res.data[0];
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    deletexx() {
      let that = this;
      that.$vux.confirm.show({
        title: that.$t("cfm"),
        confirmText: that.$t("deal.tip.a"),
        cancelText: that.$t("deal.tip.b"),
        content: that.$t("xx.b"),
        onShow() {},
        onHide() {},
        onCancel() {},
        onConfirm() {
          that
            .$http({
              url: "api/parameter/del",
              method: "get",
              params: {
                id: that.$route.params.id
              }
            })
            .then(function(res) {
              that.$vux.toast.show({
                text: that.$t("xx.c"),
                type: "success",
                position: "middle",
                time: 1000
              });
              that.$router.back();
            });
        }
      });
    }
  },
  components: {}
};
</script>
<style scoped>
.myTeam {
  padding-top: 1.1rem;
  background: #141738;
  box-sizing: border-box;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
  color: white;
}
.con {
  width: 94%;
  margin: 0.2rem auto;
  padding: 0.26rem;
  box-sizing: border-box;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  color: rgba(255, 255, 255, .8);
  font-size: 0.36rem;
}
.con>p:last-child{
  background: #2b2e4c;
  padding: 0.26rem;
  text-indent: 0.6rem;
}
.con p span:nth-child(2){
  font-size: 0.32rem;
}
</style>
