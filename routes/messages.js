const express = require("express");
const router = express.Router();
const db = require("../db/connection");

// Define a GET route to render the messages page
router.get("/", async (req, res) => {
  try {
    // Check if the user is logged in
    const idFromCookie = req.session.userId;
    console.log(idFromCookie);

    if (!idFromCookie) {
      return res.status(403).send("😒😒😒😒You are not logged in!!! Log in to use the BuyBuddy....");
    }

    const loggedInUserId = idFromCookie; // Get the ID of the logged-in user

    // Query the database to fetch messages received by the logged-in user
    const query = `
      SELECT messages.*, users.email AS sender_email, users.username AS sender_username
      FROM messages
      JOIN users ON messages.sender_id = users.id
      WHERE receiver_id = $1
      ORDER BY send_date DESC;
    `;

    const result = await db.query(query, [loggedInUserId]);

    const messages = result.rows;
    console.log(messages);

    // Pass the user variable to the template
    res.render("messages", { messages, user: loggedInUserId });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

module.exports = router;