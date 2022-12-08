import { updateElement } from './listCrud.js';

const TRASH_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="15"><path d="M22 5a1 1 0 0 1-1 1H3a1 1 0 0 1 0-2h5V3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v1h5a1 1 0 0 1 1 1zM4.934 21.071 4 8h16l-.934 13.071a1 1 0 0 1-1 .929H5.931a1 1 0 0 1-.997-.929zM15 18a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0zm-4 0a1 1 0 0 0 2 0v-6a1 1 0 0 0-2 0z"/></svg>';
const DRAG_ICON = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="4"><circle cx="9" cy="2" r="2"/><circle cx="2" cy="2" r="2"/><circle cx="16" cy="2" r="2"/></svg>';

const generateElmt = (tag, className, todoIndex) => {
  const elem = document.createElement(tag);
  elem.classList.add(className);
  elem.dataset.index = todoIndex;
  return elem;
};

export default function makeItem(elm, elementsList) {
  const li = generateElmt('li', 'todo-item', elm.index);
  const checkBox = generateElmt('input', 'todo-check', elm.index);
  const inputTask = generateElmt('input', 'task-input', elm.index);
  const deleteButton = generateElmt('button', 'remove-btn', elm.index);
  const dragButton = generateElmt('button', 'drag-btn', elm.index);

  function updateCheckbox({ index, completed, list }) {
    if (index >= list.length) return;
    list[index].completed = completed;
  }
  checkBox.type = 'checkbox';
  checkBox.checked = elm.completed;
  checkBox.addEventListener('change', (e) => {
    updateCheckbox({
      index: parseInt(e.target.dataset.index, 10),
      completed: e.target.checked,
      list: elementsList,
    });
  });
  inputTask.value = elm.description;
  if (elm.completed) inputTask.style.textDecoration = 'line-through';

  inputTask.addEventListener('change', (e) => {
    updateElement({
      description: e.target.value,
      index: parseInt(e.target.dataset.index, 10),
      list: elementsList,
    });
  });
  deleteButton.innerHTML = TRASH_ICON;
  dragButton.innerHTML = DRAG_ICON;

  li.appendChild(checkBox);
  li.appendChild(inputTask);
  li.appendChild(deleteButton);
  li.appendChild(dragButton);
  return li;
}
