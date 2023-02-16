$(() => {
  const $commentForm = $(`
    <form action="/api/comment" method="POST" class="card d-flex border-0 m-auto" style="width: 60rem;">
      <div class="card-body d-flex justify-content-start">
        <div class="error-message"></div>
          <label for="message">Comment</label>
        </div>
        <textarea type="text" name="message" class="message-form rows="3""></textarea>
        <div class="d-flex justify-content-end">
          <button type="submit" class="btn btn-info m-2">Submit</button>
        </div>
      </div>
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
      //check if input blank
    if (formData === 'message=') {
      $(".error-message").append("<h1>Please don't leave the comment blank</h1>");
      return;
    }
    $.post("/api/comments/submission", {info : { formData , resourceID }})
      .then((res) => {
        console.log(res.body)
        if (res === "") {
          console.log('error')
        } else {
          views_manager.show("resource")
          console.log("Show current page");
        }
      });
  });
});
