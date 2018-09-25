<template>
  <div class="mills">
        <ul>
    <scroller class="scroller"
              noDataText="没有更多资讯了..."
              :on-refresh="refresh"
              :on-infinite="infinite"
              ref="my_scroller">
            <li v-for="(item,index) in showLists">
              {{item.name}}
            </li>
    </scroller>
        </ul>
  </div>
</template>

<script>
import "../base/css/com.css";
export default {
  components: {},

  data() {
    return {
      items: [],
      pIndex: 0,
      showLists: [],
      newsLists: [
        [
          { name: "资讯1" },
          { name: "资讯2" },
          { name: "资讯3" },
          { name: "资讯4" },
          { name: "资讯5" }
        ],
        [
          { name: "资讯6" },
          { name: "资讯7" },
          { name: "资讯8" },
          { name: "资讯9" },
          { name: "资讯10" }
        ],
        [
          { name: "资讯11" },
          { name: "资讯12" },
          { name: "资讯13" },
          { name: "资讯14" },
          { name: "资讯15" }
        ],
        [{ name: "资讯16" }, { name: "资讯17" }, { name: "资讯18" }]
      ]
    };
  },

  mounted() {
    this.showLists = this.newsLists[this.pIndex];
    console.log(this.showLists);
  },

  methods: {
    refresh(done) {
      console.log("refresh called..");
      setTimeout(() => {
        this.showLists = this.newsLists[0];
        this.pIndex = 0;
        done();
      }, 1000);
    },

    infinite(done) {
      console.log("infinite called..");
      if (this.pIndex < 4) {
        setTimeout(() => {
          this.pIndex++;
          this.showLists = this.showLists.concat(this.newsLists[this.pIndex]);
          console.log(this.showLists);
          console.log(this.pIndex);
          done();
        }, 700);
      } else {
        console.log("到底了...");
        done(true);
        // return;
      }
    },
  }
};
</script>
<style scoped>
.scroller{
  padding-top: 80px;
}
li{
  height: 200px;
}
</style>

