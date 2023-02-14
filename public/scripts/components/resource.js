$(() => {
  window.resource = {};
  const checkIfRating = (value) => {
    return value === null ? 'Not Rated' : value;
  }

  function createResourceElement(resource) {
  return `<div id=${resource.id} class="card resource-card">
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
        ${checkIfRating(resource.rating)}
      </div>
    </footer>
  </div>`;
  }
  window.resource.createResourceElement = createResourceElement;
});
