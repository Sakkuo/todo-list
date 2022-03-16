import axios from "../../axios/axios-todo";
import { FETCH_TODOS_SUCCESS, SUCCESS_FETCH_COLUMNS} from "./actionTypes";

export function fetchTodos() {
    return async (dispatch) => {
        const response = await axios.get('/todos.json')
        const todos = []
        if (response.data) {
                Object.entries(response.data).forEach((key) => {
                    todos.push({
                        name: key[1],
                        id: key[0]
                    })
                })
            }
        dispatch(fetchTodosSuccess(todos))
    }
}


export function fetchColumns() {
    return async (dispatch) => {
        const response = await axios.get('/columns.json')
        const columns = []
        if (response.data) {
            Object.entries(response.data).forEach((key) => {
                columns.push({
                    name: key[1],
                    id: key[0]
                })
            })
        }
        dispatch(successFetchColumns(columns))
    }
}

export function successFetchColumns(columns) {
    return {
        type: SUCCESS_FETCH_COLUMNS,
        columns
    }
}

export function successHandle(id, i, columnId, ind) {
    return async (dispatch, getState) =>{
        const todosArray = getState().todos.columns[ind].name[0].todos[id][1]
        todosArray.successToDo = !todosArray.successToDo


        await axios.patch(`/columns/${columnId}/0/todos/${id}.json`, 
        {
            1 : {
                successToDo : todosArray.successToDo
            }
            
        })
        dispatch(fetchColumns())
    }
}





export function fetchTodosSuccess(todos) {
    return {
        type: FETCH_TODOS_SUCCESS,
        todos
    }
}

export function deleteTodo (id, columnId) {
    return async dispatch => {
        const preDelete = await axios.get(`/columns/${columnId}/0/todos.json`)
        await axios.delete(`/columns/${columnId}/0/todos/${id}.json`)

        const postDelete = await axios.get(`/columns/${columnId}/0/todos.json`)
        if (postDelete.data) {
            const postDeleteLength = Object.keys(postDelete.data)
            const preDeleteLength = Object.keys(preDelete.data)

            if (preDeleteLength.length === postDeleteLength.length + 1) {
                dispatch(fetchColumns())
            }
        } else {
            dispatch(fetchColumns())
        }
    }
}