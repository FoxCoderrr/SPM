<template>
  <div class="myTeam">
      <div class="top">
        <span class="iconfont icon-return" @click="back"></span>
        <p>{{$t('other.a')}}</p>
      </div>
        <ul>
            <li v-for="(item,index) in list" @click="toDetail(item.id,item.title)">
              <p class="tal">
                  <span class="fs3 fc2">{{item.title}}</span>
                  <span>{{item.time}}</span>
                  <span v-if="item.type==1" class="hongdian"></span>
              </p>
              <p class="tal">{{item.content}}</p>
            </li>
        </ul>
  </div>
</template>
<script>
import $ from "jquery"
export default {
  data() {
    return {
      transitionName: "",
      list: []
    };
  },
  mounted() {
    let that = this;
    let height = document.documentElement.clientHeight || document.body.clientHeight;
    $(".myTeam").css("min-height", height);
    mui.back = function() {
      that.$router.push({
        name: "home"
      });
      error;
    };
    that
      .$http({
        url: "api/parameter/chakan",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.list = res.data.sort(function(a, b) {
          return b.type - a.type;
        });
      });
  },
  methods: {
    back() {
      this.$router.push({
        name: "home"
      });
    },
    toDetail(id, title) {
      this.$router.push({
        name: "xiaoxidetail",
        params: {
          id: id,
          t: title
        }
      });
    }
  },
  components: {}
};
</script>
<style scoped>

.myTeam {
  padding-top: 1.1rem;
  background: #141738;
  box-sizing: border-box;
  font-size: 0.36rem;
}
.icon-return {
  position: absolute;
  line-height: 1.1rem;
  font-size: 0.7rem;
  left: 2%;
  color: white;
}
ul {
  width: 94%;
  margin: 0 auto;
  overflow: hidden;
}
li {
  background: #2b2e4c;
  overflow: hidden;
  margin: 0.6rem auto 0;
  padding: 0.26rem;
  box-sizing: border-box;
  position: relative;
  color: rgba(255, 255, 255, .8);
  font-size: 0.36rem;
}
li p {
  line-height: 0.8rem;
}
.hongdian {
  width: 0.2133rem;
  height: 0.2133rem;
  border-radius: 50%;
  background: red;
  float: right;
}
li p:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
li p span:nth-child(2){
  font-size: 0.32rem;
}
.fc000 {
  color: #666;
}
</style>
