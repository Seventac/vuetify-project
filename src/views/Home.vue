<template>
  <v-sheet class="d-flex flex-wrap bg d-flex-mobile">
    <v-sheet class="flex-1-1 ma-0 pa-1 bg-color">
      <LinearDevelopmentLog/>
    </v-sheet>
    <v-sheet class="flex-1-1 ma-0 pa-1 bg-color">
      <EchartCard/>
    </v-sheet>
    <v-sheet class="flex-1-1-100 ma-0 pa-1 bg-color">
      <FriendLinks/>
    </v-sheet>
  </v-sheet>
</template>

<script>
import Card from "../components/commons/Card";
import EchartCard from "../components/commons/EchartCard";
import LinearDevelopmentLog from "../components/commons/LinearDevelopmentLog";
import FriendLinks from "../components/commons/FriendLinks";

export default {
  name: "Home",
  components: {FriendLinks, Card, EchartCard, LinearDevelopmentLog}
}
</script>

<style scoped>
.bg-color {
  background-color: transparent;
}

.bg {
  background-image: url("../assets/backgroundImg/home_background.png");
  background-size: cover;
  width: 100%;
  overflow: auto;
}

/* 媒体查询，适用于移动端 */
@media (max-width: 768px) {
  .d-flex-mobile {
    display: flex;
    flex-direction: column; /* 改为垂直方向 */
  }
}

</style>
