<template>
  <div class="color-select-box">
    <div>{{ colorTitle }}</div>
    <input type="color" name="color" class="color" v-model='state.colorValue'>
  </div>
</template>

<script setup lang='ts'>
import {defineProps, defineEmits, reactive, computed} from 'vue';
import type {ColorState} from '@/components/colorselect/index';

const props = defineProps({
  colorTitle: {
    type: String,
    default: '颜色',
  },
  modelValue: String,
});
const emit = defineEmits(['update:modelValue']);
const state = reactive<ColorState>({
  // 使用计算属性的get,set方法来实现修改input值
  colorValue: computed({
    get: () => props.modelValue || '',
    set: (val) => {
      emit('update:modelValue', val);
    },
  } as any),
});
</script>

<style lang='scss'>
.color-select-box {
  display: flex;
  justify-content: space-around;

  .color {
    border: none;
    //外层容器
    &::-webkit-color-swatch-wrapper {
    }

    //内容区域
    &::-webkit-color-swatch {
      border: none;
    }
  }

  input[type='color'] {
    background-color: transparent;
  }
}
</style>
