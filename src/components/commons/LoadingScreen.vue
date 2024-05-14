<template>
  <div class="text-center">
    <v-overlay
      :model-value="overlay"
      class="align-center justify-center bg-color"
    >
      <v-progress-circular
        color="primary"
        size="64"
        indeterminate
      ></v-progress-circular>
      <br>
      Loading...
    </v-overlay>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";
import {useLoadingStore} from "../../stores/pinia";

export default {
  name: 'LoadingScreen',
  setup(){
    const loadingStore = useLoadingStore();
    const overlay = ref(true);

    onMounted(()=>{
      loadingStore.startLoading()
      console.log("这里是首页加载时",loadingStore.isLoading)
      overlay.value = loadingStore.isLoading
    });
    watch(()=>loadingStore.isLoading,(newVal)=>{
      overlay.value=newVal
    })
    return {
      overlay,
    };
  }
};
</script>

<style scoped>
/* 这里可以添加一些样式来定制加载指示器的外观 */
.bg-color{
  background-color: #ffffff;
}
</style>
