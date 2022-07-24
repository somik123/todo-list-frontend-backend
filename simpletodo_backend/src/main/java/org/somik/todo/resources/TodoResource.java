package org.somik.todo.resources;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.somik.todo.api.Todo;
import org.somik.todo.service.TodoService;

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
    TodoService todoService;

    public TodoResource(TodoService todo) {
        this.todoService = todo;
    }

    // Handle incoming Add records request
    @POST
    public Todo addTodo(Todo todo) {
        return todoService.insertTodo(todo.getName(), todo.getDescription(), todo.getDate());
    }

    // Handle incoming Update records request
    @PUT
    @Path("/{id}")
    public Todo updateTodo(@PathParam("id") int id, Todo todo) {
        return todoService.updateTodo(id, todo.getName(), todo.getDescription(), todo.getDate(), todo.getCompleted());
    }

    // Handle incoming "mark todo as complete/incomplete" request
    @GET
    @Path("/{id}/{check}")
    public Todo completeTodo(@PathParam("id") int id, @PathParam("check") int check) {
        if (check == 1) return todoService.completeTodo(id, true);
        else if (check == 0) return todoService.completeTodo(id, false);
        else return null;
    }

    // Return all records in database
    @GET
    public List<Todo> getAll() {
        List<Todo> todoList = todoService.findAll();

        todoList.sort((t1, t2) -> {
            LocalDate t1Date = LocalDate.parse(t1.getDate());
            LocalDate t2Date = LocalDate.parse(t2.getDate());
            return t1Date.compareTo(t2Date);
        });
        return todoList;
    }

    // Return the record that matches this id
    @GET
    @Path("/{id}")
    public Todo getById(@PathParam("id") int id) {
        return todoService.findById(id);
    }

    // Setup the database tables
    @GET
    @Path("/install")
    public String initialize() {
        todoService.createTodoTable();
        return "{ \"Result\": \"OK\" }";
    }

    // Delete the record that matches this id
    @DELETE
    @Path("/{id}")
    public String deleteTodo(@PathParam("id") int id) {
        todoService.deleteTodo(id);
        return "{ \"Result\": \"OK\" }";
    }
}
