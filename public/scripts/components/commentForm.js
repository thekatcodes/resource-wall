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
        console.log(res.body)
        if (res === "") {
          $(".error-message").append("<h1>Please don't leave the comment blank</h1>");
        } else {
          views_manager.show("resource")
          console.log("Show current page");
        }
      });
  });
});
