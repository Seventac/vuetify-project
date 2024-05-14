<template>
  <v-app>
    <v-main>
      <LoadingScreen/>
      <Layout/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Layout from "./components/layout/Layout.vue";
import LoadingScreen from "./components/commons/LoadingScreen"

</script>

