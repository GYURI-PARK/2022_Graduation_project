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


//============================================================
var roadviewContainer = document.getElementById('roadview'); //로드뷰를 표시할 div
var roadview = new kakao.maps.Roadview(roadviewContainer); //로드뷰 객체
var roadviewClient = new kakao.maps.RoadviewClient(); //좌표로부터 로드뷰 파노ID를 가져올 로드뷰 helper객체

var position = new kakao.maps.LatLng(33.450701, 126.570667);

// 특정 위치의 좌표와 가까운 로드뷰의 panoId를 추출하여 로드뷰를 띄운다.
roadviewClient.getNearestPanoId(position, 50, function(panoId) {
    roadview.setPanoId(panoId, position); //panoId와 중심좌표를 통해 로드뷰 실행
});

