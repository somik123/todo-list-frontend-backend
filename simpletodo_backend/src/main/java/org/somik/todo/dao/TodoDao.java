package org.somik.todo.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.somik.todo.api.Todo;
import org.somik.todo.api.TodoMapper;

// Data access object interface like JpaRepository in Spring boot
@RegisterRowMapper(TodoMapper.class)
public interface TodoDao {
	
	// Create table in DB
	@SqlUpdate("CREATE TABLE IF NOT EXISTS Todo ("
						+ "id INT NOT NULL AUTO_INCREMENT,"
						+ "PRIMARY KEY (id), "
						+ "name varchar(100), "
						+ "description varchar(200), "
						+ "date date, "
						+ "completed BOOLEAN DEFAULT false"
					+ ")")
	void createTodoTable();
	
	// Insert individual records
	@SqlUpdate("INSERT INTO Todo (name, description, date) values (:name, :desc, :date)")
	void insertTodo(@Bind("name") String name, @Bind("desc") String desc, @Bind("date") String date);
	
	// Update one record, matched by it's id
	@SqlUpdate("UPDATE Todo set name = :name, description = :desc, date = :date, completed= :completed WHERE id = :id")
	void updateTodo(@Bind("id") int id, @Bind("name") String name, 
			@Bind("desc") String desc, @Bind("date") String date,
			@Bind("completed") Boolean completed);
	
	// Mark the record that matches this id as completed/incomplete
	@SqlUpdate("UPDATE Todo set completed = :completed WHERE id = :id")
	void completeTodo(@Bind("id")int id, @Bind("completed") Boolean completed);
	
	// Delete the record that matches this id
	@SqlUpdate("DELETE FROM Todo WHERE id = :id")
	void deleteTodo(@Bind("id") int id);
	
	// Get all the records from the database
	@SqlQuery("SELECT * FROM Todo ORDER BY date DESC")
	List<Todo> findAll();
	
	// Get the record from database that matches this id
	@SqlQuery("SELECT * FROM Todo WHERE id = :id")
	Todo findById(@Bind("id") int id);
	
	// Get the record(s) from database that matches this name
	@SqlQuery("SELECT * FROM Todo WHERE name = :name")
	List<Todo> findByName(@Bind("name") String name);
}
