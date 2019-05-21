const TeamDao = require("../dao/TeamDao")
const Util = require("../Utils")

function createTeam(teamInfo, callback){
  TeamDao.createTeam(teamInfo, data => {
    if(data.affectedRows){
      callback(Util.Write(true, null))
    }else {
      callback(Util.Write(false, null))
    }
  })
}


module.exports = {
  createTeam
}

