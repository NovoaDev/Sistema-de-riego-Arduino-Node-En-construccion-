var emailModel = function () {
  this.service = ""
  this.usuario = ""
  this.pass = ""
  this.fromMail = ""
  this.toMail = ""
}

emailModel.prototype.setService = function (sStats) {
  this.service = sStats
}

emailModel.prototype.setUsuario = function (sStats) {
  this.usuario = sStats
}

emailModel.prototype.setPass = function (sStats) {
  this.pass = sStats
}

emailModel.prototype.setFromMail = function (sStats) {
  this.fromMail = sStats
}

emailModel.prototype.setToMail = function (sStats) {
  this.toMail = sStats
}

module.exports = emailModel