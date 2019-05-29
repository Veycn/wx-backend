const MsgDao = require("../dao/MessageDao")
const UserDao = require("../dao/UserDao")
const TeamDao = require("../dao/TeamDao")
const Util = require("../Utils")

function createPersonalMsg(competition, requirements, userid, cando, callback) {
  MsgDao.addPersonalMsg(competition, requirements, userid, cando, data => {
    if (data.affectedRows) {
      callback(Util.Write(true, 'ok'))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function queryAllPersonalMsg(callback) {
  MsgDao.getAllPersonalMsg(data => {
    if (data.length) {
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, '没有查找到相关数据'))
    }
  })
}

function queryInterestedPersonInfo(id, callback) {
  UserDao.queryUserById(id, data => {
    if (data.length) {
      let { id, school, name, major, grade, tag, competition, team } = data[0]
      let info = { id, school, name, major, grade, tag, competition, team }
      callback(Util.Write(true, info))
    } else {
      callback(Util.Write(false, '没有查找到相关数据'))
    }
  })
}

function sendInvitationToPerson(userid, teamid, flag, sender, reciver, callback) {
  MsgDao.addMessage(userid, teamid, flag, sender, reciver, data => {
    if (data.affectedRows) {
      callback(Util.Write(true, "ok"))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function queryPersonalInvitation(params, callback) {
  MsgDao.queryPersonalInvitation(params, data => {
    if (data.length) {
      // 遍历每一条邀请
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, '没有查询到相关信息， 或者查询失败！'))
    }
  })
}

function ensureCanJoin(teamid, callback) {
  TeamDao.queryTeamById(teamid, data => {
    if (data.length) {
      let { members, number } = data[0]
      let current = members.replace(/\，/g, ",").split(",").length + 1
      current < number ?
        callback(Util.Write(true, { canJoin: true })) :
        callback(Util.Write(true, { canJoin: false }))
    } else {
      callback(Util.Write(false, "查询失败！"))
    }
  })
}

function deleteMsg(msgId, callback) {
  MsgDao.removeMsg(msgId, data => {
    if (data.affectedRows) {
      callback(Util.Write(true, { data: "删除成功！" }))
    } else {
      callback(Util.Write(false, { data: "删除失败！" }))
    }
  })
}


function createTeamMsg(teamid, info, callback) {
  MsgDao.queryTeamMsgByTeamId(teamid, data => {
    if (data.length) { // 这个队伍的id已经存在， 不允许再创建多余的消息
      callback(Util.Write(false, "已经有招募信息了， 不允许再创建！"))
    } else {
      MsgDao.addTeamRecruitMsg(info, data => {
        if (data.affectedRows) {
          callback(Util.Write(true, "发表成功！"))
        } else {
          callback(Util.Write(false, "发表失败！"))
        }
      })
    }
  })
}

function queryAllTeamRecruitMsg(callback) {
  MsgDao.queryAllTeamRecruitMsg(data => {
    if (data.length) {
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, "Query Faild!"))
    }
  })
}

function sendApplyToLeader(userid, teamid, flag, callback) {
  MsgDao.queryAllPeronalApply(teamid, data => {
    if (data.length) {
      let mark = false
      data.forEach(item => {
        if (item.userid == userid) {
          mark = true
          callback(Util.Write(false, "你已经申请过了， 不能重复申请！"))
          return
        }
      })
      if (mark) {
        return
      } else {
        MsgDao.addMessage(userid, teamid, flag, data => {
          if (data.affectedRows) {
            callback(Util.Write(true, "Add Success"))
          } else {
            callback(Util.Write(false, "Add Faild"))
          }
        })
      }
    }
  })
}

/**
 * 队长根据本队伍的队伍id查询关于本队伍的所有申请
 * 方便起见，查询了所有申请者的基本信息返回
 * 队长在查看申请页面可以点击申请者的item查看
 * @param {队伍id} teamid 
 * @param {回调函数} callback 
 */
function queryAllMyTeamApply(teamid, callback) {
  MsgDao.queryAllPeronalApply(teamid, data => {
    let length;
    if (length = data.length) {
      let userArray = []
      data.forEach((item, index) => {
        let userid = item.userid
        UserDao.queryUserById(userid, data => {
          if (data.length) {
            let userInfo = {}
            let { id, school, name, major, grade, tag, competition, team, image } = data[0]
            userInfo = { id, school, name, major, grade, tag, competition, team, image }
            userArray.push(userInfo)
          } else {
            callback(Util.Write(false, "Query Faild!")) 
          }
          if(index === length - 1) callback(Util.Write(true, userArray))
        })
      })
    }else {
      callback(Util.Write(false, null))
    }
  })
}
module.exports = {
  createPersonalMsg,
  createTeamMsg,
  queryAllPersonalMsg,
  queryAllTeamRecruitMsg,
  queryInterestedPersonInfo,
  queryPersonalInvitation,
  queryAllMyTeamApply,
  sendInvitationToPerson,
  sendApplyToLeader,
  ensureCanJoin,
  deleteMsg
}