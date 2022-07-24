package org.somik.todo.service;

import java.util.List;

import org.somik.todo.api.Todo;

public interface TodoService {

	Todo insertTodo(String name, String description, String date);

	Todo updateTodo(int id, String name, String description, String date, Boolean completed);

	Todo findById(int id);

	Todo completeTodo(int id, boolean b);

	List<Todo> findAll();

	void createTodoTable();

	void deleteTodo(int id);

}
