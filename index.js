const express = require("express")
const bodyParser = require("body-parser")
const user = require("./routes/user")
const race = require("./routes/race")
const app = express()

app.use(bodyParser.json())        // 解析 json
app.use(bodyParser.urlencoded())  // 解析 x-www-form-urlencoded

app.get("/test", (req, res) => {
  res.json({name: 'vey', age: 21, sex: 'male'})
})

app.use('/user', user)
app.use('/race', race)




const port = process.env.PORT | 9009
app.listen(port, () => {
  console.log(`server is runing at ${port}`)
})