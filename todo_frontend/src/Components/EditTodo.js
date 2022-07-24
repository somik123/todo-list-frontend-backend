import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import TodoService from "../Services/TodoDataService";

export default class EditTodo extends Component{
    constructor(props){
        super(props);

        // Declare all methods
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.getTodo = this.getTodo.bind(this);

        this.deleteTodo = this.deleteTodo.bind(this);

        // State variables
        this.state = {
            id: 0,
            name: "",
            description: "",
            date: "",
            completed: false,

            editHasError: false,

            redirectToListView: false
        };
    }

    // Get the todo from API
    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getTodo(this.props.match.params.id);
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

    // Method to get the data for a single Todo from the API
    getTodo(id){
        // Call API through TodoService
        TodoService.getTodoById(id)
            .then(response =>{
                this.setState({ // Assign values to local state variables
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    date: response.data.date,
                    completed: response.data.completed
                });
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
    }

    // Save the data provided by the user to the existing todo task
    updateTodo(){
        // Ensure all columns are filled up
        if(this.state.name != "" && this.state.date != ""){
            var data = {
                name: this.state.name,
                description: this.state.description,
                date: this.state.date,
                completed: this.state.completed
            }

            // Call API through TodoService
            TodoService.updateTodoById(this.state.id, data)
                .then(response =>{
                    console.log(response.data);
                    if(response.data.name == this.state.name){
                        this.setState({
                            redirectToListView: true,
                            editHasError: false
                        });
                    } else {
                        // Set the flag to display the error message
                        this.setState({editHasError: true});
                    }
                })
                .catch(e=>{console.log(e)});
        }
        else{
            // Set the flag to display the error message
            this.setState({editHasError: true});
        }
    }

    // Delete the Todo list item
    deleteTodo(){
        // Call API through TodoService
        TodoService.deleteTodo(this.state.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    redirectToListView: true,
                    editHasError: false
                });
            })
            .catch(e =>{
                console.log(e);
            });
    }


    render(){
        const {id, redirectToListView, name, description, date, editHasError } = this.state;
        
        if(redirectToListView){
            return ( <Redirect to="/" />)
        }
        else {
            return(
                <div className="container">

                    <h3 className="text-center">Edit Task</h3>

                    {/* Display the error message if there are any errors */}
                    {editHasError ? ( 
                        <div class="alert alert-warning mt-4" role="alert">Error: Title or date cannot be empty.</div>
                    ) : "" }

                    {/* The input group for title */}
                    <div className="form-group">
                        <span htmlFor="name">Title</span>
                        <input type="text" className="form-control" id="TodoName" required maxLength={80}
                        value={name} onChange={this.onChangeName} name="name" />
                    </div>

                    {/* The input group for description */}
                    <div className="form-group">
                        <span htmlFor="description">Description</span>
                        <input type="text" className="form-control" id="TodoDescription" maxLength={160}
                        value={description} onChange={this.onChangeDescription} name="description" />
                    </div>

                    {/* The input group for date */}
                    <div className="form-group">
                        <span htmlFor="date">Date</span>
                        <input type="date" className="form-control" id="TodoDate" required 
                        value={date} onChange={this.onChangeDate} name="date" min="2022-01-01" max="2032-12-31" />
                    </div>

                    {/* The input group for submit and delete buttons */}
                    <div className="row">
                        <div className="col">
                            <button onClick={()=> this.deleteTodo(id)} className="btn btn-danger"> Delete </button>
                        </div>
                        <div className="col text-right">
                            <button onClick={this.updateTodo} className="btn btn-primary"> Update </button>
                        </div>
                    </div>
                    
                    <div className="mb-5"></div>
                </div>
            )
        }
    }
}