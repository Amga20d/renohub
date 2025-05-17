DROP TABLE IF EXISTS Bids CASCADE;

CREATE TABLE Bids(
    id SERIAL PRIMARY KEY NOT NULL,
    project_id INTEGER REFERENCES Projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    amount BIGINT NOT NULL,
    status BOOLEAN NOT NULL,
    notes VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) WITH TIME zone NOT NULL -- created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP refactor
);
-- split into seperate files
