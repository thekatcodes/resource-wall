$(() => {
  //creates resource element
  const $viewResource = $(`<section class="card-columns">
    <p>Loading...</p>
    </section>`);
  window.$viewResource = $viewResource;
  window.viewResource = {};

  function createResourceArticle(resource) {
    return `<article class='view-resources'>
              <div class='article-image'>
                <img src='${resource.cover_image_url}'>
              </div>
              <div>
                <div>
                  <span>${resource.author}</span>
                </div>
                <div>
                  <span>${resource.rating}</span>
                </div>
              </div>
              <div>
                <h2>${resource.title}</h2>
              </div>
              <footer>
                <span>Resource Link:<span>
                <a href='${resource.url}'>${resource.url}</a>
              </footer>
            </article>`;
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
    console.log(resourceId);
    getResourceById(resourceId).then(function (resource) {
      clearResource();
      article = window.viewResource.createResourceArticle(resource);
      addResource(article);
      views_manager.show("resource");
    });
  });
});
