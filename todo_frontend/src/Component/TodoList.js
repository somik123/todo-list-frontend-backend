import React, {Component} from "react";
import TodoService from "../Services/TodoService";
import { Redirect, Route, Link } from "react-router-dom";

export default class TodoList extends Component {
    constructor(props){
        super(props);
        this.retrieveTodoList = this.retrieveTodoList.bind(this);
        this.refreshList = this.refreshList.bind(this);

        this.onShowAdd = this.onShowAdd.bind(this);

        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        

        this.state = {
            name: "",
            description: "",
            date: "",
            completed: false,

            showAdd: false,

            todoList: []
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
    }

    onShowAdd(){
        this.setState({showAdd: "true"});
    }


    onChangeName(e){
        this.setState({name: e.target.value});
    }

    onChangeDescription(e){
        this.setState({description: e.target.value});
    }

    onChangeDate(e){
        this.setState({date: e.target.value});
    }

    saveTodo(){
        if(this.state.name != "" && this.state.date != ""){
            var data = {
                name: this.state.name,
                description: this.state.description,
                date: this.state.date,
                completed: false
            };

            TodoService.createTodo(data)
                .then(response => {
                    this.setState({
                        name: response.data.name,
                        description: response.data.description,
                        date: response.data.date,
                        showAdd: false
                    });
                    console.log(response.data);
                })
                .catch(e =>{console.log(e)});

                this.refreshList();
        }
        else{
            alert("Name and Date are compulsory fields.");
        }
            
    }

    newTodo(){
        this.setState({
            name: "",
            description: "",
            date: "",
            completed: false
        });
    }


    render(){
        var {todoList, currentTodo, currentIndex, showAdd} = this.state;

        return(
            <div className="container">
                <div className="text-right">
                    <button type="button" onClick={this.onShowAdd} className="btn btn-primary" >New Todo</button>
                </div>
                {showAdd ? (
                <div className="shadow-sm border rounded mt-3 text-start p-4">
                    <div className="form-group">
                        <span htmlFor="name">Name</span>
                        <input type="text" className="form-control" id="TodoName" required maxLength={80}
                        value={this.state.name} onChange={this.onChangeName} name="name" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="description">Description</span>
                        <input type="text" className="form-control" id="TodoDescription" maxLength={160}
                        value={this.state.description} onChange={this.onChangeDescription} name="description" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="date">Date</span>
                        <input type="date" className="form-control" id="TodoDate" required 
                        value={this.state.date} onChange={this.onChangeDate} name="date" />
                    </div>
                    <div className="text-right">
                        <button onClick={this.saveTodo} className="btn btn-primary"> Save </button>
                    </div>
                </div>
                ) : (<div></div>)}
                <div className="shadow-sm border rounded mt-3 text-start p-4">
                    {
                        todoList && todoList.map( (todo, index) => (
                            <div className="shadow-sm border border-primary rounded mt-3 text-start pl-3 pr-3 pt-2 pb-2" key={todo.id}>
                                <div className="row text-start">
                                    <div className="col-11">
                                        <Link to={"/edit/" + todo.id}>
                                            <h3>{todo.name}</h3>
                                        </Link>
                                        &#x1F4C5; {todo.date} 
                                        <span className="font-italic">
                                            {todo.description == "" ? "": " - " + todo.description}
                                        </span>
                                        <br />
                                    </div>
                                    <div className="col-1">
                                        <button type="button" 
                                            className="btn btn-outline-secondary float-right mt-3 mr-2" 
                                            onClick={()=> this.deleteTodo(todo)}>&#x2610;</button>
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