import axios from "axios"

const API_BASE_URL = "http://todo.somik.org:8080/todo";

class TodoDataService{
    createTodo(todo){
        return axios.post(API_BASE_URL, todo);
    }
    getTodo(){
        return axios.get(API_BASE_URL);
    }
    getTodoById(id){
        return axios.get(API_BASE_URL + "/" + id);
    }
    updateTodoById(id,todo){
        return axios.put(API_BASE_URL + "/" + id, todo);
    }
    completeTodoById(id){
        return axios.get(API_BASE_URL + "/complete/" + id);
    }
    deleteTodo(id){
        return axios.delete(API_BASE_URL + "/" + id);
    }
}

export default new TodoDataService();