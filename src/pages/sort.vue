<template>
    <div class="sort">
        <div class="top">
          <span class="iconfont icon-zhankai" @click="nav"></span>
          <p>分类</p>
        </div>
        <!-- 商品 -->
        <van-pull-refresh class="goods" v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh">
            <ul class="ul"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
                <li v-for="(item,index) in list" :key="index" @click="toGoods(item.name,item.id)">
                    <img v-lazy="item.path">
                    <div class="title">{{item.name}}</div>
                    <div class="des">{{item.content}}</div>
                </li>
            </ul>
             <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </van-pull-refresh>
        <!-- 左侧导航 -->
        <popup v-model="show" position="left" height="100%" @on-hide="hideNav" @on-show="showNav">
            <div class="left_nav">
                <div class="nav_title">
                    <span>全部</span>
                    <span class="iconfont icon-arrfill_d-copy-copy"></span>
                </div>
                <ul>
                    <li v-for="(item,index) in nav_list" :key="index" :class="{lSelect:l_index==index}" @click="clickNav(index,item.id)">{{item.name}}</li>
                </ul>
            </div>
      </popup>
    </div>
</template>
<script>
import $ from "jquery";
import { Popup, XImg, LoadMore } from "vux";
import { PullRefresh } from "vant";
import "vant/lib/vant-css/pull-refresh.css";
import imgUrl from "../assets/10.png";
export default {
  data() {
    return {
      l_id: "",
      limit: 10,
      l_index: 0,
      show: false,
      img: imgUrl,
      nav_list: "",
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
      isLoading: false,
      sort_item: {
        i: "0",
        t: "0",
        p: "1"
      },
      sort_con: []
    };
  },
  components: {
    Popup,
    XImg,
    LoadMore,
    "van-pull-refresh": PullRefresh
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
    $(window).on("scroll", function() {
      that.sort_item.t = $(this).scrollTop();
      window.sessionStorage.setItem(
        "sort_item",
        JSON.stringify(that.sort_item)
      );
    });
    // 左部导航
    that
      .$http({
        url: "api/shop_type/navigation",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.nav_list = res.data.data;
          that.l_id = res.data.data[0].id;
          // if () {
            that.getlist(res.data.data[0].id);
          // } else {
          //   that.lif = false;
          //   that.list = JSON.parse(window.sessionStorage.getItem("sort_con"));
          //   that.page = JSON.parse(
          //     window.sessionStorage.getItem("sort_item")
          //   ).p;
          //   that.l_index = JSON.parse(window.sessionStorage.getItem("sort_item")).i;
          // }
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    nav() {
      this.show = !this.show;
    },
    hideNav() {
      $(".icon-zhankai").animate(
        {
          left: "3%",
          transform: "rotateZ(180deg)"
        },
        200
      );
    },
    showNav() {
      $(".icon-zhankai").animate(
        {
          left: "30%"
        },
        200
      );
    },
    clickNav(i, id) {
      let that = this;
      that.sort_item.i = i;
      window.sessionStorage.setItem(
        "sort_item",
        JSON.stringify(that.sort_item)
      );
      that.show = false;
      that.list = [];
      window.scrollTo(0, 0);
      (that.page = 1), (that.l_index = i);
      that.l_id = id;
      (that.lif = true), (that.nif = false), that.getlist(that.l_id);
    },
    toGoods(name, id) {
      $(window).off("scroll");
      let that = this;
      that.sort_con = that.list;
      that.sort_item.p = that.page;
      window.sessionStorage.setItem(
        "sort_item",
        JSON.stringify(that.sort_item)
      );
      window.sessionStorage.setItem("sort_con", JSON.stringify(that.sort_con));
      this.$router.push({
        name: "goods",
        params: {
          name: name,
          id: id
        }
      });
    },
    onRefresh() {
      let that = this;
      that.isLoading = true;
      that.loading = false;
      that.page = 1;
      that.list = [];
      that.getlist(that.l_id);
    },
    loadMore() {
      console.log(11)
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist(that.l_id);
    },
    getlist(id) {
      let that = this;
      that
        .$http({
          url: "/api/shop_type/classify",
          method: "get",
          params: {
            id: id,
            page: that.page,
            limit: that.limit
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code != -1) {
            if (res.data.code == 1) {
              that.nif = false;
              that.list = that.list.concat(res.data.data);
            } else {
              that.nif = true;
              that.loading = true;
            }
          } else {
            that.nif = true;
            that.loading = true;
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="less" scoped>
img[lazy="loading"] {
  opacity: 0.7;
  transform: scale(0.15);
}
img[lazy="error"] {
  opacity: 0.2;
}
.sort {
  padding: 1.3rem 0 1.3rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;
  overflow: hidden;
}
.icon-zhankai {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.5rem;
  color: white;
  left: 3%;
}
.left_nav {
  height: 100%;
  float: left;
  color: rgba(255, 255, 255, 0.8);
  z-index: 999;

  .nav_title {
    line-height: 1.1rem;
    color: #839fff;
    background: #141738;
    padding: 0 0.2rem 0;
    box-sizing: border-box;

    .iconfont {
      font-size: 0.36rem;
      float: right;
    }
  }
  ul {
    background: rgba(20, 23, 56, 0.86);
    box-sizing: border-box;
    padding: 0 0.2rem 0;
    min-height: calc(100% - 2.4rem);
    overflow-y: auto;
    width: 100%;

    .lSelect {
      color: #839fff;
    }
    li {
      padding: 0 0.5rem 0;
      text-align: center;
      line-height: 1rem;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.5);
    }
  }
}
.sort {
  .ul {
    overflow: hidden;
    padding: 0 3% 0;
    box-sizing: border-box;

    li {
      width: calc(50% - 0.2rem);
      box-sizing: border-box;
      border-radius: 10px;
      overflow: hidden;
      background: white;
      margin-bottom: 0.4rem;
      padding-bottom: 0.4rem;
      min-height: 6.2rem;

      img {
        max-width: 100%;
        height: 4.4rem;
      }
      div {
        text-align: left;
        padding: 0 8% 0;
      }
      .title {
        font-size: 0.4rem;
        line-height: 0.8rem;
      }
      .des {
        font-size: 0.32rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
  .ul li:nth-child(2n) {
    float: right;
  }
  .ul li:nth-child(2n + 1) {
    float: left;
  }
}
</style>
