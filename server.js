// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookie_session_helper = require('./cookie_session_helper'); // Import the generateRandomString function


const PORT = process.env.PORT || 8080;
const app = express();

app.set('view engine', 'ejs');

// Set up cookie-session API
const sessionession = require('cookie-session');
//Use a cookie session to fetch and encrypt session
const key1 = cookie_session_helper.generateRandomString(32);
const key2 = cookie_session_helper.generateRandomString(32);

app.use(
  sessionession({
    name: "session",
    keys: [key1, key2], //Secret keys to protect session

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000, // Session duration in milliseconds (e.g., 24 hours)
  })
);

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    // isSass: false, // false => scss, true => sass
  })
);

// Routes for each resources
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const home_pageRoutes = require("./routes/home_pageRoutes");
const userWishlist = require("./routes/userWishlist");
const messagesRoutes = require("./routes/messages");

// /products/endpoints
app.use("/products", productRoutes);

// /user/endpoints
app.use("/users", userRoutes);

// /wishlist/endpoints
app.use("/wishlist", userWishlist);

// /messages/endpoints
app.use("/messages", messagesRoutes);

// /homepage/endpoints
app.use("/", home_pageRoutes);

// Listening
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

