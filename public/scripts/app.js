// Client facing scripts here
const renderResource = (data) => {
  $("#resources-container").empty();
  data.forEach((resource) => {
    const $resource = createResourceElement(resource);
    $("#resources-container").prepend($resource);
  });
  return;
};
