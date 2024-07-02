<template>
  <!--markdown 编辑器-->
  <v-md-editor v-model="markdownContent" height="400px"></v-md-editor>
</template>

<script>
import {ref} from "vue";

export default {
  name: "Markdown",
  setup(){
    const markdownContent = ref('');
    return {
      markdownContent
    }
  }
}
</script>

<style scoped>

</style>
