$(() => {
  //creates resource element
  const $viewResource = $(`<section class="card-columns d-flex justify-content-center">
    <p>Loading...</p>
    </section>`);
  window.$viewResource = $viewResource;
  window.viewResource = {};

  const checkIfRating = (value) => {
    return value === null ? "Not Rated" : value;
  };

  function createResourceArticle(resource) {
    return `<div id=${resource.id} class="card text-center" style="width: 60rem;">
              <div>
               <h2 card="card-title">${resource.title}</h2>
              </div>
              <img class='card-img-top' src='${resource.cover_image_url}'>
              <div class="card-body d-flex justify-content-around">
                <div>
                  <span>${resource.author}</span>
                  <span>${checkIfRating(resource.rating)}</span>
                </div>
                <div>
                  <button type="button" class="btn btn-success copy-btn">Copy</button>
                </div>
                <div>
                  <span id="average">${resource.rating}</span>
                </div>
                <div>
                  <form>
                    <div class=”rating”>
                      <i class="rating fa-regular fa-star" id="1"></i>
                      <i class="rating fa-regular fa-star" id="2"></i>
                      <i class="rating fa-regular fa-star" id="3"></i>
                      <i class="rating fa-regular fa-star" id="4"></i>
                      <i class="rating fa-regular fa-star" id="5"></i>
                    </div>
                  </form>
                </div>
              </div>
              <div>
                <h4>${resource.description}</h4>
              </div>
              <div "d-flex">
                <div class="mr-auto p-2"">Resource Link:</div>
                <a id="long-url" class="card-text p-2"" href='${resource.url}'>${resource.url}</a>
              </div>
            </div>`;
  }
  window.viewResource.createResourceArticle = createResourceArticle;


  const highlightStars = function(value) {
    const stars = document.querySelectorAll('.rating');
    stars.forEach((star, index) => {
      if (value - 1 >= index) {
        star.classList.remove('fa-regular');
        star.classList.add('fa-solid');
        } else {
          star.classList.remove('fa-solid');
          star.classList.add('fa-regular');
        }
    });
  }

  function addResource(resource) {
    $viewResource.append(resource);
  }

  function clearResource(resource) {
    $viewResource.empty(resource);
  }
  window.viewResource.clearResource = clearResource;
  //appends resource to dom
  $(document).on("click", ".resource-card, #comment-form-submit", function (event) {
    const resourceId = $(this).attr("id");
    getResourceById(resourceId).then(function (resource) {
      clearResource();
      article = window.viewResource.createResourceArticle(resource);
      addResource(article);
      views_manager.show("resource");
      return resource;
    })
    .then((data) => {
      $.get('/api/resources/rating', {resource : data.id })
        .then((userData) => {
          if (userData) {
          highlightStars(userData.rating)
          }
        });
      });
  });

  $(document).on("click", ".rating", function() {
    let newRating = $(this).attr('id');
    highlightStars(newRating);
    const resourcePost = $(this).parents()[6];
    const resourceID = $(resourcePost).find('.resource-id')[0].innerText;
    $.post('/api/resources/rating', {info : parseInt(resourceID), rating : newRating})
      .then((data) => {
        if (data) {
          const resourceAverage = $(this).parents()[3];
          const averageValue = $(resourceAverage).find('#average')[0];
          averageValue.innerText = data.average_rating;
        }
    })
  })


  //uses copy button to copy url to clipboard
  $(document).on("click", ".copy-btn", function() {
    textToCopy = $('#long-url').html()

    navigator.clipboard.writeText(textToCopy).then(
      function() {
        /* clipboard successfully set */
       $('.copy-btn').html('Copied!')
      },
      function() {
        /* clipboard write failed */
        $('.copy-btn').html('Error')
      }
    )
  })


});
