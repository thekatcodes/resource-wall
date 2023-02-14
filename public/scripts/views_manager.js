$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function(item) {
    // $searchPropertyForm.detach();
    $loginForm.detach();
    $registerForm.detach();
    $newResources.detach();
    $updateProfile.detach();
    $

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
      // Add other components to append to the main content (index.html)

      break;
    }
  };
});
