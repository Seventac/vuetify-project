<template>
  <div class="flex-container">
    <social-contact></social-contact>
    <Bookmark></Bookmark>
    <Background/>
  </div>
</template>

<script>
import Bookmark from "../components/bookmark/Bookmark";
import SocialContact from "../components/socialcontact/SocialContact";
import Background from "../components/background/Background";

export default {
  name: "Extend",
  components: {
    Background,
    SocialContact,
    Bookmark,
  },
  setup() {
    return {};
  }
}
</script>

<style lang="scss" scoped>
.flex-container {
  overflow: auto;
  position: relative;
  width: 100%;
  height: 100%;
}

</style>
