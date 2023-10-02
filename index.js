const app = document.getElementById('mainContainer');

const title = document.createElement('h1');
title.classList.add('title');
title.innerText = 'Todo List';
app.append(title);

const input = document.createElement('input');
input.classList.add('input');

const addButton = document.createElement('button');
addButton.classList.add('add-button');
addButton.innerText = 'Add';

const form = document.createElement('form');
form.append(input, addButton);
app.append(form);

addButton.onclick = async (event) => {
  event.preventDefault();
  const value = input.value.trim();

  if (value) {
    const newTodo = {
      id: generateId(),
      title: value,
      completed: false
    }

    todos.push(await fetch('https://jsonplaceholder.typicode.com/user/1/todos', {
      method: 'POST',
      body: JSON.stringify(newTodo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json()));

    renderTodoList();
  };

  input.value = '';
};

const todoList = document.createElement('ul');
todoList.classList.add('todo-list');

const generateId = () => Math.ceil(Math.round() * 1000);

let todos = await fetch('https://jsonplaceholder.typicode.com/users/1/todos')
  .then(response => response.json());

const createTodoItem = (todo) => {
  const todoItem = document.createElement('li');
  todoItem.classList.add('todo-item');
  if (todo.completed) todoItem.classList.add('todo-item-completed');

  const todoTitle = document.createElement('span');
  todoTitle.innerText = todo.title;
  todoTitle.classList.add('todo-title');

  todoTitle.onclick = event => {
    todo.completed = !todo.completed;
    renderTodoList();
  };

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '&times;';
  deleteButton.type = 'button';
  deleteButton.classList.add('delete-button');

  deleteButton.onclick = event => {
    todos = todos.filter(oneTodo => oneTodo !== todo);
    renderTodoList();
  };

  todoItem.append(todoTitle, deleteButton);
  return todoItem;
};

const renderTodoList = () => {
  todoList.innerHTML = '';
  todos.forEach(todo => todoList.append(createTodoItem(todo)));
};

renderTodoList();

app.append(todoList);
