$(() => {

  const $newUserResources = $(`<section class="card-columns m-5">
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
    clearResources($newUserResources);
    $newUserResources.append(`<h2>Your created resources<h2>`)
    $.get("/api/resources/user/posts", (resources) => {
      console.log('yo', console.log(resources))
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
    $newUserLikes.append(`<h2>Your liked resources<h2>`)
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
