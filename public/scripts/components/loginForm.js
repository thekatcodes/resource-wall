$(() => {
  const $loginForm = $(`
      <div>
        <div class="error-message"></div>
        <h3>Log in</h3>
        <h3>Please fill in fields</h3>
        <form action="/api/login" method="POST" class="login">
            <label for="email">Email</label>
            <input type="email" name="email" class="email-form">
            <label for="password">Password</label>
            <input type="password" name="password" class="password-form">
          <button type="submit" class="btn btn-info" id="login" disabled="disabled">Submit</button>
        </form>
      </div>
    `);
  window.$loginForm = $loginForm;

  $loginForm.on('submit', () => {
    event.preventDefault();
    $.post("/api/login", {email : $('.email-form')[0].value, password : $('.password-form')[0].value})
      .done((response) => {
        if (!response) {
          $(".error-message").empty();
          $(".error-message").append("<h1>Wrong Password</h1>");
        }
      });
  });
  $('.login').on('keyup', () => {
    if ($('.email-form')[0].value && $('.password-form')[0].value) {
      $('#login').removeAttr('disabled');
    }
  });
});