const express = require("express")
const User = require("../service/UserService")
let router = express.Router()


// 登录
router.post('/login', (req, res) => {
  var { account, password } = req.body
  User.login(account, password, data => {
    if(data.success){
      res.json(data)
    } else {
      res.json(data)
    }
  })
})

// 注册
router.post('/register', (req, res) => {
  var {account, password} = req.body
  User.addUser(account, password, (data) => {
    if(data.serverStatus == 2){
      res.json({success: true, msg: '注册成功！'})
    } else if(!data.success){
      res.json(data)
    }
  })
})

// 获取个人信息
router.get('/getmyinfo', (req, res) => {
  let userId = req.query && req.query.id
  User.getUserInfo(userId, data => {
    if(data.success){
      res.json({success: true, msg: 'Query OK!', data: data.data})
    } else {
      res.json({success: false, msg: '没有找到对应的用户！', data: null})
    }
  })
})

// 修改个人基本信息
router.post('/altermybaseinfo', (req, res) => {
    let {id, ...args} = req.body
    User.alterUserBaseInfo(id, args, data => {
      res.json(data)
    })
})

// 修改个人标签
router.post('/alterusertags', (req, res) => {
  let {id, tags} = req.body
  User.alterUserTags(id, tags, data => {
    res.json({success: true, msg: "Query OK!", data: null})
  })
})

module.exports = router