const { Client } = require("pg");
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

    const query = new Query("SELECT * FROM gvi limit 10")
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

