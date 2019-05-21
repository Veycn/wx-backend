const RaceDao = require("../dao/RaceDao")
const Util = require("../Utils")

function queryAllRace(callback){
  RaceDao.queryAllRace(data => {
    if(data.length){
      callback(Util.Write(true, data))
    }else {
      callback(Util.Write(false, null))
    }
  })
}

function addRace(raceInfo, callback){
  RaceDao.addRace(raceInfo, data => {
    if(data.affectedRows){
      callback(Util.Write(true, null))
    }else{
      callback(Util.Write(false, null))
    }
  })
}

function alterRaceInfo(id, newRaceInfo, callback){
  RaceDao.alterRaceInfo(id, newRaceInfo, data => {
    if(data.affectedRows){
      callback(Util.Write(true, null))
    } else{
      callback(Util.Write(false, null))
    }
  })
}

function queryRaceByType(type, callback){
  RaceDao.queryRaceByType(type, data => {
    if(data.length){
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function queryRaceByLevel(level, callback){
  RaceDao.queryRaceByLevel(level, data => {
    if(data.length){
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

module.exports = {
  queryAllRace,
  queryRaceByType,
  queryRaceByLevel,
  addRace,
  alterRaceInfo
}