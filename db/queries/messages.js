/**
 * Get a single product from the database given their id.
 * @param {string} id The id of the product.
 * @return {Promise<{}>} A promise to the user.
 */
const getMessagesWithUserId = function(id) {
  return db
    .query(
      `
      SELECT messages.*, users.email AS sender_email, users.username AS sender_username
      FROM messages
      JOIN users ON messages.sender_id = users.id
      WHERE receiver_id = $1
      ORDER BY send_date DESC;
    ` , [id])
    .then((result) => {
      let resolvedMessages = null;
      const messages = result.rows[0];
      if (messages && messages.receiver_id === id) {
        resolvedMessages = messages;
      }
      console.log(resolvedMessages);
      return Promise.resolve(resolvedProduct);
    })
    .catch((err) => {
      console.error('Error querying database:', err.message);
      throw err; // Rethrow the error to be handled elsewhere
    });
};