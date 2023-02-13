$(() => {
  const $pageHeader = $("#page-header");

  function updateHeader() {
    let header = `
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">
                    Logo
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link create_resources_button">Create resource <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">My resources</a>
                    </li>
                    <form action="/search" method="GET" id="search-resource-form" class="form-inline my-2 my-lg-0">
                        <input class="js-keyword-search form-control mr-sm-2" type="search" placeholder="Search resource" aria-label="Search">
                        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                    <li class="nav-item">
                        <a class="nav-link active" href="#">Log out</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active profileButton">Profile</a>
                    </li>
                    </ul>
                </div>
            </nav>
        `;

    $pageHeader.append(header);
  }

  updateHeader();


  $("#search-resource-form").on("submit", function(e) {
      e.preventDefault();
      
    //Retrieves search input value 
    const keywordSearch = $(e.currentTarget).find(".js-keyword-search");


    //Make an ajax GET call giving the keyword (search input value)
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: keywordSearch.val() },
      contentType: "application/json; charset=utf-8",
    });

    request.done(function (data) {
      //success code here
      console.log("success");
    });

    request.fail(function (error) {
      //failure code here
      console.log("failed");
    });

    
  //   //keyword (search input value as a param)
  //   //TO DO: in search-router, go through db and get the resources corresponding to the keyword using search-queries
  //   //TO DO:  add on click events for navbar options which allows for views_manager.show('component')
  // });
    });
  $('header').on('click', '.create_resources_button', () => {
    views_manager.show('submissionForm');
  });

  $('header').on('click', '.profileButton', () => {
    views_manager.show('updateProfile');
  });
});