const Query = require('pg').Query;
const pg = require('pg');

var client = new pg.Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1234',
  port: 5432,
  max: 10,
})

client.connect()
client.connect(err => {
  if (err) {
    console.log('Error:(' + err)
  } else {
    console.log('Success:)');

    const query = new Query("SELECT walk_node.node_id, walk_node.geom, walk_node.geom <-> 'SRID=4326;POINT(126.92336043981142 37.56509837507711)'::geometry AS dist FROM walk_node ORDER BY dist LIMIT 1;")
    client.query(query)

    var rows = [];

    // row : 데이터 가져오기
    query.on("row", row => {
      rows.push(row);
    });

    // end : 검색할 때 발생한 각종 정보
    query.on('end', () => {
      // console.log(rows);
      // console.log('query done')
      lines = []
      results = []
      rows.map((item)=> {
        item["link_wtk"]
        lines.push(item["link_wtk"])
      })
      lines.map((line) => {
        var spot1 = line.split("(")[1].split(")")[0].split(",")[0].split(" ");
        var spot2 = line.split("(")[1].split(")")[0].split(",")[1].split(" ");
        results.push(spot1);
        results.push(spot2);
      })
      console.log(results);
    });

    // error : 오류 발생 시
    query.on('error', err => {
      console.error(err.stack)
    });
  }
})


// =========================
// const express = require('express');
// const router = express();
// const db = require('../');

// router.get('/', (req,res) => {
//   const sql = 'SELECT '
// })




 
// router.get('/BoardContent', (req,res) => {
// 	// sql query 문
//     const sql = 'SELECT idx, title, content, writer, write_date FROM `table1` WHERE `idx` = ?';
//     // 전달받은 parameter 값
//     const params = req.query.idx
//     db.query(sql, params, (err, data) => {
//         if(!err) {
//             res.send(data)
//         } else {
//             res.send(err)
//         }
//     })
// })
 
// module.exports = router;


//========================================================
// CREATE the server and Client

// const clinet = require('./app.js')
// const express = require('express');
// const app = express();

// app.listen(3000, function() {
//   console.log("start! express server on port 3000")
// })

// client.connect()

// // BodyParser: This is used to handle conversion to and from json
// const bodyParser = require("body-parser");
// app.use(bodyParser.json());