const DBUtil = require("./DBUtil")

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

// 获取所有的比赛
function queryAllRace(callback){
  let sql = 'select * from competition;'
  let params = []
  DBUtil.Query(sql, params, callback)
}

// 通过名字查找比赛
function queryRaceByName(raceName, callback){
  let sql = 'select * from table race;'
  let params = [raceName]
  DBUtil.Query(sql, params, callback)
}

// 通过id查找比赛
function queryRaceById(raceId, callback){
  let sql = 'select * from table race where id=?;'
  let params = [raceId]
  DBUtil.Query(sql, params, callback)
}

// 通过id删除比赛
function deleteRaceById(raceId, callback){
  let sql = ''
  let params = [raceId]
  DBUtil.Query(sql, params, callback)
}

// 修改比赛信息
function alterRace(raceId, raceName, ...args){

}

// 添加比赛信息
function addRace(raceInfo, callback){
  let sql = `insert into competition 
    (name, hosts, need, keywords, signup1, signup2, time1, time2, web, fileurl, level, description, img)
    values (?,?,?,?,?,?,?,?,?,?,?,?,?);
  `
  let params = [...raceInfo]
  DBUtil.Query(sql, params, callback)
}

// 修改比赛信息
function alterRaceInfo(id, newRaceInfo, callback){
  let sql =  `update competition set
    name = ?, hosts = ?, need = ?, keywords = ?,
    signup1 = ?, signup2 = ?, time1 = ?, time2 = ?,
    web = ?, fileurl = ?, level = ?, description = ?,
    img = ? where id = ?;
  `
  let params = [...newRaceInfo, id]
  DBUtil.Query(sql, params, callback)
}

function queryRaceByType(type, callback){
  let sql = `select * from competition where keywords like ?;`
  let params = [`%${type}%`]
  DBUtil.Query(sql, params, callback)
}

function queryRaceByLevel(level, callback){
  let sql = `select * from competition where level like ?;`
  let params = [`%${level}%`]
  DBUtil.Query(sql, params, callback)
}

module.exports = {
  queryAllRace,
  queryRaceById,
  queryRaceByName,
  queryRaceByType,
  queryRaceByLevel,
  deleteRaceById,
  alterRaceInfo,
  addRace
}