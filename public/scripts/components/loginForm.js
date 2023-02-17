$(() => {
  const $loginForm = $(`
    <form action="/api/login" method="POST" class="login">
      <div class="form">
      <div class="d-flex align-items-center justify-content-center">
        <h1 class="form-title">Log in</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="error-message"></div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control email-form input-form" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" class="form-control password-form input-form" required>
      <div class="form-group">
      <div class="d-flex align-items-center justify-content-center">
      <button type="submit" class="btn btn-info" id="login">Login</button>
      </div>
      </div>
    </form>
    `);
  window.$loginForm = $loginForm;

  $loginForm.on('submit', function(event) {
    const data = $(this).serialize();
    event.preventDefault();
    $.post("/api/login", {info : $(this).serialize()})
        .done((response) => {
        if (!response) {
          // displays an error message if the user fails to login using wrong credentials
          $(".error-message").empty();
          $(".error-message").append('<div class="alert alert-danger"><h3>Incorrect information credentials</h3></div>');
        } else {
          // display new page here
          $('.email-form').val('');
          $('.password-form').val('');
          $("#page-header").empty();
          header.update(response);
          views_manager.show('resources');
        }
      });
  });
});
