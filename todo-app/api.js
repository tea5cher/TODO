export async function getTodoList(owner) {
    // Отправляем запрос на список всех дел
    const response = await fetch(`http://localhost:3000/api/todos?owner=${owner}`);
    return await response.json();
}

export async function createTodoItem({ owner, name}) {
    const response = await fetch('http://localhost:3000/api/todos', {
        method: 'POST',
        body: JSON.stringify({
            name,
            owner,
        }),
        Headers: {
            "Conent-type": 'application/json',
        } 
    });

    return await response.json();
}


export function switchTodoItemDone( {todoItem}) {
    todoItem.done = !todoItem.done;
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
        method: 'PATCH',
        body: JSON.stringify({done: todoItem.done}),
        headers: {
            'Content-Type': 'application/json',
        }
    });
}

export function deleteTodoItem({ element, todoItem }){
    if (!confirm('Вы уверены?')){
        return;
    }
    element.remove()
    fetch(`http://localhost:3000/api/todos/${todoItem.id}`, {
    method: 'DELETE',
    });
}
