<template>
  <div class="container">
    <!-- 轮播 -->
      <div class="adImgs">
              <div @click="toxiaoxi" class="xiaoxi">
              <div class="xiaoxid">
                <span v-if="xiaoxi" class="hongdian"></span>
                <span class="iconfont icon-lingdangkuai"></span>
              </div>
          </div>
           <swiper auto loop :interval="int1" dots-position="center" style="width:100%;">
              <swiper-item v-for="(item,index) in adImgs" :key="index"><img :src="item.path" alt=""></swiper-item>
           </swiper>
      </div>
      <!-- 公告 -->
      <div class="notice">
          <div class="n-div">
              <div class="ntc">
                  <span class="iconfont icon-xiaolaba"></span>
              </div>
              <div class="mqe" @click="sysInfo">
              <swiper height="30px" auto loop :interval="int2" direction="vertical" :show-dots="false" style="width:100%;">
                <swiper-item v-for="(item,index) in notices" :key="index"><p>{{item.title}}</p></swiper-item>
              </swiper>
              </div>
          </div>
      </div>
      <!-- 收益 -->
      <div class="profit">
        <h3 class="title">每日收益</h3>
      </div>
      <!-- 图表 -->
      <div class="crt">
         <div class="chart-title">
           <h3 class="tal">{{$t('index.art.a')}}</h3>
           <div class="d-flex">
             <div class="flex1">
               <div class="d-flex">
                 <p class="flex3 tac f_spe">
                   <span class="f_c1">{{jisuan.usdt}} <span class="fs000">$</span> </span>
                   <span class=""><span class="f_c1">{{jisuan.cny}}</span> <span>CNY</span></span>
                 </p>
               </div>
             </div>
             <div class="flex3">
               <p class="d-flex lh1">
                 <span class="flex1 tal">{{$t('index.art.b')}} <span class="f_c0">{{jisuan.max}}</span>$</span>
                 <span class="flex1 tar">增幅 <span class="f_c0" :class="{f_c1:ifGreen}">{{jisuan.fudu}}</span></span>
               </p>
               <p class="d-flex lh1">
                 <span class="flex1 tal">{{$t('index.art.c')}} <span class="f_c1">{{jisuan.min}}</span>$</span>
                 <span class="flex1 tar">当前成交总量 <span class="f_c1">{{jisuan.buy+jisuan.sell}}</span></span>
               </p>
             </div>
           </div>
         </div>
      <div class="chart">
          <div id="myChart" :style="{width: '100%', height: '220px'}"></div>
      </div>
      </div>
      <div class="divid ovh">
        <span class="fl"></span>
        <span class="fl">这是我的底线了</span>
        <span class="fl"></span>
      </div>
  </div>
</template>
<script>
import "../base/css/com.css";
import $ from "jquery";
import echarts from "echarts";
import { Swiper, SwiperItem, Divider } from "vux";
export default {
  name: "Index",
  data() {
    return {
      transitionName: "",
      ym: "",
      int1: 2500,
      int2: 2000,
      notices: [],
      uinfo: "",
      adImgs: [],
      times: [],
      yvalues: [],
      jisuan: {
        max: "0.00",
        min: "0.00",
        fudu: 0,
        buy: 0,
        sell: 0,
        rate: ""
      },
      artlist: [],
      ifGreen: false,
      xiaoxi: false
    };
  },
  components: {
    Swiper,
    SwiperItem,
    Divider
  },
  computed: {
    trans: function() {
      if (this.jisuan.rate) {
        return parseFloat(this.jisuan.rate).toFixed(2);
      } else {
        return "0.00";
      }
    }
  },
  methods: {
    toartd(id1, id2) {
      let that = this;
      let type = "";
      if (id2 == that.userinfo.id) {
        type = 2;
      } else {
        type = 1;
      }
      that.$router.push({
        name: "artdetail",
        params: {
          id: id1,
          type: type
        }
      });
    },
    sysInfo() {
      this.$router.push({
        name: "sysinfo"
      });
    },
    toxiaoxi() {
      this.$router.push({
        name: "xiaoxi"
      });
    },
    drawChart(id) {
      var myChart = echarts.init(document.getElementById(id));
      let that = this;
      // 指定图表的配置项和数据
      var option = {
        grid: {
          left: "12%",
          top: "20",
          height: "160",
          width: "80%"
        },
        textStyle: {
          color: "white"
        },
        xAxis: {
          type: "category",
          data: that.times,
          axisLabel: {
            interval: 0,
            rotate: -30
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "white"
            }
          }
        },
        yAxis: {
          type: "value",
          axisLine: {
            onZero: false,
            lineStyle: {
              color: "rgba(255,255,255,.8)"
            }
          },
          splitLine: {
            lineStyle: {
              type: "solid",
              color: "rgba(255,255,255,.3)"
            }
          },
          axisLabel: {
            formatter: function(value, index) {
              return value.toFixed(2);
            }
            // textStyle : {
            // 	color : function(value) {
            //     if(value>=5){
            //       return "red"
            //     }else{
            //       return "blue"
            //     }
            // 	}
            // }
          }
        },
        series: [
          {
            data: that.yvalues,
            type: "line"
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    var that = this;
    mui.back = function() {
      mui.plusReady(function() {
        var main = plus.android.runtimeMainActivity();
        main.moveTaskToBack(false);
      });
      error;
    };
    that.ym = that.url;
    that.uinfo = that.userinfo;
    // 收益
    $(".profit").on("click", ".ball", function() {
      that.$http({
        url: "api/carousel/receive_income",
        method: "get",
        params: {
          id: $(this).data("p_id")
        }
      }).then(function(res) {});

      $(this).animate(
        {
          left: "5%",
          top: "0.8rem",
          opacity: "0"
        },
        500,
        function() {
          $(this).remove();
        }
      );
    });
    function ball(id, x) {
      let d_ball = document.createElement("div");
      if (Math.random() * 2 < 1) {
        $(d_ball).addClass("ball ball0");
      } else {
        $(d_ball).addClass("ball ball1");
      }
      let l = Math.random() * 80 + 6;
      let t = Math.random() * 100 + 50;
      $(d_ball).html("<span>SPM</span><span>" + x + "</span>");
      $(d_ball).data("p_id", id);
      $(".profit").append($(d_ball));
      $(d_ball).css({ left: l + "%", top: t + "px" });
    }
    this.$http({
      url: "api/carousel/user_have",
      method: "get",
      params: {
        id: that.userinfo.id
      }
    }).then(function(res) {
      if (res.data.code == 1) {
        for (let i = 0, l = res.data.data.length; i < l; i++) {
          ball(res.data.data[i].id, res.data.data[i].yield);
        }
      }
    });
    // 消息
    that
      .$http({
        url: "api/parameter/chakan",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        if(res.data!=""){
          for (let i = 0, l = res.data.length; i < l; i++) {
            if (res.data[i].type == 1) {
              that.xiaoxi = true;
              break;
            } else {
              that.xiaoxi = false;
            }
          }
        }else{
          that.xiaoxi = false;
        }
      });
    // 轮播图
    this.$http({
      url: "api/carousel/index",
      method: "get",
      params: {}
    })
      .then(function(res) {
        that.adImgs = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 公告
    that
      .$http({
        url: "/api/notice/index",
        method: "get",
        params: {
          id: 10
        }
      })
      .then(function(res) {
        that.notices = res.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    // 图表
    that
      .$http({
        url: "/api/hangup/linechart",
        method: "get",
        params: {}
      })
      .then(function(res) {
        let data = res.data;
        for (let i = 0, l = data.length; i < l; i++) {
          that.times.push(data[i].time.substr(5));
          that.yvalues.push(data[i].avg);
        }
        that.drawChart("myChart");
      })
      .catch(function(error) {
        console.log(error);
      });
    // 计算
    that
      .$http({
        url: "/api/hangup/jisuan",
        method: "get",
        params: {}
      })
      .then(function(res) {
        if (res.data != -1) {
          that.jisuan = res.data;
          if (parseFloat(res.data.fudu) < 0) {
            that.ifGreen = true;
          }
        }
      })
      .catch(function(error) {
        console.log(error);
      });
    // 文章
    that
      .$http({
        url: "/api/marticle/all",
        method: "get",
        params: {
          page: 1,
          limit: 3
        }
      })
      .then(function(res) {
        if (res.data.code == 0) {
          that.artlist = res.data.msg;
        }
      });
  }
};
</script>
<style scoped>
.container {
  background-color: #141738;
  padding-bottom: 1.8rem;
}
.f_spe{
  font-size: 0.36rem;
  padding-top: 0.2rem;
}
.f_spe>span{
  display: block;
}
.f_spe>span:first-child{
  font-size: 0.7rem;
}
.f_spe>span:last-child{
  font-size: 0.32rem;
  padding-top: 0.2rem;
}
.adImgs img {
  width: 100%;
  height: 100%;
  vertical-align: bottom;
}
.adImgs {
  position: relative;
  z-index: 0;
}
.notice {
  position: relative;
  z-index: 1;
  width: 100%;
  padding: 0 3% 0;
  overflow: hidden;
  height: .8rem;
  line-height: .8rem;
  background: rgba(255, 255, 255, 0.1);
  text-overflow: ellipsis;
  box-sizing: border-box;
}
.n-div {
  position: relative;
  width: 100%;
  height: 100%;
  color: white;
}
.n-div .iconfont {
  color: white;
}
.mqe {
  width: 100%;
  padding: 0 0.2rem 0;
  box-sizing: border-box;
  font-size: 0.36rem;
}
.mqe p {
  height: .8rem;
  line-height: .8rem;
}
.mqe .vux-slider {
  height: .8rem;
}

.ntc {
  position: absolute;
  left: 0;
  height: 100%;
  width: 0.8rem;
  overflow: hidden;
}
.ntc span {
  font-size: 0.56rem;
  margin-top: 6px;
  color: #ccc;
}
.crt {
  color: white;
  font-size: 0.36rem;
  padding: 0.6rem 3% 0.8rem;
}
.chart-title h3 {
  font-size: 0.44rem;
  line-height: 0.6rem;
  border-left: 3px solid #51d9e8;
  padding: 0 10px 0;
}
.chart-title > .d-flex {
  padding: 0.4rem 10px 0;
}
.chart-title .flex3 > .d-flex {
  padding: 0 10px 0;
}
.n-title {
  padding: 20px 2% 6px;
  line-height: 50px;
  border-bottom: 1px solid #c6e3ff; /*no*/
}
.newLists li {
  padding: 14px 2% 0;
  position: relative;
}

.lh0 {
  line-height: 80px;
}
.lh1 {
  line-height: 1.04rem;
}
.ppl {
  position: absolute;
  right: 2%;
  bottom: 16px;
}
.fw {
  font-weight: 700;
}
.textover {
  height: 80px;
  overflow: hidden;
  border-bottom: 1px solid #c6e3ff; /*no*/
}
.newLists li:last-child .textover {
  border: none;
}
.xiaoxi {
  z-index: 1;
  position: absolute;
  right: 4%;
  top: 0.27rem;
}
.xiaoxid {
  position: relative;
}
.icon-lingdangkuai {
  font-size: 0.5067rem;
  color: white;
}
.hongdian {
  position: absolute;
  width: 0.16rem;
  height: 0.16rem;
  border-radius: 50%;
  background: red;
  right: 1px;
  top: 1px;
}
.fs000 {
  font-size: 0.7rem;
  color: white;
}
.divid {
  padding: 0 3% 0;
}
.divid > span:nth-child(2) {
  color: #839fff;
  width: 140px;
  text-align: center;
}
.divid > span:first-child,
.divid > span:last-child {
  width: calc((100% - 140px) / 2);
  height: 1px;
  background: #839fff;
  transform: translateY(8px);
}
.l_h0 {
  line-height: 1rem;
}
.profit {
  background: url("../assets/shouyi_b.png");
  width: 100%;
  height: 200px;
  padding: 0.6rem 3% 0.2rem;
  position: relative;
  box-sizing: border-box;
}
.profit .title {
  font-size: 0.44rem;
  text-align: left;
  color: white;
  line-height: 0.6rem;
  border-left: 3px solid #51d9e8;
  padding: 0 10px 0;
}
</style>
