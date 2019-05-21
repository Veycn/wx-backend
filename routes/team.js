const express = require("express")
const Team = require("../service/TeamService")
const Util = require("../Utils")
let router = express.Router()

// 创建一个队伍
router.post('/createteam', (req, res) => {
  let teamInfo = req.body
  let newTeamInfo = new Array()
  for(let prop in teamInfo){
    newTeamInfo.push(teamInfo[prop])
  } 
  Team.createTeam(newTeamInfo, data => {
    if(data.success){
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, data)
    }
  })
})







module.exports = router