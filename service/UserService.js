let UserDao = require("../dao/UserDao")
const Util = require("../Utils")

/*
  @params String account  账户
  @params String password 密码
  private 
  添加用户
*/
function addUser(account, password, callback){
  UserDao.queryUserByAccount(account, data => {
    if(!data.length){ // 还没有这个账户
      UserDao.addUser(account, password, result => {
        callback(result)
      })
    } else {
      callback({success: false, msg: '账户已经存在！'})
    }
  })
}

/*
  @params String account  账户
  @params String password 密码
  public
  登录
*/
function login(account, password, callback){
  UserDao.queryUserByAccount(account, data => {
    if(data.length){
      let pwd = data[0].password
      if(pwd == password){
        callback({success: true, msg: '登录成功！'})
      }else {
        callback({success: false, msg: '密码输入错误， 请重新输入！'})
      }
    }else {
      callback({success: false, msg: '账户不存在！'})
    }
  })
}


/*
  @params Number userId  用户Id
  private 
  获取用户自己的信息
*/
function getUserInfo(userId, callback){
  UserDao.queryUserById(userId, (data => {
    if(data.length){
      let userInfo = {}
      for (let prop in data[0]){
        if(prop == 'password') continue
        userInfo[prop] = data[0][prop]
      }
      // console.log(userInfo)
      callback({success: true, msg: 'Query OK!', data: userInfo})
    } else {
      callback({success: false, msg: '没有找到对应的用户！'})
    }
  }))
}

/*
  @params Number userId  用户Id
  public 
  获取其他人的信息（不包含敏感信息=>联系方式）
*/
function setUserAvatar(id, imgUrl, callback){
  UserDao.setUserAvatar(id, imgUrl, data => {
    callback({success: true, msg: 'Query OK!', data: data})
  }) 
}

/*
  @params Number userId  用户Id
  public 
  获取其他人的信息（不包含敏感信息=>联系方式）
*/
function getOtherInfo(userId){
  
}

/*
  @params Number userId  用户Id
  private 
  获取队友完整的信息 （基础信息加上联系方式）
*/
function getTeamerInfo(userId){
  
}

/*
  @params Object userInfo 用户信息
  private 
  修改用户自己的基础信息, 
  入参是一个对象， 包含了用户从头像姓名QQ电话学校学号年级专业等信息
*/
function alterUserBaseInfo(id, userInfo, callback){
  UserDao.alterUserBaseInfo(id, userInfo, data => {
    callback({success: true, msg: 'Query OK!', data: null})
  })
}

/*
  @params String tags 标签
  private 
  获取用户自己的标签信息 返回是一个数组（数据库存储是一个字符串）
*/
function getUserTags(userId){
  
}

/*
  @params String tags 标签
  private 
  修改用户自己的标签信息 
*/
function alterUserTags(userId, tags, callback){
  console.log(userId, tags)
  UserDao.alterUserTags(userId, tags, data => {
    callback({success: true, msg: "Query OK!", data: null})
  })
}

function getUserBaseInfo(userId, callback){
  UserDao.queryUserById(userId, data => {
    console.log(data)
    if(data.length){
      let {name, sex, school, grade, tag, major, image} = data[0]
      let res = {name, sex, school, grade, tag, major, image}
      callback(Util.Write(true, res))
    }else {
      callback(Util.Write(false, 'Not Found!'))
    }
  })
}

module.exports = {
  addUser,
  login,
  getUserInfo,
  alterUserBaseInfo,
  alterUserTags,
  setUserAvatar,
  getUserBaseInfo
}


