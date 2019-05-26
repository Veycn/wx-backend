const DBUtil = require("./DBUtil")

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

// 获取所有的个人意向
function getAllPersonalMsg(callback){
  let sql = "select * from findgroup;"
  let params = []
  DBUtil.Query(sql, params, callback)
}

// 获取所有的团队招募信息
function getAllTeamMsg(callback){
  let sql = ''
  let params = []
  DBUtil.Query(sql, params, callback)
}
// 通过 id 查找信息
function queryMsgById(msgId, callback){
  let sql = ''
  let params = [msgId]
  DBUtil.Query(sql, params, callback)
}

// 添加个人意向
function addPersonalMsg(competition, requirements, userid,cando, callback){
  let sql = "insert into findgroup (competition, requirements, userid, cando) values (?,?,?,?);"
  let params = [competition, requirements, userid,cando]
  DBUtil.Query(sql, params, callback)
}

// 添加团队招募信息
function addTeamRecruitMsg(info, callback){
  let sql = "insert into findmembers (teamid, requirements, advantage, leader, competition) values (?,?,?,?,?);"
  let params = [...info]
  DBUtil.Query(sql, params, callback)
}

// 修改个人意向
function alterPersonalMsg (msgId, [], callback){
  let sql = ''
  let params = [msgId]
  DBUtil.Query(sql, params, callback)
}

// 修改团队招募信息
function alterTeamRecruitMsg(){

}

// 移除某一条信息
function removeMsg(msgId, callback){
  let sql = "delete from message where id = ?;"
  let params = [msgId]
  DBUtil.Query(sql, params, callback)
}

/**
 * 向消息表里面添加一条记录， 根据flag的不同， 这条消息的意义也不同
 * 
 * message表中flag取值及其意义
 * 
 * 1: 个人申请加入队伍
 * 2: 个人拒绝队伍队长的邀请
 * 3: 个人同意队伍队长的邀请
 * 
 * 4: 队伍队长邀请个人加入队伍
 * 5: 队伍队长拒绝个人加入队伍的请求
 * 6: 队伍队长同意个人加入队伍的请求
 * 
 * -1: 队伍成员已满
 */
function addMessage(userid, teamid, flag, sender, reciver, callback){
  let sql = "insert into message (userid, teamid, flag, sender, reciver) values (?,?,?,?,?);"
  let params = [userid, teamid, flag, sender, reciver]
  DBUtil.Query(sql, params, callback)
}

function queryPersonalInvitation(params, callback){
  let sql = "select * from message where userid = ? and flag = ?;"
  DBUtil.Query(sql, params, callback)
}

function queryTeamMsgByTeamId(teamid, callback){
  let sql = "select * from findmembers where teamid = ?;"
  let params = [teamid]
  DBUtil.Query(sql, params, callback)
}

function queryAllTeamRecruitMsg(callback){
  let sql = "select * from findmembers;"
  let params = []
  DBUtil.Query(sql, params, callback)
}

function queryAllPeronalApply(teamid, callback){
  let sql = "select * from message where flag = 1 and teamid = ?;"
  let params = [teamid]
  DBUtil.Query(sql, params, callback)
}

module.exports = { 
  queryMsgById,
  queryPersonalInvitation,
  queryTeamMsgByTeamId,
  queryAllTeamRecruitMsg,
  queryAllPeronalApply,
  alterPersonalMsg,
  getAllPersonalMsg,
  addPersonalMsg,
  addMessage,
  removeMsg,
  addTeamRecruitMsg
}