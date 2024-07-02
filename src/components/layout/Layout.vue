<template>
  <v-app-bar app>
    <v-toolbar-title class="headline">
      Application Bar
      <v-breadcrumbs class="el-breadcrumb" :items="items">
        <template v-slot:item="{ item, to, idx }">
          <v-breadcrumb-item :to="to" :exact="true">
            {{ item.text }}
          </v-breadcrumb-item>
        </template>
        <span class="tag_left"></span>
        <!--      TODO 动态路由标签-->
        <tag-bar>

        </tag-bar>
      </v-breadcrumbs>

    </v-toolbar-title>
    <!-- 固定在右上角的 v-switch -->
    <ThemSwitcher></ThemSwitcher>
  </v-app-bar>
  <v-layout class="rounded rounded-md">
    <v-navigation-drawer
      v-model="drawer"
      :rail="rail"
      permanent
      app
      mini-variant
      @click="rail = false"
    >
      <v-list dense nav min-height="100%">
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          title="John"
          nav
        >
          <template v-slot:append>
            <v-btn
              icon="mdi-chevron-left"
              variant="text"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>
        <!--TODO 菜单项后面要改为动态添加路由-->
        <v-list-item prepend-icon="mdi-home-city" title="Home" @click="navigateTo('Home')"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" @click="navigateTo('Account')"></v-list-item>
        <v-list-item prepend-icon="mdi-menu" title="Extend" @click="navigateTo('Extend')"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar" title="Excel Management"
                     @click="navigateTo('Excelmgmt')"></v-list-item>
        <v-list-item class="sing_out" prepend-icon="mdi-export" title="Sign out" @click="signOut()"></v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main class="d-flex align-center justify-center">
      <router-view></router-view>
    </v-main>
    <v-footer name="footer" app class="pa-0">
      <PageFooter/>
    </v-footer>
  </v-layout>
</template>

<script>
import ThemSwitcher from "../commons/ThemSwitcher";
import PageFooter from "../commons/PageFooter";
import TagBar from "../commons/TagBar";
import {useRouter, useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import {useLoadingStore} from "../../stores/pinia";


export default {
  components: {ThemSwitcher, PageFooter, TagBar},
  setup() {
    const router = useRouter();
    const drawer = ref(true);
    const rail = ref(false);
    const startTime = ref(0);
    const endTime = ref(0);
    const loadDuration = ref(0);
    const layoutReady = ref(false);
    const loadingStore = useLoadingStore();
    const route = useRoute();
    //TODO 后续改为动态获取当前路由
    const items = ref([]);
    const addedRoutes = new Set(); // 用于存储已添加的路由名称
    // 导航到指定路由
    const navigateTo = (routeName) => {
      if (route.name !== routeName) { // 判断目标路由名与当前路由名是否不同
        router.push({name: routeName});
        items.value.push({text: routeName, to: {name: routeName}});
        console.log(items);
      } else {
        console.log('Already on the same route:', routeName);
      }
    };
    // 登出操作
    const signOut = () => {
      console.log("sign out");
    }
    // 在组件加载完成后通知LoadingScreen
    onMounted(() => {
      //计算组件加载时间
      startTime.value = Date.now(); // 记录组件挂载开始时间
      setTimeout(() => {
        endTime.value = Date.now(); // 记录组件挂载结束时间
        loadDuration.value = endTime.value - startTime.value; // 计算加载时长
        // 通知LoadingScreen组件加载完成
        layoutReady.value = true;
        loadingStore.stopLoading();
        console.log(`组件加载完成，耗时：${loadDuration.value}毫秒`);
        console.log("这里是组件加载时", loadingStore.isLoading);
      }, loadDuration.value);
      // 监听路由变化
      updateBreadcrumb();
    });
    watch(() => route.matched, () => {
      updateBreadcrumb();
    });

    const updateBreadcrumb = () => {
      addedRoutes.clear(); // 清空已添加的路由集合
      items.value = [];
      route.matched.forEach((r) => {
        if (!addedRoutes.has(r.name)) {
          items.value.push({text: r.name, to: {name: r.name}});
          addedRoutes.add(r.name);
        }
      });
    };

    return {
      navigateTo,
      signOut,
      drawer,
      rail,
      loadingStore,
      items
    };
  },
};
</script>
<style lang="scss" scoped>
.sing_out {
  margin-top: 50%;
}

.el-breadcrumb {
  margin: 0.2% 0 0.5% 0;
  padding: 0;
  font-size: 16px;
}

.tag_left {
  margin-left: 15%;
}
</style>
