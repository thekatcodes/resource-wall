$(() => {
  const createResourceElement = (resource) => {

    const newResource = $(`<article class="resource">
      <header>
        <div>
          <span>&nbsp;&nbsp;${resource.title}</span>
        </div>
      </header>
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

  const renderResource = (data) => {
    $("#resources-container").empty();
    data.forEach((resource) => {
      const $resource = createResourceElement(resource);
      $("#resources-container").prepend($resource);
    });
    return;
  };
});
