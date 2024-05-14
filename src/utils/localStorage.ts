
export const getItem = (item: string) => {
  const result = localStorage.getItem(item);
  if (result) {
    try {
      return JSON.parse(result);
    } catch (error) {
      return '';
    }
  }
  return '';
};

export const setItem = (item: string, data: string) => {
  localStorage.setItem(item, data);
};

export const removeItem = (item: string) => {
  localStorage.removeItem(item);
};
