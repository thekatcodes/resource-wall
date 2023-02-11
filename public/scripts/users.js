// Client facing scripts here
// Client facing scripts here
const loadLoginForm = () => {
  const formObject = `
    <div>
      <h3>Log in</h3>
      <h3>Please fill in fields</h3>
      <form action="hello" method="get" class="login>
          <label for="email">Email</label>
          <input type="email" name="email">
          <label for="password">Password</label>
          <input type="password" name="password">
        <button type="button" class="btn btn-info" id="login" disabled="disabled">Submit</button>
      </form>
    </div>
  `;
  $("#content").append(formObject);
};

const loadRegisterForm = () => {
  const formObject = `
    <div>
      <div class="error-message"></div>
      <h3>Register</h3>
      <h3>Please fill in fields</h3>
      <form action="hello" method="get" class="register">
          <label for="username">Username</label>
          <input type="text" name="username">
          <label for="email">Email</label>
          <input type="email" name="email">
          <label for="password">Password</label>
          <input type="password" name="password" class="password">
          <label for="confirm-password">Confirm Password</label>
          <input type="password" name="confirm-password" class="password-checker">
        <button type="button" class="btn btn-info" id="register" disabled="disabled">Submit</button>
      </form>
    </div>
  `;
  $("#content").append(formObject);
};
$(() => {
  loadLoginForm();
  loadRegisterForm();
});

$(() => {
  $('.register').on('keyup', () => {
    const firstPassword = $('.password')[0].value;
    const secondPassword = $('.password-checker')[0].value;
    if (firstPassword === secondPassword) {
      $('#register').removeAttr('disabled');
    } else {
      $(".error-message").empty();
      $(".error-message").prepend("<h1>wrong passwords</h1>");
    }
  });
});