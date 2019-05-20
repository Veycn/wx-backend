const DBUtil = require("./DBUtil")

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

// 获取所有的比赛
function queryAllRace(callback){
  let sql = 'select * from table race;'
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


module.exports = {
  queryAllRace,
  queryRaceById,
  queryRaceByName,
  deleteRaceById,
  alterRace
}