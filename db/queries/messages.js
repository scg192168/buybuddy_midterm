const db = require('../connection');


/* Get all the messages from the message table.
 * @return {Promise<{}>} A promise to the messages.
*/
const getAllMessages = () => {
  return pool.query('SELECT * FROM message')
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

/* Get all the unread messages of a buyer from the message table.
 * @param {String} buyerId, the id of buyer.
*/
const getUnreadBuyerMessages = (buyerId) => {
  return pool.query('SELECT * FROM message WHERE receiverId = $1 AND is_read = false', [buyerId])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

/* Get all the unread messages of the seller from the messages table.
 * @param {String} sellerID,  The id of the seller.
*/
const getUnreadSellerMessages = (sellerId) => {
  return pool.query('SELECT * FROM message WHERE receiverId = $1 AND is_read = false', [sellerId])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

/* insert new messages to the message table.
 * @param {} senderID, objects of all the sender Ids.
* @param {} receiverId, objects of all receivers Ids.
* @param {} messageTEXT,object of all text messages.
*/
const insertNewMessage = (senderId, receiverId, messageText) => {
  return pool.query('INSERT INTO message (senderId, receiverId, messageText) VALUES ($1, $2, $3) RETURNING *', [senderId, receiverId, messageText])
    .then((result) => result.rows[0])
    .catch((error) => {
      throw error;
    });
};

/* Get all messages related to a single product.
 * @param {} productID, objects of all the product messages.

*/

const getProductMessages = (productId) => {
  return pool.query('SELECT * FROM message WHERE product_id = $1', [productId])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
/* Get all messages related to a single buyer.
 * @param {} buyerID, objects of messages of buyer.
*/

const getBuyerMessages = (buyerId) => {
  return pool.query('SELECT * FROM message WHERE receiverId = $1', [buyerId])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};

/* Get all messages related to a single seller
 * @param {} userID, objects all messages related to a single seller,.
*/
const getSellerMessages = (sellerId) => {
  return pool.query('SELECT * FROM message WHERE senderId = $1', [sellerId])
    .then((result) => result.rows)
    .catch((error) => {
      throw error;
    });
};
module.exports = {
  getAllMessages,
  getUnreadBuyerMessages,
  getUnreadSellerMessages,
  insertNewMessage,
  getProductMessages,
  getBuyerMessages,
  getSellerMessages

};
