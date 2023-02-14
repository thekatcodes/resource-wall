$(() => {

  //create single comment element
  window.comment = {};


  function createCommentElement(comment) {
    return`<div>
              ${comment}
            </div>`;
  }
  window.comment.createCommentElement = createCommentElement;


  //Append all comments to window//
  const $newComments = $(`<section comments-container">
    <p>Loading...</p>
    </section>`);
  window.$newComments = $newComments;
  window.newComments = {}

  function addComment(comment) {
    $newComments.append(comment)
  }

  function clearComments(comment) {
    $newComments.empty(comment)
  }

  window.newComments.clearComments = clearComments;
 //puts resources in object
  function addComments(comments) {
    clearComments();
    for (const commentId in comments) {
      const comment = comments[commentId];
      const showComment = window.comment.createCommentElement(comment);
      addComment(showComment)
    }
  }
  window.newComments.addComments = addComments;
});
