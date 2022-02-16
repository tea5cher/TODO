
import { createTodoApp, createTodoLocalApp } from "./view.js";
import {
    getTodoList,
    createTodoItem,
    switchTodoItemDone,
    deleteTodoItem
} from './api.js';



export function toggleStorage(key, owner, title) {

    let flag = localStorage.getItem('flag');

    if (flag === null) {
        flag = 0;
    }
    console.log(flag);
    const toggleBtn = document.querySelector('.toggle');
    if (flag == 0) {
        createTodoLocalApp(document.querySelector('#todo-app'), title, key);
        toggleBtn.textContent = "Перейти на серверное хранилище";
    }

    if (flag == 1) {
        (async () =>{
            // const owner = 'Я';
            const todoItemList = await getTodoList(owner);
            createTodoApp(document.getElementById('todo-app'), {
                title: title,
                owner,
                todoItemList,
                onCreateFormSubmit: createTodoItem,
                onDoneClick: switchTodoItemDone,
                onDeleteClick: deleteTodoItem,
            });
        })();
        toggleBtn.textContent = "Перейти на локальное хранилище";
    }

    toggleBtn.addEventListener('click', ()=>{
        
        if (flag == 0) {
            flag = 1;
            localStorage.setItem("flag", flag);
            
            location.reload()
            
        } else {
            flag = 0;
            localStorage.setItem("flag", flag);
            
            location.reload()
        }
    })

}