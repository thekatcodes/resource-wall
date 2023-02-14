$(() =>
  getAllResources().then(function(json) {
      console.log('ya dig?')
      newResources.addResources(json.resources);
      views_manager.show('resources');
    })
)
