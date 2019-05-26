function Result(res, code, data) {
  res.writeHead(code)
  res.write(JSON.stringify(data))
  res.end()
}

function Write(flag, data) {
  let message = ''
  message = flag ? 'Query OK!' : 'Query Faild'
  return {
    success: flag,
    msg: message,
    data: data
  }
}

function formatTime(time) {
  function addDateZero(num) {
    return (num < 10 ? "0" + num : num);
  }
  let d = new Date(time)
  let t = d.getFullYear() + '-' + addDateZero(d.getMonth() + 1) + '-' + addDateZero(d.getDate()) + ' ' + addDateZero(d.getHours()) + ':' + addDateZero(d.getMinutes()) + ':' + addDateZero(d.getSeconds());
  return t
}

module.exports = {
  Result,
  Write,
  formatTime
}