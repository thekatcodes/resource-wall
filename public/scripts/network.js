function getAllResources (keyword) {
    let url = "/api/resources";
    if (keyword) {
            url += "?" + keyword;
          }
  return $.ajax({
    url,
  });
}
