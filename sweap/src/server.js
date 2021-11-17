const express = require("express"); 
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

var connection = mysql.createConnection({
    host : "localhost",
    user : "root", //mysql의 id
    password : "0527", //mysql의 password
    database : "sweapdb", //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) =>{
    res.send('혁이는 코딩 중!')
})

app.post("/TRANSACTION", (req,res)=>{
    const post = req.body.query;

    connection.query(post,
    function(err,rows,fields){
        if(err){
            console.log("전송 실패");
        }else{
            console.log("전송 성공");
            res.send(rows[0])
        };
    });

    
});

app.listen(port, ()=>{
    console.log(`Connect at http://localhost:${port}`);
})