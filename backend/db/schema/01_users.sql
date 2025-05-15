-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS Users CASCADE;
DROP TABLE IF EXISTS Messages CASCADE;

CREATE TABLE Users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(255) NOT NULL,
    role CHAR(255) NOT NULL,
    verifacation_status BOOLEAN NOT NULL,
    created_at TIMESTAMP(0) WITH TIME zone NOT NULL
);

CREATE TABLE Messages(
    id SERIAL PRIMARY KEY NOT NULL,
    sender_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    recipient_id INTEGER REFERENCES Users(id) ON DELETE CASCADE,
    content VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) WITH TIME zone NOT NULL
);


