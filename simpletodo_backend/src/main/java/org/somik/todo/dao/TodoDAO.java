package org.somik.todo.dao;

import java.util.List;

import org.jdbi.v3.sqlobject.config.RegisterRowMapper;
import org.jdbi.v3.sqlobject.customizer.Bind;
import org.jdbi.v3.sqlobject.statement.SqlQuery;
import org.jdbi.v3.sqlobject.statement.SqlUpdate;
import org.somik.todo.api.Todo;
import org.somik.todo.api.TodoMapper;

@RegisterRowMapper(TodoMapper.class)
public interface TodoDAO {
	@SqlUpdate("CREATE TABLE IF NOT EXISTS Todo ("
						+ "id INT NOT NULL AUTO_INCREMENT,"
						+ "PRIMARY KEY (id), "
						+ "name varchar(100), "
						+ "description varchar(200), "
						+ "date varchar(50) "
					+ ")")
	void createTodoTable();
	
	@SqlUpdate("INSERT INTO Todo (name, description, date) values (:name, :desc, :date)")
	void insertTodo(@Bind("name") String name, @Bind("desc") String desc, @Bind("date") String date);
	
	@SqlUpdate("UPDATE Todo set name = :name, description = :desc, date = :date WHERE id = :id")
	void updateTodo(@Bind("id") int id, @Bind("name") String name, @Bind("desc") String desc, @Bind("date") String date);
	
	@SqlUpdate("DELETE FROM Todo WHERE id = :id")
	void deleteTodo(@Bind("id") int id);
	
	@SqlQuery("SELECT * FROM Todo")
	List<Todo> findAll();
	
	@SqlQuery("SELECT * FROM Todo WHERE id = :id")
	Todo findById(@Bind("id") int id);
	
	@SqlQuery("SELECT * FROM Todo WHERE name = :name")
	Todo findByName(@Bind("name") String name);
}
