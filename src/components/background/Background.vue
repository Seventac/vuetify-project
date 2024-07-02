<template>
<!--  TODO 背景图片在不同移动端宽度处理-->
  <div class="back-box" @touchstart.prevent="handleTouchStart" @touchend.prevent="handleTouchEnd">
    <div class="cover"></div>
    <img :class="{ blurred: isBlurred }" src="https://cdn.seovx.com/d/?mom=302" alt="背景图片"></img>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Background',
  setup() {
    const isBlurred = ref(false); // 用于控制图片是否模糊
    const touchStartTime = ref(0);

    const handleTouchStart = () => {
      touchStartTime.value = new Date().getTime();
    };

    const handleTouchEnd = () => {
      const touchEndTime = new Date().getTime();
      const touchDuration = touchEndTime - touchStartTime.value;

      // 一般认为长按时长大于300ms可视为长按
      if (touchDuration > 300) {
        isBlurred.value = !isBlurred.value;
      }
    };

    return {
      isBlurred,
      handleTouchStart,
      handleTouchEnd,
    };
  },
});
</script>

<style lang='scss'>
.back-box {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  z-index: -9;
  .cover {
    background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
    width: 100vw;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    z-index: -8;
  }
  img {
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    object-fit: cover;
    backface-visibility: hidden;
    pointer-events: none;
    transition: 0.25s;
    z-index: -9;
  }

  // 动态模糊效果
  &.blurred img {
    filter: blur(10px); // 根据需要调整模糊程度
  }
}

// 可以在这里添加针对移动端的媒体查询调整，比如字体大小、元素间距等
@media only screen and (max-width: 768px) {
  /* 移动端特定样式调整 */
  .back-box {
    position: relative;
    width: 220vw;
    height: 100vh;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-position: center;
    z-index: -9;
    .cover {
      background-image: radial-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%), radial-gradient(rgba(0, 0, 0, 0) 33%, rgba(0, 0, 0, 0.3) 166%);
      width: 100vw;
      height: 100vh;
      left: 0;
      top: 0;
      z-index: -8;
    }
  }
}
</style>
