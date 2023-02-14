$(() => {
  getAllResources().then(function(json) {
    window.newResources.addResources(json)
    views_manager.show('resources')
  })
});
