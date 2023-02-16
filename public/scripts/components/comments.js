$(() => {
  //create single comment element
  window.comment = {};

  function createCommentElement(comment) {
    console.log(comment)
    return `<div class="card m-auto border-0" style="width: 60rem;">
              <div class="card-body">${comment.user}</div>
              <div class="card-body mb-4 bg-light text-dark">
                <div class="lead">
                  ${comment.message}
                </div>
            </div>`;
  }
  window.comment.createCommentElement = createCommentElement;

  //Append all comments to window//
  const $newComments =
    $(`<section  id="comment-list" class="d-flex flex-column justify-content-center m-auto" style="width: 80rem;">
    <p>Loading...</p>
    </section>`);
  window.$newComments = $newComments;
  window.newComments = {};

  function addComment(comment) {
    $newComments.append(comment);
  }

  function clearComments() {
    $newComments.empty();
  }

  window.newComments.clearComments = clearComments;
  //puts resources in object
  function addComments(comments) {
    clearComments();
    for (const commentId in comments) {
      const comment = comments[commentId];
      const showComment = window.comment.createCommentElement(comment);
      addComment(showComment);
    }
  }

  window.newComments.addComments = addComments;
  $(document).on("click", ".resource-card", function (event) {
    const commentsResourceId = $(this).attr("id");
    getCommentsForResource(commentsResourceId).then(function (json) {
      window.newComments.addComments(json);
    });
  });
});
