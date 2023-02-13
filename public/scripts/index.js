//const getAllResources = require("../../db/queries/getAllResources");

$(() =>
  getAllResources().then(function(json) {
      resources.addResources(json.resources);
      views_manager.show('resources');
    })
)
