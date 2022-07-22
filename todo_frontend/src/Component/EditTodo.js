import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";
import TodoService from "../Services/TodoService";

export default class EditTodo extends Component{
    constructor(props){
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.updateTodo = this.updateTodo.bind(this);
        this.getTodo = this.getTodo.bind(this);

        this.state = {
            currentTodo: {
                id: null,
                name: "",
                description: "",
                date: ""
            },
            completed: false
        };
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getTodo(this.props.match.params.id);
    }

    onChangeName(e){
        const name = e.target.value;
        this.setState(function(prevState){
            return{
                currentTodo: {
                    ...prevState.currentTodo,
                    name:name
                }
            };
        });
    }

    onChangeDescription(e){
        const description = e.target.value;
        this.setState(function(prevState){
            return{
                currentTodo: {
                    ...prevState.currentTodo,
                    description: description
                }
            };
        });
    }

    onChangeDate(e){
        const date = e.target.value;
        this.setState(function(prevState){
            return{
                currentTodo: {
                    ...prevState.currentTodo,
                    date: date
                }
            };
        });
    }

    getTodo(id){
        TodoService.getTodoById(id)
            .then(response =>{
                this.setState({currentTodo: response.data});
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
    }

    updateTodo(){
        TodoService.updateTodoById(this.state.currentTodo.id, this.state.currentTodo)
            .then(response =>{
                console.log(response.data);
                this.setState({completed: true})
            })
            .catch(e=>{console.log(e)});           
    }

    render(){
        const { currentTodo } = this.state;
        if(this.state.completed || !currentTodo){
            return ( <Redirect to="/" />)
        }
        else {
            return(
                <div className="container">
                    <div className="form-group">
                        <span htmlFor="name">Name</span>
                        <input type="text" className="form-control" id="TodoName" required 
                        value={currentTodo.name} onChange={this.onChangeName} name="name" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="description">Description</span>
                        <input type="text" className="form-control" id="TodoDescription" required 
                        value={currentTodo.description} onChange={this.onChangeDescription} name="description" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="date">Date</span>
                        <input type="date" className="form-control" id="TodoDate" required 
                        value={currentTodo.date} onChange={this.onChangeDate} name="date" />
                    </div>

                    <button onClick={this.updateTodo} className="btn btn-success">Update</button>
                </div>
            )
        }
    }
}