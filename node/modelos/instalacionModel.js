var emailModel = function () {
  this.usaMail = ""
  this.usaRegistro = ""
}

//GETTERS
emailModel.prototype.getUsaMail = function () {
  return this.usaMail
}

emailModel.prototype.getUsaRegistro = function () {
  return this.usaRegistro
}

//SETTERS
emailModel.prototype.setUsaMail = function (sStats) {
  this.usaMail = sStats
}

emailModel.prototype.setUsaRegistro = function (sStats) {
  this.usaRegistro = sStats
}

module.exports = emailModel