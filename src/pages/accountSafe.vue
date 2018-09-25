<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>账户安全</p>
        </div>
        <div class="form">
            <div>
                <span class="fl">原密码</span>
                <input class="fr" type="password" placeholder="请输入原密码" v-model="old_pwd" @input="num($event)" maxlength="6">
            </div>
            <div>
                <span class="fl">新密码</span>
                <input class="fr" type="password" placeholder="请输入新密码" v-model="new_pwd" @input="num($event)" maxlength="6">
            </div>
            <div>
                <span class="fl">确认密码</span>
                <input class="fr" type="password" placeholder="请确认新密码" v-model="new_pwd1" @input="num($event)" maxlength="6">
            </div>
        </div>
            <button class="btn" @click="sub">确定</button>
        
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      old_pwd: "",
      new_pwd: "",
      new_pwd1: ""
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
    num(e) {
      this.old_pwd = this.old_pwd.replace(/[^0-9]|\./g, "");
      this.new_pwd = this.new_pwd.replace(/[^0-9]|\./g, "");
      this.new_pwd1 = this.new_pwd1.replace(/[^0-9]|\./g, "");
    },
    testpwd(p) {
      var x = 0;
      p = p.split("");
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == p[i - 1]) {
          ++x;
          if (x >= 2) {
            break;
          }
        } else {
          x = 0;
        }
      }
      if (x >= 2) {
        return true;
      } else {
        return false;
      }
    },
    testpwd1(p) {
      var x = 0;
      p = p.split("");
      for (let i = 1, l = p.length - 1; i < l; i++) {
        if (p[i] == Number(p[i - 1]) + 1) {
          ++x;
          if (x >= 2) {
            break;
          }
        } else {
          x = 0;
        }
      }
      if (x >= 2) {
        return true;
      } else {
        return false;
      }
    },
    sub() {
      let that = this;
      if (that.old_pwd && that.new_pwd && that.new_pwd1) {
        console.log(that.testpwd(that.new_pwd), that.testpwd1(that.new_pwd));
        if (
          that.new_pwd.length == 6 &&
          !that.testpwd(that.new_pwd) &&
          !that.testpwd1(that.new_pwd)
        ) {
          if (that.new_pwd == that.new_pwd1) {
            that
              .$http({
                url: "api/member/pwds",
                method: "get",
                params: {
                  id: that.userinfo.id,
                  tpassword: that.old_pwd,
                  rtpassword: that.new_pwd,
                }
              })
              .then(function(res) {
                if(res.data.code==0){

                  that.$vux.toast.show({
                    text: "修改成功",
                    type: "success",
                    position: "middle",
                    time: 1200
                  });
                }else{
                  that.$vux.toast.show({
                    text: "修改失败",
                    type: "cancel",
                    position: "middle",
                    time: 1200
                  });
                }
              });
          } else {
            that.$vux.toast.show({
              text: "两次新密码输入不一致！",
              type: "cancel",
              position: "middle",
              time: 1200
            });
          }
        } else {
          that.$vux.toast.show({
            text: "密码为6位数字且不可连续！",
            type: "text",
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
  background: #ededed;

  .form {
    padding: 0 3% 0;
    background: white;

    > div {
      border-bottom: 1px solid #ededed;
      height: 1.1rem;
      line-height: 1.1rem;

      > .fr {
        width: calc(100% - 1.8rem);
      }
      input {
        border: 0;
        width: 100%;
        background: transparent;
      }
    }
  }
  button {
    width: 94%;
    line-height: 0.9rem;
    background: #839fff;
    color: white;
    border-radius: 6px;
    margin: 0.6rem auto;
  }
}
</style>
