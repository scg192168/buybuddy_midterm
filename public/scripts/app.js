// // Client facing scripts here
$(document).ready(() => {
  const $messageInfo = $("#message_info").hide();
  const $button = $('#button');
  const $textArea = $('#send_text_area');
  let timeoutId;

  const hideMessageInfo = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => $messageInfo.hide(), 10000); // 10 seconds
  };

  $button.on('click', (event) => {
    event.preventDefault();
    $messageInfo.show();
    hideMessageInfo();
  });

  $textArea.on('input', () => {
    if (!$textArea.val().trim()) {
      hideMessageInfo();
    } else {
      clearTimeout(timeoutId);
    }
  });
});



