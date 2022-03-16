import { CREATE_COLUMN } from "../actions/actionTypes"

const initialState = {
    column: []
}

export default function columnsReducer(state = initialState, action) {

    switch(action.type) {

        case CREATE_COLUMN:
            return {
                ...state,
                column: [...state.column, action.column]
            }

        default:
            return state
    }
}