<template>
  <vue-excel-editor
    :value="internalJsondata"
    @input="updateInternalJsondata"
    v-if="internalJsondata.length"
  >
  <vue-excel-column field="user" label="User ID" type="string" width="80px"/>
    <vue-excel-column field="name" label="Name" type="string" width="150px"/>
    <vue-excel-column field="phone" label="Contact" type="string" width="130px"/>
    <vue-excel-column field="gender" label="Gender" type="select" width="50px" :options="['F','M','U']"/>
    <vue-excel-column field="age" label="Age" type="number" width="70px"/>
    <vue-excel-column field="birth" label="Date Of Birth" type="date" width="80px"/>
  </vue-excel-editor>
</template>

<script>
import {ref} from 'vue';

export default {
  name: "ExcelEditor",
  props: {
    jsondata: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  setup(props) {
    // 创建一个内部响应式引用来存储从prop传递进来的数据
    const internalJsondata = ref(props.jsondata);

    // 创建一个方法来更新内部数据，并触发update:jsondata事件
    const updateInternalJsondata = (newValue) => {
      internalJsondata.value = newValue;
      // 触发自定义事件，将更新通知给父组件
      emit('update:jsondata', newValue);
    };

    // 使用emit来触发事件，这里需要在setup函数的参数中引入emit
    const emit = defineEmits(['update:jsondata']);

    // 返回需要在模板中使用的数据和方法
    return {
      internalJsondata,
      updateInternalJsondata
    };
  }
}
</script>

<style scoped>

</style>
