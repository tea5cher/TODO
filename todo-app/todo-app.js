let localArr = [];

function createAppTitle(title) {
    const appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
}

function createTodoItemForm() {
    const form = document.createElement('form');
    const input = document.createElement('input');
    const buttonWrapper = document.createElement('div');
    const button = document.createElement('button');
    

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');    
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    
    input.placeholder = 'Введите название дела';
    button.textContent = 'Добавить дело';

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    button.disabled = true;

    

    return {form, input, button} ;     
        
}

function createTodoList() {
    const list = document.createElement('ul')
    list.classList.add('list-group');
    return list;
}

function createTodoItem(name) {
    let item = document.createElement('li');

    item.textContent = name;

    const doneButton = document.createElement('button');
    const deleteButton = document.createElement('button');
    const buttonGroup = document.createElement('div');

    let randomId = Math.random()*22.33;
    item.id = randomId.toFixed(2);

    doneButton.classList.add('btn', 'btn-success');
    deleteButton.classList.add('btn', 'btn-danger');
    doneButton.textContent = 'Готово';
    deleteButton.textContent = 'Удалить';
    buttonGroup.classList.add('btn-group', 'btn-group-sm');
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
      
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
        item,
        doneButton,
        deleteButton,
        buttonGroup
    }
}


function changeItemDone (arr, item)  {
    arr.map(obj => {
        if (obj.id === item.id & obj.done === false) {
            obj.done = true;
        } else if (obj.id === item.id & obj.done === true) {
            obj.done = false;
        }
    });
}
function completeTodoItem (item, btn) {
    btn.addEventListener('click', () => {
        localArr = JSON.parse(localStorage.getItem(key));
        item.classList.toggle('list-group-item-success');
        changeItemDone(localArr, item);

        localStorage.setItem(key, JSON.stringify(localArr));
    });
}

function deleteTodoItem (item, btn) {
    btn.addEventListener('click', () => {
        if (confirm('Вы уверены?')) {
            localArr = JSON.parse(localStorage.getItem(key));

            const neaList = localArr.filter(obj => obj.id !== item.id);

            localStorage.setItem(key, JSON.stringify(neaList));
            item.remove();
        }
    });
}


function createTodoApp(container, title , arr = null, key) {
    
    const todoAppTitle = createAppTitle(title);
    const todoItemForm = createTodoItemForm();
    const todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(key)) {
       localArr = JSON.parse(localStorage.getItem(key));

       for (let i=0; i<localArr.length; i++) {
        let item = createTodoItem(todoItemForm.input.value);

        item.item.textContent = localArr[i].name;
        item.item.id = localArr[i].id;

        if (localArr[i].done == true) {
            item.item.classList.add('list-group-item-success');
        } else {
            item.item.classList.remove('list-group-item-success');
        }

        completeTodoItem(item.item, item.doneButton);
        deleteTodoItem(item.item, item.deleteButton);

        todoList.append(item.item);
        item.item.append(item.buttonGroup);

       }
    }

    todoItemForm.form.addEventListener('submit', (e)=> {
        e.preventDefault();

        let item = createTodoItem(todoItemForm.input.value, false);

        if (!todoItemForm.input.value) {
            return
        }


        completeTodoItem(item.item, item.doneButton);
        deleteTodoItem(item.item, item.deleteButton);

        let localStorageData = localStorage.getItem(key);
         
        if (localStorageData == null) {
            localArr = [];
        } else {
            localArr = JSON.parse(localStorageData);
        }

        function createLocalObj(arr) {
            let obj = {};
 
            obj.name = todoItemForm.input.value;
            obj.done = false;
            obj.id = item.item.id;

            arr.push(obj);
        }
        createLocalObj(localArr);
        localStorage.setItem(key, JSON.stringify(localArr));

        todoList.append(item.item);
        todoItemForm.input.value = '';
        todoItemForm.button.disabled = true;

    })

    todoItemForm.form.addEventListener('input', ()=>{
        if (todoItemForm.input.value !== '') {
            todoItemForm.button.disabled = false;
        } else if (todoItemForm.input.value == '') {
            todoItemForm.button.disabled = true;
        }
    })   
}