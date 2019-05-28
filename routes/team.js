const express = require("express")
const Team = require("../service/TeamService")
const Util = require("../Utils")
let router = express.Router()

// 创建一个队伍
router.post('/createteam', (req, res) => {
  let teamInfo = req.body
  let {leader, competition} = req.body
  let newTeamInfo = new Array()
  for(let prop in teamInfo){
    newTeamInfo.push(teamInfo[prop])
  }
  Team.createTeam(leader, competition, newTeamInfo, data => {
    if(data.success){
      res.json({success: true, code: 1, msg: '创建成功！' , data: data.data})
    } else {
      res.json({success: false, code: -1, msg: '队伍已经创建！', data: data.data})      
    }
  })
})

// 根据 id 查询队伍信息 未测
router.get("/queryteambyid", (req, res) => {
  let teamId = req.query.id
  console.log(req.query) 
  Team.queryTeamById(teamId, data => {
    if(data.success){
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, data)
    }
  })
})

// 查询我所有的队伍

router.get('/queryallmyteam', (req, res) => {
  let id = req.query.id
  Team.queryAllMyTeam(id, data => {
    if(data.success){
      res.json({success: true, code: 1, data: data.data})
    }else{
      res.json({success: false, code: -1, data: null})
    }
  })
})

router.post('/addteammember', (req, res) => {
  let { teamid, userid } = req.body
  Team.addTeamMember(teamid, userid, data => {
    if(data.success){
      res.json({success: true, code: 1, data: data.data})
    }else{
      res.json({success: false, code: -1, data: data.data})
    }
  })
})


module.exports = router