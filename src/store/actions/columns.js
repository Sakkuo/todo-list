import axios from "../../axios/axios-todo";
import { CREATE_COLUMN } from "./actionTypes";
import { fetchColumns } from "./todos";


export function createColumn(column) {
    return {
        type: CREATE_COLUMN,
        column
    }
}


export function addColumnTo() {
    return async (dispatch, getState) => {
        await axios.post('/columns.json', getState().columns.column)
        dispatch(fetchColumns())
    }
}


export function testPostColumns() {
    return async dispatch => {
        if (await axios.get('/columns.json')) {

        const preAlg = Object.keys((await axios.get('/columns.json')).data)
            for (let i = 0; i < 20; i++) {
                const prePost = Object.keys((await axios.get('/columns.json')).data)
                if (preAlg.length === prePost.length) {
                    setTimeout(() => {}, 50)
                } else {
                    break
                }
            }
        }
        dispatch(fetchColumns())
    }   
}

export function deleteColumn(columnId) {
    return async dispatch => {
        await axios.delete(`/columns/${columnId}.json`)
        await axios.get(`/columns/${columnId}.json`)
        dispatch(fetchColumns())
    }
}

export function changeColumnName(ind, columnId, value) {
    return async (dispatch, getState) => {

        const columnName = getState().todos.columns[ind].name[0]
        columnName.name = value

        await axios.patch(`/columns/${columnId}/0/.json`, 
        {   
            name:  columnName.name
        }
        )
        dispatch(fetchColumns())
    }
}

