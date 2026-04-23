let mysql = require('mysql')

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
})

connection.connect(function(err){
    if(err) throw err
    console.log("Connected to database")
})

function GetUsers(){
    connection.query('SELECT * FROM `users`', function(err, result){
        if (err) throw err
        if (result) return result
    })
}