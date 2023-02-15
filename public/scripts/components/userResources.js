$(() => {

  function addResource(resource) {
    $newResources.append(resource);
  }

  function clearResources(resource) {
    $newResources.empty(resource);
  }

  function addUserResources() {
    clearResources();
    $.get("/api/resources/user", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          console.log(card)
          addResource(card)
        })
      }
    })
   }

  function addUserLikes() {
    $.get("/api/resources/user/likes", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          console.log(card)
          addResource(card)
        })
      }
    })
  }


  window.newResources.addUserResources = addUserResources;
  window.newResources.addUserLikes = addUserLikes;

  $(document).on("click", "#user-resources", function () {
      newResources.addUserResources();
      newResources.addUserLikes();
      views_manager.show("resources");
  });
});
