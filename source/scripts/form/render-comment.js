export default function checkCommentValue() {
  const commentArea = document.getElementById('comment');
  const hint = document.querySelector('.form__comment-hint'); // <small>
  const maxLength = 142;

  function updateHint() {
    const currentLength = commentArea.value.length;
    hint.textContent = `Использовано ${currentLength}/${maxLength} символов`;
  }

  updateHint();

  commentArea.addEventListener('input', updateHint);
}

