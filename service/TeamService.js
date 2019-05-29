const TeamDao = require("../dao/TeamDao")
const userDao = require("../dao/UserDao")
const Util = require("../Utils")

// 创建一个队伍
function createTeam(leader, competition, teamInfo, callback) {
  TeamDao.queryTeamByleader(leader, data => {
    if (data.length) {
      let flag = true
      for(let i = 0; i < data.length; i++){
        let item = data[i]
        let comp = item.competition
        let teamid = item.id
        console.log("teamid = "+teamid)
        if (competition == comp) {
          callback(Util.Write(false, {...item}))
          flag = false
          return
        }
      }
      if (flag) {
        TeamDao.createTeam(teamInfo, data => {
          if (data.affectedRows) {
            // 将新创建的队伍添加到leader的队伍列表
            userDao.queryUserById(leader, data => {
              if (data.length) {
                let { team } = data[0]
                team = team.split(',')
                TeamDao.queryTeamByleader(leader, data => {
                  if (data.length) {
                    let curTeam = data[data.length - 1]
                    let teamid = curTeam.id
                    team.push(teamid)
                    team = team.join(",")
                    userDao.alterTeamInfo(leader, team+"", data => {
                      if (data.affectedRows) {
                        callback(Util.Write(true, {...curTeam}))
                      }
                    })
                  }
                })
              }
            })
            //callback(Util.Write(true, null))
          }
        })
      }
    }
  })
}

// 通过 id 查询队伍信息
function queryTeamById(teamId, callback) {
  TeamDao.queryTeamById(teamId, data => {
    if (data.length) {
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

// 向队伍添加成员
function addTeamMember(teamId, userid, callback) {
  // TeamDao.addTeamMember()
  // 先将已有成员查出来
  TeamDao.queryTeamMember(teamId, data => {
    if (data.length) {
      let { members, leader } = data[0]
      console.log(data[0], leader == userid)
      if (leader == userid) {
        callback(Util.Write(true, "别傻了， 你是队长～"))
        return
      }
      let temp = members == '' ? `${userid}` : `${members},${userid}`
      temp = temp.replace(/\，/g, ",").split(",")
      temp = [...new Set(temp)].join(",")
      TeamDao.addTeamMember(teamId, temp, data => {
        if (data.affectedRows) {
          callback(Util.Write(true, "添加成功！"))
        } else {
          callback(Util.Write(true, "添加失败！"))
        }
      })
    } else {
      callback(Util.Write(false, "查询失败！"))
    }
  })
}

function queryAllMyTeam(id, callback){
  userDao.queryUserById(id, data => {
    if(data.length){
      let {team} = data[0]
      team = team.split(",")
      let arr = []
      for(let i = 0; i < team.length; i++){
        TeamDao.queryTeamById(team[i], data => {
          if(data.length){
            arr.push(data[0]) 
          }
          if(i == team.length - 1){
            callback(Util.Write(true, arr))
          }
        })
      }
    }else{
      callback(Util.Write(false, null))
    }
  })
}

module.exports = {
  createTeam,
  queryTeamById,
  addTeamMember,
  queryAllMyTeam
}

