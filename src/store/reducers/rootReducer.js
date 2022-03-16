import { combineReducers } from "redux";
import todosReducer from '../reducers/todos'
import formReducer from "./form";
import columnsReducer from "./columns";

export default combineReducers({
    todos: todosReducer,
    form: formReducer,
    columns: columnsReducer
})
