import React, {Component} from "react";
import TodoService from "../Services/TodoService";
import { Link } from "react-router-dom";

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.retrieveTodoList = this.retrieveTodoList.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            todoList: [],
            currentTodo: null,
            currentIndex: -1,
        };
    }

    componentDidMount(){
        this.retrieveTodoList();
    }

    retrieveTodoList(){
        TodoService.getTodo()
            .then(response => {
                this.setState({todoList: response.data});
                console.log(response.data);
            })
            .catch(e=> {console.log(e)});
    }

    refreshList(){
        this.retrieveTodoList();
        this.setState({
            currentTodo: null,
            currentIndex: null,
        });
    }


    deleteTodo(todo){
        TodoService.deleteTodo(todo.id)
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e =>{
                console.log(e);
            });
    }


    render(){
        const {todoList, currentTodo, currentIndex} = this.state;

        return(
            <div className="container">
                <div>
                    <Link to={"/add"}>
                        <button type="button" className="btn btn-primary">New</button>
                    </Link>
                </div>
                <div>
                    {
                        todoList && todoList.map( (todo, index) => (
                            <div className="border border-primary rounded mt-3 text-start pl-3 pt-1 pb-1">
                                <div className="row text-start">
                                    <div className="col-10">
                                        <h3>{todo.name}</h3>
                                        &#x1F4C5; {todo.date} - {todo.description}<br />
                                    </div>
                                    <div className="col-2 mt-1">
                                        <button type="button" className="btn btn-outline-secondary" onClick={()=> this.deleteTodo(todo)}>&#x2610;</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }


}