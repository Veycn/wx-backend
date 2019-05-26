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
  let sql = 'select * from team where id=?;'
  let params = [teamId]
  DBUtil.Query(sql, params, success)
}

function queryTeamMember (teamid, success) {
  let sql = "select members, leader from team where id = ?;"
  let params = [teamid]
  DBUtil.Query(sql, params, success)
}

function createTeam (teamInfo, callback) {
  let sql = 'insert into team (name, number, leader, competition) values (?,?,?,?);'
  let params = [...teamInfo]
  DBUtil.Query(sql, params, callback)
}

function removeTeam(teamId){
  let sql = ''
  let params = [teamId]
  DBUtil.Query(sql, params, success)
}

function addTeamMember (teamid, members, success) {
  let sql = "update team set members = ? where id = ?;"
  let params = [members, teamid]
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
  queryTeamMember,
  addTeamMember,
  createTeam,
  removeTeamMember,
  removeTeam,
}
