$(() => {
  window.resources = {};
  function createResource(resource) {
  return $`<article class="resource">
    <header>
      <div>
        <span>${resource.title}</span>
      </div>
    </header>
    <div>
      ${resource.cover_image_url}
    </div>
    <footer>
      <div>
        ${resource.round}
      </div>
      <div>
        ${resource.sum}
      </div>
    </footer>
  </article>`;
  }
  window.resources.createResource = createResource;
});
