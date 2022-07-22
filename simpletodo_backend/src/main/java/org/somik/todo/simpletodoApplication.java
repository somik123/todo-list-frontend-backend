package org.somik.todo;

import org.jdbi.v3.core.Jdbi;
import org.somik.todo.dao.TodoDAO;
import org.somik.todo.health.TodoHealthCheck;
import org.somik.todo.resources.TodoResource;

import io.dropwizard.core.Application;
import io.dropwizard.core.setup.Bootstrap;
import io.dropwizard.core.setup.Environment;
import io.dropwizard.jdbi3.JdbiFactory;

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
        // TODO: implement application
    	final JdbiFactory factory = new JdbiFactory();
    	
        final Jdbi jdbi = factory.build(environment, configuration.getDataSourceFactory(), "mysql");
        
        final TodoDAO todo = jdbi.onDemand(TodoDAO.class);
		final TodoResource todoResource = new TodoResource(todo);
        
		final TodoHealthCheck healthCheck = new TodoHealthCheck();
		environment.healthChecks().register("template", healthCheck);
		
        environment.jersey().register(todoResource);
    }

}
