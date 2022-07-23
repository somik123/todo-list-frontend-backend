package org.somik.todo;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.dropwizard.core.Configuration;
import io.dropwizard.db.DataSourceFactory;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;

public class simpletodoConfiguration extends Configuration {
    // TODO: implement service configuration
	@Valid
    @NotNull
    private DataSourceFactory database = new DataSourceFactory();

	// Setter for the database data source
    @JsonProperty("database")
    public void setDataSourceFactory(DataSourceFactory factory) {
        this.database = factory;
    }

    // Getter for the database data source
    @JsonProperty("database")
    public DataSourceFactory getDataSourceFactory() {
        return database;
    }
}
