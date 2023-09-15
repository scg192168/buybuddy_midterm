-- Users table seeds here (Example)
-- Insert sample data
INSERT INTO users (username, email, password, role)
VALUES
    ('user123', 'user123@example.com', 'hashed_password', 'buyer'),
    ('seller456', 'seller456@example.com', 'hashed_password', 'seller');

INSERT INTO products (sellerId, title, description, price, category, images, status)
VALUES
    (2, 'Product 1', 'Description of Product 1', 25.99, 'Electronics', '["product1.jpg"]', 'active'),
    (2, 'Product 2', 'Description of Product 2', 19.99, 'Clothing', '["product2.jpg"]', 'sold');

INSERT INTO messages (senderId, receiverId, messageText, sendDate)
VALUES
    (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
    (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z');