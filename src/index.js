import './style.css';

const arr = [
  {
    id: 1,
    description: 'work',
    completed: false,
  },
  {
    id: 2,
    description: 'go to gym',
    completed: false,
  },
];
// const form = document.querySelector('.form');
const todoWrapper = document.querySelector('.todo-list');
// const checkboxes = document.querySelectorAll("input[type='checkbox']");
const userInput = document.querySelector('.user-input');
let todoList = '';
function component() {
  // eslint-disable-next-line no-restricted-syntax
  for (const item of arr) {
    todoList += `
    <div class="list"><li class='todo-list-item'>
    <input class="checkbox" type="checkbox" name="completed" id="">
      <div>${item.description}</div></li>
      <div class='dots'><span>.</span>
     <span>.</span>
      <span>.</span>
      </div></div>`;
  }
}
component();
todoWrapper.innerHTML = todoList;

document.addEventListener('submit', (e) => {
  e.preventDefault();
  let input = '';
  userInput.addEventListener('keypress', (e) => {
    e.preventDefault();
    // console.log(e.target.value);
    input = e.target.value;
    if (input !== '') {
      const task = {
        Id: arr.length,
        description: e.target.value,
        completed: false,
      };
      arr.push(task);
    }
  });
});
