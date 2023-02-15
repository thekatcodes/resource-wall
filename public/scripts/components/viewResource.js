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
    return `<div id=${
      resource.id
    } class="card text-center" style="width: 80rem;">
                <img class='card-img-top' src='${resource.cover_image_url}'>
              <div class = "card-body d-flex justify-content-around">
                <div>
                  <span>${resource.author}</span>
                  <span>${checkIfRating(resource.rating)}</span>
                </div>
                <div>
                <div class="share-button sharer" style="display: block;">
                    <button type="button" class="btn btn-success share-btn">Share</button>
                    <div class="social top center networks-5 ">
                        <!-- Facebook Share Button -->
                        <a class="fbtn share facebook" href="https://www.facebook.com/sharer/sharer.php?u=url"><i class="fa fa-facebook"></i></a>

                        <!-- Google Plus Share Button -->
                        <a class="fbtn share gplus" href="https://plus.google.com/share?url=url"><i class="fa fa-google-plus"></i></a>

                        <!-- Twitter Share Button -->
                        <a class="fbtn share twitter" href="https://twitter.com/intent/tweet?text=title&amp;url=url&amp;via=creativedevs"><i class="fa fa-twitter"></i></a>

                        <!-- Pinterest Share Button -->
                        <a class="fbtn share pinterest" href="http://pinterest.com/pin/create/button/?url=url&amp;description=data&amp;media=image"><i class="fa fa-pinterest"></i></a>

                        <!-- LinkedIn Share Button -->
                        <a class="fbtn share linkedin" href="http://www.linkedin.com/shareArticle?mini=true&amp;url=url&amp;title=title&amp;source=url/"><i class="fa fa-linkedin"></i></a>
                    </div>
                </div>
                  <span class="resource-id">${resource.id}</span>
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
                <h2 card="card-title">${resource.title}</h2>
              </div>
              <div>
                <span class="card-text">Resource Link:<span>
                <a class="card-text" href='${resource.url}'>${resource.url}</a>
              </footer>
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
  $(document).on("click", ".resource-card", function (event) {
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

    //share button functionality
  $( ".share-btn" ).click(function(e) {
    $('.networks-5').not($(this).next( ".networks-5" )).each(function(){
       $(this).removeClass("active");
   });
   $(this).next( ".networks-5" ).toggleClass( "active" );
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


});
