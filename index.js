// node_modeules에 있는 express 관련 파일 가졍ㅁ
const express = require('express')

// express 함수 반환값 변수에 저장
const app = express()

// 8080 포트로 서버 오픈
app.listen(8080, function() {
	console.log('server start on 8080')
});