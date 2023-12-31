-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    wishlist JSONB,
    messages JSONB,
    profile JSONB
);

DROP TABLE IF EXISTS products CASCADE
CREATE TABLE products (
    id serial PRIMARY KEY,
    sellerId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    category VARCHAR(255),
    images JSONB,
    status VARCHAR(50) NOT NULL,
    FOREIGN KEY (sellerId) REFERENCES users(id)
);

DROP TABLE IF EXISTS messages CASCADE
CREATE TABLE messages (
    id serial PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    messageText TEXT,
    sendDate TIMESTAMPTZ,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);
