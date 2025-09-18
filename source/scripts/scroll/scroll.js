export default function initUpButton() {
  const up = document.querySelector('#up');

  function getPageHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
  }

  window.addEventListener('scroll', () => {
    const pageHeight = getPageHeight();
    const scrolledBottom = window.innerHeight + window.scrollY;

    if (scrolledBottom >= pageHeight - 10) {
      up.style.display = 'block';
    } else {
      up.style.display = 'none';
    }
  });

  up.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });
}
