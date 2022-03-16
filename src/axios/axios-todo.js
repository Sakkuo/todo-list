import axios from "axios";

export default axios.create({
    baseURL: 'https://todo-list-c1113-default-rtdb.europe-west1.firebasedatabase.app/'
})
