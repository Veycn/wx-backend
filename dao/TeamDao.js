const DBUtil = require("./DBUtil")

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

function queryTeamByName(teamName, success){
  let sql = 'select * from team where teamName=?;'
  let params = [teamName]
  DBUtil.Query(sql, params, success)
}

function queryTeamById(teamId, success){
  let sql = 'select * from team where teamId=?;'
  let params = [teamId]
  DBUtil.Query(sql, params, success)
}

function createTeam () {
  let sql = ''
  let params = []
  DBUtil.Query(sql, params, success)
}

function removeTeam(teamId){
  let sql = ''
  let params = [teamId]
  DBUtil.Query(sql, params, success)
}

function addTeamMember (memberId, success) {
  let sql = ''
  let params = [memberId]
  DBUtil.Query(sql, params, success)
}

function removeTeamMember (memberId, success) {
  let sql = ''
  let params = [memberId]
  DBUtil.Query(sql, params, success)
}

module.exports = {
  queryTeamById,
  queryTeamByName,
  addTeamMember,
  createTeam,
  removeTeamMember,
  removeTeam,
}
