const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const messagesQueries = require('../db/queries/messages');

// Define a GET route to render the messages page
router.get('/', (req, res) => {  
  // Check if the user is logged in
  const idFromCookie = req.session.userId;

  if (!idFromCookie) {
    return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
  }

  let messages;

  messagesQueries.getMessagesWithUserId(idFromCookie)
    .then((messagesFromDb) => {      
      // console.log(messages);

      messages = messagesFromDb;

      return userQueries.getUserWithId(idFromCookie)
    })
    .then((user) => {
      if (!user) {
        return res.status(404).send("No user with that ID");
      }

      const userData = {
        username: user.username,
        email: user.email,
        role: user.role,
        id: user.id,
      };
      // Now you have both userData and messages data
      const data = { user: userData, messages };
      console.log(data);
      res.render('messages', { user: userData, messages })
    })
    .catch ((error) => {
      console.error("Database error:", error);
      res.status(500).send({ error: "Internal server error" });
    })
});

module.exports = router;