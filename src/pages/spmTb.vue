<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>账户安全</p>
        </div>
        <div class="form">
            <div>
                <span class="fl">提币数量</span>
                <input class="fr" type="text" placeholder="请输入提币数量" v-model="u_num" @input="testNum">
            </div>
        </div>
        <button class="btn" @click="sub">确认提币</button>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      u_num: ""
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
  },
  methods: {
    back() {
      this.$router.back();
    },
    testNum() {
      this.u_num = this.u_num.match(/\d+\.?\d{0,8}/);
    },
    sub() {
      let that = this;
      that
        .$http({
          url: "api/Interfaces/Transfer_accounts",
          method: "get",
          params: {
            id: that.userinfo.id,
            transfernumber: that.u_num[0]
          }
        })
        .then(function(res) {
          if (res.data.status.code == 200) {
            that.$vux.toast.show({
              text: "提币成功",
              type: "success",
              position: "middle",
              time: 1200
            });
            that.u_num = "";
          } else {
            that.$vux.toast.show({
              text: res.data.status.message,
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.sort ::-webkit-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.sort ::-moz-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.sort ::-o-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.sort ::-ms-input-placeholder {
  color: rgba(255, 255, 255, 0.7);
}
.sort {
  padding: 1.1rem 0 2rem;
  box-sizing: border-box;
  font-size: 0.36rem;

  .form {
    padding: 0 3% 0;
    background: #2b2e4c;
    color: white;

    > div {
      height: 1.1rem;
      line-height: 1.1rem;

      > .fr {
        width: calc(100% - 1.8rem);
      }
      input {
        border: 0;
        width: 100%;
        background: transparent;
        color: white;
      }
    }
  }
  button {
    width: 94%;
    line-height: 0.9rem;
    background: #839fff;
    color: white;
    border-radius: 4px;
    margin: 1rem auto;
  }
}
</style>
