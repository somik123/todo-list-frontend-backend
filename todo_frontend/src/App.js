import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import TodoList from './Component/TodoList';
import EditTodo from './Component/EditTodo';


function App() {
  return (
    <div>
      <Router>
        <div>
        <nav className="navbar navbar-dark bg-dark">
          <div className="navbar-nav mr-auto nav">
            <li className="nav-item">
              <Link to={"/"} className="nav-link">
              Simple Todo List 
              </Link>
            </li>
          </div>
        </nav>
        </div>
        <div className="container mt-3">
        <Switch>
          <Route exact path='/' component={TodoList} />
          <Route path='/edit/:id' component={EditTodo} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
