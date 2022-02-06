'use strict';

// selctors
const todoInpur = document.querySelector('.input_todo'),
      todoButton =  document.querySelector('.todos_btn'),
      todoLists = document.querySelector('.todo_list'),
      filterOption = document.querySelector('.filter_todo');

// eventlistiner
todoButton.addEventListener('click', addTodo);
todoLists.addEventListener('click', delNCheck);
filterOption.addEventListener('click', filtersTodo);
window.addEventListener('DOMContentLoaded', getTodos);

//function

function addTodo(e){
    // ОТМЕНЯЕМ СТАНДАРТНОЕ ПОВЕДЕНИЕ БРАУЗЕРА ДЛЯ ТОГО, ЧТОБЫ ПРИ КЛИКЕ НА КНОПКУ ФОРМА НЕ ОБНОВЛЯЛАСЬ
    e.preventDefault();
    // Создаем div для того чтобы добавлять в него новый список дел
    const newTodoDiv = document.createElement('div');
    newTodoDiv.classList.add('todo');
    // Теперь создаем новый лист
    const newLists = document.createElement('li');
    newLists.innerHTML = todoInpur.value;
    newLists.classList.add('todo_item');
    newTodoDiv.appendChild(newLists);
    // Добавляем туду в локалсторадж
    saveLocalStorageTodos(todoInpur.value);

    // создадим чекбокс, который будет указывать на завершение задачи
    const checkBox = document.createElement('button');
    checkBox.innerHTML = `<i class="fas fa-check"></i>`;
    checkBox.classList.add('completed_button');
    newTodoDiv.appendChild(checkBox);
    // создадим чекбокс, который будет указывать на удаление задачи
    const trashBox = document.createElement('button');
    trashBox.innerHTML = `<i class="far fa-trash-alt"></i>`;
    trashBox.classList.add('trash_button');
    newTodoDiv.appendChild(trashBox);
    // Тпереь добавляем созданные нами элементы к списку в дом дереве элементов
    todoLists.appendChild(newTodoDiv);
    // Очищаем поле ввода, после того, как текст добавлен в лист
    todoInpur.value = '';
};

// Пишем функцию для удаления списка

function delNCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash_button'){
        const parentItem = item.parentElement;
        parentItem.classList.add('fall');
        removeLocalStorage(parentItem);
        parentItem.addEventListener('transitionend', () => {
            parentItem.remove();
        })
    }

    if(item.classList[0] === 'completed_button'){
        const parentItem = item.parentElement;
        parentItem.classList.toggle('completed');
    }
}

function filtersTodo(e){
    const todos = todoLists.childNodes;
    todos.forEach(todo => {
        switch (e.target.value){
            case 'all':
                todo.style.display = 'flex';
                break;
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }else{
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

function saveLocalStorageTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        const newTodoDiv = document.createElement('div');
        newTodoDiv.classList.add('todo');
        // Теперь создаем новый лист
        const newLists = document.createElement('li');
        newLists.innerHTML = todo;
        newLists.classList.add('todo_item');
        newTodoDiv.appendChild(newLists);

        // создадим чекбокс, который будет указывать на завершение задачи
        const checkBox = document.createElement('button');
        checkBox.innerHTML = `<i class="fas fa-check"></i>`;
        checkBox.classList.add('completed_button');
        newTodoDiv.appendChild(checkBox);
        // создадим чекбокс, который будет указывать на удаление задачи
        const trashBox = document.createElement('button');
        trashBox.innerHTML = `<i class="far fa-trash-alt"></i>`;
        trashBox.classList.add('trash_button');
        newTodoDiv.appendChild(trashBox);
        // Тпереь добавляем созданные нами элементы к списку в дом дереве элементов
        todoLists.appendChild(newTodoDiv);
    })
}

function removeLocalStorage(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndexDel = todo.children[0].textContent;
    todos.splice(todos.indexOf(todoIndexDel), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}