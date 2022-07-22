package org.somik.todo.api;

import org.jdbi.v3.sqlobject.config.RegisterRowMapper;

import com.fasterxml.jackson.annotation.JsonProperty;

@RegisterRowMapper(TodoMapper.class)
public class Todo {
	
	public Todo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Todo(int id, String name, String description, String date) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.date = date;
	}

	public Todo(String name, String description, String date) {
		super();
		this.name = name;
		this.description = description;
		this.date = date;
	}

	@JsonProperty
	private int id;
	
	@JsonProperty
	private String name;
	
	@JsonProperty
	private String description;
	
	@JsonProperty
	private String date;

	@Override
	public String toString() {
		return "Todo [id=" + id + ", name=" + name + ", description=" + description + ", date=" + date + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}
	
	
}
