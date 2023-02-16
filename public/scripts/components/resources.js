$(() => {
  const $newResources = $(`<section class="card-columns m-5">
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
    $.post('/api/resources/like', { info : parseInt(resourceID)})
      .then((data) => {
        if (data.liked === true) {
          $(this).removeClass('fa-regular');
          $(this).addClass('fa-solid');
          let totalHearts = $($(this).parents()[1]).find('.likes')[0]
          totalHearts.innerText = parseInt(totalHearts.innerText) + 1
      } else if (data.liked === false) {
          $(this).removeClass('fa-solid');
          $(this).addClass('fa-regular');
          let totalHearts = $($(this).parents()[1]).find('.likes')[0]
          totalHearts.innerText = totalHearts.innerText - 1
        }
      });
  });

  window.newResources.addResources = addResources;


  getAllResources().then(function (json) {
    window.newResources.addResources(json);
    views_manager.show("resources");
  });
});

