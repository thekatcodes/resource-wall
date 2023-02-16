$(() => {
  const $loginForm = $(`
    <form action="/api/login" method="POST" class="login">
      <div class="error-message"></div>
      <h3>Log in</h3>
      <h3>Please fill in fields</h3>
      <label for="email">Email</label>
      <input type="email" name="email" class="email-form">
      <label for="password">Password</label>
      <input type="password" name="password" class="password-form">
      <button type="submit" class="btn btn-info" id="login" disabled="disabled">Submit</button>
    </form>
    `);
  window.$loginForm = $loginForm;

  $loginForm.on('submit', function(event) {
    const data = $(this).serialize();
    event.preventDefault();
    $.post("/api/login", {info : $(this).serialize()})
        .done((response) => {
            $("#page-header").empty();
            header.update(response);
            views_manager.show('resources');
        if (!response) {
          $(".error-message").empty();
          $(".error-message").append("<h1>Wrong Password</h1>");
        }
      });
  });

  $loginForm.on('keyup', () => {
    if ($('.email-form')[0].value && $('.password-form')[0].value) {
      $('#login').removeAttr('disabled');
    }
  });
});
