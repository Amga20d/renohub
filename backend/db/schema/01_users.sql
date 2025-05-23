-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS Users CASCADE;


CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    role CHAR(255) NOT NULL,
    verification_status BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);



