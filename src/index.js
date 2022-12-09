import './style.css';
import makeItem from './modules/listCreator.js';
import { deleteElement, addElement } from './modules/listCrud.js';

const arr = JSON.parse(localStorage.getItem('todo')) || [];

const todoWrapper = document.querySelector('.todo-list');
const userInput = document.querySelector('.user-input');
const clearButton = document.querySelector('.clear');

const updateList = () => {
  todoWrapper.textContent = '';
  arr.sort((a, b) => a.id - b.id);
  arr.forEach((r) => {
    const item = makeItem(r, arr);
    todoWrapper.appendChild(item);
  });
  localStorage.setItem('todo', JSON.stringify(arr));
};

updateList();

document.addEventListener('click', (e) => {
  // handling remove buttons
  const removeBtn = e.target.closest('.remove-btn');
  if (removeBtn === null) return;
  const idToRemove = removeBtn.dataset.index;
  deleteElement({ index: parseInt(idToRemove, 10), list: arr });
  updateList();
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const newItem = userInput.value.trim();
    userInput.value = '';
    if (newItem.length === 0) return;
    addElement({ description: newItem, list: arr });
    updateList();
  }
});

document.addEventListener('change', () => updateList());

clearButton.addEventListener('click', () => {
  const completedItems = arr.filter((item) => item.completed);
  completedItems.forEach((todo) => deleteElement({ index: todo.index, list: arr }));
  updateList();
});
