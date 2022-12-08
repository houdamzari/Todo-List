import TodoItem from './todoItem.js';

export const addElement = ({ description, list }) => {
  const index = list.length;
  const elm = new TodoItem({ description, index });
  list.push(elm);
};

export const deleteElement = ({ index, list }) => {
  if (index >= list.length) return;
  for (let i = index + 1; i < list.length; i += 1) {
    list[i].index -= 1;
  }
  list.splice(index, 1);
};

export const updateElement = ({ description, index, list }) => {
  if (index >= list.length) return;
  list[index].description = description;
};
