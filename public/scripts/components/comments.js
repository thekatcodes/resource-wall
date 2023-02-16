$(() => {
  //create single comment element
  window.comment = {};

  function createCommentElement(comment) {
    return `<div class="card" style="width: 80rem;">
              <div class="card-body">${comment.user}</div>
              <div class="card-body">${comment.message}</div>
            </div>`;
  }
  window.comment.createCommentElement = createCommentElement;

  //Append all comments to window//
  const $newComments =
    $(`<section class="d-flex flex-column justify-content-center" style="width: 80rem;">
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
