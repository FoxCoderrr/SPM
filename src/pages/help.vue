<template>
  <div class="linkus">
      <div class="top">
          <span class="iconfont icon-return" @click="back"></span>
          <p>{{$t('mine.nav.i')}}</p>
      </div>
     <ul>
       <li v-for="(item,index) in list">
         <p class="d-flex">
           <span class="flex1 tal"><span></span>{{item.title}}</span>
           <span class="flex1 tar"><span @click="toanswer(item.x)" class="answer">{{$t('help.a')}}</span></span>
         </p>
         <p class="tal pd">{{item.content}}
         </p>
       </li>
     </ul>
  </div>
</template>
<script>
import $ from "jquery";
export default {
  data() {
    return {
      list: []
    };
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
        url: "api/notice/wenti",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        let x = 0;
        for (let i = 0, l = res.data.length; i < l; i++) {
          if (res.data[i].aid == 1) {
            res.data[i].x = x;
            that.list.push(res.data[i]);
            x++;
          }
        }
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    toanswer(i) {
      let that = this;
      if (
        $(".answer")
          .eq(i)
          .html() === that.$t("help.a")
      ) {
        $(".answer")
          .eq(i)
          .html(that.$t("help.b"));
        $(".pd")
          .eq(i)
          .slideDown("fast");
      } else {
        $(".answer")
          .eq(i)
          .html(that.$t("help.a"));
        $(".pd")
          .eq(i)
          .slideUp("fast");
      }
    }
  }
};
</script>
<style scoped>
.linkus {
  padding-top: 1.2rem;
  font-size: 0.36rem;
  color: white;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  color: white;
  left: 2%;
}
li {
  margin-top: 1px;
}
.d-flex {
  line-height: 1rem;
  padding: 0 4% 0;
  background: #2b2e4c;
}
.answer {
  width: 2.6667rem;
  padding: 4px 0.2rem 4px;
  background: #839fff;
  border-radius: 4px;
  color: white;
  font-size: 0.32rem;
}
.pd {
  padding: 10px 4% 10px;
  display: none;
  color: rgba(255, 255, 255, .8)
}
</style>
