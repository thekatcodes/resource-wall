$(() => {
  const $newResources = $(`<section class="card-columns">
    <p>Loading...</p>
    </section>`);
  window.$newResources = $newResources;
  window.newResources = {}

  function addResource(resource) {
    $newResources.append(resource)
  }

  function clearResources(resource) {
    $newResources.empty(resource)
  }
  window.newResources.clearResources = clearResources;
 //puts resources in object
  function addResources(resources) {
    clearResources();
    for (const resourceId in resources) {
      const resource = resources[resourceId];
      const card = window.resource.createResourceElement(resource);
      addResource(card)
    }
  }

  window.newResources.addResources = addResources;

  getAllResources().then(function(json) {
    window.newResources.addResources(json)
    views_manager.show('resources')
  })

});
