const RaceDao = require("../dao/RaceDao")
const Util = require("../Utils")

function queryAllRace(callback) {
  RaceDao.queryAllRace(data => {
    if (data.length) {
      data.forEach(item => {
        let { signup1, signup2, time1, time2 } = item
        item.signup1 = Util.formatTime(signup1)
        item.signup2 = Util.formatTime(signup2)
        item.time1 = Util.formatTime(time1)
        item.time2 = Util.formatTime(time2)
      })
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function addRace(raceInfo, callback) {
  RaceDao.addRace(raceInfo, data => {
    if (data.affectedRows) {
      callback(Util.Write(true, null))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function alterRaceInfo(id, newRaceInfo, callback) {
  RaceDao.alterRaceInfo(id, newRaceInfo, data => {
    if (data.affectedRows) {
      callback(Util.Write(true, null))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function queryRaceByType(type, callback) {
  RaceDao.queryRaceByType(type, data => {
    if (data.length) {
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}

function queryRaceByLevel(level, callback) {
  RaceDao.queryRaceByLevel(level, data => {
    if (data.length) {
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}


// 查询最近的比赛信息
function queryRecentRaces(callback) {
  RaceDao.queryRecentRaces(data => {
    if (data.length) {
      data.forEach(item => {
        let { signup1, signup2, time1, time2 } = item
        item.signup1 = Util.formatTime(signup1)
        item.signup2 = Util.formatTime(signup2)
        item.time1 = Util.formatTime(time1)
        item.time2 = Util.formatTime(time2)
      })
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, null))
    }
  })
}
// 根据id查询比赛信息

function queryRaceById(raceid, callback) {
  RaceDao.queryRaceById(raceid, data => {
    if (data.length) {
      let { signup1, signup2, time1, time2 } = data[0]
      data[0].signup1 = Util.formatTime(signup1)
      data[0].signup2 = Util.formatTime(signup2)
      data[0].time1 = Util.formatTime(time1)
      data[0].time2 = Util.formatTime(time2)
      callback(Util.Write(true, data))
    } else {
      callback(Util.Write(false, "Query Faild! Not Found~"))
    }
  })
}

module.exports = {
  queryAllRace,
  queryRaceByType,
  queryRaceByLevel,
  queryRecentRaces,
  queryRaceById,
  addRace,
  alterRaceInfo
}