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
    isSass: false, // false => scss, true => sass
  })
);

// // Separated Routes for each Resource
// // Note: Feel free to replace the example routes below with your own
// const userApiRoutes = require('./routes/userRoutes');
// const widgetApiRoutes = require('./routes/widgets-api');
// const usersRoutes = require('./routes/users');

// // Mount all resource routes
// // Note: Feel free to replace the example routes below with your own
// // Note: Endpoints that return data (eg. JSON) usually start with `/api`
// app.use('/api/users', userApiRoutes);
// app.use('/api/widgets', widgetApiRoutes);
// app.use('/users', usersRoutes);
// // Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

// const buyerRoutes = require("./routes/buyerRoutes");
// const sellerRoutes = require("./routes/sellerRoutes");
// const messagesRoutes = require("./routes/messagesRoutes");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");

// Route to render the homepage
app.get('/', (req, res) => {
  res.render('index');
});

// /products/endpoints
app.use("/products", productRoutes);

// /user/endpoints
app.use("/users", userRoutes);

// /api/endpoints
// app.use("/api", apiRoutes);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
