const backToTop = document.getElementById('backtotop');

function checkScroll(){
  let pageYOffset = window.pageYOffset;
  if (pageYOffset != 0) {
    backToTop.classList.add('show');
  }
  else {
    backToTop.classList.remove('show');
  }
}

function moveBackToTop(){
  if (window.pageYOffset > 0){
    window.scrollTo({
      top : 100,
      behavior:"smooth"
    });
  }
}

window.addEventListener('scroll', checkScroll);
backToTop.addEventListener('click', moveBackToTop);
