$(() => {
  $submissionForm = $(`
  <div>
    <div class="error-message"></div>
    <h2>Submit a new resource</h2>
    <form action="/api/resource" method="POST" class="resource-submission">
      <label for="title">Title</label>
      <input type="text" name="title" class="title-form">
      <label for="image-url">Image URL</label>
      <input type="text" name="image-url" class="image-url-form">
      <label for="resource-url">Resource URL</label>
      <input type="text" name="resource-url" class="resource-url-form">
      <label for="description">Description</label>
      <textarea name="description" rows="5" cols="80" class="description-form">
      <label for="tags">Tags</label>
      <textarea name="tags" rows="5" cols="80" class="tag-form">
    </form>
  </div>
  `);
  window.$submissionForm = $submissionForm;
  $submissionForm.on('submit', () => {
    event.preventDefault();
    $.post("/api/resource/submission", {
      title : $('.title.form')[0].value,
      description : $('.description-form')[0].value,
      coverImageURL : $('.image-url-form')[0].value,
      externalURL : $('.resource-url-form')[0].value,
      tags : $('.tag-form')[0].value
    })
      .then((res) => {
        if (res === "error") {
          $('.error-messaage').append('<h2>Details not filled out</h2>');
        }
        if (res) {
          console.log("show main page");
        }
      });
  });
});