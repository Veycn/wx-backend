function Result(res, code, data){
  res.writeHead(code)
  res.write(JSON.stringify(data))
  res.end()
}

function Write(flag, data){
  let message = ''
  message = flag ? 'Query OK!':'Query Faild'
  return {
    success: flag,
    msg: message,
    data: data
  }
}

module.exports = {
  Result,
  Write
}