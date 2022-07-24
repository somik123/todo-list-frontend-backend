package org.somik.todo;

import java.util.EnumSet;

import org.eclipse.jetty.servlets.CrossOriginFilter;
import org.jdbi.v3.core.Jdbi;
import org.somik.todo.dao.TodoDao;
import org.somik.todo.health.TodoHealthCheck;
import org.somik.todo.resources.TodoResource;
import org.somik.todo.service.TodoServiceImpl;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.jdbi3.JdbiFactory;
import jakarta.servlet.DispatcherType;
import jakarta.servlet.FilterRegistration;

public class simpletodoApplication extends Application<simpletodoConfiguration> {

	public static void main(final String[] args) throws Exception {
		new simpletodoApplication().run(args);
	}

	@Override
	public String getName() {
		return "simpletodo";
	}

	@Override
	public void initialize(final Bootstrap<simpletodoConfiguration> bootstrap) {
		// TODO: application initialization
	}

	@Override
	public void run(final simpletodoConfiguration configuration, final Environment environment) {

		// Enable CORS headers
		final FilterRegistration.Dynamic cors = environment.servlets().addFilter("CORS", CrossOriginFilter.class);

		// Configure CORS parameters
		cors.setInitParameter("allowedOrigins", "*");
		cors.setInitParameter("allowedHeaders", "X-Requested-With,Content-Type,Accept,Origin");
		cors.setInitParameter("allowedMethods", "OPTIONS,GET,PUT,POST,DELETE,HEAD");

		// Add URL mapping
		cors.addMappingForUrlPatterns(EnumSet.allOf(DispatcherType.class), true, "/*");

		// Initialize DB access and set it to mysql db
		final JdbiFactory factory = new JdbiFactory();
		final Jdbi jdbi = factory.build(environment, configuration.getDataSourceFactory(), "mysql");

		// Initialize the database access object
		final TodoDao todoDao = jdbi.onDemand(TodoDao.class);
		
		// Initialize the service layer
		final TodoServiceImpl todoService = new TodoServiceImpl(todoDao);
		
		// Initialize the API endpoint
		final TodoResource todoResource = new TodoResource(todoService);

		// Initialize the health check
		final TodoHealthCheck healthCheck = new TodoHealthCheck();
		environment.healthChecks().register("template", healthCheck);

		// Register the API endpoint
		environment.jersey().register(todoResource);
	}

}
