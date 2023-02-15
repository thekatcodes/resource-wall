$(() => {
  const $submissionForm = $(`
  <form action="/api/resource" method="POST" class="resource-submission">
    <div class="error-message"></div>
    <h2>Submit a new resource</h2>
    <label for="title">Title</label>
    <input type="text" name="title" class="title-form">
    <label for="imageURL">Image URL</label>
    <input type="text" name="imageURL" class="image-url-form">
    <label for="externalURL">Resource URL</label>
    <input type="text" name="externalURL" class="resource-url-form">
    <label for="description">Description</label>
    <textarea name="description" rows="5" cols="80" class="description-form"></textarea>
    <label for="tags">Tags</label>
    <textarea name="tags" rows="5" cols="80" class="tag-form"></textarea>
    <button type="submit" class="btn btn-info">Submit</button>
    </form>
  `);

  window.$submissionForm = $submissionForm;

  $submissionForm.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/resources/submission", {info : $(this).serialize()})
      .then((res) => {
        if (res === "") {
          $(".error-message").append("<h1>Details need to be filled out</h1>");
        } else {
          console.log("show main page");
        }
      });
  });
});
