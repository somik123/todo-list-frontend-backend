package org.somik.todo.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.somik.todo.api.Todo;
import org.somik.todo.dao.TodoDao;

public class TodoService {
	TodoDao todoDao;

	public TodoService(TodoDao todoDao) {
		this.todoDao = todoDao;

	}

	public Todo insertTodo(String name, String description, String date) {
		boolean dateValid = validateDate(date);

		if (name.length() > 0 && name.length() < 100 && description.length() < 200 && dateValid) {
			// Add new item
			todoDao.insertTodo(name, description, date);

			// Return the latest added item
			List<Todo> todoList = todoDao.findAll();
			return todoList.get(0);
		}
		return null;
	}

	public Todo updateTodo(int id, String name, String description, String date, Boolean completed) {
		Todo todo = todoDao.findById(id);
		boolean dateValid = validateDate(date);

		if (todo != null && name.length() > 0 && name.length() < 100 && description.length() < 200 && dateValid) {
			// Update existing item
			todoDao.updateTodo(id, name, description, date, completed);
			return todo;
		}
		return null;
	}

	public Todo findById(int id) {
		// Find one item by Id
		return todoDao.findById(id);
	}

	public Todo completeTodo(int id, boolean b) {
		Todo todo = todoDao.findById(id);
		if (todo != null) {
			// Check/uncheck todo list item by id
			todoDao.completeTodo(id, b);
			return todo;
		}
		return null;
	}

	public List<Todo> findAll() {
		// TODO Auto-generated method stub
		return todoDao.findAll();
	}

	public void createTodoTable() {
		// TODO Auto-generated method stub
		todoDao.createTodoTable();
	}

	public void deleteTodo(int id) {
		// TODO Auto-generated method stub
		todoDao.deleteTodo(id);
	}

	// Validate range for date is correct
	public boolean validateDate(String dateStr) {
		DateTimeFormatter dtFormat;
		LocalDate minDate;
		LocalDate maxDate;
		try {
			dtFormat = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			minDate = LocalDate.parse("2022-01-01", dtFormat);
			maxDate = LocalDate.parse("2032-12-31", dtFormat);

			LocalDate date = LocalDate.parse(dateStr, dtFormat);
			if (date.isAfter(minDate) && date.isBefore(maxDate)) {
				return true;
			} else {
				return false;
			}
		} catch (Exception e) {
			System.out.println(e);
			return false;
		}
	}
}
