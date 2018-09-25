<template>
    <div class="sort">
        <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>商品详情</p>
        </div>
        <div class="wrap">
            <img :src="info.url" alt="">
            <div class="info">
                <div class="f_c0 price">{{info.price}} 元</div>
                <div class="name">{{info.title}}</div>
                <div class="d-flex other">
                    <span class="flex1 tal">快递：{{info.express}}</span>
                    <span class="flex1">销量{{info.sell_num}}笔</span>
                    <span class="flex1 tar">{{info.shop_address}}</span>
                </div>
                <div class="select">
                    <div>
                        <span>规格</span>
                        <span class="s_info">
                            <span>{{s1}}</span>
                            <span>{{ss[0]}}</span>
                            <span>{{ss[1]}}</span>
                        </span>
                    </div>
                    <span class="iconfont icon-weibiaoti35"></span>
                </div>
                <div class="choose">
                    <div class="d_choose" v-for="(item,index) in spec_list" :key="index">
                        <div>{{item.title}}</div>
                        <div class="d-flex">
                            <span v-for="(item,index) in item.type" :key="index" @click="toSelect($event,index,item)">{{item}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="con" v-html="info.describe_img"></div>
        </div>
        <!-- 底部按钮 -->
        <div class="footer">
            <div class="btn" @click="addCart">加入购物车</div>
            <div class="btn" @click="toBuy">立即购买</div>
        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      test: "123.11",
      s1: "选择",
      ss: [],
      c_index: 0,
      s_index: 0,
      bool: false,
      spec_list: "",
      info: "",
      specs: []
    };
  },
  components: {},
  mounted() {
    // 清除session
    window.sessionStorage.removeItem("specs");
    window.sessionStorage.removeItem("fee");
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    let height =
      document.documentElement.clientHeight || document.body.clientHeight;
    $(".sort").css("min-height", height);
    $(".select").on("touchstart", function() {
      if (that.bool) {
        that.bool = false;
        $(".select>span").css("transform", "rotateZ(0deg)");
      } else {
        that.bool = true;
        $(".select>span").css("transform", "rotateZ(-180deg)");
      }
      $(".choose").slideToggle();
    });
    that
      .$http({
        url: "api/shop_goods/getList",
        method: "get",
        params: {
          id: that.$route.params.id
        }
      })
      .then(function(res) {
        if (res.data.code == 1) {
          that.info = res.data.data;
          that.spec_list = res.data.msg;
          for (let i = 0, l = that.spec_list.length; i < l; i++) {
            that.ss.push(that.spec_list[i].title);
          }
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    toSelect(e, i, con) {
      this.s1 = "已选择";
      $(e.target)
        .addClass("sSelect")
        .siblings("span")
        .removeClass("sSelect");
      $(".s_info span")
        .eq(
          $(e.target)
            .parents(".d_choose")
            .index() + 1
        )
        .html(con)
        .addClass("fc2");
      this.specs[
        $(e.target)
          .parents(".d_choose")
          .index()
      ] = con;
    },
    addCart() {
      let that = this;
      if (that.specs.length < that.spec_list.length) {
        that.$vux.toast.show({
          text: "请选择完整规格信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      } else {
        let spec_name = that.specs.join(",");
        that
          .$http({
            url: "api/shop_goods/ins_cart",
            method: "get",
            params: {
              id: that.userinfo.id,
              goods_id: that.info.id,
              spec_name: spec_name,
              number: 1,
              price: that.info.price
            }
          })
          .then(function(res) {
            if (res.data.code == 1) {
              that.$vux.toast.show({
                text: "加入购物车成功",
                type: "success",
                position: "middle",
                time: 1200
              });
            }
          });
      }
    },
    toBuy() {
      let that = this;
      if (that.specs.length < that.spec_list.length) {
        that.$vux.toast.show({
          text: "请选择完整规格信息！",
          type: "cancel",
          position: "middle",
          time: 1200
        });
      } else {
        window.sessionStorage.setItem("g_id", that.info.id);
        window.sessionStorage.setItem("specs", that.specs);
        window.sessionStorage.setItem("fee", that.info.express);
        this.$router.push({
          name: "confirmorder",
          params: {
            source: 0
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
.sort {
  padding: 1.1rem 0 1.4rem;
  box-sizing: border-box;
  font-size: 0.36rem;
  background: #ededed;

  .con {
    img {
      max-width: 100%;
    }
  }
  .wrap {
    > img:first-child {
      width: 100%;
      display: block;
    }
    > .info {
      background: white;
      padding: 0.4rem;

      .price {
        text-align: left;
        font-size: 0.4rem;
      }
      .name {
        text-align: left;
        padding: 0.2rem 0 0.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .other {
        color: #808080;
        font-size: 0.32rem;
        padding-bottom: 0.2rem;
        border-bottom: 1px solid #ededed;
      }
      .select {
        overflow: hidden;
        line-height: 1.2rem;
        font-size: 0.4rem;
        > div {
          float: left;

          > span:first-child {
            color: #808080;
            padding-right: 0.3rem;
          }
          .s_info {
            span:nth-child(2) {
              padding: 0 0.2rem 0;
            }
          }
        }
        > span {
          float: right;
          font-size: 0.56rem;
          color: #808080;
          margin-top: 2px;
          transition: all 0.3;
          -moz-transition: all 0.3s;
          -webkit-transition: all 0.3s;
          -o-transition: all 0.3s;
          transform: rotateZ(0);
        }
      }

      .choose {
        display: none;
        padding-top: 0.5rem;
        text-align: left;
        > div > div:first-child {
          padding-bottom: 0.3rem;
        }
        > div {
          border-bottom: 1px solid #ececec;
          margin-bottom: 0.2rem;
        }
        .d-flex {
          flex-wrap: wrap;
          font-size: 0.32rem;
          span {
            float: left;
            padding: 0 0.4rem 0;
            line-height: 0.64rem;
            border-radius: 6px;
            background: #ececec;
            margin: 0 0.6rem 0.3rem 0;
          }
          .sSelect {
            color: white;
            background: #fdc92d;
          }
        }
      }
    }
  }

  .footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    left: 0;
    right: 0;
    border-top: 1px solid #839fff;

    .btn {
      float: left;
      width: 50%;
      line-height: 1.2rem;
      color: #839fff;
      background: white;
    }
    .btn:last-child {
      background: #839fff;
      color: white;
    }
  }
}
</style>
