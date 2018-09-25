<template>
    <div class="sort">
        <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{title}}</p>
        </div>
        <div class="nav">
        <tab class="tab" :line-width = 2 custom-bar-width="10px" bar-active-color="#839fff" active-color="#839fff" :scroll-threshold="5">
          <tab-item selected @click.native="navTap(1)" :class="{navSelect:nid==1}">综合排行</tab-item>
          <tab-item @click.native="navTap(2)" :class="{navSelect:nid==2}">销量升序</tab-item>
          <tab-item @click.native="navTap(3)" :class="{navSelect:nid==3}">销量降序</tab-item>
          <tab-item @click.native="navTap(4)" :class="{navSelect:nid==4}">价格升序</tab-item>
          <tab-item @click.native="navTap(5)" :class="{navSelect:nid==5}">价格降序</tab-item>
        </tab>
      </div>
        <!-- 商品 -->
        <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh">
            <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check=false>
                <li v-for="(item,index) in list" :key="index" @click="toDetail(item.id)">
                    <img v-lazy="item.url">
                    <div class="title">{{item.title}}</div>
                    <div class="info tal">
                        <div>已售：{{item.sell_num}}件</div>
                        <div>{{item.price}} 元</div>
                    </div>
                </li>
            </ul>
             <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </van-pull-refresh>
    </div>
</template>
<script>
import $ from "jquery";
import { Tab, TabItem, LoadMore, XImg } from "vux";
import { PullRefresh } from "vant";
import "vant/lib/vant-css/pull-refresh.css";
import imgUrl from "../assets/10.png";
export default {
  data() {
    return {
      nid: 1,
      limit: 10,
      title: this.$route.params.name,
      show: false,
      img: imgUrl,
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: true,
      nif: false,
      loading: false,
      isLoading: false
    };
  },
  components: {
    XImg,
    Tab,
    TabItem,
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

    that.getlist(that.$route.params.id, 0, that.page, that.limit);
  },
  methods: {
    back() {
      this.$router.back();
    },
    navTap(i) {
      this.nid = i;
      this.lif = true;
      this.nif = false;
      this.loading = false;
      this.list = [];
      this.page = 1;
      this.getlist();
    },
    toDetail(id) {
      this.$router.push({
        name: "gooddetail",
        params: {
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
      that.getlist();
    },
    loadMore() {
      let that = this;
      that.lif = true;
      that.page++;
      that.getlist();
    },
    getlist() {
      let that = this;
      that
        .$http({
          url: "/api/shop_minings/all",
          method: "get",
          params: {
            eid: that.$route.params.id,
            type: that.nid - 1,
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
  box-sizing: border-box;
  padding: 2.3rem 0 0rem;
  font-size: 0.36rem;
  background: #ededed;
  overflow: hidden;

  .nav {
    background: white;
    width: 100%;
    position: fixed;
    top: 1.1rem;
    z-index: 1;
    box-sizing: border-box;
    border-bottom: 0.1rem solid #ededed;
  }
}

.sort {
  ul {
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
      padding-bottom: 0.2rem;
      min-height: 6.5rem;

      img {
        max-width: 100%;
        height: 4.4rem;
      }
      > div {
        text-align: left;
        padding: 0 8% 0;
      }
      .title {
        font-size: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .info {
        font-size: 0.32rem;
        color: #fc4191;
        padding-top: 0.2rem;

        > div {
          line-height: 0.5rem;
        }
      }
    }
  }
  ul li:nth-child(2n) {
    float: right;
  }
  ul li:nth-child(2n + 1) {
    float: left;
  }
}
</style>
