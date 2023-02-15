$(() => {

  const $newUserResources = $(`<section class="card-columns">
  <p>Loading...</p>
  </section>`);
  window.$newUserResources = $newUserResources;
  window.newUserResources = {};

  const $newUserLikes = $(`<section class="card-columns">
  <p>Loading...</p>
  </section>`);
  window.$newUserLikes = $newUserLikes;
  window.newUserLikes = {};

  function addResource(resource, appendage) {
    appendage.append(resource);
  }

  function clearResources(appendage) {
    appendage.empty();
  }

  window.newUserResources.clearResources = clearResources;

  function addUserResources() {
    clearUserResources($newUserResources);
    $newUserResources.append(`<h2>Your created resources<h2>`)
    $.get("/api/resources/user", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card, $newUserResources)
        })
      }
    })
    .done(addUserLikes())
   }

  function addUserLikes() {
    $newUserResources.append(`<h2>Your liked resources<h2>`)
    $.get("/api/resources/user/likes", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card, $newUserLikes)
        })
      }
      return
    })
  }

  window.newUserResources.addUserResources = addUserResources;
  window.newUserResources.addUserLikes = addUserLikes;


  $(document).on("click", "#user-resources", function () {

    newUserResources.addUserResources()
    newUserResources.addUserLikes()
    //newUserResources.addUserLikes();
    views_manager.show("userResources")

  });
});
