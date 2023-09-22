-- Users table seeds here (Example)
-- Insert sample data

-- INSERT INTO users (username, email, password, role)
-- VALUES
--     ('user123', 'user123@example.com', 'hashed_password', 'buyer'),
--     ('seller456', 'seller456@example.com', 'hashed_password', 'seller');

-- INSERT INTO products (sellerId, title, description, price, category, images, status)
-- VALUES
--     (2, 'BOSE 700 headphone', 'Description of Product 1', 150.99, 'Electronics', './images/headphone.png', 'active'),
--     (2, 'Von Duchon shades', 'Description of Product 2', 105.87, 'Clothing', './images/shades.png', 'active'),
--     (2, 'Ps5 Console & controler', 'Description of Product 3', 700.64, 'Games', './images/Ps5_game.png', 'active'),
--     (2, 'Air force 1', 'Description of Product 4', 200.99, 'Shoes', './images/shoes.png', 'active');

-- INSERT INTO messages (senderId, receiverId, messageText, sendDate)
-- VALUES
--     (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
--     (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z');


INSERT INTO products (sellerId, title, description, price, category, images, status, product_details)
VALUES
    (3, 'Summer Infant Infant 3Dmini Convenience Stroller', 'Blue/Black – Lightweight Infant Stroller with Compact Fold, Multi-Position Recline, Canopy with Pop Out Sun Visor and More – Umbrella Stroller for Travel and More', 77.63, 'Clothings', 'https://m.media-amazon.com/images/I/81eHajgaTFL._AC_SY355_.jpg', 'active', 'Lightweight (11 lbs.) design & compact fold. The dimensions (collapsed) are 44 x 10.5 x 10 inches (111.76 x 25.4 x 26.67 cm)
Hassle-free canopy with pop out sun visor. Recommended for use with children ages 6 months + (or when baby can sit up on their own) up to 45 pounds. No weather protecting shield.Do not use bleach.');
    -- (2, 'Von Duchon shades', 'Description of Product 2', 105.87, 'Clothing', './images/shades.png', 'active'),
    -- (2, 'Ps5 Console & controler', 'Description of Product 3', 700.64, 'Games', './images/Ps5_game.png', 'active'),
    -- (2, 'Air force 1', 'Description of Product 4', 200.99, 'Shoes', './images/shoes.png', 'active');
