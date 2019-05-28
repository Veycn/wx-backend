const express = require("express")
const Msg = require("../service/MessageService")
const Team = require("../service/TeamService")
const Util = require("../Utils")
const User = require("../service/UserService")
let router = express.Router()

// 创建一条新的个人需求
router.post('/createpersonalmsg', (req, res) => {
  let { competition, requirements, userid, cando } = req.body
  Msg.createPersonalMsg(competition, requirements, userid, cando, data => {
    if (data.success) {
      Util.Result(res, 200, { data: null, code: 1, msg: "OK" })
    } else {
      Util.Result(res, 404, data)
    }
  })
})
// 根据 id 删除个人需求

// 根据 id 修改个人需求

// 查询所有的个人需求
router.get('/queryallpersonalmsg', (req, res) => {
  Msg.queryAllPersonalMsg(data => {
    if (data.success) {
      Util.Result(res, 200, data)
    } else
      Util.Result(res, 404, data)
  })
})
// 根据类型查询个人需求


// ==========================

// 创建一条新的团队需求

router.post('/createteammsg', (req, res) => {
  // let {teamid, requirement, advantage, leader} = req.body
  let info = [], { teamid } = req.body
  for (let prop in req.body) {
    info.push(req.body[prop])
  }
  Msg.createTeamMsg(teamid, info, data => {
    if (data.success) {
      res.json({ success: true, code: 1, msg: data.data })
    } else {
      res.json({ success: false, code: -1, msg: data.data })
    }
  }) 
})

// 根据 id 删除团队需求

// 根据 id 修改团队需求

// 查询所有的团队需求
router.get("/getallteammsg", (req, res) => {
  Msg.queryAllTeamRecruitMsg(data => {
    if (data.success) {
      res.json({ success: true, code: 1, data })
    } else {
      res.json({ success: true, code: 1, data })
    }
  })
})

// 根据类型查询团队需求

// ===========================

// 将与某人相关的邀请

/**
 * 队伍队长拉取到个人需求列表， 对某个人感兴趣
 * 列表数据有这个人的id
 * 通过id去查询这个人的信息， 进一步确认这个人是不是符合要求
 * 但是拿到的不是所有的信息， 比如没有联系方式
 */
router.get("/queryinterstedpersoninfo", (req, res) => {
  let id = req.query.id
  Msg.queryInterestedPersonInfo(id, data => {
    if (data.success) {
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, "没有查询到相关信息！")
    }
  })
})

/**
 * 队长看到这个人详细的信息之后，觉得这个人确实比较适合队伍的需要
 * 就尝试给他发一条邀请
 */

router.post("/sendinvitationtoperson", (req, res) => {
  let { userid, teamid, flag, sender, reciver } = req.body
  Msg.sendInvitationToPerson(userid, teamid, flag, sender, reciver, data => {
    if (data.success) {
      Util.Result(res, 200, data)
    } else {
      Util.Result(res, 404, { success: false, data: "发送失败！" })
    }
  }) 
})
/**
 * 查询所有关于我的邀请 个人
 */
router.get('/getallmyinvitation', (req, res) => {
  let { id, flag } = req.query
  Msg.queryPersonalInvitation([id, flag], data => {
    if (data.success) {
      res.json({success: true, code: 1, data: data.data})
    } else {
      res.json({success: false, code: -1, data: data.data})
    }
  })
})
 
/**
 * 回应队伍队长的邀请
 */
router.post('/replayteaminvitation', (req, res) => {
  let { inviteId, type, teamid, userid } = req.body
  if (+type) {  // 同意 type = 1
    Msg.ensureCanJoin(teamid, data => {
      if (data.success && data.data.canJoin) {
        Team.addTeamMember(teamid, userid, data => {
          if (data.success) {
            console.log(data)
            Util.Result(res, 200, { success: true, data: data.data })
            Msg.deleteMsg(inviteId, data => { })
          }
        })
      } else if (data.success && !data.data.canJoin) {
        Util.Result(res, 404, { success: false, data: "对不起， 你不能加入该队伍！" })
        Msg.deleteMsg(inviteId, data => { })
      }
    })
  } else { // 拒绝 type = 0
    Msg.deleteMsg(inviteId, data => { })
  }
})

/**
 * 个人查看团队信息，希望加入某人的团队
 * 向队长发送申请
 */
router.post('/sendapplytoleader', (req, res) => {
  let { teamid, userid, flag } = req.body
  Msg.sendApplyToLeader(userid, teamid, flag, data => {
    if (data.success) {
      res.json({ success: true, code: 1, msg: data.data })
    } else {
      res.json({ success: false, code: -1, msg: data.data })
    }
  })
})
/**
 * 队长查询所有的关于本队伍的申请
 */
router.get('/getallmyteamapply', (req, res) => {
  let { teamid } = req.query
  Msg.queryAllMyTeamApply(teamid, data => {
    if (data.success) {
      res.json({ success: true, code: 1, data })
    } else {
      res.json({ success: false, code: -1, data })
    }
  })
})

/**
 * 队长回应加入队伍的申请 
 *  同意： 将申请人加入队伍， 删除msg
 *  拒绝： 删除msg
 * */

router.post('/replypersonaplly', (req, res) => {
  let { teamid, userid, msgid, type } = req.body
  if (+type) {  // 同意 type = 1
    Msg.ensureCanJoin(teamid, data => {
      if (data.success && data.data.canJoin) {
        Team.addTeamMember(teamid, userid, data => {
          if (data.success) {
            Util.Result(res, 200, { success: true, data: data.data })
            Msg.deleteMsg(msgid, data => { })
          }
        })
      } else if (data.success && !data.data.canJoin) {
        Util.Result(res, 404, { success: false, data: "对不起，你的队伍人数已满！" })
        Msg.deleteMsg(msgid, data => { })
      }
    })
  } else { // 拒绝 type = 0
    Msg.deleteMsg(msgid, data => { })
  }
})

router.get('/getmembersinfo', (req, res) => {
  let members = req.query.members
  members = members.split(',')
  let result = []
  for(let i = 0, len = members.length; i < len; i++){
    User.getUserInfo(members[i], data => {
      if(data.success){ 
        result.push(data.data)
      }
      if(i == len - 1){
        res.json({success: true, data: result})
      }
    })
  }
})

router.get('/deletemsg', (req, res) => {
  let msgId = req.query.msgId
  Msg.deleteMsg(msgId, data => {
    if(data.success){
      res.json({success: true, code: 1, data: data.data})
    }else{
      res.json({success: false, code: -1, data: data.data})
    }
  })
})

module.exports = router