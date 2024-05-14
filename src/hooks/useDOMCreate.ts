import { onUnmounted } from 'vue';

const useDOMCreate = (nodeId: string): HTMLDivElement => {
  // 生成一个div的节点
  const node = document.createElement('div');
  // 给赋值一个class
  node.className = nodeId;
  // 在body中插入div节点
  document.body.appendChild(node);
  // 在组件卸载的时候移除dom节点
  onUnmounted(() => {
    document.body.removeChild(node);
  });
  return node;
};
export default useDOMCreate;
