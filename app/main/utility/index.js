const utility = {
  delay(ms) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, ms);
    })
  }
}
module.exports = utility
