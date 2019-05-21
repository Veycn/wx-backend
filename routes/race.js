const express = require("express")
const Race = require("../service/RaceService")
const Util = require("../Utils")
let router = express.Router()


//   `id` INT NOT NULL AUTO_INCREMENT,
//   `name` VARCHAR(60) NOT NULL,
//   `hosts` VARCHAR(100) NULL,
//   `need` INT NOT NULL,
//   `keywords` VARCHAR(50) NOT NULL,
//   `signup1` DATETIME NOT NULL,
//   `signup2` DATETIME NOT NULL,
//   `time1` DATETIME NOT NULL,
//   `time2` DATETIME NOT NULL,
//   `web` VARCHAR(256) NULL,
//   `fileurl` VARCHAR(256) NULL,
//   `level` VARCHAR(10) NOT NULL,
//   `description` TEXT(300) NULL,
//   `img` VARCHAR(256) NOT NULL,

// 添加一个新的比赛
router.post('/addrace', (req, res) => {
  let race = req.body
  let raceInfo = new Array()
  for(let prop in race){
    raceInfo.push(race[prop])
  }
  // console.log(arr)
  Race.addRace(raceInfo, data => {
    if(data.success){
      Util.Result(res, 200, data)
    }else{
      Util.Result(res, 404, data)
    }
  })
})

// 获取所有的比赛信息
router.get('/queryallrace', (req, res) => {
  Race.queryAllRace(data => {
    if(data.success){
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, data)
    }
  })
})

// 修改比赛信息
router.post("/alterraceinfo", (req, res) => {
  let id = req.body.id
  let RaceInfo = req.body
  let newRaceInfo = new Array()
  for(let prop in RaceInfo){
    if(prop == 'id') continue
    newRaceInfo.push(RaceInfo[prop])
  } 
  Race.alterRaceInfo(id, newRaceInfo, data => {
    if(data.success){
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, data)
    }
  })
})

// 获取某个类型的比赛
router.get('/queryallracebytype', (req, res) => {
  let type = req.query.type
  Race.queryRaceByType(type, data => {
    if(data.success){
      Util.Result(res, 200, data.data)
    } else {
      Util.Result(res, 404, null)
    }
  })
})

// 获取某个等级的比赛
router.get('/queryallracebylevel', (req, res) => {
  let level = req.query.level
  Race.queryRaceByLevel(level, data => {
    if(data.success){
      Util.Result(res, 200, data.data)
    } else {
      Util.Result(res, 404, null)
    }
  })
})

module.exports = router