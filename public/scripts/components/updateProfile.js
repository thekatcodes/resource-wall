$(() => {
  const $updateProfile = $(`
    <form action="/api/login/account" method="post" class="register">
      <div class="form">
      <div class="d-flex align-items-center justify-content-center form-title">
        <h1>Update Profile</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center form-title">
        <h2>Leave fields blank if you do not wish to update it</h2>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="error-message"></div>     
      </div>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" name="username" class="form-control username-form">
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" class="form-control email-form">
      </div>
      <div class="form-group">
        <label for="newPassword">New-Password</label>
        <input type="password" name="newPassword" class="form-control password">
      </div>
      <div class="form-group">
        <label for="password">Old Password</label>
        <input type="password" name="password" class="form-control password-checker" required>
      </div>
      <div class="d-flex align-items-center justify-content-center form-title">
        <button type="submit" class="btn btn-info">Update</button>
      </div>
    </form>
    `);

  window.$updateProfile = $updateProfile;

  $updateProfile.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/login/update", {info : $(this).serialize()})
      .done((response) => {
        if (response === "") {
          $(".error-message").empty();
          $(".error-message").append('<div class="alert alert-danger"><h3>Details need to be filled out</h3></div>');
        } else {
        // this could be replaced with whatever function shows resources
          $('.username-form').val('');
          $('.password-checker').val('');
          $('.email-form').val('');
          $('.password').val('');
          views_manager.show('resources');
        }
      });
  });
});