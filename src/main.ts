import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';

// Vuetify 样式
import 'vuetify/styles';
// 引入全局样式
import './styles/index.scss';
// Material Design Icons 字体
import '@mdi/font/css/materialdesignicons.min.css';
import VueExcelEditor from 'vue3-excel-editor';


// 创建 Vuetify 实例
import { createVuetify } from 'vuetify';


const vuetify = createVuetify({
  // 可以在这里配置 Vuetify 的全局选项
  // 例如，设置默认图标字体
  icons: {
    iconfont: 'mdi',
  },
  // 其他的 Vuetify 配置...
});

// 创建 Vue 应用实例
const app = createApp(App);
const pinia = createPinia();
// 分别使用 Vuetify 和 Vue Router 插件
app.use(vuetify);
app.use(router);
app.use(pinia);
app.use(VueExcelEditor);
// 挂载应用
app.mount('#app');
