$(() => {
  const $topicFilters = $(`
    <div class="topic-filters">
    <button id="topic1" class="topic-btn" type="submit">School</button>
    <button id="topic2" class="topic-btn" type="submit">Coding</button>
    <button id="topic3" class="topic-btn" type="submit">Games</button>
    <button id="see-all" class="topic-btn" type="submit">See everything</button>
    </div>
    `);

  window.$topicFilters = $topicFilters;

  $(document).on("click", "#topic1", function (e) {
    e.preventDefault();
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: 'school' },
      contentType: "application/json; charset=utf-8",
    });
      
    request.done(function (data) {
        window.newResources.clearResources();
        for (const item in data) {
          console.log(data[item]);
          window.newResources.addResources(data[item]);
        }
        views_manager.show("resources");

        $(".topic-btn").removeClass("active");
        $("#topic1").addClass("active");
      });
  });
    
  $(document).on("click", "#topic2", function (e) {
    e.preventDefault();
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: 'coding' },
      contentType: "application/json; charset=utf-8",
    });
      
    request.done(function (data) {
        window.newResources.clearResources();
        for (const item in data) {
          console.log(data[item]);
          window.newResources.addResources(data[item]);
        }
        views_manager.show("resources");

        $(".topic-btn").removeClass("active");
        $("#topic2").addClass("active");
      });
  });

  $(document).on("click", "#topic3", function (e) {
    e.preventDefault();
    const request = $.ajax({
      url: "/search",
      type: "GET",
      data: { keyword: 'games' },
      contentType: "application/json; charset=utf-8",
    });
      
    request.done(function (data) {
        window.newResources.clearResources();
        for (const item in data) {
          console.log(data[item]);
          window.newResources.addResources(data[item]);
        }
        views_manager.show("resources");

        $(".topic-btn").removeClass("active");
        $("#topic3").addClass("active");
    });
  });
    
  $(document).on("click", "#see-all", function (e) {
      e.preventDefault();
      
    const request = $.ajax({
      url: "/search",
      type: "GET",
      contentType: "application/json; charset=utf-8",
    });
      
    request.done(function (data) {
        window.newResources.clearResources();
        for (const item in data) {
          console.log(data[item]);
          window.newResources.addResources(data[item]);
        }
        views_manager.show("resources");

        $(".topic-btn").removeClass("active");
        $("#see-all").addClass("active");
    });
  });
});

