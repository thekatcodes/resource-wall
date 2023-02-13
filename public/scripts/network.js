function getAllResources () {
  let url = "/api/resources";
  return $.ajax({
    url,
  });
}
