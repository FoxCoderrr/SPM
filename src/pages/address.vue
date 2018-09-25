<template>
    <div class="sort">
        <div class="top">
            <span class="iconfont icon-return" @click="back"></span>
          <p>收货地址</p>
        </div>
        <!-- 地址 -->
        <div class="ads">
            <div class="address" v-for="(item,index) in ads_list" :key="index">
                <div class="d_address" @click="selectAds(index)">
                    <div class="fl">
                        <div><span v-if="item.type==1" class="selected">默认</span>{{item.room}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.address}}</div>
                        <div>
                            <span>{{item.name}}</span>
                            <span>{{item.sex}}</span>
                            <span>{{item.tel}}</span>
                        </div>
                    </div>
                    <div class="fr">
                        <img @click.stop="toEdit(index)" src="../assets/edit1.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class="footer" @click="toAddAds">
            <div class="tac">
                <span class="iconfont icon-add"></span> 新增收货地址
            </div>
        </div>
    </div>
</template>
<script>
import { CheckIcon } from "vux";
import $ from "jquery";
export default {
  data() {
    return {
      ads_list:[],
    };
  },
  components: {
    CheckIcon
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
    that
      .$http({
        url: "api/shop_address/all",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        if(res.data!=0){
          that.ads_list = res.data;
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    toEdit(index){
      var editAds = this.ads_list[index];
      window,sessionStorage.setItem("editAds",JSON.stringify(editAds))
      this.$router.push({
        name:"editaddress",
        params:{}
      })
    },
    toAddAds(){
      this.$router.push({
        name:"addaddress"
      })
    },
    selectAds(i){
      let that = this;
      if(this.$route.params.source==1){
        window.sessionStorage.setItem("u_ads",JSON.stringify(this.ads_list[i]));
        that.$router.back();
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
  background: white;
  

  .address {
    overflow: hidden;
    box-sizing: border-box;
    padding: 0.3rem 3% 0;
    background: white;

    .d_address {
      border-bottom: 1px solid #ededed;
      overflow: hidden;
      padding-bottom: 0.3rem;

      > .fl {
        text-align: left;
        max-width: calc(100% - 1rem);
        .selected{
            display: inline-block;
            background: #ffbebe;
            color: #fc4160;
            padding: 0 0.1rem 0;
            margin-right: 0.2rem;
            margin-bottom: 0.1rem;
        }

        > div:last-child {
          color: #808080;
          padding-top: 0.2rem;
          span {
            margin-right: 0.3rem;
            font-size: 0.32rem;
          }
        }
      }
      > .fr {
        img {
          width: 0.8rem;
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
    overflow: hidden;
    z-index: 1;
    background: white;
    line-height: 1.6rem;

    .iconfont {
      color: #ff4081;
      font-size: 0.66rem;
      display: inline-block;
      vertical-align: sub;
      margin-right: 0.1rem;
    }
  }
}
</style>
