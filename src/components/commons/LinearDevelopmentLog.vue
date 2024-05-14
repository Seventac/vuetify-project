<template>
  <v-card class="pa-2 mx-auto card-frosted" hover outlined>
    <v-card-title>
      Development logs
    </v-card-title>
    <v-list dense rounded v-if="displayedLogs.length > 0">
      <v-infinite-scroll
        :threshold="0"
        :disabled="busy || displayedLogs.length >= totalLogs"
        @infinite-scroll="loadMoreLogsDebounced"
        infinite-scroll-distance="1"
        class="scroll-area"
        @load="load"
      >
        <v-list-item v-for="(log, index) in displayedLogs" :key="index">
          <v-list-item-title>
            <v-chip color="primary" label class="ma-1">
              {{ log.timestamp }}
            </v-chip>
            {{ log.message }}
          </v-list-item-title>
        </v-list-item>
        <template v-slot:empty>
          <v-alert type="warning">No more logs!</v-alert>
        </template>
      </v-infinite-scroll>
    </v-list>
  </v-card>
</template>
<script>
import {onMounted, onUnmounted, ref} from 'vue';
import {getDeveloperList} from "../../api/data";

function debounce(func, wait, timeoutRef) {
  return function () {
    const context = this;
    const args = arguments;
    if (timeoutRef.value) clearTimeout(timeoutRef.value);
    timeoutRef.value = setTimeout(() => func.apply(context, args), wait);
  };
}

export default {
  name: 'LinearDevelopmentLog',
  setup() {
    const displayedLogs = ref([]); // 当前显示的日志列表
    const busy = ref(false); // 是否正在加载数据
    const offset = ref(0); // 当前加载数据的偏移量
    const totalLogs = ref(Infinity);
    const logsPerLoad = 10;
    const timeoutRef = ref(null);

    // 加载更多日志的函数
    async function loadMoreLogs() {
      if (busy.value || displayedLogs.value.length >= totalLogs.value) return;
      busy.value = true;
      try {
        const {logs, total} = await getDeveloperList({offset: offset.value, limit: logsPerLoad});
        updateLogs(logs, total);
      } catch (error) {
        handleError(error);
      } finally {
        busy.value = false;
      }
    }

    // 更新日志列表和总数(这里未使用上)
    function updateLogs(newLogs, newTotal) {
      totalLogs.value = newTotal || Infinity;
      displayedLogs.value = [...displayedLogs.value, ...newLogs];
      offset.value += newLogs.length;
    }

    //
    function load({done}){
      setTimeout(()=>{
        done('empty')
      },1000)
    }

    // 处理错误
    function handleError(error) {
      console.error(error);
      // 这里可以添加更多的错误处理逻辑，比如显示错误消息给用户
    }

    // 创建一个防抖后的加载函数(这里未使用)
    const loadMoreLogsDebounced = debounce(loadMoreLogs, 500, {
      leading: true,
      trailing: false,
    });

    // 首次加载日志
    async function initialLoad() {
      const {logs, total} = await getDeveloperList({offset: 0, limit: logsPerLoad});
      updateLogs(logs, total);
    }

    // 组件挂载时加载日志
    onMounted(initialLoad);
    // 组件卸载时清除定时器
    onUnmounted(() => {
      if (timeoutRef.value) clearTimeout(timeoutRef.value);
    });
    return {
      displayedLogs,
      busy,
      loadMoreLogsDebounced,
      totalLogs,
      load
    };
  },
};
</script>
<style scoped>
.card-frosted {
  /* 设置背景色和背景模糊效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景颜色半透明 */
  backdrop-filter: blur(10px); /* 应用背景模糊效果 */
  border-radius: 10px; /* 可选：添加圆角 */
  overflow: hidden; /* 确保模糊效果不会溢出卡片 */
}

.scroll-area {
  border-radius: 5px;
  height: 300px;
  overflow-y: auto;
  scrollbar-width: none; /* 隐藏滚动条（Firefox） */
  -ms-overflow-style: none; /* 隐藏滚动条（Internet Explorer, Edge） */
}


</style>
// 模拟开发日志数据

//TODO 进行异步操作，获得最新开发日志数据

//
// async function api () {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve(Array.from({ length: 10 }, (k, v) => v + items.value.at(-1) + 1))
//     }, 1000)
//   })
// }
// async function load ({ done }) {
//   // Perform API call
//   const res = await api()
//
//   items.value.push(...res)
//
//   done('ok')
// }
