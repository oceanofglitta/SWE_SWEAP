const express = require("express"); 
const app = express();
const port = 8082; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용

 var connection = mysql.createConnection({
     host : "18.118.194.10:3306",
     user : "sweap", //mysql의 id
     password : "sweappassword", //mysql의 password
     database : "sweapdb", //사용할 데이터베이스
 });

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/SQL1", (req,res)=>{
    const post = req.body.query;

    connection.query(post,
    function(err,rows,fields){
        if(err){
            console.log("전송 실패");
        }else{
            console.log("전송 성공");
            console.log(rows[0]);
            res.send(rows[0]);
        };
    });    
});
app.post("/SQL2", (req,res)=>{
    const post = req.body.query;

    connection.query(post,
    function(err,rows,fields){
        if(err){
            console.log("전송 실패");
        }else{
            console.log("전송 성공");
            //console.log(rows[0]);
            res.send(rows);
        };
    });    
});
app.listen(port, ()=>{
    console.log(`Connect at http://3.144.158.36:${port}`);
})