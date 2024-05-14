import { createRouter, createWebHistory } from 'vue-router';
// 调整导入路径以匹配项目结构
import Home from '../views/Home.vue';
import Account from '../views/Account.vue';
import Excelmgmt from '../views/Excelmgmt.vue';
import Extend from "../views/Extend.vue";

const routes = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account',
    name: 'Account',
    component: Account,
  },
  {
    path: '/excelmgmt',
    name: 'Excelmgmt',
    component: Excelmgmt,
  },
  {
    path: '/extend',
    name: 'Extend',
    component: Extend,
  }
  // 其他路由可以继续添加...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes, // 确保routes正确传递
});

export default router;
