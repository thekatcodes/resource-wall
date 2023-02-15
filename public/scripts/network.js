function getAllResources (keyword) {
    let url = "/api/resources";
    if (keyword) {
            url += "?" + keyword;
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


// function getCommentsForResource (id) {
//   let url = "/api/comments";
//   if (params) {
//     url += "/" + params
//   }
//   return $.ajax({
//     url,
//   });
// }
