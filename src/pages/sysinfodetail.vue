<template>
<div class="sysinfo">
    <div class="top">
      <span class="iconfont icon-return" @click="back"></span>
      <p>{{title}}</p>
    </div>
    <p class="con tal">{{con}}</p>
</div>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      con: ""
    };
  },
  mounted() {
    let that = this;
    mui.back = function() {
      that.$router.back();
      error;
    };
    this.title = this.msg.title;
    this.con = this.msg.con;
  },
  methods: {
    back() {
      this.$router.back();
    }
  }
};
</script>
<style scoped>

.sysinfo {
  padding-top: 1.1rem;
  font-size: 0.36rem;
}
.con {
  padding: 0.2rem 6% 0.4rem;
  color: white;
}
</style>

