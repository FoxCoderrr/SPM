<template>
<div class="sysinfo">
    <div class="top">
      <span class="iconfont icon-return" @click="back"></span>
      <p>{{$t('other.b')}}</p>
    </div>
    <ul>
        <li class="d-flex" v-for="(item,index) in info" @click="todetail(item.title,item.content)">
            <span class="flex1 tal">{{item.title}}</span>
            <span class="flex1 fs3 tar iconfont icon-iconfontjiantou5"></span>
        </li>
    </ul>
</div>
</template>
<script>
export default {
  data() {
    return {
      info: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    that
      .$http({
        url: "api/notice/index",
        method: "get",
        params: {
          id: that.userinfo.id
        }
      })
      .then(function(res) {
        that.info = res.data;
      });
  },
  methods: {
    back() {
      this.$router.back();
    },
    todetail(title, con) {
      this.msg.title = title;
      this.msg.con = con;
      this.$router.push({
        name: "sysinfodetail"
      });
    }
  },
  components: {}
};
</script>
<style scoped>
.sysinfo {
  padding-top: 1.1rem;
  font-size: 0.36rem;
}
ul {
  background: white;
  margin-top: 0.1rem;
  box-sizing: border-box;
  background: #2b2e4c;
}
li {
  margin: 0 3% 0;
  color: white;
  line-height: 1rem;
  border-bottom: 1px solid #141738; /*no*/
}
ul li:last-child {
  border: none;
}
</style>

