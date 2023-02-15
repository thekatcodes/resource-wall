$(() => {
  //creates resource element
  const $viewResource = $(`<section class="card-columns d-flex justify-content-center">
    <p>Loading...</p>
    </section>`);
  window.$viewResource = $viewResource;
  window.viewResource = {};

  const checkIfRating = (value) => {
    return value === null ? "Not Rated" : value;
  };

  function createResourceArticle(resource) {
    return `<div id=${
      resource.id
    } class="card text-center" style="width: 80rem;">
                <img class='card-img-top' src='${resource.cover_image_url}'>
              <div class = "card-body d-flex justify-content-around">
                  <span>${resource.author}</span>
                  <span>${checkIfRating(resource.rating)}</span>
              </div>
              <div>
                <h2 card="card-title">${resource.title}</h2>
              </div>
              <div>
                <span class="card-text">Resource Link:<span>
                <a class="card-text" href='${resource.url}'>${resource.url}</a>
              </footer>
            </div>`;
  }
  window.viewResource.createResourceArticle = createResourceArticle;

  function addResource(resource) {
    $viewResource.append(resource);
  }

  function clearResource(resource) {
    $viewResource.empty(resource);
  }
  window.viewResource.clearResource = clearResource;
  //appends resource to dom
  $(document).on("click", ".resource-card", function (event) {
    const resourceId = $(this).attr("id");
    getResourceById(resourceId).then(function (resource) {
      clearResource();
      article = window.viewResource.createResourceArticle(resource);
      addResource(article);
      views_manager.show("resource");
    });
  });
});
