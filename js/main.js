
const resultMap = document.querySelector('.result-map')

const map = new kakao.maps.Map(resultMap, {
    center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
	level: 5
})

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
