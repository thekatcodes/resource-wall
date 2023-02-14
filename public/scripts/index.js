$(() => {
  getAllResources().then(function(json) {
    window.newResources.addResources(json.response)
    views_manager.show('resources')
  })
});
