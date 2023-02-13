function getAllResources () {
  let url = "/api/resources";
  if (params) {
    url += "?" + params
  }
  return $.ajax({
    url,
  });
}
