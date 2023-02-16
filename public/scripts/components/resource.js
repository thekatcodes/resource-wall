$(() => {
  window.resource = {};

  const checkIfRating = (value) => {
    return value === null ? 'Not Rated' : value;
  }

  function createResourceElement(resource, like) {
    let heartIcon;
    if (like.liked) {
      heartIcon = `<i class="favourites fa-solid fa-heart"></i>`
    } else {
      heartIcon = `<i class="favourites fa-regular fa-heart"></i>`
    }
  return `<div id=${resource.id} class="card resource-card">
       <div>
          <span class="resource-post">${resource.id}</span>
      </div>
      <div>
       <img class="card-img-top front-page-img" src='${resource.cover_image_url}'>
      </div>
    <div class="card-body">
      ${resource.title}
    </div>
    <footer class="card-footer">
      <div>
        ${heartIcon}
      </div>
      <div class="card-text likes">
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
