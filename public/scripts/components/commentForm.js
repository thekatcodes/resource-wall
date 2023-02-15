$(() => {
  const $commentForm = $(`
    <form action="/api/comment" method="POST" class="comment-submission">
      <div class="error-message"></div>
      <label for="message">Write a comment</label>
      <textarea type="text" name="message" class="message-form"></textarea>
      <button type="submit" class="btn">Submit</button>
    </form>
  `);

  window.$commentForm = $commentForm;


  let commentPostresourceId;
  $(document).on("click", ".resource-card", function (event) {
    commentPostresourceId = $(this).attr("id");
  });

  $commentForm.on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const resourceID = commentPostresourceId;
    $.post("/api/comments/submission", {info : { formData , resourceID }})
      .then((res) => {
        if (res === "") {
          $(".error-message").append("<h1>Details need to be filled out</h1>");
        } else {
          console.log("Show current page");
        }
      });
  });
});
