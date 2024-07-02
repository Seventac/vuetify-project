<template>
  <v-app>
    <v-main>
      <LoadingScreen/>
      <!--TODO : 进行布局分析，确定组件的位置和结构 -->
      <Layout/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Layout from "./components/layout/Layout.vue";
import LoadingScreen from "./components/commons/LoadingScreen"

</script>

