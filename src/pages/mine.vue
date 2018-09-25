<template>
  <div class="mine">
    <div class="m-top">
      <router-link :to="{name: 'setting'}">
        <span class="iconfont icon-shezhi"></span>
      </router-link>
      <div class="top-con">
        <div class="u-info ovh">
            <p class="fl u-head">
               <router-link :to="{name: 'userinfo'}">
                  <img class="uh" src="../assets/SPM02.png" alt="">
               </router-link>
            </p>
              <p class="tal fs3 uu_name">{{uinfo.name}}</p>
            <!-- <p class="fll">
              <p class="tal">{{$t('mine.a')}}: <span>{{uinfo.level}}</span></p>
            </p> -->
        </div>
        <p class="ppp mt20 fc00 tal">{{$t('mine.d')}}: <span class="fs2 fc11">{{umoney[0]}}</span></p>
        <p class="ppp mt20 tal lhh">
          <span class="fc00 fl mr11">可用SPM: <span class="fs3 fc11">{{umoney[1]}}</span></span>
          <span class="fc00 fl">冻结SPM: <span class="fs3 fc11">{{umoney[2]}}</span></span>
        </p>
      </div>
    </div>
      <ul class="nav-lists d-flex mt30">
          <li class="flex1">
            <router-link :to="{name:'mymills'}">
              <img src="../assets/kj.png" alt="">
              <p>{{$t('mine.nav.a')}}</p>
            </router-link>
          </li>
          <li class="flex1">
            <router-link :to="{name:'mydeals',params:{tip:0}}">
              <img src="../assets/mine2.png" alt="">
              <p>{{$t('mine.nav.b')}}</p>
            </router-link>
          </li>
          <li class="flex1">
            <router-link :to="{name:'mingxi'}">
              <img src="../assets/mine3.png" alt="">
              <p>{{$t('mine.nav.c')}}</p>
            </router-link>
          </li>
     </ul>
     <ul class="nav-lists d-flex">
          <li class="flex1">
            <router-link :to="{name:'myteam'}">
              <img src="../assets/mine4.png" alt="">
              <p>矿工社区</p>
            </router-link>
          </li>
          <li class="flex1">
            <router-link :to="{name:'recruit'}">
              <img src="../assets/mine5.png" alt="">
              <p>邀请返佣</p>
            </router-link>
          </li>
          <li class="flex1">
            <router-link :to="{name:'help'}">
              <img src="../assets/mine9.png" alt="">
              <p>{{$t('mine.nav.i')}}</p>
            </router-link>
          </li>
           </ul>
      <ul class="nav-lists d-flex">
          <li class="flex1">
            <router-link :to="{name:'userinfo'}">
              <img src="../assets/mine7.png" alt="">
              <p>{{$t('mine.nav.g')}}</p>
            </router-link>
          </li>
          <li class="flex1">
            <router-link :to="{name:'linkus'}">
              <img src="../assets/mine8.png" alt="">
              <p>{{$t('mine.nav.h')}}</p>
            </router-link>
          </li>
           <li class="flex1">
            <router-link :to="{name:'usdt'}">
              <img src="../assets/usdt.png" alt="">
              <p>USDT</p>
            </router-link>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "",
      uinfo: "",
      umoney: []
    };
  },
  computed: {
    money() {
      let that = this;
      let arr = [];
      for (let i = 0, l = that.umoney.length; i < l; i++) {
        if (!that.umoney[i] || that.umoney[i] == 0) {
          arr.push("0.000");
        } else {
          let intPart = Math.floor(Number(that.umoney[i])); //获取整数部分
          let intPartFormat = intPart
            .toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

          let floatPart = ".000"; //预定义小数部分
          let value2Array = that.umoney[i].split(".");

          //=2表示数据有小数位
          if (value2Array.length == 2) {
            floatPart = value2Array[1].toString(); //拿到小数部分

            if (floatPart.length == 1) {
              //补0,实际上用不着
              arr.push(intPartFormat + "." + floatPart + "00");
            } else if (floatPart.length == 2) {
              arr.push(intPartFormat + "." + floatPart + "0");
            } else {
              arr.push(intPartFormat + "." + floatPart);
            }
          } else {
            arr.push(intPartFormat + floatPart);
          }
        }
      }
      return arr;
    }
  },
  mounted() {
    let that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    this.$http({
      url: "api/member/assets",
      method: "get",
      params: {
        id: that.userinfo.id
      }
    }).then(function(res) {
      that.uinfo = res.data;
      that.umoney.push(res.data.assets + "");
      that.umoney.push(res.data.can + "");
      that.umoney.push(res.data.no + "");
    });
  }
};
</script>
<style scoped>
.u-head {
  width: 1.0667rem;
  height: 1.0667rem;
  line-height: 1.4667rem;
  text-align: center;
  border-radius: 50%;
  margin-right: 0.1rem;
}
.uh {
  width: 0.88rem;
}
.m-top {
  height: 4.8rem;
  background: url("../assets/minebg.png");
  background-size: 100% 100%;
  color: white;
  padding: 0.2667rem 4% 0;
}
.fc3 {
  color: rgb(214, 214, 64);
}
.fc4 {
  color: blue;
}
.mine {
  position: absolute;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 0.36rem;
}
.mine a{
  color: white;
}
.icon-shezhi {
  position: absolute;
  font-size: 0.5333rem;
  right: 3%;
  color: white;
}
.nav-lists li {
  text-align: center;
  height: 1.8667rem;
  padding: 0.4rem 0 0.4rem;
}
.nav-lists li p:nth-child(2) {
  margin-top: 0.08rem;
}
.nav-lists img {
  width: 1.5rem;
}
.fc00 {
  color: white;
}
.mr10 {
  margin-right: 0.1333rem;
}
.fc11 {
  color: white;
  margin-left: 0.1333rem;
}
.mr11 {
  margin-right: 0.4rem;
}
.ppp {
  overflow: hidden;
  padding: 0 0 0 1.3333rem;
}
.lhh {
  line-height: 0.5333rem;
}
.uu_name{
  line-height: 1rem;
}
.top-con .ppp:last-child span{
  margin-bottom: 0.1rem;
}
</style>
