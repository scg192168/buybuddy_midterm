// // Client facing scripts here
$(document).ready(() => {
  // Select the button with the ID "buy_tin"
  const buyButton = $('#button');
 
  // Attach a click event listener to the "buyButton"
  buyButton.on('click', () => {
    // Send an AJAX GET request to "/users/login/buyer"
    $.ajax({
      method: 'GET',
      url: '/users/login/buyer',
    })
  });
});
