// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
FastClick.attach(document.body);
// 挂载全局函数
Vue.prototype.setUinfo = function (uinfo) {
  Vue.prototype.userinfo = uinfo;
};
Vue.prototype.url = "http://fkserve.qilinpz.com"
Vue.prototype.msg = {}
Vue.prototype.bshow = true //控制软键盘唤醒底部导航组件隐藏
// 免密码支付开关
Vue.prototype.freepwd = false;
Vue.prototype.setfreepwd = function () {
  Vue.prototype.freepwd = !Vue.prototype.freepwd;
};
// 中英文开关
// Vue.prototype.langg = 0;
Vue.prototype.setlangg = function () {
  // if(Vue.prototype.langg==0){
  //   Vue.prototype.langg = 1;
  // }else{
  //   Vue.prototype.langg = 0;
  // }
  // let locale = this.$i18n.locale
  // locale === 'zh' ? this.$i18n.locale = 'en' : this.$i18n.locale = 'zh'
  if (window.localStorage.getItem("lang") == 1) {
    this.$i18n.locale = 'en'
  } else {
    this.$i18n.locale = 'zh'
  }
};
import VueI18n from 'vue-i18n'
Vue.use(VueI18n)

import zh from "./base/lang/zh"
import en from "./base/lang/en"
const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': zh,
    'en': en
  }
})
// rem转化
import 'lib-flexible/flexible'
// 全局vux组件
import {
  ConfirmPlugin,
  ToastPlugin,
  LoadingPlugin,
  AlertPlugin,
  XButton,
  XInput,
} from 'vux'
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)
Vue.use(AlertPlugin)

Vue.component('x-button', XButton);
Vue.component('x-input', XInput);


// mint-ui
import 'mint-ui/lib/style.css'
import {
  Toast
} from 'mint-ui'
Vue.$toast = Vue.prototype.$toast = Toast;
import { Lazyload } from 'mint-ui';

Vue.use(Lazyload,{
  error: './static/SPM01.png',
  loading: './static/loading.gif',
});
// mint-ui
import {
  InfiniteScroll
} from "mint-ui";
Vue.use(InfiniteScroll);

// axios
import axios from 'axios'
const host = process.env.NODE_ENV === 'development' ? '/' : 'http://spm.qilinpz.com/index.php' // 根据 process.env.NODE_ENV 的值判断当前是什么环境
const instance = axios.create({
  baseURL: host,
  withCredentials: true,
})
Vue.prototype.$http = instance;

// 剪切板
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)
// 切换页面滚动至页面顶部
Vue.config.productionTip = false
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
// 全局函数
Vue.prototype.$money = function (m) {
  var mm;
  m = m.toString();
  if (!m || m == 0) {
    mm = 0.00;
  } else {
    let intPart = Math.floor(Number(m)); //获取整数部分
    let intPartFormat = intPart
      .toString()
      .replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断

    let floatPart = ".00"; //预定义小数部分
    let value2Array = m.split(".");

    //=2表示数据有小数位
    if (value2Array.length == 2) {
      floatPart = value2Array[1].toString(); //拿到小数部分

      if (floatPart.length == 1) {
        mm = intPartFormat + "." + floatPart + "0";
      } else {
        mm = intPartFormat + "." + floatPart;
      }
    } else {
      mm = intPartFormat + floatPart;
    }
  }
  return mm;
}
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>',
  i18n
})
