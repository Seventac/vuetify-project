import {defineStore} from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    // 是否显示加载中
    isLoading: true,
  }),
  actions: {
    startLoading() {
      this.isLoading = true;
    },
    stopLoading() {
      this.isLoading = false;
    },
  },
});
