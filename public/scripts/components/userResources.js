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

  // function addUserLikes() {
  //   $.get("/api/resources/user", (resources) => {
  //     for (const resourceId in resources) {
  //       const resource = resources[resourceId];
  //       $.get("/api/resources/like", {resources : resource.id})
  //       .then((data) => {
  //         const card = window.resource.createResourceElement(resource, data);
  //         console.log(card)
  //         addResource(card)
  //       })
  //     }
  //   })
  // }
  window.newResources.addUserResources = addUserResources;

  $(document).on("click", "#user-resources", function () {
      newResources.addUserResources();
      views_manager.show("resources");
  });
});
