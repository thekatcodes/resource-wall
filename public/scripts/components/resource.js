$(() => {
  window.resource = {};
  function createResourceElement(resource) {

  return `<div class="card">
      <div>
       <img class="card-img-top" src='${resource.cover_image_url}'>
      </div>
    <div class="card-body">
      ${resource.title}
    </div>
    <footer class="card-footer">
      <div class="card-text">
        ${resource.likes}
      </div>
      <div class="card-text">
        ${resource.rating}
      </div>
    </footer>
  </div`;
  }
  window.resource.createResourceElement = createResourceElement;
});
