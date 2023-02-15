function getAllResources (id) {
    let url = "/api/resources";
    if (id) {
            url += "?" + id;
          }
  return $.ajax({
    url,
  });
}

function getResourceById (id) {
  let url = "/api/resources";
  if (id) {
    url += "/" + id
  }
  return $.ajax({
    url,
  });
}

function getCommentsForResource (id) {
  let url = "/api/comments";
  if (id) {
    url += "/" + id
  }
  return $.ajax({
    url,
  });
}
