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
  ('user123', 'user123@example.com', 'hashed_password', 'buyer', '{}', '{}', '{"name": "John Doe"}'),
  ('seller456', 'seller456@example.com', 'hashed_password', 'seller', '{}', '{}', '{"name": "Alice Smith"}');
  ('john_doe', 'john.doe@example.com', 'hashed_password_1', 'seller', '{"item1": "Product A", "item2": "Product B"}', '{"from": "seller", "message": "Interested in your item."}', '{"name": "John Doe", "bio": "A passionate buyer."}'),
  ('jane_smith', 'jane.smith@example.com', 'hashed_password_2', 'buyer', '{"item1": "Product C", "item2": "Product D"}', '{"from": "buyer", "message": "Is this item available?"}', '{"name": "Jane Smith", "bio": "Loves shopping."}'),
  ('admin_user', 'admin@example.com', 'hashed_password_admin', 'buyer', '{}', '{}', '{"name": "bob martin", "bio": "enjoy shopping"}'),
  ('alice123', 'alice@example.com', 'hashed_password_3', 'seller', '{"item1": "Product E", "item2": "Product F"}', '{"from": "seller", "message": "Great choice!"}', '{"name": "Alice Johnson", "bio": "Enjoys shopping online."}'),
  ('bob55', 'bob@example.com', 'hashed_password_4', 'buyer', '{"item1": "Product G", "item2": "Product H"}', '{}', '{"name": "Bob Williams", "bio": "Looking for deals."}'),
  ('seller1', 'seller1@example.com', 'hashed_password_seller1', 'seller', '{}', '{"from": "buyer", "message": "Interested in your product."}', '{"name": "Seller One", "bio": "Selling unique items."}'),
  ('seller2', 'seller2@example.com', 'hashed_password_seller2', 'seller', '{}', '{"from": "buyer", "message": "Tell me more about your item."}', '{"name": "Seller Two", "bio": "Experienced seller."}'),
  ('buyer1', 'buyer1@example.com', 'hashed_password_buyer1', 'buyer', '{"item1": "Product I", "item2": "Product J"}', '{}', '{"name": "Buyer One", "bio": "Frequent shopper."}'),
  ('buyer2', 'buyer2@example.com', 'hashed_password_buyer2', 'buyer', '{}', '{"from": "seller", "message": "Thanks for your purchase!"}', '{"name": "Buyer Two", "bio": "Loves bargains."}'),
  ('seller3', 'seller3@example.com', 'hashed_password_seller3', 'seller', '{}', '{}', '{"name": "Seller Three", "bio": "Selling handmade crafts."}');

INSERT INTO products (sellerId, title, description, price, category, images, status)
VALUES
  (1, 'Product A', 'Description for Product A', 99.99, 'Electronics', '{"image1.jpg", "image2.jpg"}', 'Active'),
  (2, 'Product B', 'Description for Product B', 49.95, 'Clothing', '{"image3.jpg"}', 'Active'),
  (3, 'Product C', 'Description for Product C', 299.00, 'Home & Garden', '{"image4.jpg", "image5.jpg"}', 'Active'),
  (4, 'Product D', 'Description for Product D', 19.99, 'Electronics', '{"image6.jpg"}', 'Active'),
  (5, 'Product E', 'Description for Product E', 199.99, 'Electronics', '{"image7.jpg", "image8.jpg"}', 'Inactive'),
  (6, 'Product F', 'Description for Product F', 79.95, 'Clothing', '{"image9.jpg"}', 'Active'),
  (7, 'Product G', 'Description for Product G', 129.00, 'Home & Garden', '{"image10.jpg", "image11.jpg"}', 'Active'),
  (8, 'Product H', 'Description for Product H', 9.99, 'Electronics', '{"image12.jpg"}', 'Active'),
  (9, 'Product I', 'Description for Product I', 149.99, 'Electronics', '{"image13.jpg", "image14.jpg"}', 'Active'),
  (10, 'Product J', 'Description for Product J', 69.95, 'Clothing', '{"image15.jpg"}', 'Active');
  (11, 'Product K', 'Description of Product K', 25.99, 'Electronics', '{"product1.jpg"}', 'active'),
  (12, 'Product L', 'Description of Product L', 19.99, 'Clothing', '{"product2.jpg"}', 'inactive');


INSERT INTO messages (senderId, receiverId, messageText, sendDate)
VALUES
  (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
  (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z');
  (3, 1, 'Is the item still available?', '2023-09-16 14:20:00'),
  (1, 3, 'Yes, it's still available. Would you like to meet in person?', '2023-09-16 14:30:00'),
  (2, 3, 'I have a few questions about the product specifications.', '2023-09-17 09:45:00'),
  (3, 2, 'Feel free to ask. I'm here to help!', '2023-09-17 10:00:00'),
  (4, 1, 'Can you provide more details about the product condition?', '2023-09-18 18:15:00'),
  (1, 4, 'Of course! It's in excellent condition, barely used.', '2023-09-18 18:30:00'),
  (5, 2, 'I'd like to negotiate the price. Would you consider $X?', '2023-09-19 12:00:00'),
  (2, 5, 'I appreciate your offer. Let's discuss it further.', '2023-09-19 12:15:00');
  (6, 2, 'Can we meet tomorrow to finalize the deal?', '2023-09-23 09:00:00'),
  (2, 6, 'Tomorrow works for me. Let's meet at the mall.', '2023-09-23 09:15:00'),
