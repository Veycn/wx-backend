const TeamDao = require("../dao/TeamDao")
const Util = require("../Utils")

// 创建一个队伍
function createTeam(teamInfo, callback){
  TeamDao.createTeam(teamInfo, data => {
    if(data.affectedRows){
      callback(Util.Write(true, null))
    }else {
      callback(Util.Write(false, null))
    }
  })
}

// 通过 id 查询队伍信息
function queryTeamById(teamId, callback){
  TeamDao.queryTeamById(teamId, data => {
    if(data.length){
      callback(Util.Write(true, data))
    }else {
      callback(Util.Write(false, null))
    }
  })
}

// 向队伍添加成员
function addTeamMember(teamId, userid, callback){
  // TeamDao.addTeamMember()
  // 先将已有成员查出来
  TeamDao.queryTeamMember(teamId, data => {
    if(data.length){
      let { members, leader } = data[0]
      console.log(data[0], leader==userid)
      if(leader == userid){
        callback(Util.Write(true, "别傻了， 你是队长～"))
        return
      }
      let temp = members == '' ? `${userid}`:`${members},${userid}`
      temp = temp.replace(/\，/g, ",").split(",")
      temp = [...new Set(temp)].join(",")
      TeamDao.addTeamMember(teamId, temp, data => {
        if(data.affectedRows){
          callback(Util.Write(true, "添加成功！"))
        } else {
          callback(Util.Write(true, "添加失败！"))
        }
      })
    }else{
      callback(Util.Write(false, "查询失败！"))
    }
  })
}


module.exports = {
  createTeam,
  queryTeamById,
  addTeamMember
}

