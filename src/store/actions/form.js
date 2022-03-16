import { CREATE_TODO, RESET_TODO_CREATION, TESTING_POST } from "./actionTypes";
import axios from "../../axios/axios-todo";
import { fetchColumns } from "./todos";

export function addTodoTo(columnId) {
    return async (dispatch, getState) => {
        await axios.post(`/columns/${columnId}/0/todos.json`, getState().form.todo)
        dispatch(resetTodoCreation())
        dispatch(fetchColumns())
    }
}


export function resetTodoCreation() {
    return {
        type: RESET_TODO_CREATION
    }
}

export function createTodo(item) {
    return {
        type: CREATE_TODO,
        item
    }
}