$(() => {
  window.resource = {};
  function createResourceElement(resource) {

  return `<article class="card">
      <div>
       <img "card-img-top" src='${resource.cover_image_url}'>
      </div>
    <div class="card-body" >
      ${resource.title}
    </div>
    <footer>
      <div>
        ${resource.likes}
      </div>
      <div class="text-muted">
        ${resource.rating}
      </div>
    </footer>
  </article>`;
  }
  window.resource.createResourceElement = createResourceElement;
});
