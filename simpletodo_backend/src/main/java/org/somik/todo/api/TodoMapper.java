package org.somik.todo.api;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.jdbi.v3.core.mapper.RowMapper;
import org.jdbi.v3.core.statement.StatementContext;

// Mapper to map returned rows from mysql to the Todo Object using the all args constructor
public class TodoMapper implements RowMapper<Todo> {

	@Override
	public Todo map(ResultSet rs, StatementContext ctx) throws SQLException {
		// TODO Auto-generated method stub
		//System.out.println(rs);
		return new Todo(rs.getInt("id"), rs.getString("name"), rs.getString("description"), 
				rs.getString("date"),rs.getBoolean("completed") );
	}

}
