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

// 获取队友的信息
router.get('/getmemberinfo', (req, res) => {
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

// 设置用户的头像， 获取微信头像之后调用此接口存储 imgUrl
router.post('/setuseravatar', (req, res) => {
  let {id, imgUrl} = req.body
  console.log(req.body)
  User.setUserAvatar(id, imgUrl, data => {
    console.log(data)
  })
})

// 获取个人基本信息
router.get('/getuserbaseinfo', (req, res) => {
  let userId = req.query.id
  console.log(userId)
  User.getUserBaseInfo(userId, data => {
    if(data.success){
      res.json({success: true, code : 1, data: data.data})
    }
  })
})

router.get("/test", (req, res) => {
  let result = {success: true, code: 1, msg: 'request ok'}
  res.writeHead(200)
  res.write(JSON.stringify(result))
  res.end()
})

router.post("/addmyteam", (req, res) => {
  let {userid, teamid} = req.body
  User.addMyTeam(userid, teamid, data => {
    if(data.success){
      res.json({success: true, code: 1, data: data.msg})
    }else{
      res.json({success: false, code: -1, data: data.msg})
    }
  })
})

module.exports = router