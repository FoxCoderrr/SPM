<template>
  <div class="myMills">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('mine.nav.a')}}</p>
      </div>
      <div class="nav">
        <tab class="tab" :line-width = 2 custom-bar-width="40px" bar-active-color="#839fff" active-color="#839fff">
          <tab-item selected  @click.native="navTap(2)" :class="{navSelect:nid==2}">{{$t('mymill.a')}}</tab-item>
           <tab-item @click.native="navTap(1)" :class="{navSelect:nid==1}">{{$t('mymill.b')}}</tab-item>
           <tab-item @click.native="navTap(3)" :class="{navSelect:nid==3}">{{$t('mymill.c')}}</tab-item>
        </tab>
      </div>
    <p class="tips fc mt20" v-if="noneIf">{{$t('mymill.d')}}</p>
    <ul class="milllist">
      <li v-for="(item,index) in list">
        <div class="d-flex">
          <div class="flex1">
            <img :src="item.pic" alt="">
          </div>
          <div class="flex3 millinfo">
            <p class="fs3 fc00">{{item.names}}</p>
            <p class="lh zt">{{typemsg}}</p>
            <p class="lh">{{$t('mymill.e')}} <span>{{item.bianhao}}</span></p>
            <p class="lh">{{$t('mymill.f')}}：<span>{{item.life}}</span>{{$t('mymill.k')}}</p>
            <p class="lh">{{$t('mymill.g')}}：<span>{{item.yield}}</span>GB</p>
            <p class="mm-btn" v-if="btnif" @click="operate(item.id,index,item.names)">{{btnmsg}}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
export default {
  data() {
    return {
      transitionName: "",
      nid: 2,
      noneIf: false,
      ym: this.url,
      list: []
    };
  },

  computed: {
    btnmsg() {
      let that = this;
      if (this.nid == 2) {
        return that.$t("mymill.h");
      } else {
        return that.$t("mymill.i");
      }
    },
    typemsg() {
      let that = this;
      if (this.nid == 2) {
        return that.$t("mymill.a");
      } else if (this.nid == 1) {
        return that.$t("mymill.b");
      } else {
        return that.$t("mymill.c");
      }
    },
    btnif() {
      if (this.nid == 1 || this.nid == 2) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    back() {
      this.$router.back();
    },
    navTap(id) {
      this.list = [];
      this.nid = id;
      var that = this;
      that
        .$http({
          url: "/api/mymills/getlist",
          method: "get",
          params: {
            id: that.userinfo.id,
            type: id
          }
        })
        .then(function(res) {
          if (res.data.length) {
            that.list = res.data;
            that.noneIf = false;
          } else {
            that.noneIf = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    operate(id, i, name) {
      let that = this;
      if (that.nid == 1) {
        that
          .$http({
            url: "/api/mymills/type",
            method: "get",
            params: {
              id: id,
              type: 2
            }
          })
          .then(function(res) {
            that.list.splice(i, 1);
            that.$vux.toast.show({
              text: that.$t("mymill.j"),
              type: "success",
              position: "middle",
              time: 1000
            });
          });
      } else {
        that.$router.push({
          name: "run",
          params: {
            id: id,
            name: name
          }
        });
      }
    }
  },
  components: {
    Tab,
    TabItem
  },
  mounted() {

    var that = this;
     mui.back = function() {
      that.$router.push({
        name: "mine"
      });
      error;
    };
    that
      .$http({
        url: "/api/mymills/getlist",
        method: "get",
        params: {
          id: that.userinfo.id,
          type: 2
        }
      })
      .then(function(res) {
        if (res.data.length) {
          that.list = res.data;
          that.noneIf = false;
        } else {
          that.noneIf = true;
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
.tips{
  color: rgba(255, 255, 255, .7)
}
.nav {
  width: 100%;
  height: 1.7333rem;
  position: fixed;
  top: 1.0667rem;
  z-index: 99999;
  background: #141738;
}
.tab {
  width: 94%;
  margin: 0.4rem auto 0;
  background: white;
  overflow: hidden;
}
.myMills {
  padding-top: 2.6667rem;
  color: white;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.0667rem;
  font-size: 0.6667rem;
  color: white;
  left: 2%;
}
.lh {
  line-height: 0.5333rem;
}
.milllist {
  padding: 0 3% 0.4rem;
}
.myMills li {
  background: #18254c;
  color: rgba(255, 255, 255, .8);
  text-align: left;
  padding: 0.2667rem;
  margin-top: 0.4rem;
  font-size: 0.32rem;
}
.fc00{
  color: white;
  font-size: 0.36rem
}
.millinfo {
  position: relative;
}
.mm-btn {
  position: absolute;
  width: 1.5rem;
  line-height: 0.8rem;
  background: #839fff;
  border-radius: 4px;
  text-align: center;
  right: 0rem;
  bottom: 0.2667rem;
}
.zt {
  position: absolute;
  top: 0.0267rem;
  right: 0.2933rem;
}
img {
  width: 90%;
  margin-top: 5%;
}
</style>
