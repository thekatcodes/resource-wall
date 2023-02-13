$(() => {
  const $newResources = $(`<article class="resource">
    <header>
      <div>
        <span>&nbsp;&nbsp;${resource.title}</span>
      </div>
    </header>
    <footer>
      <div>
        ${resource.round}
      </div>
      <div>
        ${resource.sum}
      </div>
    </footer>
  </article>`);

  window.$newResources = $newResources;
  window.newResources = {}

  function addResource(resource) {
    $newResources.append(resource)
  }

  function clearResources(resource) {
    $newResources.empty(resource)
  }

  window.newResources.clearResource = clearResources;

  function addResources(resources) {
    clearResources();
    for (const resourceID in resources) {
      const resource = resources[resourceID];
      const card = newResource.createCard(resource);
    }
  }
  window.newResources.addResources = addResources;
});
