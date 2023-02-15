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

  $commentForm.on('submit', function(event) {
    event.preventDefault();
    $.post("/api/comments/submission", {info : $(this).serialize()})
      .then((res) => {
        if (res === "") {
          $(".error-message").append("<h1>Details need to be filled out</h1>");
        } else {
          console.log("Show current page");
        }
      });
  });
});
