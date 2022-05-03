// node_modules 에 있는 express 관련 파일 가져오기
var express = require('express')

// 반환값을 변수에 저장
var app = express()

// 3000 포트로 서버 오픈
app.listen(3000, function() {
    console.log("start! express server on port 3000")
})

// request, response 인자를 사용해 콜백 함수를 만든다.
// localhost:3000 브라우저에 res.send() 내부의 문자열이 띄워진다.

app.get('/test', function(req,res) {
  // res.send("<h1>hi friend!</h1>")
  console.log('hello!');
  res.sendFile(__dirname + "/index.html")
})


/* app.use vs app.get
   app.use는 “모든 요청에서 이것을 실행”,
   app.get은 “주어진 URL에 대해 GET 요청에서 이것을 실행"*/