$(() => {
  const $main = $("#main-content");

  window.views_manager = {};

  window.views_manager.show = function (item) {
    $searchPropertyForm.detach();

    switch (item) {
      case "searchResources":
        $searchResources.appendTo($main);
        break;
      // Add other components to append to the main content (index.html)
    }
  };
});
