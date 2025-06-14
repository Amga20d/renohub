DROP TABLE IF EXISTS Projects CASCADE;

CREATE TABLE Projects (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  budget BIGINT NOT NULL,
  address VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);
