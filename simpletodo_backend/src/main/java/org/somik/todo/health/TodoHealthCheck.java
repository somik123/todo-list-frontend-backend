package org.somik.todo.health;

import com.codahale.metrics.health.HealthCheck;

public class TodoHealthCheck extends HealthCheck {

	@Override
	protected Result check() throws Exception {
        return Result.healthy();
	}

}
