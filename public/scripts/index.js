$(() =>
  getAllResources().then(function(json) {
      newResources.addResources(json.resources);
      views_manager.show('resources');
    })
)
