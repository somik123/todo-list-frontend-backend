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

        this.deleteTodo = this.deleteTodo.bind(this);

        this.state = {
            id: 0,
            name: "",
            description: "",
            date: "",
            completed: false
        };
    }

    componentDidMount(){
        console.log(this.props.match.params.id);
        this.getTodo(this.props.match.params.id);
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

    getTodo(id){
        TodoService.getTodoById(id)
            .then(response =>{
                this.setState({
                    id: response.data.id,
                    name: response.data.name,
                    description: response.data.description,
                    date: response.data.date
                });
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
    }

    updateTodo(){
        if(this.state.name != "" && this.state.date != ""){
            var data = {
                name: this.state.name,
                description: this.state.description,
                date: this.state.date,
                completed: false
            }
            TodoService.updateTodoById(this.state.id, data)
                .then(response =>{
                    console.log(response.data);
                    this.setState({completed: true})
                })
                .catch(e=>{console.log(e)});
        }
        else{
            alert("Name and Dates are compulsory fields.");
        }
    }


    deleteTodo(){
        TodoService.deleteTodo(this.state.id)
            .then(response => {
                console.log(response.data);
                this.setState({completed: true});
            })
            .catch(e =>{
                console.log(e);
            });
    }


    render(){
        const { completed, name, description, date } = this.state;
        
        if(completed){
            return ( <Redirect to="/" />)
        }
        else {
            return(
                <div className="container">
                    <div className="form-group">
                        <span htmlFor="name">Name</span>
                        <input type="text" className="form-control" id="TodoName" required maxLength={80}
                        value={name} onChange={this.onChangeName} name="name" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="description">Description</span>
                        <input type="text" className="form-control" id="TodoDescription" maxLength={160}
                        value={description} onChange={this.onChangeDescription} name="description" />
                    </div>
                    <div className="form-group">
                        <span htmlFor="date">Date</span>
                        <input type="date" className="form-control" id="TodoDate" required 
                        value={date} onChange={this.onChangeDate} name="date" />
                    </div>

                    <button onClick={this.updateTodo} className="btn btn-primary"> Update </button>
                </div>
            )
        }
    }
}