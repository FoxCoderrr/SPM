<template>
    <div class="sort">
        <div class="top">
          <p>购物车</p>
          <span @click="manage">{{deleteArr[0]}}</span>
        </div>
        <!-- 购物车 -->
        <van-pull-refresh v-model="isLoading" pulling-text="下拉刷新" loosing-text="释放更新" loading-text="努力加载中..." @refresh="onRefresh">

        <div class="cart_list" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10"  infinite-scroll-immediate-check=false>
            <div class="list" v-for="(item,index1) in list" :key="index1">
                <div class="shop_name tal d-flex">
                    <i class="weui-icon weui_icon_circle weui-icon-circle" @click="checkTitle($event,index1)"></i>
                    <span class="iconfont icon-dianpu"></span>
                    <span @click="toDianpu(item.name,item.id)">{{item.name}} >>></span>
                </div>
                <div class="l" v-for="(item,index2) in item.content" :key="index2">
                    <div class="left">
                      <i class="weui-icon weui_icon_circle weui-icon-circle" @click="check($event,index1,index2)"></i>
                        <img @click="toGoodDetail(item.goods_id)" :src="item.url" alt="">
                    </div>
                    <div class="right">
                        <div class="info">{{item.title}}</div>
                        <div class="s_info">
                            <span>{{item.spec}}</span>
                            <div>
                                <span :class="{f_cc:item.number==1}" @click="des($event,index1,index2)">-</span>
                                <input type="number" @input="num($event,index1,index2)" @blur="blur($event,index1,index2)" :value="item.num">
                                <span @click="add($event,index1,index2)">+</span>
                            </div>
                        </div>
                        <div class="f_c0">
                            <span>{{item.price}} 元</span>
                            <span>利润消耗：{{item.spm_dels}}%</span>
                        </div>
                    </div>
                </div>
                <div class="b_shim"></div>
            </div>
        </div>
         <load-more v-if="lif" :show-loading="load" tip="正在加载"></load-more>
            <load-more v-if="nif" :show-loading="none" tip="没有更多数据了"></load-more>
        </van-pull-refresh>
        <!-- 底部 -->
        <div v-if="bshow" class="footer">
            <div class="all">
                <check-icon :value.sync="all" @click.native="sAll"> 全选</check-icon>
            </div>
            <div class="sum">
                <span v-if="!deleteIf">合计：<span class="f_c0">{{sum}}SPM</span></span>
                <span class="btn" :class="{deleteBtn:deleteIf}" @click="sub($event)">{{deleteArr[1]}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import { CheckIcon, LoadMore } from "vux";
import $ from "jquery";
import { PullRefresh } from "vant";
import "vant/lib/vant-css/pull-refresh.css";
export default {
  data() {
    return {
      all: false,
      bshow: this.bshow,
      deleteIf: false,
      list: [],
      page: 1,
      load: true,
      none: false,
      lif: false,
      nif: false,
      loading: true,
      isLoading: false,
      sum: "0"
    };
  },
  components: {
    CheckIcon,
    LoadMore,
    "van-pull-refresh": PullRefresh
  },
  computed: {
    deleteArr() {
      if (this.deleteIf) {
        return ["取消", "删除"];
      } else {
        return ["管理", "结算"];
      }
    }
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
    $(window).resize(function() {
      that.bshow = !that.bshow;
    });
    that.getlist();
  },
  methods: {
    checkTitle(e, i, j) {
      if ($(e.target).hasClass("weui-icon-success")) {
        $(e.target).removeClass("weui-icon-success");
        // 取消店铺选中
        $(e.target)
          .parents(".list")
          .find(".weui-icon")
          .removeClass("weui-icon-success");
        for (let x = 0, l = this.list[i].content.length; x < l; x++) {
          this.list[i].content[x].type = 0;
        }
        this.calSum();
      } else {
        $(e.target).addClass("weui-icon-success");
        // 选中店铺
        $(e.target)
          .parents(".list")
          .find(".weui-icon")
          .addClass("weui-icon-success");
        for (let x = 0, l = this.list[i].content.length; x < l; x++) {
          this.list[i].content[x].type = 1;
        }
        this.calSum();
      }
    },
    check(e, i, j) {
      if ($(e.target).hasClass("weui-icon-success")) {
        $(e.target).removeClass("weui-icon-success");
        // 取消店铺选中
        this.list[i].content[j].type = 0;
        this.calSum();
        let ifAll = true;
        for (let x = 0, l = this.list[i].content.length; x < l; x++) {
          if (this.list[i].content[x].type == 1) {
            ifAll = false;
            break;
          }
        }
        if (ifAll) {
          $(".cart_list .list")
            .eq(i)
            .find(".shop_name .weui-icon")
            .removeClass("weui-icon-success");
        }
      } else {
        $(e.target).addClass("weui-icon-success");
        // 选中店铺
        this.list[i].content[j].type = 1;
        this.calSum();
        let ifAll = true;
        for (let x = 0, l = this.list[i].content.length; x < l; x++) {
          if (this.list[i].content[x].type == 0) {
            ifAll = false;
            break;
          }
        }
        if (ifAll) {
          $(".cart_list .list")
            .eq(i)
            .find(".shop_name .weui-icon")
            .addClass("weui-icon-success");
        }
      }
    },
    num(e, i, j) {
      $(e.target).val(
        $(e.target)
          .val()
          .match(/\d+/)
      );
      if (
        $(e.target)
          .val()
          .split("")[0] == "0"
      ) {
        $(e.target).val("1");
      }
    },
    blur(e, i, j) {
      if (Number(e.target.value)) {
        this.list[i].content[j].num = Number(e.target.value);
      } else {
        this.list[i].content[j].num = 1;
      }
      this.list[i].content[j].spm =
        this.list[i].content[j].unit_spm * this.list[i].content[j].num;
      if (
        $(e.target)
          .parents(".l")
          .find(".weui-icon")
          .hasClass("weui-icon-success")
      ) {
        this.calSum();
      }
    },
    add(e, i, j) {
      this.list[i].content[j].num++;
      this.list[i].content[j].spm += this.list[i].content[j].unit_spm;
      if (
        $(e.target)
          .parents(".l")
          .find(".weui-icon")
          .hasClass("weui-icon-success")
      ) {
        this.calSum();
      }
    },
    des(e, i, j) {
      this.list[i].content[j].num--;
      if (this.list[i].content[j].num < 1) {
        this.list[i].content[j].num = 1;
      } else {
        this.list[i].content[j].spm -= this.list[i].content[j].unit_spm;
      }
      if (
        $(e.target)
          .parents(".l")
          .find(".weui-icon")
          .hasClass("weui-icon-success")
      ) {
        this.calSum();
      }
    },
    calSum() {
      let that = this;
      var sum_ = 0;
      for (var i = 0, l = that.list.length; i < l; i++) {
        for (var ii = 0, ll = that.list[i].content.length; ii < ll; ii++) {
          if (that.list[i].content[ii].type) {
            sum_ += that.list[i].content[ii].spm;
          }
        }
      }
      that.sum = sum_;
    },
    sAll() {
      let that = this;
      if (this.all) {
        $(".weui-icon").addClass("weui-icon-success");
        for (var i = 0, l = that.list.length; i < l; i++) {
          for (var ii = 0, ll = that.list[i].content.length; ii < ll; ii++) {
            that.list[i].content[ii].type = 1;
          }
        }
        that.calSum();
      } else {
        $(".weui-icon").removeClass("weui-icon-success");
        this.sum = 0;
      }
    },
    manage() {
      this.deleteIf = !this.deleteIf;
      $(".weui-icon").removeClass("weui-icon-success");
    },
    sub(e) {
      let that = this;
      if ($(e.target).html() == "结算") {
        if (that.sum > 0) {
          let arr = [];
          for (let i = 0, l = that.list.length; i < l; i++) {
            arr[i] = {};
            arr[i].content = [];
            arr[i].name = that.list[i].name;
            arr[i].id = that.list[i].id;
          }
          for (let i = 0, l = that.list.length; i < l; i++) {
            for (let j = 0, ll = that.list[i].content.length; j < ll; j++) {
              if (that.list[i].content[j].type) {
                arr[i].content.push(that.list[i].content[j]);
              }
            }
          }
          let arr_ = [];
          for (let i = 0, l = arr.length; i < l; i++) {
            if (arr[i].content.length) {
              arr_.push(arr[i]);
            }
          }
          window.sessionStorage.setItem("cart_order", JSON.stringify(arr_));
          that.$router.push({
            name: "confirmorder",
            params: {
              source: 1
            }
          });
        } else {
          that.$vux.toast.show({
            text: "请选择商品！",
            type: "cancel",
            position: "middle",
            time: 1200
          });
        }
      } else {
        let arr = [];
        for (let i = 0, l = that.list.length; i < l; i++) {
          for (let j = 0, ll = that.list[i].content.length; j < ll; j++) {
            if (that.list[i].content[j].type) {
              arr.push(that.list[i].content[j].cid);
            }
          }
        }
        if (arr.length) {
          let arr_=arr.join(",");
          console.log(arr_)
          this.$vux.confirm.show({
            title: "删除",
            confirmText: "确定",
            cancelText: "取消",
            content: "确定要删除商品吗？",
            onShow() {},
            onHide() {},
            onCancel() {},
            onConfirm() {
              that
                .$http({
                  url: "api/shop_goods/del_goods",
                  method: "post",
                  data: {
                    cid: arr_
                  }
                })
                .then(function(res) {
                  if (res.data.code == 1) {
                    that.$vux.toast.show({
                      text: "删除成功",
                      type: "success",
                      position: "middle",
                      time: 1200
                    });
                    that.getlist();
                  } else {
                    that.$vux.toast.show({
                      text: "删除失败",
                      type: "cancel",
                      position: "middle",
                      time: 1200
                    });
                  }
                });
            }
          });
        } else {
          that.$vux.toast.show({
            text: "请选择商品",
            type: "text",
            position: "middle",
            time: 1200
          });
        }
      }
    },
    onRefresh() {
      this.list = [];
      this.getlist();
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
          url: "/api/shop_goods/cart_index",
          method: "get",
          params: {
            id: that.userinfo.id
          }
        })
        .then(function(res) {
          that.lif = false;
          that.isLoading = false;
          if (res.data.code == 1) {
            that.nif = false;
            that.list = res.data.data;
          }else{
            that.list = [];
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    toDianpu(name,id){
      this.$router.push({
        name:"goods",
        params:{
          name:name,
          id:id,
        }
      })
    },
    toGoodDetail(id){
      this.$router.push({
        name:"gooddetail",
        params:{
          id:id,
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
.top > span {
  position: absolute;
  right: 3%;
  top: 0.34rem;
  color: white;
  font-size: 0.36rem;
}
.sort {
  padding: 1.1rem 0 3rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;
  .cart_list {
    .list:first-child {
      margin-top: 0.1rem;
    }
    .list {
      // background: white;
      margin-top: 0.3rem;
      .shop_name {
        background: #ededed;
        padding: 0 3% 0;
        box-sizing: border-box;
        line-height: 0.9rem;
        height: 0.9rem;
        font-size: 0.34rem;
        // border-bottom: 1px solid #ededed;

        i {
          vertical-align: top;
          display: inline-block;
          line-height: 0.88rem;
        }
        > span {
          display: inline-block;
          height: 0.8rem;
        }
        .icon-dianpu {
          font-size: 0.5rem;
          color: #a7a5a5;
          padding: 0 0.1rem 0 0.2rem;
        }
      }
      .l {
        background: white;
        overflow: hidden;
        padding: 0.2rem 3% 0.3rem;
        box-sizing: border-box;
        .left {
          float: left;

          i {
            display: inline-block;
            line-height: 1.6rem;
            vertical-align: top;
          }
          img {
            width: 1.6rem;
            height: 1.6rem;
            margin-left: 0.1rem;
          }
        }
        .right {
          float: right;
          width: calc(100% - 2.7rem);

          .info {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            text-align: left;
          }
          .s_info {
            overflow: hidden;
            padding: 0.1rem;
            text-align: left;

            > span {
              color: #a7a5a5;
              padding-right: 0.2rem;
            }
            > div {
              float: right;
              border: 1px solid #808080;

              span {
                width: 0.5rem;
                text-align: center;
              }
              .f_cc {
                color: #ccc;
              }
              > span:first-child {
                float: left;
              }
              > span:last-child {
                float: right;
              }
              input {
                width: 0.8rem;
                border: 0;
                border-left: 1px solid #808080;
                border-right: 1px solid #808080;
                outline: 0;
                text-align: center;
              }
            }
          }
          .f_c0 {
            overflow: hidden;
            line-height: 0.4rem;
            padding: 0.1rem 0.1rem 0;

            > span:first-child {
              float: left;
              font-size: 0.4rem;
            }
            > span:last-child {
              float: right;
              font-size: 0.32rem;
            }
          }
        }
      }
      .b_shim {
        background: url("../assets/b_shim.png");
        background-size: 100% 100%;
        height: 0.2rem;
        width: 100%;
      }
    }
  }

  .footer {
    position: fixed;
    border-top: 1px solid #ededed;
    width: 100%;
    bottom: 1.3rem;
    left: 0;
    right: 0;
    overflow: hidden;
    box-sizing: border-box;
    padding-left: 3%;
    line-height: 1.1rem;
    background: white;

    .all {
      float: left;
    }
    .sum {
      float: right;

      > span {
        display: inline-block;
        height: 1.1rem;
      }
      .btn {
        float: right;
        background: #839fff;
        color: white;
        box-sizing: border-box;
        padding: 0 0.5rem 0;
        margin-left: 0.2rem;
      }
      .deleteBtn {
        background: #ff4081;
      }
    }
  }
}
</style>
