<template>
  <div class="myTeam">
      <div class="top">
        <img @click="addart" class="addImg" src="../assets/add.png" alt="">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('mine.nav.f')}}</p>
      </div>
    <tab class="tab" bar-active-color="#26a4ff" active-color="#26a4ff">
      <tab-item selected  @click.native="navTap(1)" :class="{navSelect:nid==1}">{{$t('wz.a')}}</tab-item>
      <tab-item @click.native="navTap(2)" :class="{navSelect:nid==2}">{{$t('wz.b')}}</tab-item>
    </tab>
     <v-loadmore ref="loadmore" :bottomPullText="$t('deal.tb.a')" :topDropText="$t('shop.tb.b')" :topLoadingText="$t('shop.tb.c')" :topPullText="$t('shop.tb.a')" :bottomDropText="$t('shop.tb.b')" :bottomLoadingText="$t('shop.tb.c')" :autoFill="false" :bottom-all-loaded="ifMore" :top-method="refresh" :bottom-method="getMore">
        <ul>
            <li v-for="(item,index) in list" @click="toDetail(item.id)">
              <p class="tal fw">{{item.title}}</p>
              <p class="tal">{{item.content}}</p>
              <p class="fc ppl"><span class="iconfont icon-yanjing"></span> <span>{{item.cishu||0}}</span>人 </p>
            </li>
        </ul>
      </v-loadmore>
  </div>
</template>
<script>
import { Tab, TabItem } from "vux";
import { Loadmore } from "mint-ui";
export default {
  data() {
    return {
      transitionName: "",
      nid: 1,
      ifMore: false,
      list: [],
      page: 1,
      limit: 8
    };
  },
  mounted() {

    let that = this;
    that.getList(that.page, that.limit, 0);
  },
  methods: {
    back() {
      this.$router.back();
    },
    navTap(i) {
      let that = this;
      that.list = null;
      this.nid = i;
      if (that.nid == 1) {
        that.getList(that.page, that.limit, 0);
      } else {
        that.getList(that.page, that.limit, 1);
      }
    },
    addart() {
      this.$router.push({
        name: "addartical"
      });
    },
    toDetail(id) {
      this.$router.push({
        name: "artdetail",
        params: {
          id: id,
          type: this.nid
        }
      });
    },
    getList(page, limit, id) {
      let that = this;
      let params = {};
      let url = "";
      that.list = [];
      if (id == 0) {
        url = "api/marticle/all";
        params = {
          page: page,
          limit: limit
        };
      } else {
        url = "api/marticle/index";
        params = {
          id: that.userinfo.id,
          page: page,
          limit: limit
        };
      }
      this.$http({
        url: url,
        method: "get",
        params: params
      }).then(function(res) {
        if (res.data.code != -1) {
          that.list = res.data.msg;
        }
      });
    },
    refresh() {
      let that = this;
      setTimeout(() => {
        this.page = 1;
        if (that.nid == 1) {
          that.getList(that.page, that.limit, 0);
        } else {
          that.getList(that.page, that.limit, 1);
        }
        this.$refs.loadmore.onTopLoaded();
        this.ifMore = false;
      }, 1000);
    },
    getMore() {
      var that = this;
      that.page++;
      let params = {};
      let url = "";
      if (that.nid == 1) {
        url = "api/marticle/all";
        params = {
          page: that.page,
          limit: that.limit
        };
      } else {
        url = "api/marticle/index";
        params = {
          id: that.userinfo.id,
          page: that.page,
          limit: that.limit
        };
      }
      this.$http({
        url: url,
        method: "get",
        params: params
      }).then(function(res) {
        if (res.data.code == 0) {
          that.list = that.list.concat(res.data.msg);
          that.$refs.loadmore.onBottomLoaded();
          that.$nextTick(function() {
            that.scrollMode = "touch";
          });
        } else {
          that.$refs.loadmore.onBottomLoaded();
          that.ifMore = true;
          that.$toast({
            message: that.$t("deal.tip.j"),
            position: "bottom",
            duration: 1000
          });
        }
      });
    }
  },
  components: {
    Tab,
    TabItem,
    "v-loadmore": Loadmore
  }
};
</script>
<style scoped>
.top {
  background: #26a4ff;
}
.top p {
  color: white;
}
.myTeam {
  padding-top: 80px;
}
.tab {
  width: 94%;
  margin: 30px auto 0;
  background: white;
  box-shadow: 0px 0px 6px 2px #c6e3ff; /*no*/
  border-radius: 10px;
  overflow: hidden;
}
.icon-return {
  position: absolute;
  line-height: 80px;
  font-size: 50px;
  color: white;
  left: 2%;
}
.addImg {
  position: absolute;
  width: 40px;
  right: 2%;
  top: 20px;
}
ul {
  width: 94%;
  margin: 0 auto;
}
li {
  background: white;
  box-shadow: 0px 0px 6px 2px #c6e3ff; /*no*/
  border-radius: 10px;
  overflow: hidden;
  margin: 30px auto;
  padding: 20px;
  box-sizing: border-box;
  position: relative;
}
li p {
  line-height: 36px;
}
.fw {
  font-weight: 700;
}
.ppl {
  position: absolute;
  bottom: 12px;
  right: 34px;
}
</style>
