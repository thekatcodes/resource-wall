$(() => {

  const $newUserResourcesTitle = $(`<h2 class="d-flex justify-content-center pt-4">Your Created Resources<h2>`)
  window.$newUserResourcesTitle =$newUserResourcesTitle;

  const $newUserResources = $(`<section class="card-columns py-3 mx-3">
  <p>Loading...</p>
  </section>`);
  window.$newUserResources = $newUserResources;
  window.newUserResources = {};

  const $newUserLikesTitle = $(`<h2 class="d-flex justify-content-center pt-4">Your Favourited Resources<h2>`)
  window.$newUserLikesTitle =$newUserLikesTitle;

  const $newUserLikes = $(`<section class="card-columns py-3 mx-3">
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
    clearResources($newUserResources);
    $.get("/api/resources/user/posts", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
      /* gets data if the user likes the resource or not
       * then appends the liked symbol or unliked symbol into the post
       */
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card, $newUserResources)
        })
      }
    })
   }

  function addUserLikes() {
    clearResources($newUserLikes);
    $.get("/api/resources/user/likes", (resources) => {
      for (const resourceId in resources) {
        const resource = resources[resourceId];
      /* gets data if the user likes the resource or not
       * then appends the liked symbol or unliked symbol into the post
       */console.log(resource)
        $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card, $newUserLikes)
        })
      }
    })
  }

  window.newUserResources.addUserResources = addUserResources;
  window.newUserLikes.addUserLikes = addUserLikes;

});
