$(() => {
  window.header = {};

  const $pageHeader = $("#page-header");

  function updateHeader(isLoggedIn) {
    let header;

    if (!isLoggedIn) {
      header = `
        <nav id="header-user-links" class="navbar navbar-expand-lg">
            <a class="navbar-brand" href="#">
                R
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
				<i class="fa-solid fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li id="login-click" class="nav-item">
                    <a id="login-btn" class="nav-link" href="#">Log in</a>
                </li>
                <li id="register-click" class="nav-item">
                    <a id="register-btn" class="nav-link" href="#">Register</a>
                </li>
                </ul>
            </div>
        </nav>
    `;
    } else {
      header = `
      <nav id="header-user-links" class="navbar navbar-expand-lg">
      <a id="logo-btn" class="navbar-brand" href="#">
          R
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fa-solid fa-bars"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
              <div class="navbar-left">
                  <li id="create-resource-click" class="nav-item nav-underline">
                      <a id="create-resource-btn" class="nav-link " href="#">Create resource</a>
                  </li>
                  <li id="user-resources-click" class="nav-item">
                      <a id="user-resources" class="nav-link" href="#">My resources</a>
                  </li>
              </div>
          </ul>
              <form action="/search" method="GET" id="search-resource-form"
                  class="form-inline my-2 my-lg-0 search-form">
                  <input class="js-keyword-search form-control mr-sm-2" type="search" placeholder="What are you looking for?"
                      aria-label="Search">
                  <button class="btn search-btn my-2 my-sm-0" type="submit"> <i
                          class="fa-solid fa-magnifying-glass"></i></button>
              </form>
            <ul class="navbar-nav justify-content-end ml-auto">
              <div class="navbar-right">
                  <li class="nav-item">
                      <a id="logout-btn" class="nav-link" href="#">Log out</a>
                  </li>
                  <li id="profile-click" class="nav-item">
                      <a id="profile-btn" class="nav-link" href="#">Profile</a>
                  </li>
              </div>
            </ul>
      </div>
  </nav>
    `;
    }

    $pageHeader.append(header);
  }

  window.header.update = updateHeader;

  const clearInputFields = () => {

    $('.username-form').val('');
    $('.password-checker').val('');
    $('.email-form').val('');
    $('.password').val('');
    $('.title-form').val('');
    $('.image-url-form').val('');
    $('.resource-url-form').val('');
    $('.description-form').val('');
    $('.tag-form').val('');
    $('.email-form').val('');
    $('.password-form').val('');
  }

  //Check for login status
  $.get("/login/loginStatus").then((res) => {
    res.length ? updateHeader(true) : updateHeader(false);
  });

  /* Search for keyword */
  $("header").on("submit", "#search-resource-form", function (e) {
    e.preventDefault();
    //Retrieves search input value
    const keywordSearch = $(e.currentTarget).find(".js-keyword-search");
    console.log("keywordSearch:", keywordSearch.val());

    //Make an ajax GET call giving the keyword (search input value)
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: keywordSearch.val() },
      contentType: "application/json; charset=utf-8",
    });

    request.done(function (data) {
      window.newResources.clearResources();
      //Loop through data from search request and display related cards
      for (const item in data) {
        console.log(data[item]);
        window.newResources.addResources(data[item]);
      }
      views_manager.show("resources");
    });

    request.fail(function (error) {
      res.send(error);
    });
  });

  /* If user is NOT logged in*/
  //Render Log in page on click
  $("header").on("click", "#login-btn", function () {
    clearInputFields();
    views_manager.show("loginForm");

    $(".nav-item").removeClass("active");
    $("#login-click").addClass("active");
  });
  //Render register on click
  $("header").on("click", "#register-btn", function () {
    clearInputFields();
    views_manager.show("registerForm");

    $(".nav-item").removeClass("active");
    $("#register-click").addClass("active");
  });

  /* If user is logged in*/
  //Render Home page (main content) on Logo click
  $("header").on("click", "#logo-btn", function () {
    clearInputFields();
		views_manager.show("resources");

		$(".nav-item").removeClass("active");
  });

  //Render Create resource page on click
  $("header").on("click", "#create-resource-btn", () => {
    clearInputFields();
    views_manager.show("submissionForm");

    $(".nav-item").removeClass("active");
    $("#create-resource-click").addClass("active");
  });

	//Render My resources on click
  $("header").on("click", "#user-resources", function () {
    clearInputFields();
    console.log('hello')
    newUserResources.addUserResources();
    newUserLikes.addUserLikes();
    //newUserResources.addUserLikes();
    views_manager.show("userResources");

    $(".nav-item").removeClass("active");
    $("#user-resources-click").addClass("active");
  });

  //Render Log out on click
  $("header").on("click", "#logout-btn", () => {
    clearInputFields();
    $.get("/login/logout").then(() => {
      $("#page-header").empty();
      updateHeader(false);
      $(".card-columns").remove();
      views_manager.show("loginForm");

      $("#login-click").addClass("active");
    });
  });

  //Render Profile page on click
  $("header").on("click", "#profile-btn", () => {
    clearInputFields();
    views_manager.show("updateProfile");

    $(".nav-item").removeClass("active");
    $("#profile-click").addClass("active");
  });
});
