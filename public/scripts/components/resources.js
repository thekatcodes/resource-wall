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
      /* gets data if the user likes the resource or not
       * then appends the liked symbol or unliked symbol into the post
       */
      $.get("/api/resources/like", {resources : resource.id})
        .then((data) => {
          const card = window.resource.createResourceElement(resource, data);
          addResource(card)
        })
    }
  }

  $newResources.on('click', '.favourites', function(event) {
    event.stopPropagation();
    const parentElement = $(this).parents()[3];
    const resourceID = $(parentElement).attr('id');
    $.post('/api/resources/like', { info : parseInt(resourceID)})
      .then((data) => {
        if (data.liked === true) {
          //changes the icon from unliked to liked and increments total likes
          $(this).removeClass('fa-regular');
          $(this).addClass('fa-solid');
          let totalHearts = $($(this).parents()[1]).find('.likes')[0]
          totalHearts.innerText = parseInt(totalHearts.innerText) + 1
      } else if (data.liked === false) {
          //changes the icon from liked to unliked and increments total likes
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

