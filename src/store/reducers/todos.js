import { FETCH_TODOS_SUCCESS, SUCCESS_FETCH_COLUMNS } from "../actions/actionTypes"

const initialState = {
    columns: []
}

export default function todosReducer(state = initialState, action) {
    switch (action.type) {

        case SUCCESS_FETCH_COLUMNS:
            return {
                ...state, 
                columns: action.columns
            }

        case FETCH_TODOS_SUCCESS:
            return {
                ...state, todos: action.todos
            }
        
        default: 
            return state
    }
}
