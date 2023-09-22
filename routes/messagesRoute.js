// /*
//  * All routes for buyer and seller messages for a product are defined here
//  */

// const express = require('express');
// const router  = express.Router();
// const messagesQueries = require('../db/queries/messages');


// // ------------------------------------------------------------------------------------------------ GET Routes

// // Count all the unread messages for a buyer

// // Count all the unread messages for a seller

// // Count unread messages for a chat

// // Get all messages for a single product chat

// // Get all messages for a single buyer

// // Get all messages for a single seller

// // ------------------------------------------------------------------------------------------------ POST Routes

// // Mark buyer messages as seen

// // Mark seller messages as seen

// module.exports = router;

// messageRoutes.js

const express = require('express');
const router = express.Router();
const messagesQueries = require('../db/queries/messages');

// Load any necessary middleware and models
// For example, you may need to load the User and Message models

// Route to display messages between a buyer and seller
router.get('/messages/:userId', async (req, res) => {
  try {
    // Fetch messages for the specified user (buyer or seller)
    const userId = req.params.userId;
    // Query your database to get messages for this user
    // You may want to join with the User model to display sender names

    // Render the messages view with the fetched messages
    res.render('messages', { messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).send('Internal Server Error');
  }
});

// Route to send a new message
router.post('/send-message', async (req, res) => {
  try {
    // Extract message data from the request body
    const { senderId, receiverId, messageText } = req.body;

    // Create a new message in the database
    // You may want to save senderId, receiverId, messageText, and timestamp

    // Redirect back to the messages page after sending
    res.redirect(`/messages/${receiverId}`);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
