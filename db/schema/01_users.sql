-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
--CREATE TABLE users (
  --id SERIAL PRIMARY KEY NOT NULL,
  --name VARCHAR(255) NOT NULL
--);
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

CREATE TABLE messages (
    id serial PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    messageText TEXT,
    sendDate TIMESTAMPTZ,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);

-- Insert sample data
INSERT INTO users (username, email, password, role, wishlist, messages, profile)
VALUES
    ('user123', 'user123@example.com', 'hashed_password', 'buyer', '[]', '[]', '{"name": "John Doe"}'),
    ('seller456', 'seller456@example.com', 'hashed_password', 'seller', '[]', '[]', '{"name": "Alice Smith"}');

INSERT INTO products (sellerId, title, description, price, category, images, status)
VALUES
    (2, 'Product 1', 'Description of Product 1', 25.99, 'Electronics', '["product1.jpg"]', 'active'),
    (2, 'Product 2', 'Description of Product 2', 19.99, 'Clothing', '["product2.jpg"]', 'sold');

INSERT INTO messages (senderId, receiverId, messageText, sendDate)
VALUES
    (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
    (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z');
