<template>
  <v-switch
    color="primary"
    @change="toggleTheme"
  ></v-switch>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTheme } from 'vuetify';

const theme = useTheme()

function toggleTheme () {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<style scoped>
/* 根据需要添加样式 */

</style>
