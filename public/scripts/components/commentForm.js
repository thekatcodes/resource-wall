$(() => {
  const $commentForm = $(`
    <form action="/api/comment" method="POST" class="card d-flex border-0 m-auto" style="width: 60rem;">
      <div class="card-body d-flex justify-content-start">
        <div class="error-message"></div>
          <label for="message">Comment</label>
        </div>
        <textarea type="text" name="message" class="message-form rows=3 comment-input"  placeholder="Leave a comment"></textarea>
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

  const isloggedIn = () => {
    $.get("/login/loginStatus").then((res) => {
      if(!res.length) {
        $(".error-message").append("<h1>You must sign in to comment</h1>");
      }
      return
    });
  }

  $commentForm.on('submit', function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    const resourceID = commentPostresourceId;

      //check if logged in
    isloggedIn()

      //check if input blank
    if (formData === 'message=') {
      $(".error-message").append("<h1>Please don't leave the comment blank</h1>");
      return;
    }

    $.post("/api/comments/submission", {info : { formData , resourceID }})
      .then((res) => {
        if (res === "") {
          console.log('error')
        } else {
          $('.comment-input').empty().val('');
          views_manager.show("resource")
        }
      });
  });
});
