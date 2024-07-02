import { createRouter, createWebHistory } from 'vue-router';
// 调整导入路径以匹配项目结构
import Home from '../views/Home.vue';
import Account from '../views/account/Account.vue';
import Excelmgmt from '../views/Excelmgmt.vue';
import Extend from "../views/Extend.vue";
import Profile from "../views/account/components/Profile.vue";
import Settings from "../views/account/components/Settings";
import Bindings from "../views/account/components/Bindings";

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    title: '首页',
    component: Home,
    meta: { title: '首页', tab: true },
  },
  {
    path: '/account',
    name: 'Account',
    title: '账户管理',
    component: Account,
    meta: { title: '账户管理', tab: true },
    children: [
      {path:'',redirect:'/account/profile'},
      {path:'profile',component:Profile},
      {path:'settings',component:Settings},
      {path:'bindings',component:Bindings}
    ]
  },
  {
    path: '/excelmgmt',
    name: 'Excelmgmt',
    title: 'Excel管理',
    component: Excelmgmt,
    meta: { title: 'Excel管理', tab: true },
  },
  {
    path: '/extend',
    name: 'Extend',
    title: '扩展功能',
    component: Extend,
    meta: { title: '扩展功能', tab: true },
  },
  {
    path: '/setting',
    name: 'setting',
    title: '权限设置',
    component: Settings,
    meta: { title: '权限设置', tab: true},
  }
  // 其他路由可以继续添加...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // 确保routes正确传递
});

export default router;
