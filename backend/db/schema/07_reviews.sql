-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS Reviews CASCADE;


CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY NOT NULL,
    rating INTEGER NOT NULL,
    message VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES Projects(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

