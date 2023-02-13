$(() => {
  const $newResources = $(`<section class ="resource-list">
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

  window.newResources.clearResource = clearResources;
 //puts resources in object
  function addResources(resources) {
    clearResources();
    for (const resourceID in resources) {
      const resource = resources[resourceID];
      const card = newResource.createCard(resource);
      addResource(card)
    }
  }
  window.newResources.addResources = addResources;
});
