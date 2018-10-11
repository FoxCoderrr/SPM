import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login'
import MsgLogin from '@/pages/msgLogin'
import Register from '@/pages/register'
import Index from '@/pages/index'
import Xiaoxi from '@/pages/xiaoxi'
import XiaoxiDetail from '@/pages/xiaoxidetail'
import Shop from '@/pages/shop'
import TopupCoin from '@/pages/topupCoin'
import Withdraw from '@/pages/withdraw'
import Deal from '@/pages/deal'
import PhoneCode from '@/pages/phonecode'
import SellInfo from '@/pages/sellinfo'
import UpSellImg from '@/pages/upsellimg'
import Mine from '@/pages/mine'
import Usdt from '@/pages/usdt'
import MyMills from '@/pages/myMills'
import Run from '@/pages/run'
import MyDeals from '@/pages/myDeals'
import MingXi from '@/pages/mingxi'
import MyTeam from '@/pages/myTeam'
import Recruit from '@/pages/recruit'
import Setting from '@/pages/setting'
import UserInfo from '@/pages/userInfo'
import SysInfo from '@/pages/sysInfo'
import SysInfoDetail from '@/pages/sysinfodetail'
import ChangeMobile from '@/pages/changeMobile'
import AliPay from '@/pages/aliPay'
import IdenCard from '@/pages/idenCard'
import BankCard from '@/pages/bankcard'
import AddCard from '@/pages/addcard'
import WeiXin from '@/pages/weixin'
import ChangePaypwd from '@/pages/changePaypwd'
import ResetPwd from '@/pages/resetpwd'
import ResetPwd2 from '@/pages/resetpwd2'
import ResetPwd3 from '@/pages/resetpwd3'
import LinkUs from '@/pages/linkus'
import Help from '@/pages/help'
import Sort from '@/pages/sort'
import Mine1 from '@/pages/mine1'
import AccountSafe from '@/pages/accountsafe'
import MyOrder from '@/pages/myorder'
import Cart from '@/pages/cart'
import ConfirmOrder from '@/pages/confirmorder'
import OrderDetail from '@/pages/OrderDetail'
import Goods from '@/pages/goods'
import GoodDetail from '@/pages/gooddetail'
import Address from '@/pages/address'
import AddAddress from '@/pages/addAddress'
import EditAddress from '@/pages/editAddress'
import BotNavs from '@/components/botNavs'
import BotNavs1 from '@/components/botNavs1'


Vue.use(Router)

export default new Router({
  // mode: 'history',
  // scrollBehavior (to, from, savedPosition) {
  //   if (savedPosition) {
  //       return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop;
  //     }
  //       return { x: 0, y: to.meta.savedPosition || 0 }
  //   }
  // },
  routes: [
    {
      path: '/',
      name: 'login',
      components: {
        main: Login,
      },
      meta:{index:0}//meta对象的index用来定义当前路由的层级,由小到大,由低到高
    },
    {
      path: '/msgLogin',
      name: 'msglogin',
      components: {
        main: MsgLogin,
      },
      meta:{index:100}
    },
    {
      path: '/register/:id',
      name: 'register',
      components: {
        main: Register,
      },
      meta:{index:1}
    },
    {
      path: '/home/',
      name: 'home',
      components: {
        main: Index,
        footer: BotNavs
      },
      meta:{index:2,none:"true"}
    },
    {
      path: '/xiaoxi/',
      name: 'xiaoxi',
      components: {
        main: Xiaoxi,
      },
      meta:{index:3}
    },
    {
      path: '/xiaoxidetail:id&t=:t',
      name: 'xiaoxidetail',
      components: {
        main: XiaoxiDetail,
      },
      meta:{index:4}
    },
    {
      path: '/shop/',
      name: 'shop',
      components: {
        main: Shop,
        footer: BotNavs
      },
      meta:{index:3,none:'true'}
    },
    {
      path: '/topupcoin',
      name: 'topupcoin',
      components: {
        main: TopupCoin,
      },
      meta:{index:7}
    },
    {
      path: '/withdraw',
      name: 'withdraw',
      components: {
        main: Withdraw,
      },
      meta:{index:7}
    },
    {
      path: '/deal/',
      name: 'deal',
      components: {
        main: Deal,
        footer: BotNavs
      },
      meta:{index:4,none:'true'}
    },
    {
      path: '/phonecode:id',
      name: 'phonecode',
      components: {
        main: PhoneCode,
      },
      meta:{index:5}
    },
    {
      path: '/sellinfo:id',
      name: 'sellinfo',
      components: {
        main: SellInfo,
      },
      meta:{index:5}
    },
    {
      path: '/upsellimg:id',
      name: 'upsellimg',
      components: {
        main: UpSellImg,
      },
      meta:{index:6}
    },
    {
      path: '/mine/',
      name: 'mine',
      components: {
        main: Mine,
        footer: BotNavs
      },
      meta:{index:5,none:'true'}
    },
    {
      path: '/myMills/',
      name: 'mymills',
      components: {
        main: MyMills,
      },
      meta:{index:6}
    },
    {
      path: '/usdt/',
      name: 'usdt',
      components: {
        main: Usdt,
      },
      meta:{index:6}
    },
    {
      path: '/run=:id&name=:name',
      name: 'run',
      components: {
        main: Run,
      },
      meta:{index:7}
    },
    {
      path: '/myDeals:tip',
      name: 'mydeals',
      components: {
        main: MyDeals,
      },
      meta:{index:6}
    },
    {
      path: '/mingxi/',
      name: 'mingxi',
      components: {
        main: MingXi,
      },
      meta:{index:6}
    },
    {
      path: '/recruit/',
      name: 'recruit',
      components: {
        main: Recruit,
      },
      meta:{index:6}
    },
    {
      path: '/myTeam/',
      name: 'myteam',
      components: {
        main: MyTeam,
      },
      meta:{index:6}
    },
    {
      path: '/userInfo/',
      name: 'userinfo',
      components: {
        main: UserInfo,
      },
      meta:{index:7}
    },
    {
      path: '/weixin/',
      name: 'weixin',
      components: {
        main: WeiXin,
      },
      meta:{index:8}
    },
    {
      path: '/setting/',
      name: 'setting',
      components: {
        main: Setting,
      },
      meta:{index:7}
    },
    {
      path: '/sysinfo',
      name: 'sysinfo',
      components: {
        main: SysInfo,
      },
      meta:{index:7}
    },
    {
      path: '/sysinfodetail',
      name: 'sysinfodetail',
      components: {
        main: SysInfoDetail,
      },
      meta:{index:8}
    },
    {
      path: '/changeMobile:phone',
      name: 'changemobile',
      components: {
        main: ChangeMobile,
      },
      meta:{index:9}
    },
    {
      path: '/aliPay',
      name: 'alipay',
      components: {
        main: AliPay,
      },
      meta:{index:9}
    },
    {
      path: '/idenCard',
      name: 'idencard',
      components: {
        main: IdenCard,
      },
      meta:{index:9}
    },
    {
      path: '/bankCard/=:ifcard&jc=:jc&tp=:tp',
      name: 'bankcard',
      components: {
        main: BankCard,
      },
      meta:{index:9}
    },
    {
      path: '/addCard',
      name: 'addcard',
      components: {
        main: AddCard,
      },
      meta:{index:10}
    },
    {
      path: '/changepaypwd',
      name: 'changepaypwd',
      components: {
        main: ChangePaypwd,
      },
      meta:{index:4}
    },
    {
      path: '/resetpwd',
      name: 'resetpwd',
      components: {
        main: ResetPwd,
      },
      meta:{index:5}
    },
    {
      path: '/resetpwd2',
      name: 'resetpwd2',
      components: {
        main: ResetPwd2,
      },
      meta:{index:6}
    },
    {
      path: '/resetpwd3/:pwd',
      name: 'resetpwd3',
      components: {
        main: ResetPwd3,
      },
      meta:{index:7}
    },
    {
      path: '/linkus',
      name: 'linkus',
      components: {
        main: LinkUs,
      },
      meta:{index:6}
    },
    {
      path: '/help',
      name: 'help',
      components: {
        main: Help,
      },
      meta:{index:6}
    },
    {
      path: '/sort',
      name: 'sort',
      components: {
        main: Sort,
        footer: BotNavs1
      },
      meta:{index:100,none:'true'}
    },
    {
      path: '/goods/name=:name&id=:id',
      name: 'goods',
      components: {
        main: Goods,
      },
      meta:{index:101}
    },
    {
      path: '/gooddetail/id=:id',
      name: 'gooddetail',
      components: {
        main: GoodDetail,
      },
      meta:{index:102}
    },
    {
      path: '/cart',
      name: 'cart',
      components: {
        main: Cart,
        footer: BotNavs1
      },
      meta:{index:103,none:'true'}
    },
    {
      path: '/confirmorder/source=:source',//source区别from是商品详情还是购物车还是待付款
      name: 'confirmorder',
      components: {
        main: ConfirmOrder,
      },
      meta:{index:103}
    },
    {
      path: '/orderdetail/id=:id&source=:source',
      name: 'orderdetail',
      components: {
        main: OrderDetail,
      },
      meta:{index:104}
    },
    {
      path: '/address/source=:source',//source区别from是否是确认订单
      name: 'address',
      components: {
        main: Address,
      },
      meta:{index:105}
    },
    {
      path: '/addaddress',
      name: 'addaddress',
      components: {
        main: AddAddress,
      },
      meta:{index:106}
    },
    {
      path: '/editaddress',
      name: 'editaddress',
      components: {
        main: EditAddress,
      },
      meta:{index:106}
    },
    {
      path: '/mine1',
      name: 'mine1',
      components: {
        main: Mine1,
        footer: BotNavs1
      },
      meta:{index:102,none:'true'}
    },
    {
      path: '/accountsafe',
      name: 'accountsafe',
      components: {
        main: AccountSafe,
      },
      meta:{index:103}
    },
    {
      path: '/myorder/i=:i',
      name: 'myorder',
      components: {
        main: MyOrder,
      },
      meta:{index:103}
    },
  ]
})
