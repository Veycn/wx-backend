const mysql = require("mysql")

function createConnection () {
  return mysql.createConnection({
    host: 'localhost',
    database: 'race',
    user: 'root',
    password: 'vey.',
    port: 3306,
  })
}

function Query (sql, params, success){
  const connection = createConnection()
  connection.connect()
  connection.query(sql, params, (err, res) => {
    if(!err){
      success(res)
    } else {
      throw new Error('Query Error! ' + err)
    }
  })
  connection.end()
}

module.exports.Query = Query