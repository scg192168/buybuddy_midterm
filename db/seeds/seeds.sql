-- Users table seeds here (Example)
-- Insert sample data
INSERT INTO users (username, email, password, role)
VALUES
    ('user123', 'user123@example.com', 'hashed_password', 'buyer'),
    ('seller456', 'seller456@example.com', 'hashed_password', 'seller');

INSERT INTO products (sellerId, title, description, price, category, images, status)
VALUES
    (2, 'BOSE 700 headphone', 'Description of Product 1', 150.99, 'Electronics', './images/headphone.png', 'active'),
    (2, 'Von Duchon shades', 'Description of Product 2', 105.87, 'Clothing', './images/shades.png', 'active'),
    (2, 'Ps5 Console & controler', 'Description of Product 3', 700.64, 'Games', './images/Ps5_game.png', 'active'),
    (2, 'Air force 1', 'Description of Product 4', 200.99, 'Shoes', './images/shoes.png', 'active');

INSERT INTO messages (senderId, receiverId, messageText, sendDate)
VALUES
    (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
    (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z');