const DBUtil = require("./DBUtil")

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

// 获取所有的个人意向
function getAllPersonalMsg(callback){
  let sql = ''
  let params = []
  DBUtil.Query(sql, params, callback)
}

// 获取所有的团队招募信息
function getAllPersonalMsg(callback){
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
function addPersonalMsg(){

}

// 添加团队招募信息
function addTeamRecruitMsg(){

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
  let sql = ''
  let params = []
  DBUtil.Query(sql, params, callback)
}

module.exports = {
  queryMsgById,
  alterMsg,
  removeMsg,
  getAllMsg
}