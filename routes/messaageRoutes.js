/*
 * All routes for buyer and seller messages for a product are defined here
 */

const express = require('express');
const router  = express.Router();
const messagesQueries = require('../db/queries/messages');


// ------------------------------------------------------------------------------------------------ GET Routes

// Count all the unread messages for a buyer

// Count all the unread messages for a seller

// Count unread messages for a chat

// Get all messages for a single product chat

// Get all messages for a single buyer

// Get all messages for a single seller

// ------------------------------------------------------------------------------------------------ POST Routes

// Mark buyer messages as seen

// Mark seller messages as seen

module.exports = router;
