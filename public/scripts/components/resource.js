$(() => {
  window.resource = {};
  function createResourceElement(resource, like) {
    let heartIcon;
    if (like.liked) {
      heartIcon = `<i class="fa-solid fa-heart"></i>`
    } else {
      heartIcon = `<i class="fa-regular fa-heart"></i>`
    }
    return `<article class="resource">
      <header>
        <div>
          <span class="resource-post">${resource.id}</span>
        </div>
        <div>
          <span>${resource.title}</span>
        </div>
      </header>
      <div>
        ${resource.cover_image_url}
      </div>
      <footer>
        <div>
          ${heartIcon}
        </div>
        <div>
          ${resource.round}
        </div>
        <div>
          ${resource.sum}
        </div>
      </footer>
    </article>`;
  }
  

  window.resource.createResourceElement = createResourceElement;
});
