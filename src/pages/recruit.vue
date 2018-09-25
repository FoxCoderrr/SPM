<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('mine.nav.e')}}</p>
      </div>
      <div class="code">
        <qrcode :value="links"></qrcode>
      </div>
    <p class="p_link">{{links}}</p>
    <div class="teaminfo pd">
      <ul class="pd tal">
        <li class="lh bb"> 
          <span class="fl">{{$t('team.j')}}：</span>
          <input class="fl right" type="text" v-model="info.guild">  
          <img class="edit" src="../assets/edit.png" alt="">
        </li>
        <li class="lh bb">
          <span class="fl">{{$t('team.k')}}：</span>
           <input  class="fl right" type="text" v-model="info.qun"> 
           <img class="edit" src="../assets/edit.png" alt="">
        </li>
        <!-- <li class="lh bb">
          <span class="fl">{{$t('team.l')}}： </span>
          <span class="fl right">{{info.realname}}</span>
        </li> -->
        <li class="lh bb">
          <span class="fl">{{$t('team.m')}}： </span>
          <span class="fl right">{{info.wechart}}</span></li>
        <li class="lh ovh">
          <span class="fl">{{$t('team.n')}}：</span>
          <div class="tt fl right">
             <textarea  class="fl" v-model="info.gulidc">{{info.gulidc}}</textarea> 
          </div>
          <img class="edit" src="../assets/edit.png" alt="">
          </li>
      </ul>
    </div>
    <p class="share" v-clipboard:copy="msg"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError">{{$t('ret.b')}}</p>
  </div>
</template>
<script>
import { Qrcode } from "vux";
export default {
  data() {
    return {
      transitionName: "",
      msg: "",
      links: "",
      info: {
        guild: "",
        qun: "",
        realname: "",
        wechart: "",
        gulidc: ""
      }
    };
  },
  components: {
    Qrcode
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "api/guild/xinxi",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.info = res.data;
        that.links =
          "http://spm.qilinpz.com/spmapp/#/register/" + res.data.link;
        // that.links = "http://www.baidu.com";
        that.msg = res.data.content + that.links;
      });
  },
  methods: {
    // 复制成功
    onCopy(e) {
      let that = this;
      that
        .$http({
          url: "api/guild/xiugai",
          method: "get",
          params: {
            id: that.userinfo.id,
            guild: that.info.guild,
            qun: that.info.qun,
            gulidc: that.info.gulidc
          }
        })
        .then(function(res) {
          that.$toast({
            message: that.$t("ret.c"),
            position: "mid",
            duration: 1000
          });
        });
    },
    // 复制失败
    onError(e) {
      this.$toast({
        message: that.$t("ret.d"),
        position: "mid",
        duration: 1000
      });
    },
    back() {
      let that = this;
      that
        .$http({
          url: "api/guild/xiugai",
          method: "get",
          params: {
            id: that.userinfo.id,
            guild: that.info.guild,
            qun: that.info.qun,
            gulidc: that.info.gulidc
          }
        })
        .then(function(res) {});
      this.$router.back();
    }
  }
};
</script>
<style scoped>
.myTeam {
  padding-top: 1.1rem;
  color: white;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
.p_link {
  text-align: center;
  min-width: 40%;
  max-width: 90%;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.32rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 0.1rem 0.4rem 0.1rem;
  box-sizing: border-box;
  margin-bottom: 0.4rem;
}
.lh {
  line-height: 0.8rem;
}
.bb {
  border-bottom: 1px solid #7abfff; /*no*/
}
.pd {
  padding: 0 3% 0;
}
.teaminfo ul {
  color: white;
  background: #2b2e4c;
  margin: 0 auto 0;
  padding: 0.1333rem 0.2667rem 0.32rem;
}
.share {
  width: 80%;
  line-height: 1rem;
  background: #839fff;
  color: white;
  margin: 0.5333rem auto;
  text-align: center;
}
input,
textarea {
  border: 0;
  outline: 0;
  background: #2b2e4c;
  color: white;
  z-index: 2;
}

.tt {
  width: 76%;
}
textarea {
  width: 100%;
  min-height: 1.0667rem;
}
.edit {
  z-index: 1;
  width: 0.4rem;
  position: absolute;
  right: 0.4rem;
  top: 0.2667rem;
}
li {
  position: relative;
  overflow: hidden;
}
li > span:first-child {
  width: 2.2rem;
}
input {
  width: 72%;
  float: left;
  line-height: 0.8rem;
}

.ee {
  background: #f5f5f5;
}
.fc000 {
  color: #666;
  line-height: 1.0667rem;
}
.code div {
  width: 5.8667rem;
  padding: 0.4rem 0 0.2rem;
  box-sizing: border-box;
  margin: 0.8rem auto 0.2rem;
  border-radius: 0.1333rem;
  overflow: hidden;
  background: #2b2e4c;
}
li .right {
  width: calc(100% - 3.2rem);
}
</style>
