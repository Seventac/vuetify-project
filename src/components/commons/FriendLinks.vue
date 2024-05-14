<template>
  <v-container>
    <v-card class="mx-auto card-frosted" min-width="100%" hover>
      <v-card-title>
        Friend chains
      </v-card-title>
      <v-card-subtitle>
        <v-divider class="my-1"></v-divider>
      </v-card-subtitle>
      <v-row dense>
        <v-col v-for="(link, index) in friendLinks" :key="index" span="4">
          <v-card class="ma-1" max-width="300" hover>
            <v-card-title>
              <v-chip color="primary" label>
                {{ link.name }}
              </v-chip>
            </v-card-title>
            <v-card-text>
              <a :href="link.url" target="_blank" rel="noopener noreferrer">
                {{ link.url }}
              </a>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import {onMounted, onUnmounted, ref} from 'vue';
// 引用封装
import { getLinkList } from "../../api/data";
import axios from "axios";

export default {
  name: 'FriendLinks',
  setup() {
    const loading = ref(false);
    const error = ref(null);

    // 模拟取消请求的函数（实际中可能需要用于取消正在进行的搜索请求）
    let cancelTokenSource = null;
    // 假设这是从 API 或其他地方获取的友链数据
    const friendLinks = ref([]);

    // 这里可以添加搜索逻辑，比如根据关键词过滤友链列表
    // 处理搜索请求的方法
    const getList = async () => {
      loading.value = true;
      error.value = null;
      // 创建一个新的取消令牌源
      cancelTokenSource = axios.CancelToken.source();

      try {
        // 使用封装的search函数发送搜索请求
        friendLinks.value = await getLinkList(cancelTokenSource.token);
      } catch (e) {
        if (axios.isCancel(e)) {
          console.log('GetLinks request canceled', e.message);
        } else {
          error.value = e.message;
        }
      } finally {
        loading.value = false;
      }
    };

    // 在组件挂载时获取友链列表
    onMounted(() => {
      getList();
    })

    // 当组件卸载时，取消任何挂起的搜索请求
    onUnmounted(() => {
      if (cancelTokenSource) {
        cancelTokenSource.cancel('Component Unmounted');
      }
    });
    return {
      friendLinks,
      loading,
      error,
      getList,
    };
  },
};
</script>

<style scoped>
/* 在这里添加你的样式 */
.card-frosted {
  /* 设置背景色和背景模糊效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景颜色半透明 */
  backdrop-filter: blur(10px); /* 应用背景模糊效果 */
  border-radius: 10px; /* 可选：添加圆角 */
  overflow: hidden; /* 确保模糊效果不会溢出卡片 */
}

.v-container {
  padding: 0;
  min-width: 100%;
}

.v-text-field {
  max-width: 300px;
}
</style>
<!--该组件可在其他地方使用-->
<!--<v-text-field-->
<!--  :loading="loading"-->
<!--  append-inner-icon="mdi-magnify"-->
<!--  density="compact"-->
<!--  label="Search Links"-->
<!--  variant="solo"-->
<!--  hide-details-->
<!--  single-line-->
<!--  rounded-->
<!--  v-model="searchQuery"-->
<!--  @click:append-inner="handleSearch"-->
<!--  @keyup.enter="handleSearch"-->
<!--&gt;</v-text-field>-->
