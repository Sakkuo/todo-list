import { CREATE_TODO, RESET_TODO_CREATION} from "../actions/actionTypes"

const initialState = {
    todo: [{successToDo: false}]
}

export default function formReducer(state= initialState, action) {
    switch (action.type) {

        case CREATE_TODO:
            return {
                ...state,
                todo: [ action.item,...state.todo]
            }

        case RESET_TODO_CREATION:
            return {
                ...state,
                todo: [{successToDo: false}]
            }

        default:
            return state
    }

}