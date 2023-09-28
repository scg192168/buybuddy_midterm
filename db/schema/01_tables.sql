-- Drop and recreate Users table (Example)
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
    id serial PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    wishlist JSONB DEFAULT NULL,
    messages JSONB DEFAULT NULL,
    profile JSONB DEFAULT NULL
);

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
    id serial PRIMARY KEY,
    sellerId INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price NUMERIC(10, 2),
    category VARCHAR(255),
    images TEXT DEFAULT NULL,
    status VARCHAR(50) NOT NULL,
    product_details TEXT,
    FOREIGN KEY (sellerId) REFERENCES users(id)
);

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
    id serial PRIMARY KEY,
    senderId INT NOT NULL,
    receiverId INT NOT NULL,
    messageText TEXT DEFAULT NULL,
    sendDate TIMESTAMPTZ,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (receiverId) REFERENCES users(id)
);

DROP TABLE IF EXISTS wishlists CASCADE;
CREATE TABLE wishlists (
    id serial PRIMARY KEY,
    created_at TIMESTAMPTZ,
    userId INT NOT NULL,
    productId INT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (productId) REFERENCES products(id)
);