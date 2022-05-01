const { Client } = require("pg"); 
const Query = require('pg').Query

var client = new Client({ 
  user : 'user name', 
  host : 'host name', 
  database : 'postgres', 
  password : 'password', 
  port : 5432, 
})

client.connect()
client.connect(err => { 
  if (err) { 
    console.log('Error:(' + err) 
  } else { 
    console.log('Success:)') 
  } 
})

router.get('/read', function(req, res, next) { 
  const query = new Query("SELECT * FROM users") 
  client.query(query) 
  
  var rows = []; 

  // row : 데이터 가져오기
  query.on("row",row => { 
    rows.push(row); 
  }); 
  
  // end : 검색할 때 발생한 각종 정보
  query.on('end', () => { 
    console.log(rows); 
    console.log('query done') 
    res.send(rows); 
    res.status(200).end(); 
  }); 
  
  // error : 오류 발생 시
  query.on('error', err => { 
    console.error(err.stack) 
  }); 
});
  

