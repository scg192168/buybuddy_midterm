-- Users table seeds here (Example)
-- Insert sample data
INSERT INTO users (username, email, password, role, wishlist, messages, profile)
VALUES
  ('user123', 'user123@example.com', 'hashed_password', 'buyer', '{}', '{}', '{"name": "John Doe"}'),
  ('seller456', 'seller456@example.com', 'hashed_password', 'seller', '{}', '{}', '{"name": "Alice Smith"}'),
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
  (1, 'wireless earphone', 'TAGRY Bluetooth Headphones 60H Playback True Wireless Earbuds LED Power Display Earphones with Wireless Charging Case IPX5 Waterproof in-Ear Earbuds with Mic for TV Smart Phone Laptop Sports', 99.99, 'Electronics', '{https://www.pexels.com/photo/wireless-earphones-8534088/", "image2.jpg"}', 'Active'),
  (2, 'sport wear', 'blank-black-male-hoodie-sweatshirt-long-sleeve', 49.95, 'Clothing', '{"https://www.vecteezy.com/photo/22862363-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-illustration-ai-generative"}', 'Active'),
  (3, 'Men Shoes', 'Alipasinm Men Dress Shoes Oxford Formal Modern Leather Shoes for Men', 299.00, 'shoes', '{"https://m.media-amazon.com/images/I/815u1-v4i8L._AC_UY695_.jpg"}', 'Active'),
  (4, 'Bluetooth Headset Wireless Headset', 'Trucker Bluetooth Headset Wireless Headset with Mic Over The Head Headset with Noise Cancelling Sound On Ear Car Earphones Office Earpiece for Cell Phone Bluetooth V2.1 Compatible for iOS & Android', 39.99, 'Electronics', '{"https://www.vecteezy.com/photo/9809276-bluetooth-headphones-on-black-leather-background"}', 'Active'),
  (5, 'MacBook pro 14-inch', 'Apple 2021 MacBook Pro (14-inch, Apple M1 Pro chip with 8‑core CPU and 14‑core GPU, 16GB RAM, 512GB SSD) - Space Grey - English', 2549.99, 'Electronics', '{"https://www.vecteezy.com/photo/13097383-mackbook-pro-screen-with-website-presentation-mockup", "image8.jpg"}', 'Inactive'),
  (6, 'Madame Ivory Floral Round Neck Dress', 'The Madame Ivory Floral Round Neck Dress is perfect for any summer event. Crafted from lightweight, breathable fabrics, it features an all-over floral print and a flattering round neckline', 79.95, 'Clothing', '{"https://www.glamly.com/products/m3w13026-ivory?variant=44208925573349"}', 'Active'),
  (7, 'Men Suit', 'WEEN CHARM Mens Two Button Notch Lapel Slim Fit 3 Piece Suit Blazer Jacket Tux Vest', 129.00, 'Clothing', '{"https://m.media-amazon.com/images/I/61ZiKB7E+YL._AC_UX679_.jpg"}', 'Active'),
  (8, 'iPhone 14', 'Apple iPhone 14 Silicone Case with MagSafe', 9.99, 'Electronics', '{"https://upload.wikimedia.org/wikipedia/commons/6/61/IPhone_14_vector.svg"}', 'Active'),
  (9, 'smart watch', 'Smart Watch, Bluetooth Call Smartwatch for Men and Women,Monitoring Heart Rate/Sleep/Blood Oxygen/Pedometer,1.85-inch Fitness Tracker with Multiple Sports Modes,Smartwatches Fit for iOS and Android', 49.99, 'Electronics', '{"https://upload.wikimedia.org/wikipedia/commons/e/ef/Smartwatches.jpeg", "image14.jpg"}', 'Active'),
  (10, 'Winter Boots For women', 'The Drop Women Sia Pointed Toe Western Ankle Boot Ankle Boot', 69.95, 'Shoes', '{"https://m.media-amazon.com/images/I/818by37QKwL._AC_UY695_.jpg"}', 'Active'),
  (11, 'LG monitor', 'LG Electronics 24BK430H-B 24-Inch Screen LCD Monitor,Black', 245.99, 'Electronics', '{"https://upload.wikimedia.org/wikipedia/commons/6/63/Monitor_LG_LED_IPS_23%27_1080p.jpg"}', 'active'),
  (12, 'Kids Hoodie Sweatshirt', 'Loodgao Kids Boys Tracksuit Sweatsuit Zip Up Hoodie Sweatshirt Tops with Jogger Sweatpants Fall Winter Clothes Set', 69.40,'https://m.media-amazon.com/images/I/61mI1Q3zRDL._AC_UX679_.jpg"}', 'inactive');

INSERT INTO messages (senderId, receiverId, messageText, sendDate)
VALUES
  (1, 2, 'Hi, I''m interested in your Product 1. Can you provide more details?', '2023-09-11T10:00:00Z'),
  (2, 1, 'Sure, here are the details...', '2023-09-11T10:30:00Z'),
  (3, 1, 'Is the item still available?', '2023-09-16 14:20:00'),
  (1, 3, 'Yes, it is still available. Would you like to meet in person?', '2023-09-16 14:30:00'),
  (2, 3, 'I have a few questions about the product specifications.', '2023-09-17 09:45:00'),
  (3, 2, 'Feel free to ask. I amm here to help!', '2023-09-17 10:00:00'),
  (4, 1, 'Can you provide more details about the product condition?', '2023-09-18 18:15:00'),
  (1, 4, 'Of course! It is in excellent condition, barely used.', '2023-09-18 18:30:00'),
  (5, 2, 'I would like to negotiate the price. Would you consider $X?', '2023-09-19 12:00:00'),
  (2, 5, 'I appreciate your offer. Lets discuss it further.', '2023-09-19 12:15:00'),
  (6, 2, 'Can we meet tomorrow to finalize the deal?', '2023-09-23 09:00:00'),
  (2, 6, 'Tomorrow works for me. Lets meet at the mall.', '2023-09-23 09:15:00'),

INSERT INTO wishlists (created_at, userId, productId) VALUES
('2023-09-01 10:00:00', 1, 16),
 ('2023-09-02 11:15:00', 2, 24),
 ('2023-09-03 14:30:00', 3, 23),
 ('2023-09-04 09:45:00', 4, 21),
 ('2023-09-05 16:20:00', 5, 9),
 ('2023-09-06 12:30:00', 1, 3),
 ('2023-09-07 17:10:00', 2, 7),
 ('2023-09-08 14:45:00', 3, 11),
 ('2023-09-09 10:55:00', 4, 6),
 ('2023-09-10 08:40:00', 5, 10),
 ('2023-09-11 13:25:00', 1, 4),
 ('2023-09-12 15:50:00', 2, 1);

