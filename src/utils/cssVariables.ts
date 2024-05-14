// 新增或者修改变量
export const setCssVariables = (key: string, value: string) => {
  document.documentElement.style.setProperty(key, value);
};

// 读取变量
export const getPropertyValue = (key: string) => {
  document.documentElement.style.getPropertyValue(key).trim();
};

// 删除变量
export const removeProperty = (key: string) => {
  document.documentElement.style.removeProperty(key);
};
