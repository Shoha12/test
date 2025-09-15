export default function initUpButton() {
  const footerUp = document.querySelector('#up');

  window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
      footerUp.style.display = 'block';
    } else {
      footerUp.style.display = 'none';
    }
  });

  footerUp.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
