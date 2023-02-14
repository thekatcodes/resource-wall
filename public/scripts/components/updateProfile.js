$(() => {
  const $updateProfile = $(`
    <form action="/api/login/account" method="post" class="register">
      <div class="error-message"></div>
      <h3>Update Profile</h3>
      <h3>Leave fields blank if you do not wish to update it</h3>
      <label for="username">Username</label>
      <input type="text" name="username" class="username-form">
      <label for="email">Email</label>
      <input type="email" name="email" class="email-form">
      <label for="newPassword">New-Password</label>
      <input type="password" name="newPassword" class="password">
      <label for="password">Old Password</label>
      <input type="password" name="password" class="password-checker">
      <button type="submit" class="btn btn-info">Update</button>
    </form>
    `);

  window.$updateProfile = $updateProfile;

  $updateProfile.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/login/update", {info : $(this).serialize()})
      .done((response) => {
        if (response === "") {
          $(".error-message").empty();
          $(".error-message").append("<h1>Invalid credentials and cannot leave all fields empty</h1>");
        } else {
        // this could be replaced with whatever function shows resources
          console.log("load something");
        }
      });
  });
});