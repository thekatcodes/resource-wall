$(() => {
  const $registerForm = $(`
    <form action="/api/login/account" method="post" class="register">
      <div class="form">
      <div class="d-flex align-items-center justify-content-center form-title">
        <h1>Register</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="error-message"></div>     
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name="username" class="input-form form-control username-form">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" class="input-form form-control email-form">
      </div>
      <div class="form-group">
      <label for="password">Password</label>
      <input type="password" name="password" class="input-form form-control password">
      <div>
      <div class="form-group">
      <label for="confirm-password">Confirm Password</label>
      <input type="password" name="confirm-password" class="input-form form-control password-checker">
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <button type="submit" class="btn btn-info" id="register" disabled="disabled">Register</button>
      </div>
      </div>
      </form>
  `);
  
  window.$registerForm = $registerForm;
  
  $registerForm.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/login/account", {info : $(this).serialize()})
      .done((response) => {
        if (response === "") {
          $(".error-message").empty();
          $(".error-message").append('<div class="alert alert-danger"><h3>Duplicate Email</h3></div>');
        } else {
        // this could be replaced with whatever function shows resources
          $("#page-header").empty();
          header.update(response);
          views_manager.show('resources');
        }
      });
  });
  
  $registerForm.on('keyup', () => {
    const firstPassword = $('.password')[0].value;
    const secondPassword = $('.password-checker')[0].value;
    if (firstPassword === secondPassword) {
      $(".error-message").empty();
    } else {
      $(".error-message").empty();
      $(".error-message").prepend('<div class="alert alert-danger"><h3>Password does not match</h3></div>');
    }
    if (firstPassword === secondPassword && $('.email-form')[0].value && $('.username-form')[0].value) {
      $('#register').removeAttr('disabled');
    }
  });
});