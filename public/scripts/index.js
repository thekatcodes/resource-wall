$(() => {
  getAllResources().then(function(json) {
    console.log(json.response)
    window.newResources.addResources(json.response)
  })
});
