$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $loginForm.detach();
    $registerForm.detach();
    $newResources.detach();
    $updateProfile.detach();
    $submissionForm.detach();

    // Add other components to append to the main content (index.html)
    switch (item) {
      case "searchResources":
        $searchResources.appendTo($main);
        break;
      case "loginForm":
        $loginForm.appendTo($main);
        break;
      case "registerForm":
        $registerForm.appendTo($main);
        break;
      case "submissionForm":
        $submissionForm.appendTo($main);
        break;
      case "resources":
        $newResources.appendTo($main);
        break;
      case "updateProfile":
        $updateProfile.appendTo($main);
        break;
    }
  };
});
