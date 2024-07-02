<template>
<!--  TODO 路由激活状态，且关闭tag时跳转到上一个路由页面-->
  <el-button
    v-for="(item, index) in visitedRoutes"
    :key="index"
    class="animated-tag"
    :class="{ 'is-hovered': item.hovered }"
    @mouseover="handleMouseOver(index)"
    @mouseleave="handleMouseLeave(index)"
    @click="handleClick(item.route)"
    size="small">
    <span class="span_text" @click="handlePage(item.route)">
      {{ item.route }}
    </span>
    <transition name="icon-fade">
      <v-icon
        v-show="item.hovered"
        @click="handleClose(item.route)"
        class="el-tag__close"
        size="10"
        icon="mdi-close">
      </v-icon>
    </transition>
  </el-button>
</template>

<script>
import {ref, onMounted, watch} from "vue";
import {useRoute, useRouter, onBeforeRouteUpdate} from 'vue-router';

export default {
  name: "TagBar",
  setup() {
    const visitedRoutes = ref([]);
    const router = useRouter();
    const route = useRoute();

    // 初始化路由集合，确保每个路由对象都有一个hovered属性
    const initRoutes = () => {
      const initialRoutes = Array.from(visitedRoutes.value).map(routeName => ({ route: routeName, hovered: false }));
      visitedRoutes.value = initialRoutes;
    };

    // 添加或更新路由至集合
    const updateRouteInSet = () => {
      if (route.name) {
        const existingRoute = visitedRoutes.value.find(r => r.route === route.name);
        if (existingRoute) {
          existingRoute.hovered = false; // 确保切换时不显示关闭按钮
        } else {
          visitedRoutes.value.push({ route: route.name, hovered: false });
        }
      }
    };

    onMounted(() => {
      initRoutes();
      updateRouteInSet();
    });
    onBeforeRouteUpdate((to) => {
      updateRouteInSet();
    });
    watch(() => router.currentRoute.value, (to) => {
      updateRouteInSet();
    });

    // 鼠标悬停/离开事件处理
    const handleMouseOver = (index) => {
      visitedRoutes.value[index].hovered = true;
    };
    const handleMouseLeave = (index) => {
      visitedRoutes.value[index].hovered = false;
    };

    // 关闭标签与跳转页面方法
    const handleClose = (routeName) => {
      console.log('关闭标签:', routeName);
      visitedRoutes.value = visitedRoutes.value.filter(item => item.route !== routeName);
    };
    const handlePage = (routeName) => {
      console.log('跳转操作:', routeName);
      router.push({name: routeName});
    };
    const handleClick = (routeName) => {
      console.log('点击标签:', routeName);

    };

    return {
      handleClose,
      handlePage,
      handleMouseOver,
      handleMouseLeave,
      handleClick,
      visitedRoutes,
    };
  }
}
</script>


<style scoped>
.animated-tag {
  position: relative; /* 使关闭按钮相对于标签定位 */
  display: inline-block;
}

.span_text {
  /* 使<span>继承按钮的尺寸 */
  display: block; /* 将<span>设为块级元素，使其能够填充父容器 */
  /* 移除<span>的默认外边距和内边距，确保完美对齐 */
  margin-top: -6px;
  margin-left: -10px;
  padding-left: 10px;
  font-size: 16px;
  font-weight: bold;
  line-height: 24px;
  color: rgba(0, 0, 0, 0.72);
}

.animated-tag .el-tag__close {
  position: relative;
  left: 8%;
  justify-content: center;
  opacity: 0; /* 初始状态隐藏关闭按钮 */
  transition: opacity 0.1s ease-in-out; /* 添加过渡动画 */
  cursor: pointer; /* 设置鼠标指针为手型 */
}

/* 当鼠标悬停时，显示关闭按钮并应用动画 */
.animated-tag:hover .el-tag__close {
  opacity: 1;
}

.icon-fade-enter-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.icon-fade-leave-active {
  transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0s;
}

.icon-fade-enter-from,
.icon-fade-leave-to {
  opacity: 0;
  transform: translateX(5px) scale(0.9); /* 向上移动并缩小，以增强消失效果 */
}
</style>
