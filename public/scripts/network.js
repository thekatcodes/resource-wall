function getAllResources () {
  let url = "/api/resources";
  return $.ajax({
    url,
  });
}

function getResourceById (id) {
  let url = "/api/resources";
  if (params) {
    url += "/" + params
  }
  return $.ajax({
    url,
  });
}
