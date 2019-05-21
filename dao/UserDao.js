const DBUtil = require('./DBUtil')

/* 
  只写最简单的增删改查， 具体的事务逻辑交给 service
*/

// 通过 id 查找用户
function queryUserById (userid, callback) {
  let sql = "select * from users where id = ?;"
  let params = [userid]
  DBUtil.Query(sql, params, callback)
}

// 通过账号查询用户， 登陆的时候验证密码时使用，返回用户的所有信息
function queryUserByAccount (account, callback) {
  let sql = "select * from users where account = ?;"
  let params = [account]
  DBUtil.Query(sql, params, callback)
}

// 通过名字查询用户, 返回用户的所有信息
function queryUserByName(userName, callback){
  let sql = "select * from users where name = ?;"
  let params = [userName]
  DBUtil.Query(sql, params, callback)
}

// 添加用户， 在注册的时候使用
function addUser (account, password, callback) {
  let sql = "insert into users (account, password) values (?, ?);"
  let params = [account, password]
  DBUtil.Query(sql, params, callback)
}

// 修改个人信息, 完善个人信息时使用
function alterUserBaseInfo (id, userInfo, callback) {
  let sql = "update users set name = ?, school = ?, grade = ?, major = ?, phone = ?, qq = ?, email = ? where id = ?;"
  let params = [
    userInfo.name, userInfo.school,
    userInfo.grade, userInfo.major,
    userInfo.phone, userInfo.qq,
    userInfo.email, id
  ]
  DBUtil.Query(sql, params, callback)
}

// 修改自己的标签 tags 是一个字符串
function alterUserTags (id, tags, callback) {
  let sql = "update users set tag = ? where id = ?;"
  let params = [tags, id]
  DBUtil.Query(sql, params, callback)
}

function setUserAvatar(id, imgUrl, callback){
  let sql = "update users set `image` = ? where `id` = ?;"
  let params = [imgUrl, id]
  DBUtil.Query(sql, params, callback)
}

module.exports = {
  queryUserById,
  queryUserByAccount,
  queryUserByName,
  addUser,
  alterUserBaseInfo,
  alterUserTags,
  setUserAvatar
}