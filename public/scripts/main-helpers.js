const createResourceElement = (resource) => {

  const newResource = $(`<article class="resource">
    <header>
      <div>
        <span>&nbsp;&nbsp;${resource.title}</span>
      </div>
    </header>
     ${safeHTML}
    <footer>
      <div>
        ${resource.round}
      </div>
      <div>
        ${resource.sum}
      </div>
    </footer>
  </article>`);
  return newResource;
};


const renderResources = (data) => {
  $("#resources-container").empty();
  data.forEach((resource) => {
    const $resource = createResourceElement(resource);
    $("#resources-container").prepend($resource);
  });
  return;
};

// const loadResources = () => {
//   const $tweets = $.get("/", (allResources) => {
//     renderResources(allResources);
//   });
// };


module.exports = { createResourceElement, renderResources}
