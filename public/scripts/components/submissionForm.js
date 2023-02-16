$(() => {
  const $submissionForm = $(`
  <form action="/api/resource" method="POST" class="resource-submission">
    <div class="form">
      <div class="d-flex align-items-center justify-content-center form-title">
        <h1>Submit a new resource</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div class="error-message"></div>     
      </div>
      <div class="form-group">
        <label for="title">Title</label>
        <input type="text" name="title" class="form-control title-form" required>
      </div>
      <div class="form-group">
        <label for="imageURL">Image URL</label>
        <input type="text" name="imageURL" class="form-control image-url-form">
      </div>
      <div class="form-group">
        <label for="externalURL">Resource URL</label>
        <input type="text" name="externalURL" class="form-control resource-url-form" required>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea name="description" rows="5" cols="80" class="form-text form-control description-form"></textarea>
      </div>
      <div class="form-group">
        <label for="tags">Tags</label>
        <textarea name="tags" rows="5" cols="80" class="form-text form-control tag-form" required></textarea>
      </div>
      <div class="d-flex align-items-center justify-content-center form-title">
        <button type="submit" class="btn btn-info">Submit</button>
      </div>
    </div>
  </form>
  `);

  window.$submissionForm = $submissionForm;

  $submissionForm.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/resources/submission", {info : $(this).serialize()})
      .then((res) => {
        if (res === "") {
          $(".error-message").append('<div class="alert alert-danger"><h3>Details need to be filled out</h3></div>');
        } else {
          views_manager.show('resources')
        }
      });
  });
});
