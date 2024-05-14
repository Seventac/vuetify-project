<template>
<!--友链，流言板-->
  <v-card
    class="mx-auto card-frosted"
    min-width="700"
    hover
  >
    <v-card-item>
      <v-card-title>
        Friend chains
      </v-card-title>
      <v-card-subtitle>
        Card subtitle secondary text
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
    <!--<Blueprint :nodes="blueprintNodes" :connections="blueprintConnections"/>-->

    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "Card",
}
</script>

<style scoped>
.card-frosted {
  /* 设置背景色和背景模糊效果 */
  background-color: rgba(255, 255, 255, 0.5); /* 背景颜色半透明 */
  backdrop-filter: blur(10px); /* 应用背景模糊效果 */
  border-radius: 10px; /* 可选：添加圆角 */
  overflow: hidden; /* 确保模糊效果不会溢出卡片 */
}
</style>
