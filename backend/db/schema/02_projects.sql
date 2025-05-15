-- Drop and recreate notes table (Example)

DROP TABLE IF EXISTS Projects CASCADE;
DROP TABLE IF EXISTS Project_images CASCADE;

CREATE TABLE Projects(
    "id" SERIAL NOT NULL,
    "user_id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL,
    "budget" BIGINT NOT NULL,
    "address" VARCHAR(255) NOT NULL,
    "status" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(0) WITH
        TIME zone NOT NULL
);

CREATE TABLE Project_images(
    id PRIMARY KEY NOT NULL,
    project_id INTEGER REFERENCES Projects(id) DELETE ON CASCADE,
    image_url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP(0) WITH TIME zone NOT NULL
);