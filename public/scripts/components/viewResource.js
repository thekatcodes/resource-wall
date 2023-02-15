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
    });
  });

    //share button functionality
  $( ".share-btn" ).click(function(e) {
    $('.networks-5').not($(this).next( ".networks-5" )).each(function(){
       $(this).removeClass("active");
   });
   $(this).next( ".networks-5" ).toggleClass( "active" );
});
});
