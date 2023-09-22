// // // Client facing scripts here
// $(document).ready(() => {
//   const addToWishlistButton = $('.product_column');

//   // const wishlistData = {
//   //   userId: req.session.userId,
//   //   productId: req.body.id
//   // };

//   addToWishlistButton.on('submit', (event) => {
//     event.preventDefault();
//     const form = $(event.currentTarget);
//     const productId = form.find('input[name="productId"]').val();

//     // Use backticks for string interpolation
//     $.ajax({
//       type: 'POST',
//       url: `/wishlist/${wishlistData.productId}`, // Use backticks and specify the variable
//       data: {
//         userId: 
//         productId: productId
//       }
//     })
//       .done((response) => {
//         console.log('success:', response);
//       })
//       .fail((error) => {
//         console.error('Error:', error);
//       });
//   });
// });
