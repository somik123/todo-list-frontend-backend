package org.somik.todo.resources;

import java.util.List;

import org.somik.todo.api.Todo;
import org.somik.todo.dao.TodoDAO;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;

@Path("/todo")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class TodoResource {
	TodoDAO todoDao;
	
	public TodoResource(TodoDAO todo) {
		this.todoDao = todo;
	}
	
	@POST
	public Todo addTodo(Todo todo) {
		todoDao.insertTodo(todo.getName(), todo.getDescription(), todo.getDate());
		return todoDao.findByName(todo.getName());
	}
	
	@PUT
	@Path("/{id}")
	public Todo updateTodo(@PathParam("id") int id, Todo todo) {
		todoDao.updateTodo(id, todo.getName(), todo.getDescription(), todo.getDate(), todo.getCompleted());
		return todoDao.findById(id);
	}
	
	@DELETE
	@Path("/{id}")
	public String deleteTodo(@PathParam("id") int id) {
		todoDao.deleteTodo(id);
		return "{ \"Result\": \"OK\" }";
	}
	
	@GET
	public List<Todo> getAll() {
		return todoDao.findAll();
	}
	
	@GET
	@Path("/{id}")
	public Todo getById(@PathParam("id") int id) {
		return todoDao.findById(id);
	}
	
	@GET
	@Path("/install")
	public String initialize() {
		todoDao.createTodoTable();
		return "{ \"Result\": \"OK\" }";
	}
}
