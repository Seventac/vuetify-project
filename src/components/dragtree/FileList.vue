<template>
<!--  TODO : 拖拽文件列表有bug-->
  <div>
    <h2>文件管理列表</h2>
    <draggable v-model="files" class="list-group" tag="ul" :move="checkMove" @end="onEnd">
      <template v-for="file in files" :key="file.id" slot="item">
        <li class="list-group-item" ref="fileItemRef" @contextmenu.prevent="openContextMenu(file)">
          <div class="file-item">
            <span class="file-name">{{ file.name }}</span>
          </div>
        </li>
      </template>
    </draggable>
    <button @click="addFile">添加文件</button>
    <VSnackbar v-model="snackbar.show" :timeout="3000" color="success" multi-line>
      {{ snackbar.message }}
      <template #action="{ attrs }">
        <VBtn color="primary" outlined text @click="snackbar.show = false" v-bind="attrs">
          关闭
        </VBtn>
      </template>
    </VSnackbar>
    <VMenu v-model="contextMenu.open" :close-on-content-click="false" :nudge-width="200" offset-y transition="slide-y-transition" :attach="$refs.fileItemRef">
      <template #activator="{ on, attrs }">
        <div v-bind="attrs" v-on="on"></div>
      </template>
      <VList dense>
        <VListItem @click="editFile(contextMenu.file)">
          <VListItemIcon>
            <VIcon>mdi-pencil</VIcon>
          </VListItemIcon>
          <VListItemText>{{ MENU_ITEM_EDIT }}</VListItemText>
        </VListItem>
        <VListItem @click="deleteFile(contextMenu.file)">
          <VListItemIcon>
            <VIcon>mdi-delete</VIcon>
          </VListItemIcon>
          <VListItemText>{{ MENU_ITEM_DELETE }}</VListItemText>
        </VListItem>
      </VList>
    </VMenu>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

import { reactive } from "vue";

const MESSAGE_FILE_ADDED = '文件已成功添加';
const MESSAGE_FILE_UPDATED = '文件名已成功更新';
const MESSAGE_FILE_DELETED = '文件已成功删除';
const MESSAGE_POSITION_UPDATED = '文件位置已更新';
const MENU_ITEM_EDIT = '编辑';
const MENU_ITEM_DELETE = '删除';

export default {
  name: "FileList",
  components: { draggable: Draggable },
  setup() {
    const files = reactive([
      { id: 1, name: 'File 1' },
      { id: 2, name: 'File 2' },
      // ... 更多文件
    ]);

    const snackbar = reactive({
      show: false,
      message: '',
    });

    const contextMenu = reactive({
      open: false,
      file: null,
    });

    const addFile = () => {
      const newFile = { id: files.length + 1, name: `New File ${files.length + 1}` };
      files.push(newFile);
      showMessage(MESSAGE_FILE_ADDED);
    };

    const editFile = (file) => {
      const newName = prompt(`请输入新的文件名：`, file.name);
      if (newName) {
        file.name = newName;
        showMessage(MESSAGE_FILE_UPDATED);
      }
    };

    const deleteFile = (file) => {
      const index = files.indexOf(file);
      if (index !== -1) {
        files.splice(index, 1);
        showMessage(MESSAGE_FILE_DELETED);
      }
    };

    const checkMove = (event) => {
      const { draggedContext, relatedContext } = event.draggedContext;
      const distance = Math.abs(draggedContext.index - relatedContext.index);
      return distance > 1; // 允许拖放到非相邻位置
    };

    const onEnd = (event) => {
      showMessage(MESSAGE_POSITION_UPDATED);
      // 获取拖动开始和结束位置的索引
      const startIndex = event.oldIndex;
      const endIndex = event.newIndex;

      // 如果起始和结束位置相同，无需重新排序
      if (startIndex === endIndex) return;

      // 根据拖动方向调整索引
      const delta = startIndex < endIndex ? 1 : -1;

      // 更新 files 数组的顺序
      for (let i = startIndex; i !== endIndex; i += delta) {
        const temp = files[i];
        files[i] = files[i + delta];
        files[i + delta] = temp;
      }
    };

    const openContextMenu = (file) => {
      contextMenu.file = file;
      contextMenu.open = true;
    };

    const showMessage = (message) => {
      snackbar.message = message;
      snackbar.show = true;
    };

    return {
      files,
      addFile,
      editFile,
      deleteFile,
      checkMove,
      onEnd,
      snackbar,
      contextMenu,
      openContextMenu,
      showMessage,
    };
  },
};
</script>

<style scoped>
/* 样式 */
</style>
