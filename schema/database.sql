CREATE DATABASE todo;

CREATE TYPE status AS ENUM ('todo', 'in-progress', 'done');
CREATE TYPE priority AS ENUM ('low', 'medium', 'high');

CREATE TABLE tasks (
    _id uuid DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    status status DEFAULT 'todo' NOT NULL,
    priority priority DEFAULT 'low' NOT NULL,
    due_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (_id)
)

CREATE INDEX tasksIndex ON tasks (status, priority, title)