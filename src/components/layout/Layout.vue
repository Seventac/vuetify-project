<template>
  <v-layout class="rounded rounded-md">

    <v-app-bar title="Application Bar">
      <!-- 应用栏的其他内容 -->
      <v-spacer></v-spacer>
      <!-- 固定在右上角的 v-switch -->
      <ThemSwitcher></ThemSwitcher>
    </v-app-bar>

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

        <v-list-item prepend-icon="mdi-home-city" title="Home" @click="navigateTo('Home')"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="My Account" @click="navigateTo('Account')"></v-list-item>
        <v-list-item prepend-icon="mdi-menu" title="Extend" @click="navigateTo('Extend')"></v-list-item>
        <v-list-item prepend-icon="mdi-calendar" title="Excel Management" @click="navigateTo('Excelmgmt')"></v-list-item>
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
import PageFooter from "../commons/PageFooter"
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {useLoadingStore} from "../../stores/pinia";

export default {
  components: {ThemSwitcher, PageFooter},
  setup() {
    const router = useRouter();
    const drawer = ref(true);
    const rail = ref(false);
    const startTime = ref(0);
    const endTime = ref(0);
    const loadDuration = ref(0);
    const layoutReady = ref(false);
    const loadingStore = useLoadingStore();

    // 导航到指定路由
    const navigateTo = (routeName) => {
      router.push({name: routeName});
      console.log(routeName)
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
        console.log("这里是组件加载时",loadingStore.isLoading);
      }, loadDuration.value); // 假设异步操作需要1秒

    })

    return {
      navigateTo,
      signOut,
      drawer,
      rail,
      loadingStore
    };
  },
};
</script>
<style lang="scss" scoped>
.sing_out{
  margin-top: 150%;
}


</style>
