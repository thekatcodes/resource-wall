$(() => {
  const $newResources = $(`<section class="card-columns">
    <p>Loading...</p>
    </section>`);
  window.$newResources = $newResources;
  window.newResources = {};

  function addResource(resource) {
    $newResources.append(resource);
  }

  function clearResources(resource) {
    $newResources.empty(resource);
  }
  window.newResources.clearResources = clearResources;
  //puts resources in object
  function addResources(resources) {
    clearResources();
    for (const resourceId in resources) {
      const resource = resources[resourceId];
      $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card)
        })
    }
  }

  $newResources.on('click', 'i', function(event) {
    event.stopPropagation();
    const parentElement = $($(this).parents()[2]).find('span')[0];
    const resourceID = parentElement.innerText;
    if ($(this).hasClass('fa-regular')) {
      $.post('/api/resources/like', { info : parseInt(resourceID)})
        .then((data) => {
          console.log(data)
          if (data) {
            $(this).removeClass('fa-regular');
            $(this).addClass('fa-solid');
          }
        })
    } else {
        $.post('/api/resources/like', { info : parseInt(resourceID)})
          .then((data) => {
            console.log(data)
            if (data) {
            $(this).removeClass('fa-solid');
            $(this).addClass('fa-regular');
            }
          })
    }
  });

  window.newResources.addResources = addResources;

  getAllResources().then(function (json) {
    window.newResources.addResources(json);
    views_manager.show("resources");
  });
});

