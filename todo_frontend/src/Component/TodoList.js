import React, {Component} from "react";
import TodoService from "../Services/TodoService";
import { Redirect, Route, Link } from "react-router-dom";

export default class TodoList extends Component {
    constructor(props){
        super(props);

        // Declare all methods
        this.retrieveTodoList = this.retrieveTodoList.bind(this);
        this.onShowAdd = this.onShowAdd.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.saveTodo = this.saveTodo.bind(this);
        this.completeTodo = this.completeTodo.bind(this);
        
        // State variables
        this.state = {
            name: "",
            description: "",
            date: "",
            completed: false,

            showAdd: false,
            addHasError: false,

            todoList: []
        };
    }

    // Get the list of todos from API
    componentDidMount(){
        this.retrieveTodoList();
    }

    // Method to get the data for the full list of Todo from the API
    retrieveTodoList(){
        // Call API through TodoService
        TodoService.getTodo()
            .then(response => {
                this.setState({todoList: response.data});
                //console.log(response.data);
            })
            .catch(e=> {console.log(e)});
    }

    // Display the add form to the user
    onShowAdd(){
        this.setState({showAdd: "true"});
    }

    // Handle change of name field
    onChangeName(e){
        this.setState({name: e.target.value});
    }

    // Handle change of description field
    onChangeDescription(e){
        this.setState({description: e.target.value});
    }

    // Handle change of date field
    onChangeDate(e){
        this.setState({date: e.target.value});
    }

    // Save the data provided by the user as a new todo task
    saveTodo(){
        // Ensure all columns are filled up
        if(this.state.name != "" && this.state.date != ""){
            var data = {
                name: this.state.name,
                description: this.state.description,
                date: this.state.date,
                completed: false
            };

            // Call API through TodoService
            TodoService.createTodo(data)
                .then(response => {
                    this.setState({
                        name: "",
                        description: "",
                        date: "",
                        showAdd: false,
                        addHasError: false
                    });
                    //console.log(response.data);
                    
                    if(response.data.name == this.state.name){
                        // Refresh the todo list display
                        this.retrieveTodoList();
                    } else {
                        // Set the flag to display the error message
                        this.setState({addHasError: true});
                    }
                })
                .catch(e =>{console.log(e)});
        }
        else{
            // Set the flag to display the error message
            this.setState({addHasError: true});
        }
    }

    // Display a check mark to indicate the task is complete
    completeTodo(id,status){
        var check = 1
        if(status) check = 0;
        // Call API through TodoService
        TodoService.completeTodoById(id, check)
            .then(response =>{
                //console.log(response.data);
                this.retrieveTodoList();
            })
            .catch(e=>{console.log(e)});
    }

    render(){
        var {todoList, currentTodo, currentIndex, showAdd, addHasError} = this.state;

        return(
            <div className="container">
                <div className="text-right">
                    <button type="button" onClick={this.onShowAdd} className="btn btn-primary" >New Todo</button>
                </div>
                {showAdd ? (
                <div className="shadow-sm border rounded mt-3 text-start p-4">
                    <h3 className="text-center">Add Task</h3>

                    {addHasError ? ( 
                        <div className="alert alert-warning mt-4" role="alert" data-testid="error_txt">Error: Title or date cannot be empty.</div>
                    ) : "" }

                    <div className="form-group">
                        <span htmlFor="name">Title</span>
                        <input type="text" className="form-control" id="TodoName" required maxLength={80}
                        value={this.state.name} onChange={this.onChangeName} name="name"
                        placeholder="Title for the new task" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="description">Description</span>
                        <input type="text" className="form-control" id="TodoDescription" maxLength={160}
                        value={this.state.description} onChange={this.onChangeDescription} name="description"
                        placeholder="Detailed description of the task" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="date">Date</span>
                        <input type="date" className="form-control" id="TodoDate" data-testid="TodoDate" required 
                        value={this.state.date} onChange={this.onChangeDate} name="date"  min="2022-01-01" max="2032-12-31" />
                    </div>
                    <div className="text-right">
                        <button onClick={this.saveTodo} className="btn btn-primary"> Save </button>
                    </div>
                </div>
                ) : ""}
                <div className="shadow-sm border rounded mt-3 text-start p-4">
                    {
                        todoList && todoList.map( (todo, index) => (
                            <div className="shadow-sm border border-primary rounded mt-3 text-start pl-3 pr-3 pt-2 pb-2" key={todo.id}>
                                <div className="row text-start">
                                    <div className="col">
                                        <button type="button" 
                                            className="btn btn-outline-none float-right mt-3" 
                                            onClick={()=> this.completeTodo(todo.id,todo.completed)}
                                            data-testid={"Btn_"+todo.name}> 
                                                {todo.completed ? (
                                                    <img data-testid={"Img_"+todo.name} src="./images/checkbox-tick-sm.png" alt="tick" />
                                                ) : (
                                                    <img data-testid={"Img_"+todo.name} src="./images/checkbox-empty-sm.png" alt="empty" />
                                                )}
                                        </button>

                                        <Link to={"/edit/" + todo.id}>
                                            <h3>{todo.name}</h3>
                                        </Link>
                                        <img src="./images/calendar-sm.png" alt="calendar" /> &nbsp;
                                        {todo.date} 
                                        <span className="font-italic">
                                            {todo.description == "" ? "": " - " + todo.description}
                                        </span>
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